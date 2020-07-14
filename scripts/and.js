function pointAt(x, y, rotation, cx, cy){
    if((x-1 == cx && rotation == 2)||(x+1 == cx && rotation == 0)||(y+1 == cy && rotation == 1)||(y-1 == cy && rotation == 3)){
        return true;
    } else {
        return false;
    }
}
function pointingAt(pointCheck, tile){
	return pointAt(pointCheck.x, pointCheck.y, pointCheck.rotation(), tile.x, tile.y);
}
function isMod(tile){
	return tile.block().name.startsWith("bytmod");
}
const andgate = extendContent(Block, "and", {
	update(tile){
		entity = tile.ent();
		var in1, in2;
		if(isMod(tile.right()) && pointingAt(tile.right(), tile)){
			in1 = tile.left().ent().getSignal();
		} else in1 = 0;
    	if(isMod(tile.left()) && pointingAt(tile.left(), tile)){
			in2 = tile.right().ent().getSignal();
		} else in2 = 0;
        entity.setSignal(in1&in2);
    	if(isMod(tile.front()) && tile.front().ent().asignal() == true && !pointingAt(tile.front(), tile)){
    		if(tile.front().block().name == "bytmod-relay"){
    			tile.front().ent().setTempSignal(entity.getSignal());
    		} else {
    			tile.front().ent().setSignal(entity.getSignal());
    		}
    	}
	},
	draw(tile){
		entity = tile.ent();
		Draw.rect(Core.atlas.find("bytmod-logic-base"), tile.drawx(), tile.drawy());
		Draw.color(entity.getSignal() > 0 ? Pal.accent : Color.white);
		Draw.rect(Core.atlas.find("bytmod-and"), tile.drawx(), tile.drawy(), tile.rotation()*90);
  		Draw.reset();
  	},
  	setBars(){
  		this.super$setBars();
  		this.bars.add("signal", new Func({
				get: function(entity){
					return new Bar(prov(() => (Core.bundle.get("bar.signal") + ": " + entity.getSignal())), prov(() => Pal.ammo), new Floatp({get: function(){
						return entity.getSignal();	
					}
				}));
			}
		}));
  	}
});
andgate.category = Category.power;
andgate.size = 1;
andgate.entityType = prov(() => {
	const entity = extend(TileEntity, {
		getSignal: function(){
			return this._signal;
		},
		setSignal: function(val){
			this._signal = val;
		},
		asignal: function(){
			return false;
		}
	});
	entity.setSignal(0);
	return entity;
});
