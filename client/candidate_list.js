

Template.nimekirjad.candidates = function() { 
	//hack me baby one more time	

	if (personsReady && regionsReady && partiesReady) { 
	     
    	    var persons = Persons.find({candidateStatus: 2}).fetch();

	    nimekirjad_candidates = new Meteor.Collection(null);  

            for (var i = 0; i < persons.length; i++) { 
		var toBeAdded = true;

		//teeme nõmedat filtreerimisjura, loodetavasti piisavalt optimiseeritult
		//if you value your sanity, go away now. paras spagett. aga töötab. awwyeah.

		filterLoop:
		while (true) { 
		    var query = Session.get("nimekirjad_candidates_search_query");
		    if (query) { 
			var filtersSet = false; //kas üldse mõni checkbox on valitud?

			//täisnimi - nt "edgar a" > leiab üles "edgar ansip"
			if (query.indexOf(" ") > 0 &&
			    Session.get("nimekirjad_current_search_first_name_enabled") &&	
			    Session.get("nimekirjad_current_search_last_name_enabled")) {

				//"Mägi, Aivar" (autocomplete abil nt)
				if (query.indexOf(",") > 0) {
					var switchedNameArray = query.split(",");
				    	query = switchedNameArray[1].trim() + " " +
						   switchedNameArray[0].trim();
				};

				var fullname = (persons[i].firstName + " " + persons[i].lastName)
						.trim().toLowerCase();
				if (fullname.indexOf(query) >= 0) 				
					break filterLoop;	
			};


			if (Session.get("nimekirjad_current_search_first_name_enabled")) {
				filtersSet = true;
				if (persons[i].firstName.trim().toLowerCase().indexOf(query) >= 0) 
					break filterLoop;
			};

			if (Session.get("nimekirjad_current_search_last_name_enabled")) {
				filtersSet = true;
				if (persons[i].lastName.trim().toLowerCase().indexOf(query) >= 0) 
					break filterLoop;
			};

			if (Session.get("nimekirjad_current_search_region_enabled")) {
				filtersSet = true;
				var regionName = getRegionNameById(persons[i].regionId)
						 .trim().toLowerCase();
				if (regionName.indexOf(query) >= 0) 
					break filterLoop;
			};

			if (Session.get("nimekirjad_current_search_party_enabled")) {
				filtersSet = true; 
				var partyName = getPartyNameById(persons[i].partyId)
						 .trim().toLowerCase();
				if (partyName.indexOf(query) >= 0) 
					break filterLoop;			
			};
			if (!filtersSet) break filterLoop; //ühtegi checkboxi pole valitud, näita kõiki
			toBeAdded = false; //ei vastanud ühelegi filtrile.. 
		      };
		      
		      break filterLoop;
		    };
		    if (!toBeAdded) continue; //skipime selle inimese, ei lisata

		    var tmpPer = {}; //loome lisatava isiku objekti
		    tmpPer.cid = persons[i].cid;
		    tmpPer.firstName = persons[i].firstName;
		    tmpPer.lastName = persons[i].lastName;
		    tmpPer.partyId = persons[i].partyId; 
		    tmpPer.regionName = getRegionNameById(persons[i].regionId);
		    tmpPer.partyName = getPartyNameById(persons[i].partyId);
		    if (persons[i].partyId == 0) tmpPer.noPartyLink = true;	    
    	
    	            nimekirjad_candidates.insert(tmpPer); //lisame
            };

	    if (nimekirjad_candidates) 
	        return nimekirjad_candidates.find({}).fetch();

	};
};

isReset = false;

commenceSearch = function(e){
    
};

Template.nimekirjad.rendered = function(){
	if (personsReady) {
		var tmpPersons = Persons.find({}).fetch();
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
	    Router.navigateTo("nimekirjad?filters=" + urlFilters + "&query=" + urlQuery);
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
	Meteor.call('setVote', e.target.id, Meteor.user().profile.name);
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
