Session.set("nimekirjad_current_search_first_name_enabled", true);
Session.set("nimekirjad_current_search_last_name_enabled", true);

Template.nimekirjad.candidates = function() { 
	//hack me baby one more time	

	if (personsReady && regionsReady && partiesReady) { 
	     
    	    var persons = Persons.find({}).fetch();

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

Template.nimekirjad.events({
    'submit #search-form, click #search-btn': function(e) {
        e.preventDefault();        
        var button = document.getElementById('search-btn');
        var spinner = new Spinner(btn_spinner_opts).spin(button);
        
        // todo: removes settimeout after demo
        window.setTimeout(function(){
            var query = $('#searchfield').val().trim().toLowerCase();	    
            Session.set("nimekirjad_candidates_search_query", query);

	    Session.set("nimekirjad_current_search_first_name_enabled", 
		$('#firstName_checkbox').is(':checked'));
	    Session.set("nimekirjad_current_search_last_name_enabled", 
		$('#lastName_checkbox').is(':checked'));
	    Session.set("nimekirjad_current_search_region_enabled", 
		$('#region_checkbox').is(':checked'));   	    
	    Session.set("nimekirjad_current_search_party_enabled", 
		$('#party_checkbox').is(':checked'));	    
	
            spinner.stop();
        }, 1000);
        //TODO - esimese asjana kustuta kõik väärtused..
        //ecmascript 5, oot mis brausereid me toetama pidimegi..?
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
