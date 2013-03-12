var nimekirjad_candidates;

var set_nimekirjad_candidates = function() {
    // TODO - teha mingi ühine meetod kandidaadiinfo saamiseks

    var page_size = 20;
    var persons = getPersons();
    if (persons) {
        nimekirjad_candidates = [];

        for (var i = 0; i < page_size; i++) {
            var tmpPer = {};
            tmpPer.cid = persons[i].cid;
            tmpPer.firstName = persons[i].firstName;
            tmpPer.lastName = persons[i].lastName;
            tmpPer.regionName = getRegionNameById(persons[i].regionId);
            tmpPer.partyName = getPartyNameById(persons[i].partyId);

            //filterdame nime järgi

            var searched_name = Session.get("nimekirjad_candidates_searched_name");
            if (searched_name) {
                //trim() võib olla..?
                var full_name = (tmpPer.firstName + " " + tmpPer.lastName)
                    .trim()
                    .toLowerCase();
                if (!full_name.indexOf(searched_name) == 0) continue;
            };

            nimekirjad_candidates.push(tmpPer);
        };
    }
};

var get_nimekirjad_candidates = function() {
    if (!nimekirjad_candidates) set_nimekirjad_candidates();
    if (nimekirjad_candidates) return nimekirjad_candidates;
};

Template.nimekirjad.candidates = function() {
    return get_nimekirjad_candidates();
};


Template.nimekirjad.events({
    'submit #search-form, click #search-btn': function(e) {
        e.preventDefault();        
        var button = document.getElementById('search-btn');
        var spinner = new Spinner(btn_spinner_opts).spin(button);
        
        //TODO - esimese asjana kustuta kõik väärtused..
        //ecmascript 5, oot mis brausereid me toetama pidimegi..?
        // var query = $('#searchfield').val().trim().toLowerCase();
        // Session.set("nimekirjad_candidates_searched_name", query);
        // set_nimekirjad_candidates();
        // console.log(query);        
    }
});
