Template.graafikud.rendered = function (){
    var parties = getParties();
    if(parties){
        var result = [];
        var values = [];
        var labels = [];
        var sumCandidates = 0;        
        parties.forEach(function(party) {
            var votes = getVotesByPartyId(party.cid);
            if(isNaN(votes)){
                votes = 0;
            }
            var candidates = getCandidatesByPartyId(party.cid);
            values.push(votes);
            labels.push(party.name + "\n(" + candidates + " / "+ votes + ")");
        });
        if(values.length > 0 && labels.length > 0){
            Raphael("graphHolder", "100%", "100%").pieChart(350, 350, 200, values, labels, "#fff");            
        } else {
            this.render;
        }
    }
}
