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
  pointingAt(tileCheck, tile){
	  return this.pointAt(tileCheck.x, tileCheck.y, tileCheck.rotation(), tile.x, tile.y);
  },
  isMod(tile){
	  return tile.block().name.startsWith("bytmod");
  },
  dtb(number){
    var binary = "";
    var temp = number;
 
    while(temp > 0){
        if(temp % 2 == 0){
            binary = "0" + binary;
        }
        else {
            binary = "1" + binary;
        }

        temp = Math.floor(temp / 2);
    }

    return binary;
  },
};
