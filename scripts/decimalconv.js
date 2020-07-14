function pointAt(x, y, rotation, cx, cy){
    if((x-1 == cx && rotation == 2)||(x+1 == cx && rotation == 0)||(y+1 == cy && rotation == 1)||(y-1 == cy && rotation == 3)){
        return true;
    } else {
        return false;
    }
}
const decimalconv = extendContent(Block, "decimalconv", {
	update(tile){
		entity = tile.ent();
    	if(tile.back().block().name.startsWith("bytmod")&& pointAt(tile.back().x, tile.back().y, tile.back().rotation(), tile.x, tile.y)){	
        	if(tile.front().block().name == "bytmod-decimalconv"){
                entity.setSignal(0);
            } else {
                entity.setSignal(parseInt(tile.back().ent().getSignal(), 2));   
            }
    	} else {
    		entity.setSignal(0);
    	}
    	if(tile.front().block().name.startsWith("bytmod") && tile.front().ent().asignal() == true){
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
		Draw.rect(Core.atlas.find("bytmod-decimalconv"), tile.drawx(), tile.drawy(), tile.rotation()*90);
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
decimalconv.category = Category.power;
decimalconv.size = 1;
decimalconv.entityType = prov(() => {
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