Template.kandidaadi_info.candidate = function() {

	var tmp = Persons.findOne({cid: Session.get("candidate_info_id")});

	if (tmp) {
		tmp.regionName = getRegionNameById(tmp.regionId);
		tmp.partyName = getPartyNameById(tmp.partyId);

		if (tmp.partyId === 0) {
		    tmp.noPartyLink = true; 
		}
        
		tmp.maritalStatus = getMaritalStringByState(tmp.maritalStatus);

		return tmp;
    }
};
