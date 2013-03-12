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
   	phone = "";
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
    email = "";
  }  
  
  if(desc.length < 3) {
   	incorrect[no] = "3";
   	no++;
   	desc = "";
  }
   for(i=1;i<4;i++) {
    document.getElementById(i).style.color="#333333";
  }
  
  for(j=0;j<no;j++) {
    document.getElementById(incorrect[j]).style.color="#FF0000";
  }

  if(no > 0) {
   	document.getElementById("errors").innerHTML = "<span class=\"error\">Viga vormi täitsmisel. Palun täitkse kõik nõutud väljad.</span><br />";
  }
  else {
    document.getElementById("errors").innerHTML = "";
  }
  document.getElementById("inputPhone").value = phone;
  document.getElementById("inputEmail").value = email;
  document.getElementById("inputDescription").value = desc;
}

