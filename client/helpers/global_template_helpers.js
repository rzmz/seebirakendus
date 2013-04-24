Handlebars.registerHelper("alert-message", function() {    
    return Session.get("message") || Session.get("error");
});

Handlebars.registerHelper("alert-class", function() {
    if(Session.get("message")){
        return "alert-info";
    } else if(Session.get("error")){
        return "alert-error";
    }
});
