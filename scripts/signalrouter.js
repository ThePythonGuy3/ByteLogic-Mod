const tilel = require("tilelib");
const signalrouter = extendContent(Block, "signalrouter", {
	update(tile){
		entity = tile.ent();

    	if(tilel.isMod(tile.front()) && tile.front().ent().asignal() == true && !tilel.pointingAt(tile.front(), tile)){
            tile.front().ent().setSignal(entity.getSignal());
        }
	if(tilel.isMod(tile.back()) && tile.back().ent().asignal() == true && !tilel.pointingAt(tile.back(), tile)){
            tile.back().ent().setSignal(entity.getSignal());
        }
if(tilel.isMod(tile.right()) && tile.right().ent().asignal() == true && !tilel.pointingAt(tile.right(), tile)){
            tile.right().ent().setSignal(entity.getSignal());
        }
if(tilel.isMod(tile.left()) && tile.left().ent().asignal() == true && !tilel.pointingAt(tile.left(), tile)){
            tile.left().ent().setSignal(entity.getSignal());
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
adder.category = Category.power;
adder.size = 1;
adder.entityType = prov(() => {
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
