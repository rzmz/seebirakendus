Template.reset_data.events({
   "click #reset_data_button": function(e){
       if(confirm("Kas oled kindel? Andmebaas lähtestatakse...")){
           Meteor.call("resetData", function(error, result){
               if(error){
                   setError("Operatsioon nurjus, vaata logi vms");
               } else {
                   setMessage("Andmed edukalt lähtestatud");
               }
           });
       }
       return false;
   }
});
