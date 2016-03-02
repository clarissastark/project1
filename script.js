
// *more than five variables

var colors = ["red", "blue", "orange", "green", "purple", "yellow", "red", "blue", "orange", "green", "purple", "yellow"];
var matchedTiles = 0;
var memoryValues = [];
var memoryTileIds = [];
var numTries = 0;
var startBtn = document.querySelector("#start");
var gameTimer;

// This starts the game when user pushes the big red button

startBtn.addEventListener("click", newBoard);

// This sets up the board

function newBoard(){
  // this makes sure the completed grid is removed at the end of a game
  var parentDiv = document.getElementById("grid");
  while (parentDiv.firstChild){
    parentDiv.removeChild(parentDiv.firstChild);
  }
  matchedTiles = 0;
  colors.shuffleDeck();
  // this draws the game board
  for (var i = 0; i < colors.length; i++){
    // this could be jQuery
    var tile = document.createElement("div");
    tile.id = "tile_" + i;
    tile.setAttribute("data-color", colors[i]);
    tile.addEventListener("click", function(){
      memoryFlipTile(this);
    });
    document.getElementById("grid").appendChild(tile);
  }
}

// This flips over cards and matches or flips them back over, and ends the game when won or lost after 12 tries


// *this function is really long

function memoryFlipTile(tile){
  var val = tile.getAttribute("data-color");
  tile.style.backgroundColor = val;
  memoryValues.push(val);
  memoryTileIds.push(tile.id);
  numTries += 0.5;
  if (memoryValues.length == 2){
    if (isAndIsMatch(memoryValues[0],memoryValues[1]) === false){
      this.setTimeout(flipBack, 700);
    }else if (isAndIsMatch(memoryValues[0],memoryValues[1]) === true){
      matchedTiles += 2;
      memoryValues = [];
      memoryTileIds = [];
      if (matchedTiles === colors.length){
        alert("You've won! Click 'Let's play!' to play again.");
        numTries = 0;
      }
    }
  }else if(gameTimer === 0){
    alert("You're out of tries!");
    numTries = 0;
  }
}

// This flips unmatched cards back over

function flipBack(){
  // *can this be condensed at all?
  var tile1 = document.getElementById(memoryTileIds[0]);
  var tile2 = document.getElementById(memoryTileIds[1]);
  tile1.style.backgroundColor = "#247bbe";
  tile2.style.backgroundColor = "#247bbe";
  memoryValues = [];
  memoryTileIds = [];
}

// This deteremines if two items are a match, excluding 'undefined', "" & null

function isAndIsMatch(a,b){
  return !!a && !!b && a === b;
}

// This randomizes the colors on the back of the cards in the grid

Array.prototype.shuffleDeck = function(){
  for (var i = this.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
};
