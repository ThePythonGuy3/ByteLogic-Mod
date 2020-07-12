function pointAt(x, y, rotation, cx, cy){
    if((x-1 == cx && rotation == 2)||(x+1 == cx && rotation == 0)||(y+1 == cy && rotation == 1)||(y-1 == cy && rotation == 3)){
        return true;
    } else {
        return false;
    }
}
const substractor = extendContent(Block, "substractor", {
	update(tile){
		entity = tile.ent();
    	if(tile.right().block().name.startsWith("bytmod") && tile.left().block().name.startsWith("bytmod") && pointAt(tile.right().x, tile.right().y, tile.right().rotation(), tile.x, tile.y) && pointAt(tile.left().x, tile.left().y, tile.left().rotation(), tile.x, tile.y)){
    		if(tile.left().ent().getSignal()>tile.right().ent().getSignal()){
                entity.setSignal(tile.left().ent().getSignal()-tile.right().ent().getSignal());
            } else {
                entity.setSignal(0);
            }
    	} else {
    		entity.setSignal(0);
    	}
    	if(entity.getSignal() == NaN){
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
		Draw.rect(Core.atlas.find("bytmod-substractor"), tile.drawx(), tile.drawy(), tile.rotation()*90);
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
substractor.category = Category.power;
substractor.size = 1;
substractor.entityType = prov(() => {
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