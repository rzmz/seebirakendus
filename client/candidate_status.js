Template.kandidatuuri_staatus.regions = function() {
    return getRegions();
}

Template.kandidatuuri_staatus.parties = function() {
    return getParties();
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
                }
            } else {
                setError('Allpool olevad väljad on täitmata!');
            }
        }
    }
};

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