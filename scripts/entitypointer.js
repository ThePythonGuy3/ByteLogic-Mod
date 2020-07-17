const tilel = require("tilelib");
const entitypointer = extendContent(Block, "entitypointer", {
	update(tile){
		entity = tile.ent();
    	target = UnitsUtil.closest(tile.worldx(), tile.worldy(), Vars.tilesize * (10 + size / 2), boolp(() => true));
    	if(target != null){
    		entity.setSignal(Angles.angle(tile.drawx(), tile.drawy(), target.getX(), target.getY()));
    	} else {
    		entity.setSignal(0);
    	}
    	if(tilel.isMod(tile.front()) && tile.front().ent().asignal() == true && !tilel.pointingAt(tile.front(), tile)){
            tile.front().ent().setSignal(entity.getSignal());
        }
        if(tilel.isMod(tile.right()) && tile.right().ent().asignal() == true && !tilel.pointingAt(tile.right(), tile)){
            tile.right().ent().setSignal(entity.getSignal());
        }
        if(tilel.isMod(tile.left()) && tile.left().ent().asignal() == true && !tilel.pointingAt(tile.left(), tile)){
            tile.left().ent().setSignal(entity.getSignal());
        }
        if(tilel.isMod(tile.back()) && tile.back().ent().asignal() == true && !tilel.pointingAt(tile.back(), tile)){
            tile.back().ent().setSignal(entity.getSignal());
        }
	},
	generateIcons(){
		return[
			Core.atlas.find("bytmod-logic-base"),
		]
	},
	draw(tile){
		entity = tile.ent();
		target = UnitsUtil.closest(tile.worldx(), tile.worldy(), Vars.tilesize * (10 + size / 2), boolp(() => true));
		Draw.rect(Core.atlas.find("bytmod-logic-base"), tile.drawx(), tile.drawy(), 8, 8);
		Draw.color(entity.getSignal() > 0 ? Pal.accent : Color.white);
		if(target != null){
			Lines.lineAngle(tile.drawx(), tile.drawy(), Angles.angle(tile.drawx(), tile.drawy(), target.getX(), target.getY()), 1.5);
		} else {
			Lines.lineAngle(tile.drawx(), tile.drawy(), 0, 1.5);
		}
		Lines.circle(tile.drawx(), tile.drawy(), 0.3);
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
entitypointer.category = Category.power;
entitypointer.size = 1;
entitypointer.entityType = prov(() => {
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
