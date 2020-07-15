function pointAt(x, y, rotation, cx, cy){
    if((x-1 == cx && rotation == 2)||(x+1 == cx && rotation == 0)||(y+1 == cy && rotation == 1)||(y-1 == cy && rotation == 3)){
        return true;
    } else {
        return false;
    }
}
const signalrouter = extendContent(Block, "signalrouter", {
	update(tile){
		entity = tile.ent();
		if(tile.right().block().name.startsWith("bytmod")&&(!(pointAt(tile.right().x, tile.right().y, tile.right().rotation(), tile.x, tile.y)))){
			tile.right().ent().setSignal(entity.getSignal());
		}
		if(tile.left().block().name.startsWith("bytmod")&&(!(pointAt(tile.left().x, tile.left().y, tile.left().rotation(), tile.x, tile.y)))){
			tile.left().ent().setSignal(entity.getSignal());
		}
		if(tile.front().block().name.startsWith("bytmod")&&(!(pointAt(tile.front().x, tile.front().y, tile.front().rotation(), tile.x, tile.y)))){
			tile.front().ent().setSignal(entity.getSignal());
		}
		if(tile.back().block().name.startsWith("bytmod")&&(!(pointAt(tile.back().x, tile.back().y, tile.back().rotation(), tile.x, tile.y)))){
			tile.back().ent().setSignal(entity.getSignal());
		}
		if(tile.right().block().name.startsWith("bytmod")&&((pointAt(tile.right().x, tile.right().y, tile.right().rotation(), tile.x, tile.y)))){
			tile.ent().setSignal(tile.right().ent().getSignal());
		}
		if(tile.left().block().name.startsWith("bytmod")&&((pointAt(tile.left().x, tile.left().y, tile.left().rotation(), tile.x, tile.y)))){
			tile.ent().setSignal(tile.left().ent().getSignal());
		}
		if(tile.front().block().name.startsWith("bytmod")&&((pointAt(tile.front().x, tile.front().y, tile.front().rotation(), tile.x, tile.y)))){
			tile.ent().setSignal(tile.front().ent().getSignal());
		}
		if(tile.back().block().name.startsWith("bytmod")&&((pointAt(tile.back().x, tile.back().y, tile.back().rotation(), tile.x, tile.y)))){
			tile.ent().setSignal(tile.back().ent().getSignal());
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
signalrouter.category = Category.power;
signalrouter.size = 1;
signalrouter.entityType = prov(() => {
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
