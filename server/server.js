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


  //muudab mingi isiku infot
  //ei tea kas oleks lihtsamalt saanud aga ei hakanud riskima
  updateUserData: function(userDao) { 
	if (!currentUserExists())
		createUser();

	if (userDao.firstName)
		Persons.update({cid: Meteor.user().profile.cid}, 
			{$set:{"firstName": parseInt(userDao.firstName)}});	

	if (userDao.lastName)
		Persons.update({cid: Meteor.user().profile.cid}, 
			{$set:{"lastName": parseInt(userDao.lastName)}});	

	if (userDao.regionId) 
		Persons.update({cid: Meteor.user().profile.cid}, 
			{$set:{"regionId": parseInt(userDao.regionId)}});	

	if (userDao.votedCandidateId)
		Persons.update({cid: Meteor.user().profile.cid}, 
			{$set:{"votedCandidateId": parseInt(userDao.votedCandidateId)}});	

	if (userDao.candidateStatus)
		Persons.update({cid: Meteor.user().profile.cid}, 
			{$set:{"candidateStatus": userDao.candidateStatus}});	

	if (userDao.registrationNr)
		Persons.update({cid: Meteor.user().profile.cid}, 
			{$set:{"registrationNr": parseInt(userDao.registrationNr)}});

	if (userDao.partyId)
		Persons.update({cid: Meteor.user().profile.cid}, 
			{$set:{"partyId": parseInt(userDao.partyId)}});

	if (userDao.registrationNr)
		Persons.update({cid: Meteor.user().profile.cid}, 
			{$set:{"registrationNr": userDao.registrationNr}});

	if (userDao.phone)
		Persons.update({cid: Meteor.user().profile.cid}, 
			{$set:{"phone": userDao.phone}});

	if (userDao.email)
		Persons.update({cid: Meteor.user().profile.cid}, 
			{$set:{"email": userDao.email}});

	if (userDao.maritalStatus)
		Persons.update({cid: Meteor.user().profile.cid}, 
			{$set:{"maritalStatus": parseInt(userDao.maritalStatus)}});

	if (userDao.description)
		Persons.update({cid: Meteor.user().profile.cid}, 
			{$set:{"description": userDao.description}});

  },

  //lisab hääle kandidaadile
  setVote: function(candidateCid) {
	if (!currentUserExists())
		createUser();


	//TODO: kui candidateCid == -1, siis eemaldame (pmst tühistas hääle ära)
	//TODO: tee nupp selleks candidate_list lehele.. 
	

	//praeguselt hääletanult võtame hääle maha, juhul kui üldse oli hääli	
	var previousCandidateId = 
		parseInt(Persons.findOne({cid: Meteor.user().profile.cid}).votedCandidateId);	
	if (previousCandidateId) {
		var previousVotes = Persons.findOne({cid: previousCandidateId}).votes;
		Persons.update({cid: previousCandidateId}, 
			{$set:{"votes": previousVotes - 1}});
	}

	//muudame hääletaja "voted for" vms väärtust..
	Persons.update({cid: Meteor.user().profile.cid}, 
		{$set:{"votedCandidateId": candidateCid}});	

	//uuele paneme hääle juurde
	candidateCid = parseInt(candidateCid);
	var newVotes = Persons.findOne({cid: candidateCid}).votes;	
	Persons.update({cid: candidateCid}, 
		{$set:{"votes": newVotes + 1}});
  	}
  });

  //kui praegune user juba on Persons tabelis (full name unikaalne!)
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

  //loob uue useri Persons tabelisse, kui seda pole
  createUser = function() {
	var length = Persons.find({}).fetch().length;
	var newUser = {
		cid: length + 1,
		firstName: Meteor.user().profile.name.split(" ")[0],
		lastName: Meteor.user().profile.name.split(" ")[1],
		candidateStatus: 0		
	};	
	Persons.insert(newUser);	
	Meteor.users.update({_id:Meteor.user()._id}, 
		{$set:{"profile.cid": persons[i].cid}});

  };
 
}

