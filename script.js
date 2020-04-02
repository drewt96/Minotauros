//const Minotauros = require('./Minotauros');

//let mino = new Minotauros();

import {getToken} from './Minotauros';

// letiables used to keep track of where each player currently is located
let playerOne = document.getElementById("0");
let playerTwo = document.getElementById("0");

// Used to keep track of the angles of each piece
let p1 = ["0", "0", "0"];
let p2 = ["0", "0", "0"];

// Used to keep track of if the player pieces have been registered yet or not
let p1Registered = false;
let p2Registered = false;

// Keeps track of player turn
let turn = "1";

// Used to keep track of the space a player needs to reach when they roll the die
let spaceToReach = "0";

// Used to keep track of if the player has rolled the die during their turn yet or not
let hasRolled = false;

// Used to roll the dice
function rollDice(){

    alert("The token is " + getToken());
    // If the player has not already rolled, allow them to do so
    if(!hasRolled){

        // Used to make sure the same number can't be rolled twice in a row
        let newNum = document.getElementById("diceSpace").innerHTML;
        let oldNum = document.getElementById("diceSpace").innerHTML;

        // Loop until a new number is generated
        while(oldNum == newNum){
            newNum = Math.floor((Math.random() * 6) + 1);
            document.getElementById("diceSpace").innerHTML = newNum;

            // Don't allow players to land on the same space as each other (no room to do so)
            if( ((newNum + parseInt(playerOne.id)) == parseInt(playerTwo.id)) || ((newNum + parseInt(playerTwo.id)) == parseInt(playerOne.id))){
                newNum = oldNum;
            }
        }

        // Check which player is rolling and set their new goal space
        if(turn == "1"){
            spaceToReach = parseInt(playerOne.id) + parseInt(newNum);
        } else{
            spaceToReach = parseInt(playerTwo.id) + parseInt(newNum);
        }

        // If the player makes a roll that results in reaching the end or past it, alert them that they won and end the game
        // Otherwise, highlight the space they need to get to and label it
        if(parseInt(spaceToReach) > 27){
            alert("Player " + turn + " wins!!!");
        } else{
            document.getElementById(spaceToReach).innerHTML = "Reach here";
            document.getElementById(spaceToReach).style.background = "green";
        }

        // The player has now rolled at this point
        hasRolled = true;
    }
    //checkMove();
}


// Used for on-click events for board spaces
function singleMove(theID){

    // Does not work if no moves have been made yet
    if(spaceToReach != "0"){

        // Player can't select a space if it's not the one they're supposed to go to or if they haven't rolled yet
        if(theID != spaceToReach || !hasRolled){
            alert("This is not a valid space for you to move to! The goal ID is: " + spaceToReach + " and the actual ID is: " + theID);
        } else{

            //alert("Yay, you did it. Good job! " + theID);

            // If player 1 moves correctly, switch the player's turn and update the board to reflect where player 1 is located
            // If player 2 moves correctly, do the same for that player
            if(turn == "1"){
                turn = "2";
                document.getElementById(playerOne.id).style.background = "white";
                document.getElementById(playerOne.id).innerHTML = "";
                playerOne = document.getElementById(spaceToReach);
                document.getElementById("topText").innerHTML = "Player 2 roll!";
                document.getElementById(spaceToReach).innerHTML = "P1";
                document.getElementById(spaceToReach).style.background = "blue";
            } else{
                turn = "1";
                document.getElementById(playerTwo.id).style.background = "white";
                document.getElementById(playerTwo.id).innerHTML = "";
                playerTwo = document.getElementById(spaceToReach);
                document.getElementById("topText").innerHTML = "Player 1 roll!";
                document.getElementById(spaceToReach).innerHTML = "P2";
                document.getElementById(spaceToReach).style.background = "yellow";
            }

            // A new turn has started and so a roll hasn't been made yet
            hasRolled = false;
        }
    }
}

// To be used to work with the API
function checkMove(){

    let correct = false;

    while(!correct){
        let touches = touchEvent.touches;

        let x = touches[0].screenX;
        let y = touches[0].screenY;

        let theElement = document.elementFromPoint(x, y).id;
        alert(theElement);

        if(theElement == spaceToReach){
            playerOne = document.getElementById(theElement);
            document.getElementById(theElement).innHTML = "FUCK";
            correct = true;
        }

    }
}



//let space1 = /HashMap to determine which objects are touched
let touches  = {};


for(let i = 0; i < 28; i++){
    this.initializeTouches(document.getElementById(i + ""));
}

function initializeTouches(space){
    space.addEventListener('touchstart', () => {
        this.incrementCount(space, () => {
            console.log('Yo Bitch! im space:', space.id);
        });
    });
    space.addEventListener('touchend', () => {
        this.decrementCount(space);
    });
}

function incrementCount (element, callback) {
    let id = element.getAttribute('id')+'';

    if(!Array.isArray(this.touches[id + ""])){
        this.touches[id + ""] = [];
    }
    this.touches[id].push({});
    if(this.touches[id + ""].length === 3){
        callback();
    }
}

