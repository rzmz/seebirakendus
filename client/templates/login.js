Template.login.events({
   "submit #loginform": function(e){
       e.preventDefault();
       e.stopPropagation();
       var username = $('#username').val();
       var password = $('#password').val();
       if(username.length > 0 && password.length > 0) {
           Meteor.loginWithPassword(username, password, function(err){
               if(err){
                   setError("Sisse logimine ei õnnestunud...");
               } else {
                   setMessage("Edukalt sisse logitud vanakooli meetodiga");
               }
           });
       } else {
           setError("Sisesta kasutajanimi ja parool! (test: test)")
       }
   }
});
