// cached selectors
const $goalImage = $('.goalImageContainer img');
const $gameBoard = $('.gameBoard');
const $record = $('.record span');

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
myPuzzle.easyRecord = 40; 
myPuzzle.normalRecord = 90; 
myPuzzle.hardRecord = 200; 
myPuzzle.userEasyRecord = myPuzzle.easyRecord;
myPuzzle.userNormalRecord = myPuzzle.normalRecord;
myPuzzle.userHardRecord = myPuzzle.hardRecord;

// set the win condition
myPuzzle.winCondition = "";
myPuzzle.checkWin = "";

// get random index of array method
myPuzzle.randomIndex = function(array) {
    const randomNum = Math.floor(Math.random() * array.length);
    return array[randomNum];
}

// load game method //
myPuzzle.loadGame = function () {
    myPuzzle.createWinCondition();
    myPuzzle.choosePhoto();
    myPuzzle.setGoalImage();
    myPuzzle.setInitialTileOrder();
    myPuzzle.buildGame();
}

    // create win condition method
    myPuzzle.createWinCondition = function() {
        for (i = 1; i <= myPuzzle.tilesWide**2; i++) {
            myPuzzle.winCondition = myPuzzle.winCondition + i;
        }
    }

    // choose photo method
    myPuzzle.choosePhoto = function() {
        // get random index of of photoIdArray and save 
        myPuzzle.chosenPhoto = myPuzzle.randomIndex(myPuzzle.photoIdArray);
        // add our chosen photo's id to the picsum url and save as property in namespace
        myPuzzle.photoUrl = `https://picsum.photos/id/${myPuzzle.chosenPhoto.id}/600/600`;
    }

    // set goal image method
    myPuzzle.setGoalImage = function() {
        $goalImage.attr('src',`${myPuzzle.photoUrl}`).attr('alt',`${myPuzzle.chosenPhoto.alt}`);
    }

    // set initial tile order method
    myPuzzle.setInitialTileOrder = function() {
        if (myPuzzle.tilesWide === 3) {
            myPuzzle.currentTileOrder = [7, 5, 8, 6, 2, 4, 1, 3, 9];
            // update the easy record
            myPuzzle.setUserRecord(myPuzzle.userEasyRecord, myPuzzle.easyRecord);
        } 
        if (myPuzzle.tilesWide === 4) {
            myPuzzle.currentTileOrder = [13, 5, 14, 9, 3, 10, 4, 7, 2, 15, 12, 6,11, 1, 8, 16];
            // update the normal record
            myPuzzle.setUserRecord(myPuzzle.userNormalRecord, myPuzzle.normalRecord);
        }
        if (myPuzzle.tilesWide === 5) {
            myPuzzle.currentTileOrder = [18, 9, 20,11, 15, 21, 17, 10, 2, 24, 4, 23, 8, 19, 5, 22, 1, 7, 14, 12, 6, 16, 13, 3, 25];
            // update the hard record
            myPuzzle.setUserRecord(myPuzzle.userHardRecord, myPuzzle.hardRecord);
        }
    }

    // set user record method
    myPuzzle.setUserRecord = function(userRecord, Record) {
        if (userRecord < Record){
            $record.text(userRecord).css("color","gold");
        } else {
            $record.text(userRecord).css("color","#9a8c98");
        }
    }

    // build game method
    myPuzzle.buildGame = function() {
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

        // get game board size method
        myPuzzle.getGameBoardSize = function() {
            myPuzzle.gameBoardSize = parseInt($gameBoard.css('width')) - 4;
            return myPuzzle.gameBoardSize;
        }

        // get tile size method
        myPuzzle.getTileSize = function() {
            myPuzzle.tileSize = (myPuzzle.gameBoardSize / myPuzzle.tilesWide);
            return myPuzzle.tileSize;
        }

        // display tiles method
        myPuzzle.displayTiles = function() {
            myPuzzle.createTiles();
            myPuzzle.setTileSize();
            myPuzzle.setTilePosition();
            myPuzzle.setTileBackgroundPos();
        }

            // create tiles method
            myPuzzle.createTiles = function()  {
                for (i = 0; i < myPuzzle.currentTileOrder.length; i++) {
                    const listItem = $('<li>');
                    const currentTile = myPuzzle.currentTileOrder[i]
                    const tileClasses = `tile tile${currentTile} slot${i + 1}`
                    const tileBackgroundSize = `${100 * myPuzzle.tilesWide}%`;
                    $gameBoard.append(listItem.addClass(tileClasses).val(i + 1).css({"background-image":`url(${myPuzzle.photoUrl}`,"background-size":`${tileBackgroundSize}`,"background-repeat":"no-repeat"}).text(currentTile));
                }
            }

            // set tile size method
            myPuzzle.setTileSize = function() {
                $('li').css({"height":`${myPuzzle.tileSize}`,"width":`${myPuzzle.tileSize}`})
            }

            // set tile position method
            myPuzzle.setTilePosition = function() {
                for (i = 1; i <= myPuzzle.currentTileOrder.length; i++){
                    // sets the tile position based on its slot number
                    const tileTop = `${0 + (myPuzzle.tileSize)*(Math.floor((i - 1) / myPuzzle.tilesWide))}px`;
                    const tileLeft = `${0 + (myPuzzle.tileSize)*((i - 1) % myPuzzle.tilesWide)}px`;
                    $(`.slot${i}`).css({"top":`${tileTop}`,"left":`${tileLeft}`});
                }   
            }

            // set tile background position method
            myPuzzle.setTileBackgroundPos = function() {
                for (i = 0; i < myPuzzle.currentTileOrder.length; i++) {
                    // sets the tile background position based on its tile order number
                    const currentTile = myPuzzle.currentTileOrder[i]
                    const tileBackgroundPosX = `${0 - (myPuzzle.tileSize)*((currentTile - 1) % myPuzzle.tilesWide)}px`;
                    const tileBackgroundPosY = `${0 - (myPuzzle.tileSize)*(Math.floor((currentTile - 1) / myPuzzle.tilesWide))}px`;
                    $(`.slot${i + 1}`).css({"background-position":`${tileBackgroundPosX} ${tileBackgroundPosY}`});
                }
            }

        // disply empty method 
        myPuzzle.displayEmpty = function() {
            // select the last tile and add emptyTile class, and get rid of background image
            $(`.tile${myPuzzle.tilesWide**2}`).addClass("emptyTile").css("background-image","none");
        }

        // set active tiles method
        myPuzzle.setActiveTiles = function() {
            const $emptyVal = parseInt($('.emptyTile').val());
            // check and set top of empty tile
            myPuzzle.checkTopTile($emptyVal);
            // check and set right of empty tile
            myPuzzle.checkRightTile($emptyVal); 
            // check and set bottom of empty tile
            myPuzzle.checkBottomTile($emptyVal);
            // check and set left of empty tile
            myPuzzle.checkLeftTile($emptyVal);
        }

            // check top tile (above empty) method
            myPuzzle.checkTopTile = function(empty) {
                if (empty > myPuzzle.tilesWide) {
                    $(`.slot${empty - myPuzzle.tilesWide}`).addClass('active');
                }
            }

            // check right tile (beside empty) method
            myPuzzle.checkRightTile = function(empty) {
                if (empty % myPuzzle.tilesWide != 0) {
                    $(`.slot${empty + 1}`).addClass('active');
                } 
            }

            // check bottom tile (below empty) method
            myPuzzle.checkBottomTile = function(empty) {
                if (empty < myPuzzle.tilesWide**2 - (myPuzzle.tilesWide - 1)) {
                    $(`.slot${empty + myPuzzle.tilesWide}`).addClass('active');
                }
            }

            // check left tile (beside empty) method
            myPuzzle.checkLeftTile = function(empty) {
                if (empty % myPuzzle.tilesWide != 1) {
                    $(`.slot${empty - 1}`).addClass('active');
                }
            }

// reset game method //
myPuzzle.resetGame = function() {
    $('form').on('change', function() {
        const userChoice = $(this).find(':checked');
        myPuzzle.tilesWide = parseInt(userChoice.val());
        $gameBoard.empty();
        $('.win').empty();
        $('.moveCount').text(0);
        myPuzzle.winCondition="";
        myPuzzle.loadGame();
        userChoice.prop('checked',false);
    });
}

// sliding menu method //
myPuzzle.slidingMenu = function() {
    $('.slidingMenu').on('click', function() {
        if ($('form').css("left") === "0px") {
            $('form').css("left","-100%");
        } else {
            $('form').css("left","0px");
        }
    })
}

// move tiles method //
myPuzzle.moveTiles = function() {
    // on click of active tile,
    $gameBoard.on('click', '.active', function() {
        // add 1 to movesCount
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
        // update current tile order
        myPuzzle.setCurrentTileOrder();
        // check win condition
        myPuzzle.checkWinCondition();
    });
}

    // add to moves count method
    myPuzzle.addMovesCount = function() {
        const moves = parseInt($('.moveCount').text());
        const updateMoves = moves + 1;
        $('.moveCount').text(updateMoves);
    }

    // set current tile order method
    myPuzzle.setCurrentTileOrder = function() {
        for (i = 1; i <= myPuzzle.currentTileOrder.length; i++) {
            const tileSlot = $(`.slot${i}`).text();
            myPuzzle.currentTileOrder[i - 1] = parseInt(tileSlot);
        } 
    }

    // check win condition method
    myPuzzle.checkWinCondition = function() {
        myPuzzle.checkWin = myPuzzle.currentTileOrder.join(''); 
        if (myPuzzle.checkWin === myPuzzle.winCondition) {
            const winMessage = $('<h2>').text('You Win!');
            $('.emptyTile').css("background-image",`url(${myPuzzle.photoUrl})`);
            $('.win').append(winMessage);
            $('li').css('border','none');
            myPuzzle.checkNewRecord();
        } else {
        // otherwise add new actives
        myPuzzle.setActiveTiles();
        }
    }   

        // check for a new record
        myPuzzle.checkNewRecord = function() {
            const userMoveCount = parseInt($('.moveCount').text());
            if (myPuzzle.tilesWide === 3 && userMoveCount < myPuzzle.easyRecord) {
                myPuzzle.userEasyRecord = userMoveCount;
                $record.text(myPuzzle.userEasyRecord).css("color","gold");
                alert(`Congratulations! It's a new record!
                ${myPuzzle.userEasyRecord} moves for: easy difficulty`);
            }
            if (myPuzzle.tilesWide === 4 && userMoveCount < myPuzzle.normalRecord) {
                myPuzzle.userNormalRecord = userMoveCount;
                $record.text(myPuzzle.userNormalRecord).css("color","gold");
                alert(`Congratulations! It's a new record!
                ${myPuzzle.userNormalRecord} moves for: normal difficulty`);
            }
            if (myPuzzle.tilesWide === 5 && userMoveCount < myPuzzle.hardRecord) {
                myPuzzle.userHardRecord = userMoveCount;
                $record.text(myPuzzle.userHardRecord).css("color","gold");
                alert(`Congratulations! It's a new record!
                ${myPuzzle.userHardRecord} moves for: hard difficulty`);
            }
            // hidden achievement
            myPuzzle.hiddenAchievement();
        }

            // hidden achievement method
            myPuzzle.hiddenAchievement = function() {
                if (myPuzzle.userEasyRecord < myPuzzle.easyRecord && myPuzzle.userNormalRecord < myPuzzle.normalRecord && myPuzzle.userHardRecord < myPuzzle.hardRecord) {
                    $('.achievement').css('display','initial');
                }
                $('.achievement').on('click', function() {
                    $(this).css('display', 'none');
                })
            }

// window resize method //
myPuzzle.windowResize = function() {
    // event listener on window for resize, update the tile sizes and positioning 
    $(window).on('resize', function() {
        myPuzzle.getGameBoardSize();
        myPuzzle.getTileSize();
        myPuzzle.setTileSize();
        myPuzzle.setTilePosition();
        myPuzzle.setTileBackgroundPos();
    });
}

// init method
myPuzzle.init = function() {
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