setMessage = function(message, $element) {
    Session.set("message", message);
};

setError = function(message, $element) {
    if($element !== undefined){
        $element.addClass('error');        
    }
    Session.set("error", message);
};

clearError = function($element){
    $element.removeClass("error");
};

clearAllErrors = function(){
    $('#alert-messages').addClass('disabled');
};