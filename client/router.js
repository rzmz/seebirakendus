var SeebirakendusRouter = Backbone.Router.extend({
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
		parameters[pair[0]] = pair[1];
	    }


	    if (urlElements[0] == "kandidaadi_info") {                       
		//TODO - siin teha check, et üldse "id" parameeter leiduks
		//MIDA TEHA SIIS, KUI SEDA POLE?
                	Session.set("candidate_info_id", parseInt(parameters["id"]));		    
            };

	    if (urlElements[0] == "erakonna_info") {                       
		//TODO - siin teha check, et üldse "id" parameeter leiduks
		//MIDA TEHA SIIS, KUI SEDA POLE?
                	Session.set("party_info_id", parseInt(parameters["id"]));
            };

/*
    Session.set("nimekirjad_current_search_first_name_enabled", true);
    Session.set("nimekirjad_current_search_last_name_enabled", true);

 Session.get("nimekirjad_current_search_region_enabled")) 
Session.get("nimekirjad_candidates_search_query");
      Session.get("nimekirjad_current_search_party_enabled")
*/



	//see jätta viimaseks reaks, et basepathi normaalselt saaks..
	url_path = urlElements[0];
    };            

        Session.set('page_id', url_path);
    }
});

var Router = new SeebirakendusRouter();
Backbone.history.start({pushState: true});
