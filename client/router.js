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

Router = new SeebirakendusRouter();
Backbone.history.start({pushState: true});
