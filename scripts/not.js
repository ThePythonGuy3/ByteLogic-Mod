/*function pointAt(x, y, rotation, cx, cy){
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
}*/
const tilel = require("tilelib");
const notgate = extendContent(Block, "not", {
	update(tile){
		entity = tile.ent();
		if(tilel.isMod(tile.back()) && tilel.pointingAt(tile.back(), tile)){
			entity.bset(tile.back().ent().getSignal());
		} else entity.bset(0);
        entity.setSignal(entity.bget()>0 ? 0 : 1);
    	if(tilel.isMod(tile.front()) && tile.front().ent().asignal() == true && !tilel.pointingAt(tile.front(), tile)){
    		tile.front().ent().setSignal(entity.getSignal());
    	}
	},
	generateIcons(){
		return[
			Core.atlas.find("bytmod-logic-base"),
			Core.atlas.find(this.name)
		]
	},
	draw(tile){
		entity = tile.ent();
		Draw.rect(Core.atlas.find("bytmod-logic-base"), tile.drawx(), tile.drawy());
		Draw.color(entity.getSignal() > 0 ? Pal.accent : Color.white);
		Draw.rect(Core.atlas.find(this.name), tile.drawx(), tile.drawy(), tile.rotation()*90);
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
notgate.category = Category.power;
notgate.size = 1;
notgate.entityType = prov(() => {
	const entity = extend(TileEntity, {
		getSignal: function(){
			return this._signal;
		},
		setSignal: function(val){
			this._signal = val;
		},
		asignal: function(){
			return false;
		},
		bset: function(val){
			this._inb = val;
		},
		bget: function(){
			return this._inb;
		}
	});
	entity.setSignal(0);
	entity.bset(0);
	return entity;
});
