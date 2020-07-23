const controller = extendContent(Block, "controller", {
	update(tile){
		entity = tile.ent();
		if(tile.front().block().canOverdrive){
			try{
				if(entity.getSignal()==0){
					tile.front().ent().timeScaleDuration = 3;
					tile.front().ent().timeScale = 0;
				} else {
					tile.front().ent().timeScaleDuration = 3;
					tile.front().ent().timeScale = 1;
				}
			}catch(err){};
		}
	},
	draw(tile){
		entity = tile.ent();
		Draw.rect(Core.atlas.find("bytmod-logic-base"), tile.drawx(), tile.drawy());
		Draw.color(entity.getSignal() > 0 ? Pal.accent : Color.white);
		Draw.rect(Core.atlas.find(this.name), tile.drawx(), tile.drawy(), tile.rotation()*90);
  		Draw.reset();
  	},
	generateIcons(){
		return[
			Core.atlas.find("bytmod-logic-base"),
			Core.atlas.find(this.name)
		]
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
controller.category = Category.power;
controller.size = 1;
controller.entityType = prov(() => {
	const entity = extend(TileEntity, {
		getSignal: function(){
			return this._signal;
		},
		setSignal: function(val){
			this._signal = val;
		},
		asignal: function(){
			return true;
		}
	});
	entity.setSignal(0);
	return entity;
});
