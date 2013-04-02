Elections = new Meteor.Collection("elections"); //valimiste üldandmed
Persons = new Meteor.Collection("persons"); //valimiste isikute andmed
Regions = new Meteor.Collection("regions"); //regioonide andmed
Parties = new Meteor.Collection("parties"); //erakondade andmed

//teretulemast meteori antipatternite maailma
var electionsReady = false;
var personsReady = false;
var regionsReady = false;
var partiesReady = false; 


Meteor.startup(function () {
    //sünkime serveriga
    Meteor.subscribe("elections", function() {electionsReady = true});
    Meteor.subscribe("persons", function() {personsReady = true});
    Meteor.subscribe("regions", function() {regionsReady = true});
    Meteor.subscribe("parties", function() {partiesReady = true});

    Session.set("nimekirjad_current_search_first_name_enabled", true);
    Session.set("nimekirjad_current_search_last_name_enabled", true);
});

Template.kandidaadi_vorm.currentUserName = function() {
    return Meteor.user().profile.name;
};
    
Template.kaart.rendered = function(){
    loadMapScript();
};
