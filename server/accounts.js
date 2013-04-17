// küsib githubist lisaks andmeid, sh. näiteks profiilipildi (mine vaata oma kandidatuuri lehele ;)
// facebooki jaoks oleks vaja midagi sarnast leiutada
Accounts.onCreateUser(function(options, user){
    if(user.services.github){
        var accessToken = user.services.github.accessToken,
            result,
            profile;
        
            result = Meteor.http.get("https://api.github.com/user", {
                params: {
                    access_token: accessToken
                }
            });
        
            if(result.error){
                throw result.error;
            }
        
            profile = _.pick(result.data,
                "name",
                "avatar_url",
                "email"
            );
        
    } else if(user.services.facebook){
        var accessToken = user.services.facebook.accessToken,
            result,
            profile;
            
            result = Meteor.http.get("https://graph.facebook.com/me", {
               params: {
                   access_token: accessToken
               } 
            });
            
            if(result.error){
                throw result.error;
            }
            
            profile = _.pick(result.data,
                "name",
                "email"                
            );
            
            profile.avatar_url = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
            
    } else if(user.username == "test"){
        var profile = {};
        profile.name = "Test User";
        profile.avatar_url = Meteor.absoluteUrl() + "images/mayor-quimby.jpeg";
    }
    
    user.profile = profile;
    return user;
});