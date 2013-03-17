Template.kandidaadi_info.candidate = function() {

    if (regionsReady && personsReady && partiesReady) {

	var tmp = Persons.findOne({cid: Session.get("candidate_info_id")});

	if (tmp && tmp) {
		var person = {};
		person.firstName = tmp.firstName;
		person.lastName = tmp.lastName;
		person.regionName = getRegionNameById(tmp.regionId);
		person.partyId = tmp.partyId; 
		person.partyName = getPartyNameById(tmp.partyId);

		if (tmp.partyId != 0) {
		    person.listPosition = tmp.listPosition;		    
		} 
		else {
		    person.listPosition = "-"; //TODO - #unless abil üldse üksikkandidaatide puhul 
						//mitte näidata?
		    person.noPartyLink = true; 
		}
		person.registrationNr = tmp.registrationNr;
		person.maritalStatus = getMaritalStringByState(tmp.maritalStatus);
		person.phone = tmp.phone;
		person.email = tmp.email;
		person.description = tmp.description;

		return person;	    
	}
	else console.log(person);
    }
};
