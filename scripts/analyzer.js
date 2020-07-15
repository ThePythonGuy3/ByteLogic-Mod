const tilel = require("tilelib");
function tabled(tile, table){
	entity = tile.ent();
    var itemtable = new Table(Styles.black6);
    var liquidtable = new Table(Styles.black6);
    var modetable = new Table(Styles.black9);
    table.add(modetable).fillX();
    table.row();
    table.add(itemtable);
    table.row();
    table.add(liquidtable);
    modetable.addImageButton(Icon.box, Styles.emptyi, 40, run(() => {
    	entity.setMode("item");
       	tabled(tile, entity.getMode());
    }));
    modetable.addImageButton(Icon.liquid, Styles.emptyi, 40, run(() => {
        entity.setMode("item");
        tabled(tile, entity.getMode());
    }));
    modetable.addImageButton(Icon.power, Styles.emptyi, 40, run(() => entity.setMode("power")));
    modetable.addImageButton(Icon.paste, Styles.emptyi, 40, run(() => entity.setMode("charge")));
	itemtable.visible(boolp(() => entity.getMode()=="item"));
    liquidtable.visible(boolp(() => entity.getMode()=="liquid"));
    mode = entity.getMode();
    if(mode == "item"){
    	ItemSelection.buildTable(itemtable, Vars.content.items(), prov(() => entity.getValue()), cons(item => {
        	tile.configure(item == null ? -1 : item.id);
       	}));
    } else if(mode == "liquid"){
       	ItemSelection.buildTable(liquidtable, Vars.content.liquids(), prov(() => entity.getValue()), cons(item => {
            tile.configure(item == null ? -1 : item.id);
       	}));
    }
}
const analyzer = extendContent(Block, "analyzer", {
	update(tile){
		entity = tile.ent();
		if(entity.getMode() == "item"){
			item = entity.getValue();
			if(tile.back().block().hasItems){
            	entity.setSignal(item == null ? tile.back().ent().items.total() : tile.back().ent().items.get(item));
			}
		} else if(entity.getMode() == "liquid"){
			liquid = entity.getValue();
			if(tile.back().block().hasLiquids){
            	entity.setSignal(liquid == null ? tile.back().ent().liquids.total() : tile.back().ent().liquids.get(liquid));
			}
		}
		if(tilel.isMod(tile.front()) && !(tilel.pointingAt(tile.front(), tile))){
    		if(tile.front().ent().asignal() == true){
    			tile.front().ent().setSignal(tile.ent().getSignal());
    		}
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
  	},
  	buildConfiguration(tile, table){
        tabled(tile, table);
    },
    configured(tile, player, value){
        tile.ent().setValue(Vars.content.item(value));
    },
});
analyzer.category = Category.power;
analyzer.size = 1;
analyzer.entityType = prov(() => {
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
		setValue: function(val){
			this._value = val;
		},
		getValue: function(){
			return this._value;
		},
		setMode: function(val){
			this._mode = val;
		},
		getMode: function(){
			return this._mode;
		}
	});
	entity.setSignal(0);
	entity.setValue(Items.copper);
	entity.setMode("item");
	return entity;
});
