//andmebaasist arrayde saamise funktsioonid
var getPersons = function() {
    if (personsReady) {
	    var cursor = Persons.find({});
	    if (cursor) {
		var data = cursor.fetch();
		return data;		
		}
    }
};


var getRegions = function() {
    if (regionsReady) {
	    var cursor = Regions.find({});
	    if (cursor) {
		var data = cursor.fetch();
		return data;		
		}
    }
};

var getParties = function() {
    if (partiesReady) {
	    var cursor = Parties.find({});
	    if (cursor) {
		var data = cursor.fetch();
		return data;		
		}    
    }
};

//utilityfunktsioonid
var getRegionNameById = function(regionId) {
    var regions = getRegions();
    var regionName = "NO SUCH REGION!";
    
    for (var i = 0; i < regions.length; i++) {
        if (regions[i].cid == regionId) {
            regionName = regions[i].name;
        }
    }

    return regionName;
};

var getPartyNameById = function(partyId) {
    var parties = getParties();
    if (partyId == 0) return "Üksikkandidaat";
        var partyName = "POLE SELLIST ERAKONDA";
        
        for (var i = 0; i < parties.length; i++) {
            if (parties[i].cid == partyId) {
                partyName = parties[i].name;
        }
    }

    return partyName;
}

var getVotesByPartyId = function(partyId) {
	var persons = getPersons(); 
	
	var totalVotes = 0;

	for (var i = 0; i < persons.length; i++) {
		if (persons[i].partyId == partyId)
			totalVotes += persons[i].votes;
	}

	return totalVotes; 
}

//TODO - PLACEHOLDER!
var getMandatesByPartyId = function(partyId) {

	var votes = getVotesByPartyId(partyId);
	var mandates = Math.floor(votes / 400000 * 100 * 2.2); //wat
	return mandates;

}

//tagastab "abielus/vallaline" state väärtusest lähtuvalt
var getMaritalStringByState = function(state) {
	
	//igaks juhuks castime intiks
	state = parseInt(state);
	
	if (state == 0) return "Vallaline";
	else if (state == 1) return "Abielus";
	else return "N/A"; //wat
}

var btn_spinner_opts = {
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
    left: '50' // Left position relative to parent in px
};
