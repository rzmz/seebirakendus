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
