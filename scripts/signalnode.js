const tilel = require("tilelib");
const signalnode = extendContent(Block, "signalnode", {
	load(){
		this.super$load();
		this.laser = Core.atlas.find("bytmod-logic-laser");
		this.laserEnd = Core.atlas.find("bytmod-logic-laser-end");
		this.t1=new Vec2(); this.t2=new Vec2();
	},
	update(tile){
		entity = tile.ent();
		entity.setAsignal(entity.getConn()?false:true);
		if(entity.getConn()){
			var conntile = Vars.world.tile(entity.getTileConf());
			conntile.ent().setConn(false);
			conntile.ent().setSignal(entity.getSignal());
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
		if(tile==other) tile.ent().setConn(false);
   		else if(tile.ent().getTileConf()==other&&tile.ent().getConn()) tile.ent().setConn(false);
   		else if(other.block().name == "bytmod-signalnode"){
     			tile.ent().setConn(true);
     			tile.ent().setTileConf(value);
   		} 
	}, 
	onConfigureTileTapped(tile, other){
		//Draw.rect(Core.atlas.find("router"), other.x,other.y);
		if(tile == other){
			tile.configure(other.pos());
			return false;
		} else if(other.block().name == "bytmod-signalnode"){
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
		Lines.stroke(2);
		if(tile.ent().getConn()){
			Draw.color(Color.royal);
			var tule = Vars.world.tile(tile.ent().getTileConf());
			Lines.square(tule.drawx(),tule.drawy(),9,45);
		} 
		Draw.color(Pal.accent);
		Lines.circle(tile.drawx(),tile.drawy(),Mathf.sinDeg(Time.time()*6)+7);
		Lines.stroke(3);
		Draw.color(Color.coral);
		Lines.circle(tile.drawx(),tile.drawy(),50);
		Draw.color(Pal.accent);
		Lines.stroke(2);
		Lines.circle(tile.drawx(),tile.drawy(),50);
		Lines.stroke(1);
		Draw.reset(); 
	}, 
	drawLayer(tile){
		if(Core.settings.getInt("lasersopacity") == 0) return;
   		if(!tile.ent().getConn()) return;
   		var link=Vars.world.tile(tile.ent().getTileConf());
   		if(link!=null&&link.block().name == "bytmod-signalnode"){
     			this.drawLaser(tile, link);
     			Draw.reset();
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
		setAsignal: function(val){
			this._asi = val
		},
		asignal: function(){
			return this._asi;
		},
		setio: function(val){
			this._isio = val;
		},
		getio: function(){
			return this._isio;
		},
		setTileConf: function(val){
			this._tileconf = val
		}, 
		getTileConf: function(){
			return this._tileconf;
		},
		setConn: function(val){
			this._iscon = val;
		},
		getConn: function(){
			return this._iscon;
		}

	});
	entity.setSignal(0);
	entity.setConn(false);
	entity.setAsignal(entity.getConn()?false:true);
	return entity;
});
