// lib kaustast lisatakse failid esimesena
// siia on hea mingid default väärtustamised panna

if(Meteor.isClient){
    Session.setDefault("page_id", "esileht");
}