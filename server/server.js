if (Meteor.isServer) {

  Meteor.startup(function () {
	Elections = new Meteor.Collection("elections"); //valimiste üldandmed
	Persons = new Meteor.Collection("persons"); //valimiste isikute andmed
	Regions = new Meteor.Collection("regions"); //regioonide andmed
	Parties = new Meteor.Collection("parties"); //erakondade andmed


  Meteor.publish("elections", function() {	
	return Elections.find({cid : 1}); //ainult 2013 andmed praegu..
  });
  Meteor.publish("persons", function() {	
	return Persons.find({}); //kõik lehed
  });
  Meteor.publish("regions", function() {	
	return Regions.find({}); //kõik lehed
  });
  Meteor.publish("parties", function() {	
	return Parties.find({}); //kõik lehed
  });
    console.log("The Application has started...");
  });

  Meteor.methods({

  setVote: function(candidateCid, voterFullname) {
	console.log(candidateCid);
	console.log(voterFullname);
  }
  });
}

