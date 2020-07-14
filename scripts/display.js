const display = extendContent(Block, "display", {
	draw(tile){
		Draw.rect(Core.atlas.find("bytmod-display"), tile.drawx(), tile.drawy());
        entity = tile.ent();
        var dw = 2;
        var dh = 2;
        var xs = 2;
        var ys = 2;
        var w = 5;
        var h = 5;

        for(i = 0; i < w * h; i++){
            var x = i % w;
            var y = i / w;

            if((entity.getSignal() & (1 << i)) != 0){
                Fill.rect(tile.drawx() + x*xs - (w-1) * xs/2, (tile.drawy() + y*ys - (h-1) * ys/2)-x*0.8/2, dw, dh);
            }
        }
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
display.category = Category.power;
display.size = 2;
display.entityType = prov(() => {
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