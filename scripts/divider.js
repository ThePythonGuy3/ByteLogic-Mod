const tilel = require("tilelib");
const divider = extendContent(Block, "divider", {
	update(tile){
		entity = tile.ent();
    	if(tilel.isMod(tile.left()) && tilel.isMod(tile.right()) && tilel.pointingAt(tile.left(), tile) && tilel.pointingAt(tile.right(), tile)){
    		if(tile.right().ent().getSignal()!=0){
    			entity.setSignal(Mathf.floor(tile.left().ent().getSignal()/tile.right().ent().getSignal()));
    		}
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
	draw(tile){
		entity = tile.ent();
		Draw.rect(Core.atlas.find("bytmod-logic-base"), tile.drawx(), tile.drawy());
		Draw.color(entity.getSignal() > 0 ? Pal.accent : Color.white);
		Draw.rect(Core.atlas.find("bytmod-divider"), tile.drawx(), tile.drawy(), tile.rotation()*90);
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
divider.category = Category.power;
divider.size = 1;
divider.entityType = prov(() => {
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