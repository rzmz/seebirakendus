var doLoginStuff = function(target) {
    var action = $(target).data('action');
    if(action !== undefined){
        if(action == "github"){
            Meteor.loginWithGithub({
               requestPermissions: ['user', 'public_repo']
            }, function(err){
                if(err){
                    setError("Sisse logimine ei õnnestunud.");
                } else {
                    setMessage("Edukalt sisse logitud Githubiga.");
                }
            });
        } else if(action == "facebook"){
            Meteor.loginWithFacebook({
                requestPermissions: ['publish_actions']
            }, function(err){
                if(err){
                    setError("Sisse logimine ei õnnestunud.");
                } else {
                    setMessage("Edukalt sisse logitud Facebookiga.");
                }
            });
        } else if(action == "oldschool"){
            Router.navigate("login");
        } else if(action == "logout") {
            Meteor.logout(function(err){
               if(err){
                   setError("Väljalogimine ei õnnestunud miskipärast.");
               } else {
                   setMessage("Edukalt välja logitud.");
               }
            });
        }
    }
}

Template.menu.events({
    'click a.accounts': function(e){
        e.preventDefault();
        e.stopPropagation();
        doLoginStuff(e.currentTarget);
    }
});
