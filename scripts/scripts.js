// cached selectors
const $goalImage = $('.goalImageContainer img');

// namespace object //
const photoPuzzle = {};

photoPuzzle.photoIdArray = [
    {id: 1, alt: "Man using a laptop on a wooden slatted table, seen from over his left shoulder"},
    {id: 1047, alt: "View down a concrete alley in a city, sided by red bricked walls on overcast day"},
    {id: 1059, alt: "Wood slatted wall with photographs, a suit and paddle hung on it, all above a shelf with folded clothes"},
    {id: 163, alt: "outdoor wooden table with three chairs, a bench, and yellow flowers on the table"},
    {id: 183, alt: "a light blue Volkswagon van with white roof driving on road"},
    {id: 204, alt: "view down train tracks on a bridge leading to green hills in distance, on a sunny day"},
    {id: 211, alt: "a sail boat docked in harbour"},
    {id: 348, alt: "view of stairs and escalators in busy mall, many people are motion blurred"},
    {id: 392, alt: "the Golden Gate Bridge at dusk"},
    {id: 397, alt: "many colourful houses adorning steep oceanside cliffs, on a sunny day"}
];
    
// helper methods
photoPuzzle.randomIndex = function(array) {
    const randomNum = Math.floor(Math.random() * array.length);
    return array[randomNum];
}

// call our randomIndex helper method and save it to a variable
const chosenPhoto = photoPuzzle.randomIndex(photoPuzzle.photoIdArray);

// add our chosen photo's id to the picsum url and save as propery in namespace
photoPuzzle.photoUrl = `https://picsum.photos/id/${chosenPhoto.id}/480/480`

// set the goal image and its alt text
photoPuzzle.setGoalImage = function() {
    $goalImage.attr('src',`${photoPuzzle.photoUrl}`).attr('alt',`${chosenPhoto.alt}`);
}

/////////////////////////////////////////////////////////////////////
// define init method
photoPuzzle.init = function() {
    console.log("initialized");
    photoPuzzle.setGoalImage();

}

// document ready
$(document).ready(function() {
    photoPuzzle.init();
});