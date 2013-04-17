$(document).ready(function(){
   $('#loginform').submit(function(){
       var username = $('#username').val();
       var password = $('#password').val();
       if(username.length > 0 && password.length > 0) {
           Meteor.loginWithPassword(username, password, function(err){
               if(err){
                   //todo: error handling
               } else {
                   window.document.href = "/";
               }
           });
       }
   });
});
