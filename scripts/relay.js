const timerid = 0;
const tilel = require("tilelib");
const relay = extendContent(Block, "relay", {
  update(tile){
	  entity = tile.ent();
    tile.ent().timer.reset(timerid, 0);
    //calculate additional stuff here with tile.ent().getSignal();
    try{
      //you need sth better than a try here; check if the next entity has the setSignal method.
      tile.front().link().ent().setSignal(tile.ent().getSignal());
    }catch(err){}
    tile.ent().internalSignal(tile.ent().getTempSignal());
    tile.ent().setTempSignal(0);
    	if(entity.getSignal() == NaN){
    		entity.internalSignal(0);
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
		if(tile.getNearby(0).block().name.startsWith("bytmod") && tile.getNearby(0).rotation()*90 == 180){
			Draw.rect(Core.atlas.find(this.name), tile.drawx(), tile.drawy(), 0);
		}
		if(tile.getNearby(2).block().name.startsWith("bytmod") && tile.getNearby(2).rotation()*90 == 0){
			Draw.rect(Core.atlas.find(this.name), tile.drawx(), tile.drawy(), 180);
		}
		if(tile.getNearby(1).block().name.startsWith("bytmod") && tile.getNearby(1).rotation()*90 == 270){
			Draw.rect(Core.atlas.find(this.name), tile.drawx(), tile.drawy(), 90);
		}
		if(tile.getNearby(3).block().name.startsWith("bytmod") && tile.getNearby(3).rotation()*90 == 90){
			Draw.rect(Core.atlas.find(this.name), tile.drawx(), tile.drawy(), 270);
		}
		if((tile.back().block().name == "bytmod-signalrouter" || tile.back().block().name == "bytmod-signalnode") && tile.back().ent().asignal()){
			Draw.rect(Core.atlas.find(this.name), tile.drawx(), tile.drawy(), 270);
		}
		if((tile.front().block().name == "bytmod-signalrouter" || tile.front().block().name == "bytmod-signalnode") && tile.front().ent().asignal()){
			Draw.rect(Core.atlas.find(this.name), tile.drawx(), tile.drawy(), 90);
		}
		if((tile.right().block().name == "bytmod-signalrouter" || tile.right().block().name == "bytmod-signalnode") && tile.right().ent().asignal()){
			Draw.rect(Core.atlas.find(this.name), tile.drawx(), tile.drawy(), 0);
		}
		if((tile.left().block().name == "bytmod-signalrouter" || tile.left().block().name == "bytmod-signalnode") && tile.left().ent().asignal()){
			Draw.rect(Core.atlas.find(this.name), tile.drawx(), tile.drawy(), 180);
		}
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
relay.category = Category.power;
relay.size = 1;
relay.entityType = prov(() => {
	const entity = extend(TileEntity, {
		getSignal: function(){
			return this._signal;
		},
    	setSignal: function(val){
      		//check if it should take signal(ex. adders should not accept back) here.
      		if(this.timer.getTime(timerid)==0){
        		this._signal += val;//relays are "add mode"
      		} else {
        		this._tsignal += val;
      		}
    	},
		getTempSignal: function(){
			return this._tsignal;
		},
		setTempSignal: function(val){
			this._tsignal = val;
		},
		addTempSignal: function(val){
			this._tsignal += val;
		},
		internalSignal: function(val){
			this._signal = val;//do not call in other blocks!
		},
		asignal: function(){
			return true;
		}
	});
	entity.internalSignal(0);
	entity.setTempSignal(0);
	return entity;
});
