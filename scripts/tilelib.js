// Shortcuts for tile calculations.
// Lib by ThePythonGuy
module.exports = {
  pointAt(x, y, rotation, cx, cy){
    if((x-1 == cx && rotation == 2)||(x+1 == cx && rotation == 0)||(y+1 == cy && rotation == 1)||(y-1 == cy && rotation == 3)){
      return true;
    } else {
      return false;
    }
  },
  function pointingAt(tileCheck, tile){
	  return pointAt(tileCheck.x, tileCheck.y, tileCheck.rotation(), tile.x, tile.y);
  },
  function isMod(tile){
	  return tile.block().name.startsWith("bytmod");
  },
};
