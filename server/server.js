if (Meteor.isServer) {

  ElectionData = new Meteor.Collection("election2013"); //2013 andmed

  Meteor.publish("election2013", function() {	
	return ElectionData.find({cid : 1});
  });

  Meteor.startup(function () {
    console.log("The Application has started...");
  });
}

