Template.page_controller.events = {
    'click ul.nav li a': function (event) {
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
    }
};

var get_page_index = function(which){
    var page_index = Session.get('page_id');    
    if(which !== false){
        page_index = which;
        Session.set('page_id', which);
    }
    if (page_index != "" && !Template[page_index]) {
        page_index = 'four_oh_four';
    } else if(page_index == "") {
        page_index = 'esileht'
    }
    return page_index;    
}

var get_template = function(which) {
    var page_index = get_page_index(which);
    return Template[page_index]();    
}

Template.page_controller.display_page = function() {
    return get_template(false);
};

//dünaamiline tiitel
Template.page_controller.set_title = function() {
    var tmp = Elections.findOne();
    document.title = (tmp && tmp.name);
};

Template.page_controller.rendered = function() {
    var $table = $("table.tablesorter");
    $table.tablesorter({sortList: [[0,0]]});
    
    // quite a hack to get the bloody menuitems active
    var page_index = get_page_index(false);

    // possible attributes:
    // = is exactly equal
    // != is not equal
    // ^= is starts with
    // $= is ends with
    // *= is contains
    $('#main-menu').find('li').find('a[href*="' + page_index + '"]').parent().addClass('active');
}
