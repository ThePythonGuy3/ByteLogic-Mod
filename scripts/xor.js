/*function pointAt(x, y, rotation, cx, cy){
    if((x-1 == cx && rotation == 2)||(x+1 == cx && rotation == 0)||(y+1 == cy && rotation == 1)||(y-1 == cy && rotation == 3)){
        return true;
    } else {
        return false;
    }
}
function pointingAt(pointCheck, tile){
	return pointAt(pointCheck.x, pointCheck.y, pointCheck.rotation(), tile.x, tile.y);
}
function isMod(tile){
	return tile.block().name.startsWith("bytmod");
}*/
const tilel = require("tilelib");
const xorgate = extendContent(Block, "xor", {
	update(tile){
		entity = tile.ent();
		if(tilel.isMod(tile.right()) && tilel.pointingAt(tile.right(), tile)){
			entity.rset(tile.right().ent().getSignal());
		} else entity.rset(0);
    	if(tilel.isMod(tile.left()) && tilel.pointingAt(tile.left(), tile)){
			entity.lset(tile.left().ent().getSignal());
		} else entity.lset(0);
        entity.setSignal(entity.lget()^entity.rget());
    	if(tilel.isMod(tile.front()) && tile.front().ent().asignal() == true && !tilel.pointingAt(tile.front(), tile)){
    		tile.front().ent().setSignal(entity.getSignal());
    	}
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
		Draw.rect(Core.atlas.find(this.name), tile.drawx(), tile.drawy(), tile.rotation()*90);
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
xorgate.category = Category.power;
xorgate.size = 1;
xorgate.entityType = prov(() => {
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
		rset: function(val){
			this._inr = val;
		},
		rget: function(){
			return this._inr;
		},
		lset: function(val){
			this._inl = val;
		},
		lget: function(){
			return this._inl;
		}
	});
	entity.setSignal(0);
	entity.rset(0);
	entity.lset(0);
	return entity;
});
