var doPageChange = function(e){
    e.preventDefault();
    var pathname = e.currentTarget.href;
    pathname = pathname.replace(Meteor.absoluteUrl(), '');
    Router.navigate(pathname);
    
    var $container = $('#pageMainContent');
    $container.fadeOut(200, function(e){
        $(this).html(get_template(pathname));
        $(this).fadeIn(200);
    });
    
    $(e.target).parent().parent().find('li').removeClass("active");
    $(e.target).parent().addClass("active");
    
};

var doLoginStuff = function(e){
    var action = $(e.currentTarget).data('action');
    if(action !== undefined){
        e.preventDefault();
        e.stopPropagation();
        if(action == "github"){
            Meteor.loginWithGithub({
               requestPermissions: ['user', 'public_repo']
            }, function(err){
                if(err){
                    // todo: error handling
                } else {
                    // todo: do something else
                }
            });
        } else if(action == "facebook"){
            Meteor.loginWithFacebook({
                requestPermissions: ['publish_actions']
            }, function(err){
                if(err){
                    // todo: error handling
                } else {
                    // todo: do something else
                }
            });
        } else if(action == "oldschool"){
            Router.navigate("login");
        } else if(action == "logout") {
            Meteor.logout(function(err){
               if(err){
                   //todo: error handling
               } else {
                   // todo: show some sign that logout was successful
               }
            });
        }
    }    
}
Template.menu.rendered = function(){
    $('a.accounts').click(function(e){
        doLoginStuff(e);
    });
    $('a.navigate').click(function(e){
        doPageChange(e);
    });    
};
