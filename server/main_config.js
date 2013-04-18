if(Meteor.absoluteUrl().indexOf("localhost") === -1){
    // only in localhost for now
    return;
}

var read_from_http = function(url, collection){
    collection.remove({});
    Meteor.http.get(url, function(error, results){
        if(error){
            throw error;
        } else {
            var get_json_data = JSON.parse(results.content);
            console.log("count: " + get_json_data.length);
            _.each(get_json_data, function(data){
                collection.insert(data);
            });
            console.log("Inserted " + collection.find().count() + " " + typeof(collection) + " as sample data");            
        }
    });    
}

Meteor.startup(function(){
    var d = new Date();
    console.log("Last data reset: " + Meteor.settings.last_data_reset);
    if(!Meteor.settings.last_data_reset || Meteor.settings.last_data_reset < (d.getTime()+5000)){
        read_from_http(Meteor.absoluteUrl() + "data/elections.json", Elections);
        read_from_http(Meteor.absoluteUrl() + "data/persons.json", Persons);
        read_from_http(Meteor.absoluteUrl() + "data/regions.json", Regions);
        read_from_http(Meteor.absoluteUrl() + "data/parties.json", Parties);
        Meteor.settings.last_data_reset = d.getTime();
    }
});
