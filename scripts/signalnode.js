const tilel = require("tilelib");
const signalnode = extendContent(Block, "signalnode", {
	update(tile){
		entity = tile.ent()
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
		Draw.rect(Core.atlas.find("bytmod-signalnode"), tile.drawx(), tile.drawy(), tile.rotation()*90);
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
	configured(tile, player, value){
		if(value<=0) return;
		var other = Vars.world.tile(value);
		Draw.color(Color.coral);
		Drawf.laser(tile.team, Core.atlas.find("router"),Core.atlas.find("sorter"),tile.drawx(),tile.drawy(),other.drawx(),other.drawy());
		Draw.reset();
	}, 
	onConfigureTileTapped(tile, other){
		//Draw.rect(Core.atlas.find("router"), other.x,other.y);
		if(other.name == "bytmod-signalnode"){
			tile.configure(other.pos());
		}
				
}
});
signalnode.category = Category.power;
signalnode.size = 1;
signalnode.entityType = prov(() => {
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
		setio: function(val){
			this._inpout = val;
		}, 
		getio: function(){
			return this._inpout;
		}
	});
	entity.setSignal(0);
	return entity;
});
