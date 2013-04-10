SeebirakendusRouter = Backbone.Router.extend({
    routes: {
        "*path": "main"
    	},    
    navigateTo: function(path) {
	this.navigate(path);
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

	    if (urlElements[0] == "nimekirjad") {
		var filtersString = parameters["filters"];

		if (filtersString.indexOf("f") >= 0) {
			Session.set("nimekirjad_current_search_first_name_enabled", true);
		}
		else Session.set("nimekirjad_current_search_first_name_enabled", false);

		if (filtersString.indexOf("l") >= 0) {
			Session.set("nimekirjad_current_search_last_name_enabled", true);
		}
		else Session.set("nimekirjad_current_search_last_name_enabled", false);

		if (filtersString.indexOf("r") >= 0) {
			Session.set("nimekirjad_current_search_region_enabled", true); 
		}
		else Session.set("nimekirjad_current_search_region_enabled", false); 

		if (filtersString.indexOf("p") >= 0) {
			Session.set("nimekirjad_current_search_party_enabled", true); 
		}
		else Session.set("nimekirjad_current_search_party_enabled", false);
		
		var query = parameters["query"];		  

		query = decode_HTML(query).toLowerCase();
		Session.set("nimekirjad_candidates_search_query", query);
	    };


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

	//see jätta viimaseks reaks, et basepathi normaalselt saaks..
	url_path = urlElements[0];
    };            

        Session.set('page_id', url_path);
    }
});

Router = new SeebirakendusRouter();
Backbone.history.start({pushState: true});
