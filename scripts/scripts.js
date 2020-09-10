// cached selectors
const $goalImage = $('.goalImageContainer img');
const $gameBoard = $('.gameBoard');

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

// set how many tiles wide our game will be: WILL BE USER CHOICE IN FUTURE
myPuzzle.tilesWide = 3;

// the win condition
myPuzzle.winCondition =""

// fill in the win condition
myPuzzle.createWinCondition = function() {
    for (i = 1; i <= myPuzzle.tilesWide**2; i++) {
        myPuzzle.winCondition = myPuzzle.winCondition + i;
    }
    console.log(`Win condition: ${myPuzzle.winCondition}`);
}

// scramble order
myPuzzle.scrambleOrder = [7, 3, 8, 1, 2, 5, 6, 4, 9];

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

// get the current game board size
myPuzzle.getGameBoardSize = function() {
    myPuzzle.gameBoardSize = parseInt($gameBoard.css('width'));
    console.log(`game size = ${myPuzzle.gameBoardSize}px`);
    return myPuzzle.gameBoardSize;
}

// get the current tile size
myPuzzle.getTileSize = function() {
    myPuzzle.tileSize = myPuzzle.gameBoardSize / myPuzzle.tilesWide;
    console.log(`tiles will be this wide: ${myPuzzle.tileSize}px`);
    return myPuzzle.tileSize;
}

// display tiles as li's in the ol with class gameBoard
myPuzzle.displayTiles = function() {
    for (i = 1; i <= myPuzzle.tilesWide**2; i++) {
        // use the scramble order array to properly scramble the tiles
        const scrambleNum = myPuzzle.scrambleOrder[i - 1];
        // classes to add to the tiles
        const tileClasses = `tile tile${scrambleNum} slot${i}`;
        // top position offset relative to game board for each tile

        
        const tileTop = `${0 + (myPuzzle.tileSize)*(Math.floor((i - 1) / myPuzzle.tilesWide))}px`;
        // left position offset of each tile
        const tileLeft = `${0 + (myPuzzle.tileSize)*((i - 1) % myPuzzle.tilesWide)}px`;
        // scale the background image based on how many tiles wide the game is
        const tileBackgroundSize = `${100 * myPuzzle.tilesWide}%`;
        // X axis position of the tiles' background image (-2 to account for 1px white border)
        const tileBackgroundPosX = `${0 - (myPuzzle.tileSize - 2)*((scrambleNum - 1) % myPuzzle.tilesWide)}px`;
        // Y axis position of the tiles' background image (-2 to account for 1px white border)
        const tileBackgroundPosY = `${0 - (myPuzzle.tileSize - 2)*(Math.floor((scrambleNum - 1) / myPuzzle.tilesWide))}px`;
        // the list item to create each iteration
        const listItem = $('<li>').addClass(tileClasses).val(`${i}`).css({"height":`${myPuzzle.tileSize}`,"width":`${myPuzzle.tileSize}`,"top":`${tileTop}`,"left":`${tileLeft}`,"background-image":`url(${myPuzzle.photoUrl})`,"background-size":`${tileBackgroundSize}`,"background-position":`${tileBackgroundPosX} ${tileBackgroundPosY}`}).text(`${scrambleNum}`);
        // add and display tiles to the DOM
        $gameBoard.append(listItem);
    }
}

myPuzzle.displayEmpty = function() {
    // select the last tile and add emptyTile class, and get rid of background image
    $(`.tile${myPuzzle.tilesWide**2}`).addClass("emptyTile").css("background-image","none").empty();
    
}

// create the game tiles, position them, and position their background photo
myPuzzle.buildGame = function() {
    console.log('build game');
    // get the current width of the game board
    myPuzzle.getGameBoardSize();
    // divide game board width by how many tiles wide the game is to get tile size
    myPuzzle.getTileSize();
    // disply all needed tiles
    myPuzzle.displayTiles();
    // change last tile to empty
    myPuzzle.displayEmpty();
}

// event listener on window for resize, update the tile sizes and positioning
myPuzzle.windowResize = function() {
    $(window).on('resize', function() {
        myPuzzle.getGameBoardSize();
        myPuzzle.getTileSize();
        // set new height and width
        // set new positions
        // set new background positions, tricky with the scrambleNum being used
        
    });
}

/////////////////////////////////////////////////////////////////////
// define init method
myPuzzle.init = function() {
    console.log("initialized");
    myPuzzle.createWinCondition();
    myPuzzle.setGoalImage();
    myPuzzle.buildGame();
    myPuzzle.windowResize();
    
}

// document ready
$(document).ready(function() {
    myPuzzle.init();
});