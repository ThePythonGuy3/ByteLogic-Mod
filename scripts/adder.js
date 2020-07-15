/*function pointAt(x, y, rotation, cx, cy){
    if((x-1 == cx && rotation == 2)||(x+1 == cx && rotation == 0)||(y+1 == cy && rotation == 1)||(y-1 == cy && rotation == 3)){
        return true;
    } else {
        return false;
    }
}*/
const tilel = require("tilelib");
const adder = extendContent(Block, "adder", {
	update(tile){
		entity = tile.ent();
    	if(tilel.isMod(tile.right()) && tilel.isMod(tile.left()) && tilel.pointingAt(tile.right(), tile) && tilel.pointingAt(tile.left(), tile)){
    		entity.setSignal(tile.left().ent().getSignal()+tile.right().ent().getSignal());
    	} else if(tilel.isMod(tile.right()) && tilel.pointingAt(tile.right(), tile)){
    		entity.setSignal(tile.right().ent().getSignal());
    	} else if(tilel.isMod(tile.left()) && tilel.pointingAt(tile.left(), tile)){
    		entity.setSignal(tile.left().ent().getSignal());
    	} else {
    		entity.setSignal(0);
    	}
    	if(entity.getSignal() == NaN){
    		entity.setSignal(0);
    	}
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
adder.category = Category.power;
adder.size = 1;
adder.entityType = prov(() => {
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
