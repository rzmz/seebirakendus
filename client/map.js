loadMapScript = function() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (Meteor.absoluteUrl().indexOf("localhost") === -1) {
        script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBa-Tfefz_ZhLbBr9cwALMNFJ3e6rjdpO4&sensor=true&callback=initializeMap";
    } else {
        script.src = "http://maps.googleapis.com/maps/api/js?sensor=true&callback=initializeMap";
    }
    document.body.appendChild(script);
}

initializeMap = function() {
    var mapStyle = [
       {
         featureType: "administrative",
         elementType: "labels",
         stylers: [
           { visibility: "off" }
         ]
       },{
         featureType: "poi",
         elementType: "labels",
         stylers: [
           { visibility: "off" }
         ]
       },{
         featureType: "water",
         elementType: "labels",
         stylers: [
           { visibility: "off" }
         ]
       },{
         featureType: "road",
         elementType: "labels",
         stylers: [
           { visibility: "off" }
         ]
       }
     ];
    var mapOptions = {
        zoom: 7,
        center: new google.maps.LatLng(58.666667, 25.65),
        mapTypeId: 'mapStyle',
        streetViewControl: false,
        scaleControl: false,
        panControl: false,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        draggable: false,
        disableDoubleClickZoom: true
    }
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    
    //To change back the ROADMAP, delete the next line and in mapOtions replace "mapTypeId" with google.maps.MapTypeId.ROADMAP
    map.mapTypes.set('mapStyle', new google.maps.StyledMapType(mapStyle, { name: 'Stiilne' }));
    
    //Actually will not need this, got function in utils.js ( getRegionNameById(REGION.CID) )
    var regionLabels = [
        "Tallinna Haabersti, Põhja-Tallinna ja Kristiine linnaosa",
        "Tallinna Kesklinna, Lasnamäe ja Pirita linnaosa",
        "Tallinna Mustamäe ja Nõmme linnaosa",
        "Harju- ja Raplamaa",
        "Hiiu-, Lääne- ja Saaremaa",
        "Lääne-Virumaa",
        "Ida-Virumaa",
        "Järva- ja Viljandimaa",
        "Tartu linn",
        "Jõgeva- ja Tartumaa",
        "Võru-, Valga- ja Põlvamaa",
        "Pärnumaa"
    ];
    
    var regionPolys = [[
        new google.maps.LatLng(59.460082,24.55719),
        new google.maps.LatLng(59.404559,24.564056),
        new google.maps.LatLng(59.417138,24.711685),
        new google.maps.LatLng(59.477523,24.723358)
    ], [
        new google.maps.LatLng(59.417138,24.711685),
        new google.maps.LatLng(59.477523,24.723358),
        new google.maps.LatLng(59.567028,24.801636),
        new google.maps.LatLng(59.489726,24.993896),
        new google.maps.LatLng(59.401763,24.976044)
    ], [
        new google.maps.LatLng(59.404559,24.564056),
        new google.maps.LatLng(59.417138,24.711685),
        new google.maps.LatLng(59.369593,24.827728),
        new google.maps.LatLng(59.325484,24.599762)
    ], [
        new google.maps.LatLng(59.274302,25.9552),
        new google.maps.LatLng(59.25465,25.499268),
        new google.maps.LatLng(58.986821,25.32074),
        new google.maps.LatLng(58.745407,25.213623),
        new google.maps.LatLng(58.708336,24.208374),
        new google.maps.LatLng(59.009456,24.230347),
        new google.maps.LatLng(59.240605,23.692017),
        new google.maps.LatLng(59.589975,24.488525),
        new google.maps.LatLng(59.687154,25.834351)
    ], [
        new google.maps.LatLng(58.708336,24.208374),
        new google.maps.LatLng(59.009456,24.230347),
        new google.maps.LatLng(59.240605,23.692017),
        new google.maps.LatLng(59.105488,22.62085),
        new google.maps.LatLng(58.935839,22.016602),
        new google.maps.LatLng(58.436233,21.763916),
        new google.maps.LatLng(57.885657,22.049561),
        new google.maps.LatLng(58.51952,23.648071)
    ], [
        new google.maps.LatLng(59.687154,25.834351),
        new google.maps.LatLng(59.531533,26.740723),
        new google.maps.LatLng(59.223745,26.905518),
        new google.maps.LatLng(58.952841,26.729736),
        new google.maps.LatLng(58.881942,26.174927),
        new google.maps.LatLng(59.06033,25.922241),
        new google.maps.LatLng(59.159036,25.999146),
        new google.maps.LatLng(59.25465,25.499268),
        new google.maps.LatLng(59.274302,25.9552)
    ], [
        new google.maps.LatLng(59.531533,26.740723),
        new google.maps.LatLng(59.478569,28.015137),
        new google.maps.LatLng(59.366794,28.223877),
        new google.maps.LatLng(59.25465,27.954712),
        new google.maps.LatLng(58.97833,27.745972),
        new google.maps.LatLng(58.776744,27.355957),
        new google.maps.LatLng(58.952841,26.729736),
        new google.maps.LatLng(59.223745,26.905518)
    ], [
        new google.maps.LatLng(59.25465,25.499268),
        new google.maps.LatLng(59.159036,25.999146),
        new google.maps.LatLng(59.06033,25.922241),
        new google.maps.LatLng(58.881942,26.174927),
        new google.maps.LatLng(58.685504,25.773926),
        new google.maps.LatLng(58.606903,25.776672),
        new google.maps.LatLng(58.472157,26.143341),
        new google.maps.LatLng(58.385878,26.130981),
        new google.maps.LatLng(58.119243,26.070557),
        new google.maps.LatLng(58.099654,25.933228),
        new google.maps.LatLng(58.140271,25.870056),
        new google.maps.LatLng(57.949845,25.587158),
        new google.maps.LatLng(58.047365,25.046082),
        new google.maps.LatLng(58.254618,25.265808),
        new google.maps.LatLng(58.335451,24.988403),
        new google.maps.LatLng(58.619777,25.263062),
        new google.maps.LatLng(58.745407,25.213623),
        new google.maps.LatLng(58.986821,25.32074)
    ], [
        new google.maps.LatLng(58.395595,26.636353),
        new google.maps.LatLng(58.427246,26.751709),
        new google.maps.LatLng(58.347704,26.814194),
        new google.maps.LatLng(58.305881,26.687164)
    ], [
        new google.maps.LatLng(58.776744,27.355957),
        new google.maps.LatLng(58.190976,27.537231),
        new google.maps.LatLng(58.219918,27.070313),
        new google.maps.LatLng(58.121419,26.608887),
        new google.maps.LatLng(58.119243,26.070557),
        new google.maps.LatLng(58.385878,26.130981),
        new google.maps.LatLng(58.472157,26.143341),
        new google.maps.LatLng(58.606903,25.776672),
        new google.maps.LatLng(58.685504,25.773926),
        new google.maps.LatLng(58.881942,26.174927),
        new google.maps.LatLng(58.952841,26.729736)
    ], [
        new google.maps.LatLng(58.190976,27.537231),
        new google.maps.LatLng(58.219918,27.070313),
        new google.maps.LatLng(58.121419,26.608887),
        new google.maps.LatLng(58.119243,26.070557),
        new google.maps.LatLng(58.099654,25.933228),
        new google.maps.LatLng(58.140271,25.870056),
        new google.maps.LatLng(57.949845,25.587158),
        new google.maps.LatLng(57.509922,26.531982),
        new google.maps.LatLng(57.615992,26.916504),
        new google.maps.LatLng(57.524672,27.344971),
        new google.maps.LatLng(57.815504,27.57019),
        new google.maps.LatLng(57.841827,27.822876)
    ], [
        new google.maps.LatLng(57.850598,24.301758),
        new google.maps.LatLng(58.047365,25.046082),
        new google.maps.LatLng(58.254618,25.265808),
        new google.maps.LatLng(58.335451,24.988403),
        new google.maps.LatLng(58.619777,25.263062),
        new google.maps.LatLng(58.745407,25.213623),
        new google.maps.LatLng(58.708336,24.208374),
        new google.maps.LatLng(58.51952,23.648071)
    ]];
    
    var partyColors = ["#ffcc00", "#CD853F","#fb4520","#fb207d","#FF0000","#7120fb","#2051fb","#20d5fb","#008B00","#26fb20","#a9fb20"];
    
    var leaderDiv = document.createElement('DIV');
    var leader = new Leader(leaderDiv, map, -1, -1);
    leaderDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(leaderDiv);
    
    var PercentLabels = [];
    
    for(var i = regionPolys.length ; i != 0 ; i-- ){
        var leaderStuff = getLeaderIdInRegion(i);
        leaderInRegion = leaderStuff[0];
        votesPercentage = ((leaderStuff[1]/getVotesByRegionId(i))*100).toFixed(1);
        var regionPoly = new google.maps.Polygon({
            paths: regionPolys[i-1],
            strokeColor: partyColors[leaderInRegion-1],
            strokeOpacity: 1.0,
            strokeWeight: 2,
            fillColor: partyColors[leaderInRegion-1],
            fillOpacity: 0.2,
            id: i,
            map: map
        });
        console.log("In region " + regionLabels[i-1] + " the leader is " + getPartyNameById(leaderInRegion) + ", with " + votesPercentage + " %");
        

        google.maps.event.addListener(regionPoly, "mouseover", function (event) { 
            this.setOptions({ 
                fillColor: partyColors[getLeaderIdInRegion(this.id)[0]-1], 
                fillOpacity: 0.8
            });
            leader = new Leader(leaderDiv, map, getLeaderIdInRegion(this.id)[0], this.id, getLeaderIdInRegion(this.id)[1]);
        });
        google.maps.event.addListener(regionPoly, "mouseout", function(event) { 
            this.setOptions({ 
                fillOpacity: 0.2 
            }); 
            leader = new Leader(leaderDiv, map, -1, -1, -1);
        });
    }
    

    
    var legendDiv = document.createElement('DIV');
    var legend = new Legend(legendDiv, map, partyColors);
    legendDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendDiv);
    
    //We currently do not need this function, but perhaps in the future for tooltips or markers
    function polygonCenter(poly) {
        var lowx,
            highx,
            lowy,
            highy,
            lats = [],
            lngs = [],
            vertices = poly.getPath();

        for(var i=0; i<vertices.length; i++) {
            lngs.push(vertices.getAt(i).lng());
            lats.push(vertices.getAt(i).lat());
        }

        lats.sort();
        lngs.sort();
        lowx = lats[0];
        highx = lats[vertices.length - 1];
        lowy = lngs[0];
        highy = lngs[vertices.length - 1];
        center_x = lowx + ((highx-lowx) / 2);
        center_y = lowy + ((highy - lowy) / 2);
        return (new google.maps.LatLng(center_x, center_y));
    }
}

