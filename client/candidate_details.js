Template.kandidaadi_info.candidate = function() {

    if (regionsReady && personsReady && partiesReady) {

    var persons = getPersons();

    if (persons) {
        var candidate = persons.filter(function(el) {
            return el.cid == Session.get("candidate_info_id");
        });
        
        //TODO - siia kontroll, kas üldse keegi leiti!
        //KUI EI, NÄIDATA MINGIT LEHTE ET "SELLIST KANDIDAATI EI LEIDU"
        var person = {};
        person.firstName = candidate[0].firstName;
        person.lastName = candidate[0].lastName;
        person.regionName = getRegionNameById(candidate[0].regionId);
        person.partyName = getPartyNameById(candidate[0].partyId);

        if (candidate[0].partyId != 0) {
            person.listPosition = candidate[0].listPosition;
        } 
        else {
            person.listPosition = "-"; //TODO - #unless abil üldse üksikkandidaatide puhul mitte 	
            //näidata?
        }
        person.registrationNr = candidate[0].registrationNr;
        person.maritalStatus = "TODO";
        person.phone = candidate[0].phone;
        person.email = candidate[0].email;
        person.description = candidate[0].description;

        return person;
    }
    }
};
