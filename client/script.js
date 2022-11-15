
// import kaboom lib
import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

var socket = io();
socket.emit('newPlayer');

var state = [];

// initialize kaboom context
kaboom();
loadBean();


var controller = {
  left: false,
  right: false,
  up: false,
  down: false
}
onKeyPress("right", () => {
   controller.right = true;
})
onKeyRelease("right", () => {
   controller.right = false;
})
onKeyPress("up", () => {
   controller.up = true;
})
onKeyRelease("up", () => {
   controller.up = false;
})
onKeyPress("down", () => {
   controller.down = true;
})
onKeyRelease("down", () => {
   controller.down = false;
})
onKeyPress("left", () => {
   controller.left = true;
})
onKeyRelease("left", () => {
   controller.left = false;
})


socket.on('state', (gameState) => {
  //update local gamestate
  state = gameState;
  //clear the canvas
  every(destroy)
  //draw the players that the server sent
  for (let player in gameState.players) {
    // get player position
    var pPos = gameState.players[player]
     add([
    sprite("bean"),  // renders as a sprite
    pos(pPos.x, pPos.y),    // position in world
    ])
  }
})

setInterval(() => {
    socket.emit('playerMovement', controller);
}, 1000 / 60);
