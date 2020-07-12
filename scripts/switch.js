const swit = extendContent(Block, "switch", {
	update(tile){
		if(tile.front().block().name == "bytmod-relay"){
    		tile.front().ent().addTempSignal(tile.ent().getSignal());
    	}
	},
	draw(tile){
		entity = tile.ent();
		Draw.rect(Core.atlas.find("bytmod-logic-base"), tile.drawx(), tile.drawy());
		Draw.color(entity.getSignal() > 0 ? Pal.accent : Color.white);
		Draw.rect(Core.atlas.find("bytmod-switch"), tile.drawx(), tile.drawy(), tile.rotation()*90);
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
  	},
  	tapped(tile, player){
  		entity = tile.ent();
  		if(entity.getSignal()==0){
  			entity.setSignal(1);
  		} else {
  			entity.setSignal(0);
  		}
  	}
});
swit.category = Category.power;
swit.size = 1;
swit.entityType = prov(() => {
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

