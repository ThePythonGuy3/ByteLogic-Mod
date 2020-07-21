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
	}, 
	onConfigureTileTapped(tile, other){
		//Draw.rect(Core.atlas.find("router"), other.x,other.y);
		if(tile == other){
			tile.configure(other.pos());
			return false;
		} else if(other.block().hasItems){
			tile.configure(other.pos());
			return false; 
		} else return true;
				
	},
	drawLaser(tile,target){
    var opacityPercentage = Core.settings.getInt("lasersopacity");
    if(opacityPercentage == 0) return;
    var opacity = opacityPercentage / 100;

    var x1 = tile.drawx(); var y1 = tile.drawy();
    var x2 = target.drawx(); var y2 = target.drawy();

    var angle1 = Angles.angle(x1, y1, x2, y2);
    this.t1.trns(angle1, tile.block().size * Vars.tilesize / 2 - 1.5);
    this.t2.trns(angle1 + 180, target.block().size * Vars.tilesize / 2 - 1.5);

    x1 += this.t1.x;
    y1 += this.t1.y;
    x2 += this.t2.x;
    y2 += this.t2.y;

    Draw.color(tile.ent().getSignal()>0?Pal.accent:Color.valueOf("ffffff"));
    Draw.alpha(opacity);
    Drawf.laser(this.laser, this.laserEnd, x1, y1, x2, y2, 0.25);
    Draw.reset();
  }, 
	drawConfigure(tile){
		Draw.color(Color.royal);
		Lines.stroke(2);
		Lines.circle(tile.drawx(),tile.drawy(),10);
		Draw.color(Pal.accent);
		Lines.circle(tile.drawx(),tile.drawy(),50);
		Lines.stroke(1);
		Lines.polySeg(12, 0, 360, tile.drawx(), tile.drawy(), 50, Time.time());
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
