if (Meteor.isClient) {

  ElectionData = new Meteor.Collection("election2013"); //2013 valimiste üldandmed  


  Meteor.startup(function () {
     //sünkime serveriga
     Meteor.subscribe("election2013");
  });

    var myAppRouter = Backbone.Router.extend({
        routes: {
            "*path": "main"
        },
        main: function(url_path){            
            var urlElements = url_path.split("?");
             
            if (urlElements.length > 1) {

	            //parseme lahti
                    var parameters = {};
                    var parameterPairArray = urlElements[1].split("&");
                    for (var i = 0; i < parameterPairArray.length; i++) {
			var pair = parameterPairArray[i].split("=");
                        console.log(pair);
			parameters[pair[0]] = pair[1];
		    }


		    if (urlElements[0] == "kandidaadi_info") {                       
			//TODO - siin teha check, et üldse "id" parameeter leiduks
			//MIDA TEHA SIIS, KUI SEDA POLE?
                    	Session.set("candidate_info_id", parameters["id"]);		    
	            };

		    if (urlElements[0] == "erakonna_info") {                       
			//TODO - siin teha check, et üldse "id" parameeter leiduks
			//MIDA TEHA SIIS, KUI SEDA POLE?
                    	Session.set("party_info_id", parameters["id"]);		    
	            };

		//see jätta viimaseks reaks, et basepathi normaalselt saaks..
		url_path = urlElements[0];
	    };            

            Session.set('page_id', url_path);
        }
    });

    
   

    Router = new myAppRouter();
    Backbone.history.start({pushState: true});
    
    Template.page_controller.events = {
      'click ul.nav li a': function (event) {
            event.preventDefault();
            // $(event.target).parent().parent().find('li').removeClass("active");
            // $(event.target).parent().addClass("active");
            var reg = /.+?\:\/\/.+?(\/.+?)(?:#|\?|$)/;
            var pathname = reg.exec(event.currentTarget.href)[1];
            Router.navigate(pathname, true);
      }
    };
    
    Template.page_controller.display_page = function() {
        
        var page_index = Session.get('page_id');

        if (page_index != "" && !Template[page_index]) {
            page_index = 'four_oh_four';
        } else if(page_index == "") {
            page_index = "kaart"
        }

        return Template[page_index]();
    };

    //dünaamiline tiitel
    Template.page_controller.set_title = function() {
	var tmp = ElectionData.findOne();
	document.title = (tmp && tmp.name);  
    };

    
    Template.kandidaadi_vorm.currentUserName = function() {
        return Meteor.user().profile.name;
    };
    
    Template.kaart.rendered = function(){
        loadMapScript();
    };

    Template.tulemused.regions = function () {
        var regions = getRegions();
	if (regions) {

		var ret = [];

		for (var i = 0; i < regions.length; i++) {
			var tmpReg = {};
		        tmpReg.name = regions[i].name;
		        tmpReg.cid = regions[i].cid;
		        ret.push(tmpReg);
		};
	   
		return ret;
	}
    };


//TODO - panna sõltuma filtreerimisvalikutest..
    Template.tulemused.candidates = function () {
        //TODO - teha mingi ühine meetod kandidaadiinfo saamiseks
        var persons = getPersons();	
        if (persons) {
		var ret = [];

		for (var i = 0; i < persons.length; i++) {
			var tmpPer = {};
			tmpPer.cid = persons[i].cid;
		        tmpPer.firstName = persons[i].firstName;
		        tmpPer.lastName = persons[i].lastName;
		        tmpPer.regionName = getRegionNameById(persons[i].regionId);
                        tmpPer.partyId = persons[i].partyId;
                        if (persons[i].partyId == 0) tmpPer.noPartyLink = true; 
		        tmpPer.partyName = getPartyNameById(persons[i].partyId);
		        tmpPer.votes = persons[i].votes; 
		        ret.push(tmpPer);
		};
	   
		return ret;
	}
    };


//TODO - panna sõltuma filtreerimisvalikutest..
    Template.tulemused.parties = function () {
        //TODO - teha mingi ühine meetod kandidaadiinfo saamiseks
        var parties = getParties();	
        if (parties) {
		var ret = [];

		for (var i = 0; i < parties.length; i++) {
			var tmpPar = {};
			tmpPar.cid = parties[i].cid;
		        tmpPar.name = parties[i].name;
		        tmpPar.votes = i * 100; //TODO - teha eraldi utilitymeetod
		        tmpPar.mandates = i * 2; //TODO - teha eraldi utilitymeetod
		        ret.push(tmpPar);
		};
	   
		return ret;
	}
    };



    var nimekirjad_candidates;

    set_nimekirjad_candidates = function() {
	//TODO - teha mingi ühine meetod kandidaadiinfo saamiseks
        var persons = getPersons();	
        if (persons) {

		nimekirjad_candidates = [];

		for (var i = 0; i < persons.length; i++) {
			var tmpPer = {};
			tmpPer.cid = persons[i].cid;
		        tmpPer.firstName = persons[i].firstName;
		        tmpPer.lastName = persons[i].lastName;
		        tmpPer.regionName = getRegionNameById(persons[i].regionId);
		        tmpPer.partyName = getPartyNameById(persons[i].partyId);

			//filterdame nime järgi

			var searched_name = Session.get("nimekirjad_candidates_searched_name");
			if (searched_name) {
				//trim() võib olla..?
				var full_name = (tmpPer.firstName + " " + tmpPer.lastName)
					.trim()
					.toLowerCase();
				if (!full_name.indexOf(searched_name) == 0) continue;
		        };

		        nimekirjad_candidates.push(tmpPer);
		};
	}
    };

    get_nimekirjad_candidates = function() {
	if (!nimekirjad_candidates) set_nimekirjad_candidates();
        if (nimekirjad_candidates) return nimekirjad_candidates;
    };

    Template.nimekirjad.candidates = function () {
	return get_nimekirjad_candidates();
    };


  Template.nimekirjad.events({
    'click #search': function () {
	//TODO - esimese asjana kustuta kõik väärtused..       
      //ecmascript 5, oot mis brausereid me toetama pidimegi..?
      var query = $('#searchfield').val().trim().toLowerCase();
      
      Session.set("nimekirjad_candidates_searched_name", query);
      set_nimekirjad_candidates();    
    }
  });



    Template.kandidaadi_info.candidate = function () {   
       

       var persons = getPersons();

       if (persons) {
		 
	       var candidate = persons.filter(function(el) {
	       	   return el.cid == Session.get("candidate_info_id");
	       });
		//TODO - siia kontroll, kas üldse keegi leiti!
	        //KUI EI, NÄIDATA MINGIT LEHTE ET "SELLIST KANDIDAATI EI LEIDU"
	      
	       var person = {};
	       person.firstName = candidate[0].firstName;
	       person.lastName = candidate[0].lastName;
	       person.regionName = getRegionNameById(candidate[0].regionId);
	       person.partyName = getPartyNameById(candidate[0].partyId);
		      
	       if (candidate[0].partyId != 0) {
	       	person.listPosition = candidate[0].listPosition;
	       }
	       else {
	       	person.listPosition = "-"; //TODO - #unless abil üldse üksikkandidaatide puhul mitte 	
					   //näidata?
	       };
	       person.registrationNr = candidate[0].registrationNr;
	       person.maritalStatus = "TODO";
	       person.phone = candidate[0].phone;
	       person.email = candidate[0].email;
	       person.description = candidate[0].description;

	       return person;
	}
    };

    Template.erakonna_info.party = function () {   
       
       var parties = getParties();

       if (parties) {
		 
	       var partyArray = parties.filter(function(el) {
	       	   return el.cid == Session.get("party_info_id");
	       });
		//TODO - siia kontroll, kas üldse keegi leiti!
	        //KUI EI, NÄIDATA MINGIT LEHTE ET "SELLIST ERAKONDA EI LEIDU"
	      
 	       var party = {};      
	       party.name = partyArray[0].name;
	       party.email = partyArray[0].email;
	       
	       return party;
	}
    };


    
    //andmebaasist arrayde saamise funktsioonid
    getPersons = function() {
    	var data = ElectionData.findOne();
    	if (data) {
		return data.persons;
		/*
	        var regions = [];
		for (var i = 0; i < data.regions.length; i++) {			
			var region = {};
                        region.name = data.regions[i].name;
			region.cid = data.regions[i].cid;
                        regions.push(region);
		};
		return regions;
		*/
	};
    };


    getRegions = function() {
    	var data = ElectionData.findOne();
    	if (data) {
	        var regions = [];
		for (var i = 0; i < data.regions.length; i++) {			
			var region = {};
                        region.name = data.regions[i].name;
			region.cid = data.regions[i].cid;
                        regions.push(region);
		};
		return regions;
	};
    };

    getParties = function() {
    	var data = ElectionData.findOne();
    	if (data) {
		return data.parties;

/*
	        var regions = [];
		for (var i = 0; i < data.regions.length; i++) {			
			var region = {};
                        region.name = data.regions[i].name;
			region.cid = data.regions[i].cid;
                        regions.push(region);
		};
		return regions;
*/
	};
    };


    //utilityfunktsioonid
    getRegionNameById = function(regionId) {

        var regions = getRegions();

        var regionName = "NO SUCH REGION!";

        for (var i = 0; i < regions.length; i++) {
          if (regions[i].cid == regionId) {
            regionName = regions[i].name;
          };
        };

        return regionName;
    };

    getPartyNameById = function(partyId) {
        var parties = getParties();
        if (partyId == 0) return "Üksikkandidaat";

        var partyName = "POLE SELLIST ERAKONDA";

        for (var i = 0; i < parties.length; i++) {
          if (parties[i].cid == partyId) {
            partyName = parties[i].name;
          };
        };

        return partyName;
    };    

}
