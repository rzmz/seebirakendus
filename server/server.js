if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log("The Application has started...");
    //väike DBtest
    //Test = new Meteor.Collection("election2013");
    //var tmp = Test.findOne({id: 1});
    //console.log(tmp.name);
  });
}

//meteor remove autopublish

/*
Test = new Meteor.Collection("election2013");
var tmp = Test.findOne({id : 1});
console.log(tmp.name);

Meteor.publish("test", function() {
return tmp.name;
});
*/
