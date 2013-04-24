//andmebaasist arrayde saamise funktsioonid
getPersons = function(options) {
    var options_hash = options || {};
    options_hash.candidateStatus = 2;
    return Persons.find(options_hash);
};

getRegions = function(options) {
    var options = options || {};
    return Regions.find(options);
};

getParties = function(options) {
    var options = options || {};
    var parties = Parties.find(options);
    var results = [];
    parties.forEach(function(party){
        party.votes = getVotesByPartyId(party.cid);
        party.mandates = getMandatesByPartyId(party.cid);
        results.push(party);
    });
    return results;
};

//utilityfunktsioonid
getRegionNameById = function(regionId) {
    var region = Regions.findOne({cid: regionId});
    return (region && region.name) || "...";
};

getPartyNameById = function(partyId) {
    var party = Parties.findOne({cid: partyId});
    return (party && party.name) || "üksikkandidaat";
}

getVotesByPartyId = function(partyId) {
	var selectedFilterValue = parseInt(Session.get("selected_region"));
	var options = {partyId: partyId};    
    var totalVotes = 0;
    if(!isNaN(selectedFilterValue) && selectedFilterValue > 0) {
        options.regionId = selectedFilterValue;
    }    
    var persons = getPersons(options);
    persons.forEach(function(person){
        totalVotes += person.votes;
    })
	return totalVotes;
}

getCandidatesByPartyId = function(partyId) {
	var persons = getPersons({partyId: partyId});
    return persons.count();
}

//TODO - PLACEHOLDER!
getMandatesByPartyId = function(partyId) {
    var votes = getVotesByPartyId(partyId);
    var mandates = Math.floor(votes / 400000 * 100 * 2.2); //wat
    return mandates;
}

//tagastab "abielus/vallaline" state väärtusest lähtuvalt
getMaritalStringByState = function(state) {
	
	//igaks juhuks castime intiks
	state = parseInt(state);
	
	if (state == 0) return "Vallaline";
	else if (state == 1) return "Abielus";
	else return "N/A"; //wat
}




btn_spinner_opts = {
    lines: 10, // The number of lines to draw
    length: 5, // The length of each line
    width: 2, // The line thickness
    radius: 4, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    color: '#000', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: '0' // Left position relative to parent in px
};
