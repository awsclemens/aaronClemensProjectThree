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

// the current order of tiles, starts scrambled
myPuzzle.setCurrentTileOrder = function() {
    if (myPuzzle.tilesWide === 3) {
        myPuzzle.currentTileOrder = [4, 8, 3, 1, 6, 7, 5, 2, 9];
    } else if (myPuzzle.tilesWide === 4) {
        myPuzzle.currentTileOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    } else if (myPuzzle.tilesWide === 5) {
        myPuzzle.currentTileOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    }
}
// myPuzzle.currentTileOrder = [7, 3, 8, 1, 2, 5, 6, 4, 9];

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

// create the tiles method
myPuzzle.createTiles = function()  {
    for (i = 0; i < myPuzzle.currentTileOrder.length; i++) {
        const listItem = $('<li>');
        const currentTile = myPuzzle.currentTileOrder[i]
        const tileClasses = `tile tile${currentTile} slot${i + 1}`
        const tileBackgroundSize = `${100 * myPuzzle.tilesWide}%`;
        $gameBoard.append(listItem.addClass(tileClasses).val(i + 1).css({"background-image":`url(${myPuzzle.photoUrl}`,"background-size":`${tileBackgroundSize}`}).text(currentTile));
    }
}

// set the tile size method
myPuzzle.setTileSize = function() {
    $('li').css({"height":`${myPuzzle.tileSize}`,"width":`${myPuzzle.tileSize}`})
}

// set the tile position method
myPuzzle.setTilePosition = function() {
    for (i = 1; i <= myPuzzle.currentTileOrder.length; i++){
        const tileTop = `${0 + (myPuzzle.tileSize)*(Math.floor((i - 1) / myPuzzle.tilesWide))}px`;
        const tileLeft = `${0 + (myPuzzle.tileSize)*((i - 1) % myPuzzle.tilesWide)}px`;
        $(`.slot${i}`).css({"top":`${tileTop}`,"left":`${tileLeft}`});
    }   
}

// set the tile background position method
myPuzzle.setTileBackgroundPos = function() {
    for (i = 0; i < myPuzzle.currentTileOrder.length; i++) {
        const currentTile = myPuzzle.currentTileOrder[i]
        const tileBackgroundPosX = `${0 - (myPuzzle.tileSize - 2)*((currentTile - 1) % myPuzzle.tilesWide)}px`;
        const tileBackgroundPosY = `${0 - (myPuzzle.tileSize - 2)*(Math.floor((currentTile - 1) / myPuzzle.tilesWide))}px`;
        $(`.slot${i + 1}`).css({"background-position":`${tileBackgroundPosX} ${tileBackgroundPosY}`});
    }
    console.log(`current tile order: ${myPuzzle.currentTileOrder}`);
}

// display tiles as li's in the ol with class gameBoard
myPuzzle.displayTiles = function() {
    // create the tiles
    myPuzzle.createTiles();
    myPuzzle.setTileSize();
    myPuzzle.setTilePosition();
    myPuzzle.setTileBackgroundPos();
}

myPuzzle.displayEmpty = function() {
    // select the last tile and add emptyTile class, and get rid of background image
    $(`.tile${myPuzzle.tilesWide**2}`).addClass("emptyTile").css("background-image","none");
    
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

myPuzzle.getCurrentTileOrder = function() {
    const currentTilesList = $('li').text();
    for (i = 0; i < currentTilesList.length; i++) {
        myPuzzle.currentTileOrder[i] = currentTilesList[i];
    } 
    console.log(`current tile order: ${myPuzzle.currentTileOrder}`);
}

// event listener on window for resize, update the tile sizes and positioning
myPuzzle.windowResize = function() {
    $(window).on('resize', function() {
        myPuzzle.getGameBoardSize();
        myPuzzle.getTileSize();
        myPuzzle.getCurrentTileOrder();
        myPuzzle.setTileSize();
        myPuzzle.setTilePosition();
        myPuzzle.setTileBackgroundPos();
    });
}

/////////////////////////////////////////////////////////////////////
// define init method
myPuzzle.init = function() {
    console.log("initialized");
    myPuzzle.createWinCondition();
    myPuzzle.setGoalImage();
    myPuzzle.setCurrentTileOrder();
    myPuzzle.buildGame();
    myPuzzle.windowResize();
    
}

// document ready
$(document).ready(function() {
    myPuzzle.init();
});