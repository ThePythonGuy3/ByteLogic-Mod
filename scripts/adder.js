const adder = extendContent(Block, "adder", {
	update(tile){
		entity = tile.ent();
		/*if(tile.left().block().name.startsWith("bytmod") && tile.left().rotation()==0 && tile.right().block().name.startsWith("bytmod") && tile.right().rotation()==2){
    		entity.setSignal(tile.left().entity.getSignal()+tile.right().entity.getSignal());
    	} else if(tile.right().block().name.startsWith("bytmod") && tile.rotation()==2){
    		entity.setSignal(tile.right().entity.getSignal());
    	} else if(tile.left().block().name.startsWith("bytmod") && tile.rotation()==0){
    		entity.setSignal(tile.left().entity.getSignal());
    	} else {
    		entity.setSignal(0);
    	}*/
    	if(tile.left().block().name.startsWith("bytmod") && Tile.relativeTo(tile.left().drawx(), tile.left().drawy(), tile.drawx(), tile.drawy()) == 0 && tile.right().block().name.startsWith("bytmod") && Tile.relativeTo(tile.right().drawx(), tile.right().drawy(), tile.drawx(), tile.drawy()) == 2){
    		entity.setSignal(tile.left().entity.getSignal()+tile.right().entity.getSignal());
    	} else if(tile.right().block().name.startsWith("bytmod") && Tile.relativeTo(tile.right().drawx(), tile.right().drawy(), tile.drawx(), tile.drawy()) == 2){
    		entity.setSignal(tile.right().entity.getSignal());
    	} else if(tile.left().block().name.startsWith("bytmod") && Tile.relativeTo(tile.left().drawx(), tile.left().drawy(), tile.drawx(), tile.drawy()) == 0){
    		entity.setSignal(tile.left().entity.getSignal());
    	} else {
    		entity.setSignal(0);
    	}
	},
	draw(tile){
		entity = tile.ent();
		Draw.rect(Core.atlas.find("bytmod-logic-base"), tile.drawx(), tile.drawy());
		Draw.color(entity.getSignal() > 0 ? Pal.accent : Color.white);
		Draw.rect(Core.atlas.find("bytmod-adder"), tile.drawx(), tile.drawy(), tile.rotation()*90);
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
		}
	});
	entity.setSignal(0);
	return entity;
});