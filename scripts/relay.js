const relay = extendContent(Block, "relay", {
	update(tile){
tile.ent().setSignal(tile.ent().getTempSignal());
tile.ent().setTempSignal(0);
		if(tile.front().block().name == "bytmod-relay"){
    		tile.front().ent().addTempSignal(tile.ent().getSignal());
    		
    	}
	},
	draw(tile){
		entity = tile.ent();
		Draw.rect(Core.atlas.find("bytmod-logic-base"), tile.drawx(), tile.drawy());
		Draw.color(entity.getSignal() > 0 ? Pal.accent : Color.white);
		Draw.rect(Core.atlas.find("bytmod-relay"), tile.drawx(), tile.drawy(), tile.rotation()*90);
		if(tile.getNearby(0).block().name.startsWith("bytmod") && tile.getNearby(0).rotation()*90 == 180){
			Draw.rect(Core.atlas.find("bytmod-relay"), tile.drawx(), tile.drawy(), 0);
		}
		if(tile.getNearby(2).block().name.startsWith("bytmod") && tile.getNearby(2).rotation()*90 == 0){
			Draw.rect(Core.atlas.find("bytmod-relay"), tile.drawx(), tile.drawy(), 180);
		}
		if(tile.getNearby(1).block().name.startsWith("bytmod") && tile.getNearby(1).rotation()*90 == 270){
			Draw.rect(Core.atlas.find("bytmod-relay"), tile.drawx(), tile.drawy(), 90);
		}
		if(tile.getNearby(3).block().name.startsWith("bytmod") && tile.getNearby(3).rotation()*90 == 90){
			Draw.rect(Core.atlas.find("bytmod-relay"), tile.drawx(), tile.drawy(), 270);
		}
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
relay.category = Category.power;
relay.size = 1;
relay.entityType = prov(() => {
	const entity = extend(TileEntity, {
		getSignal: function(){
			return this._signal;
		},
		setSignal: function(val){
			this._signal = val;
		},
getTempSignal: function(){
			return this._tsignal;
		},
		setTempSignal: function(val){
			this._tsignal = val;
		},
		addTempSignal: function(val){
			this._signal += val;
		}
	});
	entity.setSignal(0);
	return entity;
});


