const tilel = require("tilelib");
const explosives = extendContent(Block, "explosives", {
	update(tile){
		if(tile.ent().getSignal()>0){
			Damage.dynamicExplosion(tile.drawx(), tile.drawy(), 10, 50, 1600, 20, Color.valueOf("ff795e"));
			tile.ent().kill();
		}
	},
	generateIcons(){
		return[
			Core.atlas.find(this.name)
		]
	},
	draw(tile){
		Draw.rect(Core.atlas.find(this.name), tile.drawx(), tile.drawy(), tile.rotation()*90);
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
explosives.category = Category.power;
explosives.size = 1;
explosives.entityType = prov(() => {
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
