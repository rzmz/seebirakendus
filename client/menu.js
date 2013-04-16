Template.menu.events = {
    'click ul#main-menu li a': function (event) {
        event.preventDefault();
        // var reg = /.+?\:\/\/.+?(\/.+?)(?:#|\?|$)/;
        // var pathname = reg.exec(event.currentTarget.href)[1];
        var pathname = event.currentTarget.href;
        pathname = pathname.replace(Meteor.absoluteUrl(), '');
        Router.navigate(pathname);
        
        var $container = $('#pageMainContent');
        $container.fadeOut(200, function(e){
            $(this).html(get_template(pathname));
            $(this).fadeIn(200);
        });
        
        $(event.target).parent().parent().find('li').removeClass("active");
        $(event.target).parent().addClass("active");
    },
    
    'click ul#login-menu li a': function(e){
        var provider = $(e.currentTarget).data('login');
        if(provider !== undefined){
            e.preventDefault();
            e.stopImmediatePropagation();
            if(provider == "github"){
                Meteor.loginWithGithub({
                   requestPermissions: ['user', 'public_repo']
                }, function(err){
                    if(err){
                        // todo: error handling
                    } else {
                        // todo: do something else
                    }
                });
            } else if(provider == "facebook"){
                Meteor.loginWithFacebook({
                    requestPermissions: ['publish_actions']
                }, function(err){
                    if(err){
                        // todo: error handling
                    } else {
                        // todo: do something else
                    }
                });
            }
        }
    },
    
    'click #logout': function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        Meteor.logout();
    }
};
