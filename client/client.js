if (Meteor.isClient) {

  ElectionData = new Meteor.Collection("election2013"); //2013 valimiste andmed  

  Meteor.startup(function () {
     Meteor.subscribe("election2013"); //sünkime serveriga   
  });


    var myAppRouter = Backbone.Router.extend({
        routes: {
            "*path": "main"
        },
        main: function(url_path){
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
	return getRegions();
    };

    Template.tulemused.candidates = function () {
	return getPersons();
    };

    Template.nimekirjad.candidates = function () {
	return getPersons();
    };

    Template.kandidaadi_info.candidate = function () {   
         
       var candidate = getPersons().filter(function(el) {
       	   return el.cid === 2; //TODO MUUTA QUERYSTRING ABIL VÕI SESSION MAP ABIL VMS!!
       });
      
       var person = {};
       person.firstName = candidate[0].firstName;
       person.lastName = candidate[0].lastName;
       person.regionName = getRegionNameById(candidate[0].regionId);
       person.partyName = getPartyNameById(candidate[0].partyId);
       person.listPosition = candidate[0].listPosition;
       person.registrationNr = candidate[0].registrationNr;
       person.maritalStatus = "TODO";
       person.phone = candidate[0].phone;
       person.email = candidate[0].email;
       person.description = candidate[0].description;

       return person;
    };


    
    //andmebaasist arrayde saamise funktsioonid
    getPersons = function() {
    	var tmp = ElectionData.findOne();
    	return (tmp && tmp.persons);
    };


    getRegions = function() {
    	var tmp = ElectionData.findOne();
    	return (tmp && tmp.regions);
    };

    getParties = function() {
    	var tmp = ElectionData.findOne();
    	return (tmp && tmp.parties);
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
