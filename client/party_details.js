Template.erakonna_info.party = function() {

    var tmp = Parties.findOne({cid: Session.get("party_info_id")});

    //loome uue objekti, sest ei taha erakonna andmestikku otseselt muuta / sinna välju lisada hiljem
    if (tmp) {

        var party = {};
        party.name = tmp.name;
        party.email = tmp.email;
	party.homepage = tmp.homepage; 

	party.representatives = [];
	repstring = tmp.representatives.split("&");	

	if (personsReady) {
	
		for (var i = 0; i < repstring.length; i++) {
			tmpPer = Persons.findOne({cid: parseInt(repstring[i])});
			tmpPerObj = {};
			tmpPerObj.firstName = tmpPer.firstName;
			tmpPerObj.lastName = tmpPer.lastName;
			tmpPerObj.id = tmpPer.cid; 
			party.representatives.push(tmpPerObj);			
		}
	}


        return party;
    }
};
