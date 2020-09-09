// cached selectors
const $goalImage = $('.goalImageContainer img');

// namespace object //
const myPuzzle = {};

// array of photo ids and their alt text, that will be randomly selected from, for Lorem Picsum
myPuzzle.photoIdArray = [
    {id: 1, alt: "Man using a laptop on a wooden slatted table, seen from over his left shoulder"},
    {id: 1047, alt: "View down a concrete alley in a city, sided by red bricked walls on overcast day"},
    {id: 1059, alt: "Wood slatted wall with photographs, a suit and paddle hung on it, all above a shelf with folded clothes"},
    {id: 163, alt: "outdoor wooden table with three chairs, a bench, and yellow flowers on the table"},
    {id: 183, alt: "a light blue Volkswagon van with white roof driving on road"},
    {id: 204, alt: "view down train tracks on a bridge leading to green hills in distance, on a sunny day"},
    {id: 211, alt: "a sail boat docked in harbour"},
    {id: 348, alt: "view of stairs and escalators in busy mall, many people are motion blurred"},
    {id: 392, alt: "the Golden Gate Bridge at dusk"},
    {id: 397, alt: "many colourful houses adorning steep oceanside cliffs, on a sunny day"},
    {id: 111, alt: "close up of an old car with a California 1938 license plate on front right bumper that says farmer boy, a white stone building in background"}
];

// set how many tiles wide our game will be
myPuzzle.tilesWide = 3;

// helper methods
myPuzzle.randomIndex = function(array) {
    const randomNum = Math.floor(Math.random() * array.length);
    return array[randomNum];
}

// call our randomIndex helper method on photoIdArray and set it to namespace property
myPuzzle.chosenPhoto = myPuzzle.randomIndex(myPuzzle.photoIdArray);

// add our chosen photo's id to the picsum url and save as property in namespace
myPuzzle.photoUrl = `https://picsum.photos/id/${myPuzzle.chosenPhoto.id}/600/600`;

// set the goal image and its alt text
myPuzzle.setGoalImage = function() {
    console.log('set goal image');
    $goalImage.attr('src',`${myPuzzle.photoUrl}`).attr('alt',`${myPuzzle.chosenPhoto.alt}`);
}

// create the game tiles, position them, and position their background photo
myPuzzle.buildGame = function() {
    console.log('build game');
    
}

/////////////////////////////////////////////////////////////////////
// define init method
myPuzzle.init = function() {
    console.log("initialized");
    myPuzzle.setGoalImage();
    myPuzzle.buildGame();
}

// document ready
$(document).ready(function() {
    myPuzzle.init();
});