// lib kaustast lisatakse failid esimesena
// siia on hea mingid default väärtused panna

if(Meteor.isClient){
    Session.setDefault("graafikud_tab", "candidates");
}