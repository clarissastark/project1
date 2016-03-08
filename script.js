
// *more than five variables

var game = {
  tileIds: [],
  colors: ["red", "blue", "orange", "green", "purple", "yellow", "red", "blue", "orange", "green", "purple", "yellow"],
  matchedTiles: 0,
  values: [],
  numTries: 0
};

// put function in object
// This starts the game when user pushes the big red button

$("#start").on("click", newBoard);

// This sets up the board

function newBoard(){
  // this makes sure the completed grid is removed at the end of a game
  var parentDiv = $("#grid");
  while (parentDiv.firstChild){
    parentDiv.remove(parentDiv.firstChild);
  }
  // this resets the matched tiles to 0 for a new game
  game.matchedTiles = 0;
  game.colors.shuffleDeck();
  // this draws the game board
  for (var i = 0; i < game.colors.length; i++){
    // this could be jQuery
    var tile = document.createElement("div");
    tile.id = "tile_" + i;
    tile.setAttribute("data-color", game.colors[i]);
    tile.addEventListener("click", function(){
      var tile = this;
      flipTile(tile);
    });
    $("#grid").append(tile);
  }
}

// This flips over cards and matches or flips them back over, and ends the game when won or lost after 12 tries

// *this function is really long

function flipTile(tile){
  var val = tile.getAttribute("data-color");
  tile.style.backgroundColor = val;
  game.values.push(val);
  console.log(tile.id);
  game.tileIds.push(tile.id);
  game.numTries += 0.5;
  // this feels like it could be simplified into another function?
  if (game.values.length == 2){
    if (isAndIsMatch(game.values[0],game.values[1]) === false){
      this.setTimeout(flipBack, 700);
    }else if (isAndIsMatch(game.values[0],game.values[1]) === true){
      game.matchedTiles += 2;
      game.values = [];
      game.tileIDs = [];
      if (game.matchedTiles === game.colors.length){
        alert("You've won! Click 'Let's play!' to play again.");
        game.numTries = 0;
      }
    }
  }else if(game.numTries > 12){
    alert("You're out of tries!");
    game.numTries = 0;
  }
}

// This flips unmatched cards back over

function flipBack(){
  // *can this be condensed at all?
  var tile1 = document.getElementById(game.tileIds[0]);
  var tile2 = document.getElementById(game.tileIds[1]);
  tile1.style.backgroundColor = "#247bbe";
  tile2.style.backgroundColor = "#247bbe";
  game.values = [];
  game.tileIDs = [];
}

// This deteremines if two items are a match, excluding 'undefined', "" & null

function isAndIsMatch(a,b){
  return !!a && !!b && a === b;
}

// This randomizes the color pairs on the back of the cards in the grid

Array.prototype.shuffleDeck = function(){
  for (var i = this.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
};
