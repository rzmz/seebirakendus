Template.kandidatuuri_staatus.regions = function() {
    return getRegions();
}

Template.kandidatuuri_staatus.parties = function() {
    return getParties();
}

Template.kandidatuuri_staatus.events = {
    'submit #candidacy-apply-form': function(e){
        e.preventDefault();
        var isError = false;
        // validate
        $selected_region = $('#selected-region');
        $selected_party = $('#selected-party');
        if($selected_region.val() == ''){
            setError('Valimisringkond on valimata!');
            isError = true;
        }
        if($selected_party.val() == ''){
            setError('Erakond on valimata!');
            isError = true;
        }
        if($selected_region.val() == '' && $selected_party.val() == ''){
            setError('Valimisringkond ja erakond on valimata!');
            isError = true;
        }
        if(!isError){
            clearError();
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