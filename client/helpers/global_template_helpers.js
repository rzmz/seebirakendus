// global template helpers to be used everywhere
Handlebars.registerHelper("set_page_title", function() {
    // this caused all the pages to render twice!!!
    // var tmp = Elections.findOne();
    // document.title = (tmp && tmp.name) || "Seebirakendus";
    document.title = "Seebirakendus - vali meid, mees!";
});

Handlebars.registerHelper("display_page", function(){
    var page_id = Session.get("page_id");
    if(page_id && Template.hasOwnProperty(page_id)){
        return Template[page_id]();
    }
    return Template["four_oh_four"]();
});

Handlebars.registerHelper("page_end", function(){
    var $table = $("table.tablesorter");
    $table.tablesorter({sortList: [[0,0]]});
});

Handlebars.registerHelper("do_something", function() {    
    alert("something");
});

Handlebars.registerHelper("currentUserName", function(){
    return Meteor.user().profile.name;
});

Handlebars.registerHelper("alert-message", function() {    
    return Session.get("message") || Session.get("error");
});

Handlebars.registerHelper("alert-class", function() {
    if(Session.get("message")){
        return "alert-info";
    } else if(Session.get("error")){
        return "alert-error";
    }
});

// global collections to be used everywhere

Handlebars.registerHelper("regions", function(){
    return Regions.find();
});

Handlebars.registerHelper("candidates", function(){
    var selectedFilterValue = parseInt(Session.get("selected_region"));
    var filterOptions = {candidateStatus: 2};
    if(selectedFilterValue > 0 && !isNaN(selectedFilterValue)){
        filterOptions.regionId = selectedFilterValue;
    }

    var persons = Persons.find(filterOptions);
    var result = [];
    
    if (persons) {
        persons.forEach(function(person){
            person.regionName = getRegionNameById(person.regionId);
            person.partyName = getPartyNameById(person.partyId);
            if(person.partyId === 0){
                person.noPartyLink = true;
            } else {
            }
            result.push(person);
        });
    }
    
    return result;
});