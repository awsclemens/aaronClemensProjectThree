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

// set all records;
myPuzzle.easyRecord = 50;
myPuzzle.normalRecord = 100;
myPuzzle.hardRecord = 200; 


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
    console.log(`tiles wide: ${myPuzzle.tilesWide}`);
    if (myPuzzle.tilesWide === 3) {
        myPuzzle.currentTileOrder = [7, 5, 8, 6, 2, 4, 1, 3, 9];
        if (myPuzzle.easyRecord < 50){
            $('.record span').text(myPuzzle.easyRecord).css("color","gold");
        } else {
            $('.record span').text(myPuzzle.easyRecord).css("color","#9a8c98");
        }
        return myPuzzle.currentTileOrder;
    } else if (myPuzzle.tilesWide === 4) {
        myPuzzle.currentTileOrder = [13, 5, 14, 9, 3, 10, 4, 7, 2, 15, 12, 6,11, 1, 8, 16];
        if (myPuzzle.normalRecord < 100){
            $('.record span').text(myPuzzle.normalRecord).css("color","gold");
        } else {
            $('.record span').text(myPuzzle.normalRecord).css("color","#9a8c98");
        }
        return myPuzzle.currentTileOrder;
    } else if (myPuzzle.tilesWide === 5) {
        myPuzzle.currentTileOrder = [18, 9, 20,11, 15, 21, 17, 10, 2, 24, 4, 23, 8, 19, 5, 22, 1, 7, 14, 12, 6, 16, 13, 3, 25];
        if (myPuzzle.hardRecord < 200){
            $('.record span').text(myPuzzle.hardRecord).css("color","gold");
        } else {
            $('.record span').text(myPuzzle.hardRecord).css("color","#9a8c98");
        }
        return myPuzzle.currentTileOrder;
    }
}

// helper methods
myPuzzle.randomIndex = function(array) {
    const randomNum = Math.floor(Math.random() * array.length);
    return array[randomNum];
}

// call our randomIndex helper method on photoIdArray and set it to namespace property
myPuzzle.choosePhoto = function() {
    myPuzzle.chosenPhoto = myPuzzle.randomIndex(myPuzzle.photoIdArray);
    // add our chosen photo's id to the picsum url and save as property in namespace
    myPuzzle.photoUrl = `https://picsum.photos/id/${myPuzzle.chosenPhoto.id}/600/600`;
}

// set the goal image and its alt text
myPuzzle.setGoalImage = function() {
    console.log('set goal image');
    $goalImage.attr('src',`${myPuzzle.photoUrl}`).attr('alt',`${myPuzzle.chosenPhoto.alt}`);
}

// get the current game board size
myPuzzle.getGameBoardSize = function() {
    myPuzzle.gameBoardSize = parseInt($gameBoard.css('width')) - 4;
    console.log(`game size = ${myPuzzle.gameBoardSize}px`);
    return myPuzzle.gameBoardSize;
}

