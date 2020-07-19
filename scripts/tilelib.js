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
          if(tileCheck.block().rotate){
	 	return this.pointAt(tileCheck.x, tileCheck.y, tileCheck.rotation(), tile.x, tile.y);
	} else {
		if((tileCheck.x-1 == tile.x)||(tileCheck.x+1 == tile.x)||(tileCheck.y+1 == tile.y)||(tileCheck.y-1 == tile.y)){
			return true;
		} else return false;
	}
},
  pointSide(tileCheck, tile){
	  //return !((tileCheck.rotation()-tile.rotation())&1) && (abs(tileCheck.x-tile.x)==1?!abs(tileCheck.y-tile.y)==1:abs(tileCheck.y-tile.y)==1);
	  return (abs(tileCheck.x-tile.x)==1 && tileCheck.rotation()&1)||(abs(tileCheck.y-tile.y)==1 && !(tileCheck.rotation()&1));
  },
  pointBack(tileCheck, tile){
	  //return abs(tileCheck.rotation()-tile.rotation())==2 && (abs(tileCheck.x-tile.x)==1?!abs(tileCheck.y-tile.y)==1:abs(tileCheck.y-tile.y)==1);
	  return !this.pointingAt(tileCheck, tile) && !pointSide(tileCheck, tile);
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
