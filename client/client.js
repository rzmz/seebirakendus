var ElectionData = new Meteor.Collection("election2013"); //2013 valimiste üldandmed  

Meteor.startup(function () {
    //sünkime serveriga
    Meteor.subscribe("election2013");
});

Template.kandidaadi_vorm.currentUserName = function() {
    return Meteor.user().profile.name;
};
    
Template.kaart.rendered = function(){
    loadMapScript();
};
