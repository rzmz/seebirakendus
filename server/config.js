// teeme ühe testuseri
if(!Meteor.users.findOne({username: "test"})){
    Accounts.createUser({username: "test", password: "test"});
}

// teeme nii et facebooki ja githubi loginid on automaatselt konfitud

Accounts.loginServiceConfiguration.remove({
    service: "github"
});

Accounts.loginServiceConfiguration.remove({
    service: "facebook"
});

var github_credentials = {};
var facebook_credentials = {};
if(Meteor.absoluteUrl().indexOf("localhost") > -1) {
    console.log("Setting up oauth providers for localhost");
    // localhost
    github_credentials = {
        service: "github",
        clientId: "4ec8ca30176f6d916775",
        secret: "f08e6a60f324b327e457aa2e6b3c7685ce61c68f"
    };
    facebook_credentials = {
        service: "facebook",
        appId: "549549415067367",
        secret: "41290445c7cf6a565e8d630b4a2d9590"
    };
} else if(Meteor.absoluteUrl().indexOf("seebirakendus.meteor.com") > -1) {
    // seebirakendus.meteor.com
    console.log("Setting up oauth providers for seebirakendus.meteor.com");
    github_credentials = {
        service: "github",
        clientId: "a5de3068bd137a35f27b",
        secret: "2603135f8299b7041cf5d878c3c594a83c2fffb0"
    };
    facebook_credentials = {
        service: "facebook",
        appId: "456705527732796",
        secret: "46387a6166324882c035102fc15af66b"
    };
} else {
    console.log("ERROR: Cannot setup any oauth providers, check your app config");
}
    
Accounts.loginServiceConfiguration.insert(github_credentials);
Accounts.loginServiceConfiguration.insert(facebook_credentials);
