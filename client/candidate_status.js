Template.kandidatuuri_staatus.regions = function() {
	var regions = Regions.find({}).fetch();
	if (regions) 
		{
		return regions;  
		}
}

Template.kandidatuuri_staatus.parties = function() {
	var parties = Parties.find({}).fetch();
	if (parties) return parties;
}

Template.kandidatuuri_staatus.events = {
    'submit #candidacy-apply-form': function(e){
        e.preventDefault();
        var regionError = false;
        var partyError = false;
        // validate
        $selected_region = $('#selected-region');
        $selected_party = $('#selected-party');
        if($selected_region.val() == ''){
            setError('Valimisringkond on valimata!', $('#select-region-label').parent());
            regionError = true;
        }
        if($selected_party.val() == ''){
            setError('Erakond on valimata!', $('#select-party-label').parent());
            partyError = true;
        }
        if($selected_region.val() == '' && $selected_party.val() == ''){
            setError('Valimisringkond ja erakond on valimata!');
            regionError = true;
            partyError = true;
        }
        if(!regionError){
            clearError($('#select-region-label').parent());            
        }
        if(!partyError){
            clearError($('#select-party-label').parent());
        }
        if(!regionError && !partyError){
            clearAllErrors();
            if(!Session.get("candidate_error")){
                var fullName = Session.get("candidate_name").split(" ");
                var newId = getPersons().length
                var properties = {
                    cid:newId+1,
                    firstName:fullName[0],
                    lastName:fullName[1],
                    regionId:parseInt($selected_region.val()),
                    votedCandidateId:0,
                    votes:0,
                    candidateStatus:1,
                    registrationNr:newId+1,
                    partyId:parseInt($selected_party.val()),
                    listPosition:0,
                    phone:Session.get("candidate_phone"),
                    email:Session.get("candidate_email"),
                    maritalStatus:parseInt(Session.get("candidate_marital")),
                    description:Session.get("candidate_desc")
                };
		Meteor.call('updateUserData', properties);
		setError("Taotlus esitatud! (Praegu näete oma nime kohe nimekirjas)");

/*
                var persons = getPersons();
                var found = false;
                if (persons) {
                    for (var i = 0; i < persons.length; i++) {
                        if(persons[i].firstName == properties.firstName && persons[i].lastName == properties.lastName) {
                            found = true;
                            break;
                        }
                    }
                }
                if(!found){
                    Persons.insert(properties);
                    setError("Taotlus esitatud! (Praegu näete oma nime kohe nimekirjas)");
                } else {
                    setError("Selline isik on juba olemas!");
                }*/

            } else {
                setError('Allpool olevad väljad on täitmata!');
            }
        }
    }
};


﻿function validate() {
  if(!document.getElementById) return;
    
  // get form variables
  var phone = document.getElementById("inputPhone").value;
  var email = document.getElementById("inputEmail").value;
  var desc = document.getElementById("inputDescription").value;
  var incorrect = new Array();
  var no = 0;
  //var pluspos=phone.indexOf("+");
  if(phone.length < 7 ) {
   	incorrect[no] = "1";
   	no++;
  } 
  /*
  else if ((pluspos != 0 && (phone.length < 11 || phone.length > 12) )) {
   	incorrect[no] = "1";
   	no++;
   	phone = "";    
  }
  */

  var atpos=email.indexOf("@");
  var dotpos=email.lastIndexOf(".");
  if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length || email.length < 6) {
    incorrect[no] = "2";
    no++;
  }  
  
  if(desc.length < 3) {
   	incorrect[no] = "3";
   	no++;
  }
   for(i=1;i<4;i++) {
    document.getElementById(i).style.color="#333333";
  }
  
  for(j=0;j<no;j++) {
    document.getElementById(incorrect[j]).style.color="#FF0000";
  }

  if(no > 0) {
   	document.getElementById("errors").innerHTML = "<span class=\"error\">Viga vormi täitmisel. Palun täitke kõik nõutud väljad.</span><br />";
        Session.set("candidate_error", true);
  } else {	
        document.getElementById("errors").innerHTML = "";
        Session.set("candidate_phone", phone);
        Session.set("candidate_email", email);
        Session.set("candidate_desc", desc);
        Session.set("candidate_name", $('#candidateName').val());
        Session.set("candidate_marital", desc);
        Session.set("candidate_error", false);
        Session.set("candidate_marital", $('#selected-marital').val());
  }
  document.getElementById("inputPhone").value = phone;
  document.getElementById("inputEmail").value = email;
  document.getElementById("inputDescription").value = desc;
}



Template.kandidatuuri_staatus.rendered = function(){	
    // todo: this is just a quick copypaste to show the proof 
    $('#regions-dropdown .dropdown-menu li a').click(function(){
        $('#regions-dropdown').find('button.dropdown-label').html($(this).html());
        $('#selected-region').val($(this).data('cid'));
    });
    $('#parties-dropdown .dropdown-menu li a').click(function(){
        $('#parties-dropdown').find('button.dropdown-label').html($(this).html());
        $('#selected-party').val($(this).data('cid'));
    });
}

Template.kandidaadi_vorm.rendered = function(){
    $('#marital-dropdown .dropdown-menu li a').click(function(evt){
        $('#marital-dropdown').find('button.dropdown-label').html($(this).html());
        $('#selected-marital').val(evt.target.id.split("m")[1]);
        Session.set("candidate_marital", $('#selected-marital').val());
    });
}

Template.kandidaadi_vorm.events({
    'click #saveForm-btn': function(e){	
	validate();
    }
});
