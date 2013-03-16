Template.erakonna_info.party = function() {

    var tmp = Parties.findOne({cid: Session.get("party_info_id")});

    //loome uue objekti, sest ei taha erakonna andmestikku otseselt muuta / sinna välju lisada hiljem
    if (tmp) {

        var party = {};
        party.name = tmp.name;
        party.email = tmp.email;

        return party;
    }
};
