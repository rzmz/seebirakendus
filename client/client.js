if (Meteor.isClient) {
    var myAppRouter = Backbone.Router.extend({
        routes: {
            "*path": "main"
        },
        main: function(url_path){
            Session.set('page_id', url_path);
        }
    });

    ElectionData = new Meteor.Collection("election2013"); //2013 valimiste andmed
    Meteor.subscribe("election2013"); //sünkime serveriga

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
    	var tmp = ElectionData.findOne();
    	return (tmp && tmp.regions);
    };

    Template.tulemused.candidates = function () {
    	var tmp = ElectionData.findOne();
    	return (tmp && tmp.persons);
    };

    Template.nimekirjad.candidates = function () {
    	var tmp = ElectionData.findOne();
    	return (tmp && tmp.persons);
    };

    Template.kandidaadi_info.candidate = function () {
       var tmp = ElectionData.findOne();
       var persons = tmp.persons;
       var candidate = persons.filter(function(el) {
       	   return el.cid === 1; //TODO MUUTA QUERYSTRING ABIL VÕI SESSION MAP ABIL VMS!!
       });
       return candidate[0]; //kuna filter tagastab array ühe elemendiga
	//TODO

    };


}
