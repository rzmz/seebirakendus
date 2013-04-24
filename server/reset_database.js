Meteor.methods({
    resetByCollection: function(url, collection){
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
    },
    resetData: function(){
        Meteor.call('resetByCollection', Meteor.absoluteUrl() + "data/elections.json", Elections);
        Meteor.call('resetByCollection', Meteor.absoluteUrl() + "data/persons.json", Persons);
        Meteor.call('resetByCollection', Meteor.absoluteUrl() + "data/regions.json", Regions);
        Meteor.call('resetByCollection', Meteor.absoluteUrl() + "data/parties.json", Parties);
    }
});