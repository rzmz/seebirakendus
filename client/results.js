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

    if (partiesReady && regionsReady && personsReady) {
	    //TODO - teha mingi ühine meetod kandidaadiinfo saamiseks
            var selectedFilterValue = Session.get("selected_region");
	    var persons = getPersons();
	    if (persons) {
		var ret = [];

		for (var i = 0; i < persons.length; i++) {
                    if(selectedFilterValue >= 0) {
                        if(persons[i].regionId == selectedFilterValue){
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
                        }
                    } else {
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
                    }
                };
		
                    return ret;
	    }
    }
};

//TODO - panna sõltuma filtreerimisvalikutest..
Template.tulemused.parties = function () {
    //TODO - teha mingi ühine meetod kandidaadiinfo saamiseks

    if (partiesReady && regionsReady && personsReady) {
	    var parties = getParties();	
	    if (parties) {
		var ret = [];

		for (var i = 0; i < parties.length; i++) {
		    var tmpPar = {};
		    tmpPar.cid = parties[i].cid;
		    tmpPar.name = parties[i].name;
		    if (parties[i].cid == 0) tmpPar.noPartyLink = true; 
		    tmpPar.votes = getVotesByPartyId(parties[i].cid);
		    tmpPar.mandates = getMandatesByPartyId(parties[i].cid);
		    ret.push(tmpPar);
			};
			   
			return ret;
		}
     }
};

Template.tulemused.rendered = function() {
    Session.setDefault('results_type', "candidates");
    
    $("#results_type").find('button').click(function(){
        Session.set('results_type', $(this).data('type'));
    });

    $('#results_type').find("button[data-type='"+Session.get('results_type')+"']").addClass('active');
}

Template.tulemused.events({
    'change #region_select': function(evt) {
        var filterValue = evt.currentTarget.value;
        Session.set("selected_region", filterValue);
    }
});

Template.tulemused.show_candidates = function(){
    return (Session.get('results_type') == "candidates") ? true : false;
}
