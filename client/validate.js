function validate() {
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
        Session.set("candidate_error", false);
  }
  document.getElementById("inputPhone").value = phone;
  document.getElementById("inputEmail").value = email;
  document.getElementById("inputDescription").value = desc;
}

