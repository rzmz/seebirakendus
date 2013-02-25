if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to vali.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      alert("You have successfully clicked the button!");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
