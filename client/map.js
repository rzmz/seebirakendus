var initialize = function() {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(58.666667, 25.65),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeId: 'roadmap',
        streetViewControl: false,
        panControl: false,
        mapTypeControl: false
    }
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
}

var loadMapScript = function() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (Meteor.absoluteUrl().indexOf("localhost") === -1) {
        script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBa-Tfefz_ZhLbBr9cwALMNFJ3e6rjdpO4&sensor=true&callback=initialize";
    } else {
        script.src = "http://maps.googleapis.com/maps/api/js?sensor=true&callback=initialize";
    }
    document.body.appendChild(script);
}