function Legend(controlDiv, map, partyColors) {
    // Set CSS styles for the DIV containing the legend
    // Setting padding to 5 px will offset the control
    // from the edge of the map
    controlDiv.style.padding = '5px';

    // Set CSS for the control border
    var controlUI = document.createElement('DIV');
    controlUI.style.backgroundColor = 'white';
    controlUI.style.borderStyle = 'solid';
    controlUI.style.borderWidth = '1px';
    controlUI.title = 'Legend';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control text
    var controlText = document.createElement('DIV');
    controlText.style.fontFamily = 'Arial,sans-serif';
    controlText.style.fontSize = '12px';
    controlText.style.paddingLeft = '4px';
    controlText.style.paddingRight = '4px';


    var legendText = '<small><br />';
    var parties = getParties();
    for (var i = 0 ; i < parties.length ; i++) {
        var colorBox = '<p><span style="background-color:' + 
            partyColors[i] + ';width:10px;height:10px;">&emsp;&emsp;</span>&emsp;' + 
            parties[i].name + '</p>';
        legendText += colorBox;
    }
    legendText += '</small>'
    controlText.innerHTML = legendText;
    controlUI.appendChild(controlText);
}

function Leader(leaderDiv, map, leaderID, regionID, leadAmount) {
    // Set CSS styles for the DIV containing the legend
    // Setting padding to 5 px will offset the control
    // from the edge of the map
    while (leaderDiv.hasChildNodes()) {
        leaderDiv.removeChild(leaderDiv.lastChild);
    }
    
    leaderDiv.style.padding = '5px';

    // Set CSS for the control border
    var leaderUI = document.createElement('DIV');
    leaderUI.style.backgroundColor = 'white';
    leaderUI.style.borderStyle = 'solid';
    leaderUI.style.borderWidth = '1px';
    leaderUI.title = 'Legend';
    leaderDiv.appendChild(leaderUI);

    // Set CSS for the control text
    var leaderText = document.createElement('DIV');
    leaderText.style.fontFamily = 'Arial,sans-serif';
    leaderText.style.fontSize = '12px';
    leaderText.style.paddingLeft = '4px';
    leaderText.style.paddingRight = '4px';

    var showText = "";
    if (leaderID > -1 && regionID > -1 && leadAmount > -1) {
        //showText = '<small>';
        showText += "Piirkond: " + getRegionNameById(regionID) + "<br />";
        showText += "Liider: " + getPartyNameById(leaderID) + "<br />";
        showText += "Hetketulemus: " + ((leadAmount/getVotesByRegionId(regionID))*100).toFixed(1) + " %";
        //showText += '</small>'
    }
    leaderText.innerHTML = showText;
    leaderUI.appendChild(leaderText);
}

