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

  setVote: function(candidateCid) {
	if (!currentUserExists())
		createUser();
  	}
  });

  
  currentUserExists = function() {

	if (Meteor.user().profile.cid) 
		return true; 

	var persons = Persons.find({}).fetch();
	var firstName = Meteor.user().profile.name.split(" ")[0];
	var lastName = Meteor.user().profile.name.split(" ")[1];

	if (persons) {
		for (var i = 0; i < persons.length; i++) {
			if (persons[i].firstName == firstName && 
			    persons[i].lastName == lastName) {
				Meteor.users.update({_id:Meteor.user()._id}, 
					{$set:{"profile.cid": persons[i].cid}});
				return true;
				};
		}
	
		return false;
	}	
  };

  createUser = function() {
	var length = Persons.find({}).fetch().length;
	var newUser = {
		cid: length + 1,
		firstName: Meteor.user().profile.name.split(" ")[0],
		lastName: Meteor.user().profile.name.split(" ")[1]
	};	
	Persons.insert(newUser);	
	Meteor.users.update({_id:Meteor.user()._id}, 
		{$set:{"profile.cid": persons[i].cid}});
  };

  setUserCandidateData = function() {

  };
}

