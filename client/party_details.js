Template.erakonna_info.party = function() {

    var parties = getParties();

    if (parties) {

        var partyArray = parties.filter(function(el) {
            return el.cid == Session.get("party_info_id");
        });
        //TODO - siia kontroll, kas üldse keegi leiti!
        //KUI EI, NÄIDATA MINGIT LEHTE ET "SELLIST ERAKONDA EI LEIDU"

        var party = {};
        party.name = partyArray[0].name;
        party.email = partyArray[0].email;

        return party;
    }
};
