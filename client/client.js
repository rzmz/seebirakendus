Elections = new Meteor.Collection("elections"); //valimiste üldandmed
Persons = new Meteor.Collection("persons"); //valimiste isikute andmed
Regions = new Meteor.Collection("regions"); //regioonide andmed
Parties = new Meteor.Collection("parties"); //erakondade andmed
Persons.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; } 
});

//teretulemast meteori antipatternite maailma
electionsReady = false;
personsReady = false;
regionsReady = false;
partiesReady = false;

Meteor.subscribe("elections");
Meteor.subscribe("persons");
Meteor.subscribe("regions");
Meteor.subscribe("parties");

Session.set("nimekirjad_current_search_first_name_enabled", true);
Session.set("nimekirjad_current_search_last_name_enabled", true);
Session.set("candidate_error", true);

//proovisin miljardit muud asja, see oli lõppkokkuvõttes parim saadaolev lahendus. tegelt ka.
//issand kui piinlik.	
//brauserid võiks ära otsustada mis encodingut nad kasutavad. jerks. 
function decode_HTML (str) {
	str = str.trim();
	str = str.replace("%20", " ");
	str = str.replace("%C3%A4", "ä");
	str = str.replace("%C3%84", "Ä");
	str = str.replace("%C3%B5", "õ");
	str = str.replace("%C3%95", "Õ");
	str = str.replace("%C3%B6", "ö");
	str = str.replace("%C3%96", "Ö");
	str = str.replace("%C3%BC", "ü");
	str = str.replace("%C3%9C", "Ü");

        return str; 
}

function encode_HTML (str) {
	str = str.trim();
	str = str.replace(" ", "%20");
	str = str.replace("ä", "%C3%A4");
	str = str.replace("Ä", "%C3%84");
	str = str.replace("õ", "%C3%B5");
	str = str.replace("Õ", "%C3%95");
	str = str.replace("ö", "%C3%B6");
	str = str.replace("Ö", "%C3%96");
	str = str.replace("ü", "%C3%BC");
	str = str.replace("Ü", "%C3%9C");
        return str; 
}
