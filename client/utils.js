//andmebaasist arrayde saamise funktsioonid
getPersons = function() {
    return Persons.find({candidateStatus: 2});
};

getRegions = function() {
    return Regions.find({});
};

getParties = function() {
    return Parties.find({});
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
	var persons = getPersons(); 
	var selectedFilterValue = Session.get("selected_region");
	
        var totalVotes = 0;
        if(selectedFilterValue >= 0) {
            for (var i = 0; i < persons.length; i++) {
                    if (persons[i].partyId == partyId)
                        if(persons[i].regionId == selectedFilterValue){
                            totalVotes += persons[i].votes;
                        }
            }
        } else {
            for (var i = 0; i < persons.length; i++) {
                    if (persons[i].partyId == partyId)
                            totalVotes += persons[i].votes;
            }
        }

	return totalVotes; 
}
getCandidatesByPartyId = function(party) {
	var sumCandidates = 0;
	var persons = getPersons();
	for (var i = 0 ; i < persons.length ; i++) {
		if(persons[i].partyId == party)	{
			sumCandidates++;		
		}
	}
	return sumCandidates;
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
