Template.tulemused.rendered = function() {
    Session.setDefault('results_type', "candidates");
    $("#results_type").find('button').click(function(){
        Session.set('results_type', $(this).data('type'));
    });

    $('#results_type').find("button[data-type='"+Session.get('results_type')+"']").addClass('active');
}

Template.tulemused.events({
    'change #region_select': function(evt) {
        var filterValue = evt.currentTarget.value;
        Session.set("selected_region", filterValue);
    }
});

Template.tulemused.show_candidates = function(){
    return (Session.get('results_type') == "candidates") ? true : false;
}
