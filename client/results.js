Template.tulemused.regions = function () {
    var regions = getRegions();
    if (regions) {
        var ret = [];
		for (var i = 0; i < regions.length; i++) {
            var tmpReg = {};
		    tmpReg.name = regions[i].name;
            tmpReg.cid = regions[i].cid;
            ret.push(tmpReg);
		};	   
		return ret;
	}
};


//TODO - panna sõltuma filtreerimisvalikutest..
Template.tulemused.candidates = function () {
    //TODO - teha mingi ühine meetod kandidaadiinfo saamiseks
    var persons = getPersons();
    if (persons) {
        var ret = [];

        for (var i = 0; i < persons.length; i++) {
            var tmpPer = {};
            tmpPer.cid = persons[i].cid;
            tmpPer.firstName = persons[i].firstName;
            tmpPer.lastName = persons[i].lastName;
            tmpPer.regionName = getRegionNameById(persons[i].regionId);
            tmpPer.partyId = persons[i].partyId;
            if (persons[i].partyId == 0) tmpPer.noPartyLink = true; 
            tmpPer.partyName = getPartyNameById(persons[i].partyId);
		    tmpPer.votes = persons[i].votes; 
		    ret.push(tmpPer);
		};
        
		return ret;
    }
};

//TODO - panna sõltuma filtreerimisvalikutest..
Template.tulemused.parties = function () {
    //TODO - teha mingi ühine meetod kandidaadiinfo saamiseks
    var parties = getParties();	
    if (parties) {
        var ret = [];

        for (var i = 0; i < parties.length; i++) {
            var tmpPar = {};
            tmpPar.cid = parties[i].cid;
		    tmpPar.name = parties[i].name;
            tmpPar.votes = i * 100; //TODO - teha eraldi utilitymeetod
            tmpPar.mandates = i * 2; //TODO - teha eraldi utilitymeetod
            ret.push(tmpPar);
		};
        	   
		return ret;
	}
};