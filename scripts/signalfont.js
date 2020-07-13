function pointAt(x, y, rotation, cx, cy){
    if((x-1 == cx && rotation == 2)||(x+1 == cx && rotation == 0)||(y+1 == cy && rotation == 1)||(y-1 == cy && rotation == 3)){
        return true;
    } else {
        return false;
    }
}
const signalfont = extendContent(Block, "signalfont", {
	update(tile){
		entity = tile.ent();
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
		Draw.rect(Core.atlas.find("bytmod-signalfont"), tile.drawx(), tile.drawy(), tile.rotation()*90);
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
        Vars.ui.showTextInput(Core.bundle.get("bar.signal"), "", 8, entity.getSignal(), true, cons(result => {
            entity.setSignal(Strings.parseInt(result, 0));
        }));
    }
});
signalfont.category = Category.power;
signalfont.size = 1;
signalfont.entityType = prov(() => {
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