// get the current tile size
myPuzzle.getTileSize = function() {
    myPuzzle.tileSize = (myPuzzle.gameBoardSize / myPuzzle.tilesWide);
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
        $gameBoard.append(listItem.addClass(tileClasses).val(i + 1).css({"background-image":`url(${myPuzzle.photoUrl}`,"background-size":`${tileBackgroundSize}`,"background-repeat":"no-repeat"}).text(currentTile));
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
        const tileBackgroundPosX = `${0 - (myPuzzle.tileSize)*((currentTile - 1) % myPuzzle.tilesWide)}px`;
        const tileBackgroundPosY = `${0 - (myPuzzle.tileSize)*(Math.floor((currentTile - 1) / myPuzzle.tilesWide))}px`;
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

// adjust properties of the empty tile 
myPuzzle.displayEmpty = function() {
    // select the last tile and add emptyTile class, and get rid of background image
    $(`.tile${myPuzzle.tilesWide**2}`).addClass("emptyTile").css("background-image","none");
    
}

// set which tiles are active
myPuzzle.setActiveTiles = function() {
    const $emptyVal = $('.emptyTile').val();
    console.log("set active tiles");
    // check and set top of empty tile
    if ($emptyVal > myPuzzle.tilesWide) {
        $(`.slot${$emptyVal - myPuzzle.tilesWide}`).addClass('active');
    }
    // check and set right of empty tile
    if ($emptyVal % myPuzzle.tilesWide != 0) {
        $(`.slot${$emptyVal + 1}`).addClass('active');
    }
    // check and set bottom of empty tile
    if ($emptyVal < myPuzzle.tilesWide**2 - (myPuzzle.tilesWide - 1)) {
        $(`.slot${$emptyVal + myPuzzle.tilesWide}`).addClass('active');
    }
    // check and set left of empty tile
    if ($emptyVal % myPuzzle.tilesWide != 1) {
        $(`.slot${$emptyVal - 1}`).addClass('active');
    }
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
    //set the active tiles
    myPuzzle.setActiveTiles();
}

myPuzzle.getCurrentTileOrder = function() {
    for (i = 1; i <= myPuzzle.currentTileOrder.length; i++) {
        const tileSlot = $(`.slot${i}`).text();
        console.log(tileSlot);
        myPuzzle.currentTileOrder[i - 1] = tileSlot;
        
    } 
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

// hidden achievement method
myPuzzle.hiddenAchievement = function() {
    if (myPuzzle.easyRecord < 50 && myPuzzle.normalRecord < 100 && myPuzzle.hardRecord < 200) {
        $('.achievement').css('display','initial');
    }
    $('.achievement').on('click', function() {
        $(this).css('display', 'none');
    })
} 

// check for a new record
myPuzzle.checkNewRecord = function() {
    const userMoveCount = parseInt($('.moveCount').text());
    if (myPuzzle.tilesWide === 3 && userMoveCount < myPuzzle.easyRecord) {
        myPuzzle.easyRecord = userMoveCount;
        $('.record span').text(myPuzzle.easyRecord).css("color","gold");
        alert(`Congratulations! It's a new record!
        ${myPuzzle.easyRecord} moves for: easy difficulty`);
        // message
    }
    if (myPuzzle.tilesWide === 4 && userMoveCount < myPuzzle.normalRecord) {
        myPuzzle.normalRecord = userMoveCount;
        $('.record span').text(myPuzzle.normalRecord).css("color","gold");
        alert(`Congratulations! It's a new record!
        ${myPuzzle.normalRecord} moves for: normal difficulty`);
        // message
    }
    if (myPuzzle.tilesWide === 5 && userMoveCount < myPuzzle.hardRecord) {
        myPuzzle.hardRecord = userMoveCount;
        $('.record span').text(myPuzzle.hardRecord).css("color","gold");
        alert(`Congratulations! It's a new record!
        ${myPuzzle.hardRecord} moves for: hard difficulty`);
        // message
    }
    // hidden achievement
    myPuzzle.hiddenAchievement();
}

// check win condition method
myPuzzle.checkWinCondition = function() {
    myPuzzle.checkWin = ""; 
    for (i = 1; i <= myPuzzle.tilesWide**2; i++) {
        const tileSlotText = $(`.slot${i}`).text();
        myPuzzle.checkWin = myPuzzle.checkWin + tileSlotText;
    }
    // if won, add message to results
    if (myPuzzle.checkWin === myPuzzle.winCondition) {
        const winMessage = $('<h2>').text('You Win!');
        $('.emptyTile').css("background-image",`url(${myPuzzle.photoUrl})`);
        $('.win').append(winMessage)
        console.log("you win!");
        myPuzzle.checkNewRecord();
    } else {
        // otherwise add new actives
        myPuzzle.setActiveTiles();
    }
}

myPuzzle.addMovesCount = function() {
    const moves = parseInt($('.moveCount').text());
    const updateMoves = moves + 1;
    $('.moveCount').text(updateMoves);
}

myPuzzle.moveTiles = function() {
    // on click of active tile,
    $('.gameBoard').on('click', '.active', function() {
        // add 1 to mouvesCount
        myPuzzle.addMovesCount();
        // save position and value of clicked active tile
        const clickedTileTop = $(this).css("top");
        const clickedTileLeft = $(this).css("left");
        const clickedTileVal = $(this).val();
        // save position and value of empty tile
        const emptyTileTop = $('.emptyTile').css("top");
        const emptyTileLeft = $('.emptyTile').css("left");
        const emptyTileVal = $('.emptyTile').val();
        // swap positions, value and slots
        $(this).removeClass(`slot${clickedTileVal}`).addClass(`slot${emptyTileVal}`).css({'top':`${emptyTileTop}`,'left':`${emptyTileLeft}`}).val(emptyTileVal);
        $('.emptyTile').removeClass(`slot${emptyTileVal}`).addClass(`slot${clickedTileVal}`).css({'top':`${clickedTileTop}`,'left':`${clickedTileLeft}`}).val(clickedTileVal);
        // remove all actives
        $('li').removeClass('active');
        // check win condition
        myPuzzle.checkWinCondition()
        
    });
}

myPuzzle.loadGame = function () {
    myPuzzle.createWinCondition();
    myPuzzle.choosePhoto();
    myPuzzle.setGoalImage();
    myPuzzle.setCurrentTileOrder();
    myPuzzle.buildGame();
}

myPuzzle.resetGame = function() {
    $('form').on('change', function() {
        const userChoice = $(this).find(':checked');
        console.log(userChoice);
        myPuzzle.tilesWide = parseInt(userChoice.val());
        $('.gameBoard').empty();
        $('.win').empty();
        $('.moveCount').text(0);
        myPuzzle.winCondition="";
        myPuzzle.loadGame();
        userChoice.prop('checked',false);
    });
}

myPuzzle.slidingMenu = function() {
    $('.slidingMenu').on('click', function() {
        if ($('form').css("left") === "0px") {
            $('form').css("left","-100%");
        } else {
            $('form').css("left","0px");
        }
    })
}

/////////////////////////////////////////////////////////////////////
// define init method
myPuzzle.init = function() {
    console.log("initialized");
    myPuzzle.loadGame();
    myPuzzle.resetGame();
    myPuzzle.slidingMenu();
    myPuzzle.moveTiles();
    myPuzzle.windowResize();
}

// document ready
$(document).ready(function() {
    myPuzzle.init();
});