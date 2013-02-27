if (Meteor.isClient) {
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
        	var reg = /.+?\:\/\/.+?(\/.+?)(?:#|\?|$)/;
        	var pathname = reg.exec(event.currentTarget.href)[1];
            Router.navigate(pathname, true);
      }
    };
    
    Template.page_controller.display_page = function() {
        var page_index = Session.get('page_id');
        if (!page_index || !Template[page_index]) {
            page_index = 'four_oh_four';
        }
        
        // $('#').addClass('active');
        
        return Template[page_index]();
    };
    
    Template.kandidaadi_vorm.currentUserName = function() {
        return Meteor.user().profile.name;
    };
    
    Template.kaart.rendered = function(){
        loadMapScript();
    };
}