function decrementCount (element) {
    let id = element.getAttribute('id');
    if(Array.isArray(this.touches[id + ""])){
        if(this.touches[id + ""].length > 0){
            this.touches[id + ""].splice(0,1);
        }
    }
}

/*
let space2 = document.getElementById(2 + "");

    space2.addEventListener('touchstart', function(evt){


        let id = space2.id;
        let theTouch = evt;
        if(theTouch.targetTouches.length == 3){
            alert("Num touches: " + theTouch.touches.length);

            // Check if player 1 has been registered yet
            if(!p1Registered){
                let t1X = theTouch.targetTouches.item(0).screenX;
                let t1Y = theTouch.targetTouches.item(0).screenY;

                let t2X = theTouch.targetTouches.item(1).screenX;
                let t2Y = theTouch.targetTouches.item(1).screenY;

                let t3X = theTouch.targetTouches.item(2).screenX;
                let t3Y = theTouch.targetTouches.item(2).screenY;

                //alert("Position X of touch 1: " + t1X + "   Position Y of touch 1: " + t1Y);

                let side12 = Math.sqrt(Math.pow(Math.abs(t1X - t2X),2) + Math.pow(Math.abs(t1Y - t2Y), 2));
                let side13 = Math.sqrt(Math.pow(Math.abs(t1X - t3X),2) + Math.pow(Math.abs(t1Y - t3Y), 2));
                let side23 = Math.sqrt(Math.pow(Math.abs(t2X - t3X),2) + Math.pow(Math.abs(t2Y - t3Y), 2));

                let angle1 = Math.atan(side23/side12);
                let angle2 = Math.atan(side13/side12);
                let angle3 = 1.80 - (angle1 + angle2);
                let total = angle1 + angle2 + angle3;
                total = total*100;
                //alert("The total is: " + total);
                //alert("Angle1: " + angle1 + " Angle2: " + angle2 + " Angle3: " + angle3);
            }

            singleMove(id);
        }


            //alert("Num touches: " + evt.touches.length);
    }, true);

let space3 = document.getElementById(3 + "");

    space3.addEventListener('touchstart', function(evt){


        let id = space3.id;
        let theTouch = evt;
        if(theTouch.targetTouches.length == 3){
            alert("Num touches: " + theTouch.touches.length);

            // Check if player 1 has been registered yet
            if(!p1Registered){
                let t1X = theTouch.targetTouches.item(0).screenX;
                let t1Y = theTouch.targetTouches.item(0).screenY;

                let t2X = theTouch.targetTouches.item(1).screenX;
                let t2Y = theTouch.targetTouches.item(1).screenY;

                let t3X = theTouch.targetTouches.item(2).screenX;
                let t3Y = theTouch.targetTouches.item(2).screenY;

                //alert("Position X of touch 1: " + t1X + "   Position Y of touch 1: " + t1Y);

                let side12 = Math.sqrt(Math.pow(Math.abs(t1X - t2X),2) + Math.pow(Math.abs(t1Y - t2Y), 2));
                let side13 = Math.sqrt(Math.pow(Math.abs(t1X - t3X),2) + Math.pow(Math.abs(t1Y - t3Y), 2));
                let side23 = Math.sqrt(Math.pow(Math.abs(t2X - t3X),2) + Math.pow(Math.abs(t2Y - t3Y), 2));

                let angle1 = Math.atan(side23/side12);
                let angle2 = Math.atan(side13/side12);
                let angle3 = 1.80 - (angle1 + angle2);
                let total = angle1 + angle2 + angle3;
                total = total*100;
                //alert("The total is: " + total);
                //alert("Angle1: " + angle1 + " Angle2: " + angle2 + " Angle3: " + angle3);
            }

            singleMove(id);
        }


            //alert("Num touches: " + evt.touches.length);
    }, true);

let space4 = document.getElementById(4 + "");

    space4.addEventListener('touchstart', function(evt){


        let id = space4.id;
        let theTouch = evt;
        if(theTouch.targetTouches.length == 3){
            alert("Num touches: " + theTouch.touches.length);

            // Check if player 1 has been registered yet
            if(!p1Registered){
                let t1X = theTouch.targetTouches.item(0).screenX;
                let t1Y = theTouch.targetTouches.item(0).screenY;

                let t2X = theTouch.targetTouches.item(1).screenX;
                let t2Y = theTouch.targetTouches.item(1).screenY;

                let t3X = theTouch.targetTouches.item(2).screenX;
                let t3Y = theTouch.targetTouches.item(2).screenY;

                //alert("Position X of touch 1: " + t1X + "   Position Y of touch 1: " + t1Y);

                let side12 = Math.sqrt(Math.pow(Math.abs(t1X - t2X),2) + Math.pow(Math.abs(t1Y - t2Y), 2));
                let side13 = Math.sqrt(Math.pow(Math.abs(t1X - t3X),2) + Math.pow(Math.abs(t1Y - t3Y), 2));
                let side23 = Math.sqrt(Math.pow(Math.abs(t2X - t3X),2) + Math.pow(Math.abs(t2Y - t3Y), 2));

                let angle1 = Math.atan(side23/side12);
                let angle2 = Math.atan(side13/side12);
                let angle3 = 1.80 - (angle1 + angle2);
                let total = angle1 + angle2 + angle3;
                total = total*100;
                //alert("The total is: " + total);
                //alert("Angle1: " + angle1 + " Angle2: " + angle2 + " Angle3: " + angle3);
            }

            singleMove(id);
        }


            //alert("Num touches: " + evt.touches.length);
    }, true);

let space5 = document.getElementById(5 + "");


let listener5 = function(evt){


        let id = space5.id;
        if(evt.targetTouches.length == 3){
            alert("Num touches: " + evt.touches.length);

            // Check if player 1 has been registered yet
            if(!p1Registered){
                let t1X = evt.targetTouches.item(0).screenX;
                let t1Y = evt.targetTouches.item(0).screenY;

                let t2X = evt.targetTouches.item(1).screenX;
                let t2Y = evt.targetTouches.item(1).screenY;

                let t3X = evt.targetTouches.item(2).screenX;
                let t3Y = evt.targetTouches.item(2).screenY;

                //alert("Position X of touch 1: " + t1X + "   Position Y of touch 1: " + t1Y);

                let side12 = Math.sqrt(Math.pow(Math.abs(t1X - t2X),2) + Math.pow(Math.abs(t1Y - t2Y), 2));
                let side13 = Math.sqrt(Math.pow(Math.abs(t1X - t3X),2) + Math.pow(Math.abs(t1Y - t3Y), 2));
                let side23 = Math.sqrt(Math.pow(Math.abs(t2X - t3X),2) + Math.pow(Math.abs(t2Y - t3Y), 2));

                let angle1 = Math.atan(side23/side12);
                let angle2 = Math.atan(side13/side12);
                let angle3 = 1.80 - (angle1 + angle2);
                let total = angle1 + angle2 + angle3;
                total = total*100;
                //alert("The total is: " + total);
                //alert("Angle1: " + angle1 + " Angle2: " + angle2 + " Angle3: " + angle3);
            }

            singleMove(id);
            evt = null;
            fixIt(id);
        }


            //alert("Num touches: " + evt.touches.length);
    }


space5.addEventListener('touchstart', listener5,true);

function fixIt(id){
    let tempSpace = document.getElementById(id + "");

    tempSpace.removeEventListener('touchstart', listener5, true);

    tempSpace.addEventListener('touchstart', listener5, true);
}

let space6 = document.getElementById(6 + "");

    space6.addEventListener('touchend', handleEnd, false);
    space6.addEventListener('touchstart', function(evt){

        let id = space6.id;
        let theTouch = evt;
        if(theTouch.targetTouches.length == 3){
            alert("Num touches: " + theTouch.touches.length);

            // Check if player 1 has been registered yet
            if(!p1Registered){
                let t1X = theTouch.targetTouches.item(0).screenX;
                let t1Y = theTouch.targetTouches.item(0).screenY;

                let t2X = theTouch.targetTouches.item(1).screenX;
                let t2Y = theTouch.targetTouches.item(1).screenY;

                let t3X = theTouch.targetTouches.item(2).screenX;
                let t3Y = theTouch.targetTouches.item(2).screenY;

                //alert("Position X of touch 1: " + t1X + "   Position Y of touch 1: " + t1Y);

                let side12 = Math.sqrt(Math.pow(Math.abs(t1X - t2X),2) + Math.pow(Math.abs(t1Y - t2Y), 2));
                let side13 = Math.sqrt(Math.pow(Math.abs(t1X - t3X),2) + Math.pow(Math.abs(t1Y - t3Y), 2));
                let side23 = Math.sqrt(Math.pow(Math.abs(t2X - t3X),2) + Math.pow(Math.abs(t2Y - t3Y), 2));

                let angle1 = Math.atan(side23/side12);
                let angle2 = Math.atan(side13/side12);
                let angle3 = 1.80 - (angle1 + angle2);
                let total = angle1 + angle2 + angle3;
                total = total*100;
                //alert("The total is: " + total);
                //alert("Angle1: " + angle1 + " Angle2: " + angle2 + " Angle3: " + angle3);
            }

            singleMove(id);


        }
    }, false);


function handleEnd(evt) {
  alert("It worked");
  evt.preventDefault();
  log("touchend");
  let el = document.getElementById("canvas");
  let ctx = el.getContext("2d");
  let touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    let color = colorForTouch(touches[i]);
    let idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      ctx.lineWidth = 4;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
      ctx.lineTo(touches[i].pageX, touches[i].pageY);
      ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);  // and a square at the end
      ongoingTouches.splice(idx, 1);  // remove it; we're done
    } else {
      console.log("can't figure out which touch to end");
    }
  }
} */