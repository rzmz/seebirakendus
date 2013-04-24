Template.graafikud.events({
    "click #graphs_type button": function(e){
        $(e.currentTarget).parent().find('button').removeClass("active");
        $(e.currentTarget).addClass("active");
        Session.set("graafikud_tab", $(e.currentTarget).data("type"));
    }
});

Template.graafikud.showParties = function(){
    return Session.get("graafikud_tab") == "parties";
}

Template.graafikud.parties = function () {
    if (partiesReady && regionsReady && personsReady) {
	    var parties = getParties();	
	    if (parties) {
		    var ret = [];
		var sumCandidates = 0;
		
    		for (var i = 0; i < parties.length; i++) {
    		    var tmpPar = {};
    		    tmpPar.cid = parties[i].cid;
		    tmpPar.votes = getVotesByPartyId(parties[i].cid);
		    var candidatesInParty = getCandidatesByPartyId(parties[i].cid);
    		    tmpPar.name = parties[i].name + "\n(" + candidatesInParty + " / " + tmpPar.votes + ")";
    		    if (parties[i].cid == 0) tmpPar.noPartyLink = true; 
    		    
    		    ret.push(tmpPar);
            };

            Session.set("parties_loaded", "true");
            return ret;
		}
    }
};

var renderGraph = function(){
    var values = [],
        labels = [];

    $('table.dataTable').find("tr").each(function () {
        values.push(parseInt($("td", this).text(), 10));
        labels.push($("th", this).text());
    });

    $("table.dataTable").hide();
    Raphael("graphHolder", 700, 700).pieChart(350, 350, 200, values, labels, "#fff");
};

Template.graafikud.rendered = function() {
    $(this.find("button[data-type="+Session.get("graafikud_tab")+"]")).addClass("active");
    if(Session.get("parties_loaded", "true")){
        renderGraph();
        console.log("graafikud.rendered");
    }
};

Deps.autorun(function () {
    if(Session.get("parties_loaded", "true")){
        renderGraph();
        console.log("deps.autorun");
    }
});
