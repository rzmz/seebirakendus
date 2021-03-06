Template.nimekirjad.candidates = function() { 
    var persons = getPersons();
    var result = [];
    nimekirjad_candidates = new Meteor.Collection(null);

    persons.forEach(function(person){
		var toBeAdded = true;
        person.regionName = getRegionNameById(person.regionId);
        person.partyName = getPartyNameById(person.partyId);
        result.push(person);
    });
    return result;
};

isReset = false;

commenceSearch = function(e){
    
};

Template.nimekirjad.rendered = function(){
	if (personsReady) {
		var tmpPersons = Persons.find({candidateStatus: 2}).fetch();
		if (tmpPersons) {
			var names = [];			
			for (var i = 0; i < tmpPersons.length; i++) {
				names.push(tmpPersons[i].lastName + ", " + tmpPersons[i].firstName);
				names.push(tmpPersons[i].firstName + " " + tmpPersons[i].lastName);
			};
			return Meteor.defer(function () {				
				return $('#searchfield').typeahead({    		
					source: names,
					matcher: function(item) {
						if (this.query.length < 2) return false;

			//kui pole ees- ja perenimi valitud siis ei paku midagi.
						if (
                            !($('#firstName_checkbox').is(':checked')) ||
                            !($('#lastName_checkbox').is(':checked'))
                            )
                        return false;
           
						var fullname = item.trim().toLowerCase();
						var query = this.query.trim().toLowerCase();
						if (fullname.indexOf(query) == 0) {	
							return true;
							};

					        return false;
						},
   					highlighter: function(item){
						len = this.query.trim().length;
					        return "<div><strong>" +
							item.substring(0,len) + "</strong>" +
							item.substring(len) + "</div>";
						}					
					});
		        });
		};
	};
};

Template.nimekirjad.events({
    'submit #search-form, click #search-btn': function(e) {
        e.preventDefault();
        e.stopPropagation();
        var $searchField = $('#searchfield');
        var searchValue = $searchField.val().trim();
        if(searchValue.length == 0 && !isReset) {
            setError('Otsinguväli on tühi!');
            return;
        }
        if(isReset) {           
            clearAllErrors();
            isReset = false;
        }
        var button = document.getElementById('search-btn');
        var spinner = new Spinner(btn_spinner_opts).spin(button);
        
        // todo: remove settimeout after demo
        window.setTimeout(function(){
            var query = $('#searchfield').val().trim().toLowerCase();	    
            Session.set("nimekirjad_candidates_search_query", query);
            Session.set("nimekirjad_current_search_first_name_enabled", $('#firstName_checkbox').is(':checked'));
            Session.set("nimekirjad_current_search_last_name_enabled", $('#lastName_checkbox').is(':checked'));
            Session.set("nimekirjad_current_search_region_enabled", $('#region_checkbox').is(':checked'));
            Session.set("nimekirjad_current_search_party_enabled", $('#party_checkbox').is(':checked'));

	    var urlQuery = encode_HTML(query);
	    var urlFilters = "";
	    if (Session.get("nimekirjad_current_search_first_name_enabled")) urlFilters += "f";
	    if (Session.get("nimekirjad_current_search_last_name_enabled")) urlFilters += "l";
	    if (Session.get("nimekirjad_current_search_region_enabled")) urlFilters += "r";
	    if (Session.get("nimekirjad_current_search_party_enabled")) urlFilters += "p";
	    Router.navigate("nimekirjad?filters=" + urlFilters + "&query=" + urlQuery);
            spinner.stop();
        }, 1000);
        //TODO - esimese asjana kustuta kõik väärtused..
        //ecmascript 5, oot mis brausereid me toetama pidimegi..?
    },
    'click button.reset': function(e){
        e.preventDefault();
        e.stopPropagation();
        if($('#searchfield').val().trim().length > 0){
            isReset = true;
            $('#searchfield').val("");
            $('#search-btn').trigger('click');            
        }
    },
    'click .filter button': function(e){
        var checkbox_id = $(e.target).attr('data-click');
        $("#" + checkbox_id).trigger('click');
        $(e.target).toggleClass("active");
    },
    'click .vote': function(e){
	Meteor.call('setVote', e.target.id);
    },
    'submit #currently_voted_candidate-form': function(e){
        e.preventDefault();
	Meteor.call('setVote', -1);
     }
});

Template.nimekirjad.currentSearchValue = function() {
	if (!Session.get("nimekirjad_candidates_search_query")) return "";
        else return Session.get("nimekirjad_candidates_search_query");
};

Template.nimekirjad.currentSearchFirstNameEnabled = function() {
	return Session.get("nimekirjad_current_search_first_name_enabled");
};

Template.nimekirjad.currentSearchLastNameEnabled = function() {
	return Session.get("nimekirjad_current_search_last_name_enabled");
};

Template.nimekirjad.currentSearchRegionEnabled = function() {
	return Session.get("nimekirjad_current_search_region_enabled");
};

Template.nimekirjad.currentSearchPartyEnabled = function() {
	return Session.get("nimekirjad_current_search_party_enabled");
};

Template.nimekirjad.votedCandidateExists = function() {

	var user = Persons.findOne({cid: Meteor.user().profile.cid});	
	if (user && (user.votedCandidateId || user.votedCandidateId == parseInt(0)))
		return true; 

};

Template.nimekirjad.current_candidate_name = function() {
	var user = Persons.findOne({cid: Meteor.user().profile.cid});	
	if (user) {
		var candidate = Persons.findOne({cid: user.votedCandidateId});
		if (candidate) {
			return candidate.firstName + " " + candidate.lastName;
			}
		};
};

Template.nimekirjad.current_candidate_party = function() {
	var user = Persons.findOne({cid: Meteor.user().profile.cid});	
	if (user) {
		var candidate = Persons.findOne({cid: user.votedCandidateId});
		if (candidate) {
			return getPartyNameById(candidate.partyId);
			}
		};
};
