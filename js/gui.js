function TableroDeJuego(self){
	// Tablero //
	self.tablero = PhaserGame.add.sprite(0, 570, "tablero-de-juego");
	//PhaserGame.physics.arcade.enable(self.tablero);
	//self.tablero.body.immovable = true;
	//self.tablero.position.y = PhaserGame.camera.y+(GameHeight-self.tablero.height);
	self.tablero.fixedToCamera = true;
	// Vitalidad //
	self.hpFill = PhaserGame.add.image(self.tablero.position.x+5, self.tablero.position.y+5, "hp-fill");
	self.hpFill.fixedToCamera = true;
	self.hpBar = PhaserGame.add.image(self.hpFill.position.x+3, self.hpFill.position.y+64, "hp-bar");
	self.hpBar.height = -56;
	self.hpBar.fixedToCamera = true;
	// Slots de Armas LASER //
	if(Player.weapons.laser.active){
		self.laserSlot = PhaserGame.add.image(self.tablero.position.x+30, self.tablero.position.y+10, "laser-weapon");
		self.laserSlot.fixedToCamera = true;
		self.laserAmmoBar = PhaserGame.add.tileSprite(self.laserSlot.position.x+112, self.laserSlot.position.y+8, 105, 9, "weapon-bar");
		Player.weapons.laser.ammobar = self.laserAmmoBar;
		self.laserAmmoBar.fixedToCamera = true;
		self.laserReloadBar = PhaserGame.add.tileSprite(self.laserAmmoBar.position.x, self.laserAmmoBar.position.y+15, 105, 9, "weapon-bar");
		self.laserReloadBar.width = 0;
		Player.weapons.laser.reloadbar = self.laserReloadBar;
		self.laserReloadBar.fixedToCamera = true;
	}else{
		self.laserSlot = PhaserGame.add.image(self.tablero.position.x+30, self.tablero.position.y+10, "free-slot");
	}
	self.laserSlot.fixedToCamera = true;
	// MINI-GUN //
	if(Player.weapons.minigun.active){
		self.minigunSlot = PhaserGame.add.image(self.laserSlot.position.x+230, self.tablero.position.y+10, "minigun-weapon");
		self.minigunAmmoBar = PhaserGame.add.tileSprite(self.minigunSlot.position.x+112, self.minigunSlot.position.y+8, 105, 9, "weapon-bar");
		Player.weapons.minigun.ammobar = self.minigunAmmoBar;
		self.minigunAmmoBar.fixedToCamera = true;
		self.minigunReloadBar = PhaserGame.add.tileSprite(self.minigunAmmoBar.position.x, self.minigunAmmoBar.position.y+15, 105, 9, "weapon-bar");
		self.minigunReloadBar.width = 0;
		Player.weapons.minigun.reloadbar = self.minigunReloadBar;
		self.minigunReloadBar.fixedToCamera = true;
	}else{
		self.minigunSlot = PhaserGame.add.image(self.laserSlot.position.x+230, self.tablero.position.y+10, "free-slot");
	}
	self.minigunSlot.fixedToCamera = true;
	// MISIL //
	if(Player.weapons.missile.active){
		self.missileSlot = PhaserGame.add.image(self.minigunSlot.position.x+230, self.tablero.position.y+10, "missile-weapon");
		self.missileAmmoBar = PhaserGame.add.tileSprite(self.missileSlot.position.x+112, self.missileSlot.position.y+8, 105, 9, "weapon-bar");
		Player.weapons.missile.ammobar = self.missileAmmoBar;
		self.missileAmmoBar.fixedToCamera = true;
		self.missileReloadBar = PhaserGame.add.tileSprite(self.missileAmmoBar.position.x, self.missileAmmoBar.position.y+15, 105, 9, "weapon-bar");
		self.missileReloadBar.width = 0;
		Player.weapons.missile.reloadbar = self.missileReloadBar;
		self.missileReloadBar.fixedToCamera = true;
	}else{
		self.missileSlot = PhaserGame.add.image(self.minigunSlot.position.x+230, self.tablero.position.y+10, "free-slot");
	}
	self.missileSlot.fixedToCamera = true;
	// Barra de Experiencia //
	self.expFill = PhaserGame.add.image(self.tablero.position.x+46, self.tablero.position.y+53, "exp-fill");
	self.expFill.fixedToCamera = true;
	self.expBar = PhaserGame.add.tileSprite(self.expFill.position.x+8, self.expFill.position.y+3, 0, 14, "exp-bar");
	self.expBar.width = 0;
	self.expBar.fixedToCamera = true; 
	// Boton de Shop y Exit //
	self.shopButton = PhaserGame.add.image(self.tablero.position.x+858, self.tablero.position.y+9, "shop-button");
	self.shopButton.inputEnabled = true;
	self.shopButton.events.onInputDown.add(function(){PhaserGame.state.start("Shop");}, this);
	self.shopButton.fixedToCamera = true;
	self.exitButton = PhaserGame.add.image(self.shopButton.position.x+80, self.shopButton.position.y, "exit-button");
	self.exitButton.inputEnabled = true;
	self.exitButton.events.onInputOut.add(function(a){a.frame = 0;}, this);
	self.exitButton.events.onInputOver.add(function(a){a.frame = 1;}, this);
	self.exitButton.events.onInputUp.add(function(a){a.frame = 3;Sounds.Backgrounds.Marte.stop();PhaserGame.state.start("Menu");}, this);
	self.exitButton.fixedToCamera = true;
	// Monedas //
	self.GoldMoney = PhaserGame.add.sprite(735, GameHeight-(self.tablero.height-20), "moneys");
	self.GoldMoney.width = 16;
	self.GoldMoney.height = 16;
	self.GoldMoney.fixedToCamera = true;
	self.SilverMoney = PhaserGame.add.sprite(735, GameHeight-(self.tablero.height-35), "moneys");
	self.SilverMoney.width = 16;
	self.SilverMoney.height = 16;
	self.SilverMoney.frame = 1;
	self.SilverMoney.fixedToCamera = true;
	self.CopperMoney = PhaserGame.add.sprite(735, GameHeight-(self.tablero.height-50), "moneys");
	self.CopperMoney.width = 16;
	self.CopperMoney.height = 16;
	self.CopperMoney.frame = 2;
	self.CopperMoney.fixedToCamera = true;
	// Textos Monedas //
	self.Gold = PhaserGame.add.text(self.GoldMoney.position.x+20, self.GoldMoney.position.y, Player.Money.gold, {font: "bold 12px Arial"});
	self.Gold.addColor("#fff", 0);
	self.Gold.fixedToCamera = true;
	self.Silver = PhaserGame.add.text(self.SilverMoney.position.x+20, self.SilverMoney.position.y, Player.Money.Silver, {font: "bold 12px Arial"});
	self.Silver.addColor("#fff", 0);
	self.Silver.fixedToCamera = true;
	self.Copper = PhaserGame.add.text(self.CopperMoney.position.x+20, self.CopperMoney.position.y, Player.Money.Copper, {font: "bold 12px Arial"});
	self.Copper.addColor("#fff", 0);
	self.Copper.fixedToCamera = true;
}
function TiendaArmas(self, help){
	// Contenedor //
	self.container = PhaserGame.add.image(GameWidth/2-395.5, GameHeight/2-258, "container-menu");
	// Pestañas - ARMAS //
	BotonesTienda(self);
	// Menu de Monedas //
	MenuMonedas(self);
	// Items Compra //
	ItemList(self, 20, 70, Weapons.Laser);
	ItemList(self, 280, 70, Weapons.Minigun);
	ItemList(self, 540, 70, Weapons.Missile);
	self.StartGame = PhaserGame.add.sprite(0, 0, "startgame");
	self.StartGame.position.set(self.container.position.x+(self.container.width/2-self.StartGame.width/2), self.container.position.y+(self.container.height-self.StartGame.height/2-50));
	self.StartGame.inputEnabled = true;
	self.StartGame.animations.add("Bplay-over", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false);
	self.StartGame.animations.add("Bplay-out", [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 10, false);
	self.StartGame.events.onInputOut.add(function(a){a.animations.play("Bplay-out");a.animations.currentAnim.speed = 50;}, this);
	self.StartGame.events.onInputOver.add(function(a){a.animations.play("Bplay-over");a.animations.currentAnim.speed = 50;}, this);
	self.StartGame.events.onInputDown.add(function(){PhaserGame.state.start("Game");}, this);
	if(!help){
		ShowMessage("AYUDA", "Haz click en las estadisticas del item, como por ejemplo: 'I.F'\npara obtener una descripcion de lo que hace cada una de ellas.", RemoveMessage, Sounds.Interfaces.Windows.Normal, self);
		Help.TiendaArmas = true;
	}
}
function ItemList(self, x, y, weapon){
	// Container //
	self.ShopItem = PhaserGame.add.image(self.container.position.x+x, self.container.position.y+y, "item-template");
	// Item Name //
	self.ItemName = PhaserGame.add.text(self.ShopItem.position.x+20, self.ShopItem.position.y+6, weapon.Name, {font: "12px Arial", fill: "#00ffea"});
	// Item Image //
	self.ItemImage = PhaserGame.add.image(self.ShopItem.position.x, self.ShopItem.position.y+50, weapon.Key);
	self.ItemImage.position.x += self.ShopItem.width/4-(self.ItemImage.width/2);
	self.ItemImage.position.y += self.ItemImage.width/1.2;
	// Item Description //
	var Style = {font: "12px Arial", fill: "#00ffea"};
	self.ItemDescription = PhaserGame.add.text(self.ShopItem.position.x+110, self.ShopItem.position.y+45, "Municiones:  [ "+weapon.ammo+" ]", Style);
	self.ItemDescription.inputEnabled = true;
	self.ItemDescription.events.onInputDown.add(function(a){ShowMessage("AYUDA - Municiones", "Cantidad de municiones que vienen con el arma.", RemoveMessage, Sounds.Interfaces.Windows.Normal, self)}, this);
	self.ItemDescription = PhaserGame.add.text(self.ItemDescription.position.x, self.ItemDescription.position.y+18, "Recarga:  [ "+weapon.Reload/1000+" seg ]", Style);
	self.ItemDescription.inputEnabled = true;
	self.ItemDescription.events.onInputDown.add(function(a){ShowMessage("AYUDA - Recarga", "Tiempo que tarda en recargar el arma.", RemoveMessage, Sounds.Interfaces.Windows.Normal, self)}, this);
	self.ItemDescription = PhaserGame.add.text(self.ItemDescription.position.x, self.ItemDescription.position.y+18, "I.F:  [ "+weapon.Interval/1000+" seg ]", Style);
	self.ItemDescription.inputEnabled = true;
	self.ItemDescription.events.onInputDown.add(function(a){ShowMessage("AYUDA - I.F (Intervalo de Fuego)", "Es el tiempo de retraso entre cada disparo efectuado.", RemoveMessage, Sounds.Interfaces.Windows.Normal, self)}, this);
	self.ItemDescription = PhaserGame.add.text(self.ItemDescription.position.x, self.ItemDescription.position.y+18, "F.M:  [ "+weapon.MultipleFire+" ]", Style);
	self.ItemDescription.inputEnabled = true;
	self.ItemDescription.events.onInputDown.add(function(a){ShowMessage("AYUDA - F.M (Fuego Multiple)", "Cantidad maxima de municiones que consume cada disparo.\nEsto permite hacer mas daño de un solo disparo, pero a su vez\nconsumiendo mas rapido las municiones de dicha arma.", RemoveMessage, Sounds.Interfaces.Windows.Normal, self)}, this);
	self.ItemDescription = PhaserGame.add.text(self.ItemDescription.position.x, self.ItemDescription.position.y+18, "Velocidad:  [ "+weapon.velocity+" ]", Style);
	self.ItemDescription.inputEnabled = true;
	self.ItemDescription.events.onInputDown.add(function(a){ShowMessage("AYUDA - Velocidad", "Es la velocidad del proyectil, esto permite alcanzar al objetivo\n mas rapidamente, evitando asi fallar el disparo.", RemoveMessage, Sounds.Interfaces.Windows.Normal, self)}, this);
	// Buy Price //
	self.ItemPrice = PhaserGame.add.text(self.ShopItem.position.x+105, self.ShopItem.position.y+148, weapon.Price.Buy.gold, {font: "10px Arial", fill: "#00ccff"});
	self.ItemPrice = PhaserGame.add.text(self.ShopItem.position.x+105+40, self.ShopItem.position.y+148, weapon.Price.Buy.silver, {font: "10px Arial", fill: "#00ccff"});
	self.ItemPrice = PhaserGame.add.text(self.ShopItem.position.x+105+80, self.ShopItem.position.y+148, weapon.Price.Buy.copper, {font: "10px Arial", fill: "#00ccff"});
	self.BuyItem = PhaserGame.add.sprite(0, 0, "button-buy");
	self.BuyItem.scale.set(0.5, 0.5);
	self.BuyItem.position.set(self.ShopItem.position.x+50, self.ShopItem.position.y+(self.ShopItem.height-33));
	self.BuyItem.inputEnabled = true;
	self.BuyItem.animations.add("Bplay-over", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false);
	self.BuyItem.animations.add("Bplay-out", [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 10, false);
	self.BuyItem.events.onInputOut.add(function(a){a.animations.play("Bplay-out"); a.animations.currentAnim.speed = 50;});
	self.BuyItem.events.onInputOver.add(function(a){a.animations.play("Bplay-over"); a.animations.currentAnim.speed = 50;});
	self.BuyItem.events.onInputDown.add(function(){ValidatePrice(Player.Money, weapon.Price, weapon);});
	// Sell Price //
	self.ItemPrice = PhaserGame.add.text(self.ShopItem.position.x+105, self.ShopItem.position.y+177, weapon.Price.Sell.gold, {font: "10px Arial"});
	self.ItemPrice.addColor("#00ccff", 0);
	self.ItemPrice = PhaserGame.add.text(self.ShopItem.position.x+105+40, self.ShopItem.position.y+177, weapon.Price.Sell.silver, {font: "10px Arial"});
	self.ItemPrice.addColor("#00ccff", 0);
	self.ItemPrice = PhaserGame.add.text(self.ShopItem.position.x+105+80, self.ShopItem.position.y+177, weapon.Price.Sell.copper, {font: "10px Arial"});
	self.ItemPrice.addColor("#00ccff", 0);
}
function Taller(self, help){
	// Contenedor //
	self.container = PhaserGame.add.image(GameWidth/2-395.5, GameHeight/2-258, "container-menu");
	// Pestañas //
	BotonesTienda(self);
	// Menu de Monedas //
	MenuMonedas(self);
	// Sector vender Arma //
	self.SellWeapon = PhaserGame.add.sprite(self.container.position.x+self.container.width-172, self.container.position.y+60, "sell-weapon");
	PhaserGame.physics.arcade.enable(self.SellWeapon);
	self.SellWeapon.inputEnabled = true;
	self.SellWeapon.events.onInputOut.add(function(a){a.frame = 0;}, this);
	//self.SellWeapon.events.onInputUp.add(function(a){a.frame = 0;}, this);
	// Centrar Nave //
	self.NaveGuerra = PhaserGame.add.sprite(0, 0, Player.ship);
	self.NaveGuerra.position.set(CenterX(self.NaveGuerra, self.container), CenterY(self.NaveGuerra, self.container));
	// Armas de Nave //
	self.ShipPart = [];
	for(var i = 0; i < Player.weapons.laser.position.length; i++){
		var PartID = self.ShipPart.length;
		self.ShipPart[PartID] = PhaserGame.add.sprite(self.NaveGuerra.position.x+Player.weapons.laser.position[i].x*2, self.NaveGuerra.position.y+Player.weapons.laser.position[i].y*2, Player.weapons.laser.type);
		PhaserGame.physics.arcade.enable(self.ShipPart[PartID]);
		self.ShipPart[PartID].id = PartID;
		self.ShipPart[PartID].posID = i;
		self.ShipPart[PartID].type = "laser";
		self.ShipPart[PartID].inputEnabled = true;
		self.ShipPart[PartID].events.onInputDown.add(function(e){self.ShipPartMove = true;self.ShipPartFocus = e.id;}, this);
		self.ShipPart[PartID].events.onInputUp.add(function(){self.ShipPartMove = false;}, this);
	}
	for(var i = 0; i < Player.weapons.minigun.position.length; i++){
		var PartID = self.ShipPart.length;
		self.ShipPart[PartID] = PhaserGame.add.sprite(self.NaveGuerra.position.x+Player.weapons.minigun.position[i].x*2, self.NaveGuerra.position.y+Player.weapons.minigun.position[i].y*2, Player.weapons.minigun.type);
		PhaserGame.physics.arcade.enable(self.ShipPart[PartID]);
		self.ShipPart[PartID].id = PartID;
		self.ShipPart[PartID].posID = i;
		self.ShipPart[PartID].type = "minigun";
		self.ShipPart[PartID].inputEnabled = true;
		self.ShipPart[PartID].events.onInputDown.add(function(e){self.ShipPartMove = true;self.ShipPartFocus = e.id;}, this);
		self.ShipPart[PartID].events.onInputUp.add(function(){self.ShipPartMove = false;}, this);
	}
	for(var i = 0; i < Player.weapons.missile.position.length; i++){
		var PartID = self.ShipPart.length;
		self.ShipPart[PartID] = PhaserGame.add.sprite(self.NaveGuerra.position.x+Player.weapons.missile.position[i].x*2, self.NaveGuerra.position.y+Player.weapons.missile.position[i].y*2, Player.weapons.missile.type);
		PhaserGame.physics.arcade.enable(self.ShipPart[PartID]);
		self.ShipPart[PartID].id = PartID;
		self.ShipPart[PartID].posID = i;
		self.ShipPart[PartID].type = "missile";
		self.ShipPart[PartID].inputEnabled = true;
		self.ShipPart[PartID].events.onInputDown.add(function(e){self.ShipPartMove = true;self.ShipPartFocus = e.id;}, this);
		self.ShipPart[PartID].events.onInputUp.add(function(){self.ShipPartMove = false;}, this);
	}
	if(!help){
		ShowMessage("AYUDA", "Cada vez que compres un arma nueva, esta aparecera aqui.\nPuedes usar el puntero del raton para mover las armas en la\nposicion deseada, si te pasas del limite, estas se auto-ajustaran.", RemoveMessage, Sounds.Interfaces.Windows.Normal, self);
		Help.Taller = true;
	}
}
function ValidatePrice(p, i, o){
	if(p.gold > i.Buy.gold){
		AddWeapon(o.Type);
		BuyItem(p, i);
		return false;
	}
	if(p.gold == i.Buy.gold){
		if(p.silver >= i.Buy.silver && p.copper >= i.Buy.copper){
			AddWeapon(o.Type);
			BuyItem(p, i);
		}else{
			Sounds.Effects.NoMoney.play();
		}
	}else{
		Sounds.Effects.NoMoney.play();
	}
}
function BuyItem(p, i){
	p.gold -= i.Buy.gold;
	if(p.silver < i.Buy.silver){
		var gasto = p.silver-i.Buy.silver;
		p.gold--;
		p.silver = 100+(gasto);
	}else{
		p.silver -= i.Buy.silver;
	}
	if(p.copper < i.Buy.copper){
		var gasto = p.copper-i.Buy.copper;
		p.silver--;
		p.copper = 100+(gasto);
	}else{
		p.copper -= i.Buy.copper;
	}
}
function AddWeapon(type){
	switch(type){
		case "Laser":
			Player.weapons.laser.position.push({x: 0, y: 0});
			Player.weapons.laser.ammo += JSON.parse(JSON.stringify(Weapons.Laser.ammo));
		break;
		case "Minigun":
			Player.weapons.minigun.position.push({x: 0, y: 0});
			Player.weapons.minigun.ammo += JSON.parse(JSON.stringify(Weapons.Minigun.ammo));
		break;
		case "Missile":
			Player.weapons.missile.position.push({x: 0, y: 0});
			Player.weapons.missile.ammo += JSON.parse(JSON.stringify(Weapons.Missile.ammo));
		break;
	}
	Sounds.Effects.Money.play();
}
function MenuMonedas(self, fix){
	self.moneyContainer = PhaserGame.add.image(self.container.position.x+(self.container.width-272), self.container.position.y+2, "money-menu");
	//self.moneyContainer.fixedToCamera = true;
	self.GoldMoney = PhaserGame.add.text(self.moneyContainer.position.x+30, self.moneyContainer.position.y+16, Player.Money.gold, {font: "bold 12px Arial"});
	self.GoldMoney.addColor("#00f7ff", 0);
	//self.GoldMoney.fixedToCamera = true;
	self.SilverMoney = PhaserGame.add.text(self.GoldMoney.position.x+85, self.GoldMoney.position.y, Player.Money.silver, {font: "bold 12px Arial"});
	self.SilverMoney.addColor("#00f7ff", 0);
	//self.SilverMoney.fixedToCamera = true;
	self.CopperMoney = PhaserGame.add.text(self.SilverMoney.position.x+83, self.SilverMoney.position.y, Player.Money.copper, {font: "bold 12px Arial"});
	self.CopperMoney.addColor("#00f7ff", 0);
	//self.CopperMoney.fixedToCamera = true;
}
function BotonesTienda(self, fix){
	self.buttonArmas = PhaserGame.add.sprite(self.container.position.x+2, self.container.position.y+2, "button-armas");
	self.buttonArmas.inputEnabled = true;
	self.buttonArmas.events.onInputOut.add(function(a){
		self.buttonArmas.frame = 0;
	}, this);
	self.buttonArmas.events.onInputOver.add(function(a){
		Sounds.Interfaces.Buttons.TabHover.play();
		self.buttonArmas.frame = 1;
	}, this);
	self.buttonArmas.events.onInputDown.add(function(a){
		ShopOption = "Armas";
		Sounds.Interfaces.Buttons.TabClick.play();
		PhaserGame.state.start("Shop");
	}, this);
	//self.buttonArmas.fixedToCamera = true;
	// MEJORAS //
	self.buttonMejoras = PhaserGame.add.sprite(self.buttonArmas.position.x+141, self.buttonArmas.position.y, "button-mejoras");
	self.buttonMejoras.inputEnabled = true;
	self.buttonMejoras.events.onInputOut.add(function(a){
		self.buttonMejoras.frame = 0;
	}, this);
	self.buttonMejoras.events.onInputOver.add(function(a){
		Sounds.Interfaces.Buttons.TabHover.play();
		self.buttonMejoras.frame = 1;
	}, this);
	self.buttonMejoras.events.onInputDown.add(function(a){
		ShopOption = "Mejoras";
		Sounds.Interfaces.Buttons.TabClick.play();
		PhaserGame.state.start("Shop");
	}, this);
	//self.buttonMejoras.fixedToCamera = true;
	// TALLER //
	self.buttonTaller = PhaserGame.add.sprite(self.buttonMejoras.position.x+141, self.buttonMejoras.position.y, "button-taller");
	self.buttonTaller.inputEnabled = true;
	self.buttonTaller.events.onInputOut.add(function(a){
		self.buttonTaller.frame = 0;
	}, this);
	self.buttonTaller.events.onInputOver.add(function(a){
		Sounds.Interfaces.Buttons.TabHover.play();
		self.buttonTaller.frame = 1;
	}, this);
	self.buttonTaller.events.onInputDown.add(function(a){
		ShopOption = "Taller";
		Sounds.Interfaces.Buttons.TabClick.play();
		PhaserGame.state.start("Shop");
	}, this);
	//self.buttonTaller.fixedToCamera = true;
}
function TiendaMejoras(self, page){
	// Contenedor //
	self.container = PhaserGame.add.image(GameWidth/2-395.5, GameHeight/2-258, "container-menu");
	// Pestañas //
	BotonesTienda(self, true);
	// Menu de Monedas //
	MenuMonedas(self, true);
	//self.TitleCategory = PhaserGame.add.text(self.container.position.x+25, self.container.position.y+65, "#   Mejoras Para: ", {font: "14px Arial", fill: "#00f7ff"});
	self.SelectWeaponBG = PhaserGame.add.image(self.container.x+20, self.container.y+55, "select-weapon-bg");
	self.SelectWeapon = PhaserGame.add.button(self.SelectWeaponBG.x+156, 0, "select-weapon", ChangeWeaponCategory, this, 1, 0);
	self.SelectWeapon.y = CenterY(self.SelectWeapon, self.SelectWeaponBG);
	self.SelectWeapon.setDownSound(Sounds.Interfaces.Windows.Normal);
	self.SelectWeapon.inputEnabled = true;
	self.SelectWeapon.text = PhaserGame.add.text(0, 0, WeaponCategory, {font: "12px Arial", fill: "#00ccff"});
	self.SelectWeapon.text.position.set(CenterX(self.SelectWeapon.text, self.SelectWeapon), CenterY(self.SelectWeapon.text, self.SelectWeapon)+3);
	switch(WeaponCategory){
		case "Laser":
			switch(page){
				case 1:
					AddEnchanting(self, Mejoras.Weapons.Laser.Ammo, Mejoras.Weapons.Laser, Player.weapons.laser, Weapons.Laser, 20, 110, {key: "ammo", vel: 10, frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]});
					AddEnchanting(self, Mejoras.Weapons.Laser.AmmoPerFire, Mejoras.Weapons.Laser, Player.weapons.laser, Weapons.Laser, 280, 110, {key: "fm", vel: 10, frames: [0, 1, 2, 3, 4]});
					AddEnchanting(self, Mejoras.Weapons.Laser.Dmg, Mejoras.Weapons.Laser, Player.weapons.laser, Weapons.Laser, 540, 110, {key: "dmg", vel: 10, frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]});
				break;
				case 2:
					AddEnchanting(self, Mejoras.Weapons.Laser.Reload, Mejoras.Weapons.Laser, Player.weapons.laser, Weapons.Laser, 20, 110, {key: "reload", vel: 8, frames: [0,1,2,3,4]});
					AddEnchanting(self, Mejoras.Weapons.Laser.Interval, Mejoras.Weapons.Laser, Player.weapons.laser, Weapons.Laser, 280, 110, {key: "fastfire", vel: 10, frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]});
					AddEnchanting(self, Mejoras.Weapons.Laser.Velocity, Mejoras.Weapons.Laser, Player.weapons.laser, Weapons.Laser, 540, 110, {key: "sonicfire", vel: 15, frames: [0, 1, 2, 3, 4]});
				break;
			}
		break;
		case "Minigun":
			switch(page){
				case 1:
					AddEnchanting(self, Mejoras.Weapons.Minigun.Ammo, Mejoras.Weapons.Minigun, Player.weapons.minigun, Weapons.Minigun, 20, 110, {key: "ammo", vel: 10, frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]});
					AddEnchanting(self, Mejoras.Weapons.Minigun.AmmoPerFire, Mejoras.Weapons.Minigun, Player.weapons.minigun, Weapons.Minigun, 280, 110, {key: "fm", vel: 10, frames: [0, 1, 2, 3, 4]});
					AddEnchanting(self, Mejoras.Weapons.Minigun.Dmg, Mejoras.Weapons.Minigun, Player.weapons.minigun, Weapons.Minigun, 540, 110, {key: "dmg", vel: 10, frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]});
				break;
				case 2:
					AddEnchanting(self, Mejoras.Weapons.Minigun.Reload, Mejoras.Weapons.Minigun, Player.weapons.minigun, Weapons.Minigun, 20, 110, {key: "reload", vel: 8, frames: [0,1,2,3,4]});
					AddEnchanting(self, Mejoras.Weapons.Minigun.Interval, Mejoras.Weapons.Minigun, Player.weapons.minigun, Weapons.Minigun, 280, 110, {key: "fastfire", vel: 10, frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]});
					AddEnchanting(self, Mejoras.Weapons.Minigun.Velocity, Mejoras.Weapons.Minigun, Player.weapons.minigun, Weapons.Minigun, 540, 110, {key: "sonicfire", vel: 15, frames: [0, 1, 2, 3, 4]});
				break;
			}
		break;
		case "Missile":
			switch(page){
				case 1:
					AddEnchanting(self, Mejoras.Weapons.Missile.Ammo, Mejoras.Weapons.Missile, Player.weapons.missile, Weapons.Missile, 20, 110, {key: "ammo", vel: 10, frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]});
					AddEnchanting(self, Mejoras.Weapons.Missile.AmmoPerFire, Mejoras.Weapons.Missile, Player.weapons.missile, Weapons.Missile, 280, 110, {key: "fm", vel: 10, frames: [0, 1, 2, 3, 4]});
					AddEnchanting(self, Mejoras.Weapons.Missile.Dmg, Mejoras.Weapons.Missile, Player.weapons.missile, Weapons.Missile, 540, 110, {key: "dmg", vel: 10, frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]});
				break;
				case 2:
					AddEnchanting(self, Mejoras.Weapons.Missile.Reload, Mejoras.Weapons.Missile, Player.weapons.missile, Weapons.Missile, 20, 110, {key: "reload", vel: 8, frames: [0,1,2,3,4]});
					AddEnchanting(self, Mejoras.Weapons.Missile.Interval, Mejoras.Weapons.Missile, Player.weapons.missile, Weapons.Missile, 280, 110, {key: "fastfire", vel: 10, frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]});
					AddEnchanting(self, Mejoras.Weapons.Missile.Velocity, Mejoras.Weapons.Missile, Player.weapons.missile, Weapons.Missile, 540, 110, {key: "sonicfire", vel: 15, frames: [0, 1, 2, 3, 4]});
				break;
			}
		break;
	}
	// Paginacion //
	self.Pagination = PhaserGame.add.sprite(self.container.position.x+200, self.container.position.y+self.container.height-75, "pagination-buttons");
	self.Pagination.scale.set(0.7, 0.7);
	self.Pagination.animations.add("out", [18, 16, 14, 12, 10, 8, 6, 4, 2, 0], 20, false);
	self.Pagination.animations.add("over", [0, 2, 4, 6, 8, 10, 12, 14, 16, 18], 20, false);
	self.Pagination.inputEnabled = true;
	self.Pagination.events.onInputOut.add(function(a){a.animations.play("out");}, this);
	self.Pagination.events.onInputOver.add(function(a){a.animations.play("over");}, this);
	self.Pagination.events.onInputDown.add(function(a){ChangePage("Prev");}, this);
	// Pagina actual / Total //
	self.PaginationText = PhaserGame.add.text(0, 0, page+" / "+ShopPages, {font: "14px Arial", fill: "#00f7ff"});
	self.PaginationText.position.set(CenterX(self.PaginationText, self.container), self.container.position.y+self.container.height-68);
	// Boton Next //
	self.Pagination = PhaserGame.add.sprite(self.container.position.x+450, self.container.position.y+self.container.height-75, "pagination-buttons");
	self.Pagination.frame = 1;
	self.Pagination.scale.set(0.7, 0.7);
	self.Pagination.animations.add("out", [19, 17, 15, 13, 11, 9, 7, 5, 3, 1], 20, false);
	self.Pagination.animations.add("over", [1, 3, 5, 7, 9, 11, 13, 15, 17, 19], 20, false);
	self.Pagination.inputEnabled = true;
	self.Pagination.events.onInputOut.add(function(a){a.animations.play("out");}, this);
	self.Pagination.events.onInputOver.add(function(a){a.animations.play("over");}, this);
	self.Pagination.events.onInputDown.add(function(a){ChangePage("Next");}, this);
}
function AddEnchanting(self, enchantAmmo, enchantWeapon, playerWeapon, weapon, x, y, anim){
	// Container //
	self.ShopItem = PhaserGame.add.image(self.container.position.x+x, self.container.position.y+y, "enchanting-template");
	self.ShopItems.push({x: self.ShopItem.x, y: self.ShopItem.y, width: self.ShopItem.width, height: self.ShopItem.height});
	// Item Name //
	self.ItemName = PhaserGame.add.text(self.ShopItem.position.x+15, self.ShopItem.position.y+8, enchantAmmo.Name.toUpperCase(), {font: "14px Arial", fill: "#00ffea"});
	// Item Image //
	if(anim){
		self.ItemAnim = PhaserGame.add.sprite(self.ShopItem.position.x+10, self.ShopItem.position.y+35, anim.key);
		self.ItemAnim.animations.add("ItemAnimation", anim.frames, anim.frames.length, true);
		self.ItemAnim.play("ItemAnimation");
		self.ItemAnim.animations.currentAnim.speed = anim.vel;
	}
	// Item Cost //
	self.ItemCost = PhaserGame.add.text(self.ShopItem.position.x+90, self.ShopItem.position.y+135, enchantAmmo.price.gold, {font: "12px Arial", fill: "#00f7ff"});
	self.ItemCost = PhaserGame.add.text(self.ItemCost.position.x+50, self.ItemCost.position.y, enchantAmmo.price.silver, {font: "12px Arial", fill: "#00f7ff"});
	self.ItemCost = PhaserGame.add.text(self.ItemCost.position.x+50, self.ItemCost.position.y, enchantAmmo.price.copper, {font: "12px Arial", fill: "#00f7ff"});
	// Item Description //
	self.ItemDescription = PhaserGame.add.text(self.ShopItem.position.x+10, self.ShopItem.position.y+160, enchantAmmo.Description, {font: "12px Arial", fill: "#00f7ff"});
	// Mejoras Realizadas / Mejoras Maximas //
	self.ItemMejoraID = self.ItemMejora.length;
	self.ItemMejora[self.ItemMejoraID] = PhaserGame.add.text(0, 0, enchantAmmo.count+" / "+enchantAmmo.max, {font: "12px Arial", fill: "#00f7ff"});
	self.ItemMejora[self.ItemMejoraID].position.set(CenterX(self.ItemMejora[self.ItemMejoraID], self.ShopItem), self.ShopItem.position.y+(self.ShopItem.height-self.ItemMejora[self.ItemMejoraID].height-14));
	// Boton Menos //
	self.Button = PhaserGame.add.sprite(self.ShopItem.position.x+10, self.ShopItem.position.y+(self.ShopItem.height-43), "button-masmenos");
	self.Button.id = self.ItemMejoraID;
	self.Button.animations.add("out", [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 22, false);
	self.Button.animations.add("over", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 22, false);
	self.Button.inputEnabled = true;
	self.Button.events.onInputOut.add(function(a){a.animations.play("out");a.animations.currentAnim.speed = 80;}, this);
	self.Button.events.onInputOver.add(function(a){a.animations.play("over");a.animations.currentAnim.speed = 80;}, this);
	self.Button.events.onInputDown.add(function(a){self.Enchant("remove", enchantAmmo, enchantWeapon, playerWeapon, weapon, a.id);}, this);
	self.Button = PhaserGame.add.sprite(self.Button.position.x+175, self.Button.position.y, "button-masmenos");
	self.Button.id = self.ItemMejoraID;
	self.Button.frame = 11;
	self.Button.animations.add("out", [21, 20, 19,18, 17, 16, 15, 14, 13, 12, 11], 22, false);
	self.Button.animations.add("over", [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], 22, false);
	self.Button.inputEnabled = true;
	self.Button.events.onInputOut.add(function(a){a.animations.play("out");a.animations.currentAnim.speed = 80;}, this);
	self.Button.events.onInputOver.add(function(a){a.animations.play("over");a.animations.currentAnim.speed = 80;}, this);
	self.Button.events.onInputDown.add(function(a){self.Enchant("add", enchantAmmo, enchantWeapon, playerWeapon, weapon, a.id);}, this);
}
// Sistema Mensaje de Alerta //
function ShowMessage(t, m, f, s, self){
	if(!self.messageBox){
		var style = {font: "16px Arial", fill: "#00fff2",  fontStyle: "italic"};
		self.stateStop = true;
		self.messageBox = PhaserGame.add.image(self.container.position.x+(395.5-253), self.container.position.y+(258-106), "message");
		self.titleMessage = PhaserGame.add.text(0, 0, t, {font: "20px Arial", fill: "#00fff2"});
		self.titleMessage.position.set(self.messageBox.position.x+(253-self.titleMessage.width/2), self.messageBox.position.y+15);
		self.messageContent = PhaserGame.add.text(self.messageBox.position.x+20, self.messageBox.position.y+60, m, style);
		self.buttonMessage = PhaserGame.add.sprite(0, 0, "button-okay");
		self.buttonMessage.scale.set(0.8, 0.8);
		self.buttonMessage.position.set(CenterX(self.buttonMessage, self.messageBox), self.messageBox.position.y+(self.messageBox.height-60));
		self.buttonMessage.inputEnabled = true;
		self.buttonMessage.animations.add("Bplay-over", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false);
		self.buttonMessage.animations.add("Bplay-out", [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 10, false);
		self.buttonMessage.events.onInputOut.add(function(a){a.animations.play("Bplay-out");a.animations.currentAnim.speed = 50;}, this);
		self.buttonMessage.events.onInputOver.add(function(a){a.animations.play("Bplay-over");a.animations.currentAnim.speed = 50;}, this);
		self.buttonMessage.events.onInputDown.add(function(){f(self);}, this);
		s.play();
	}
}
function RemoveMessage(self){
	self.messageBox.destroy();
	self.titleMessage.destroy();
	self.buttonMessage.destroy();
	self.messageContent.destroy();
	self.messageBox = undefined;
	self.stateStop = false;
}
function UpdateTop(){
	Menu.Loser = false;
	RemoveMessage(Menu);
}
function ChangePage(a){
	switch(a){
		case "Prev":
			if(ShopPage == 1){
				return false;
			}
			ShopPage--;
		break;
		case "Next":
			if(ShopPage == ShopPages){
				return false;
			}
			ShopPage++;
		break;
	}
	PhaserGame.state.start("Shop");
}
var FadeInterval;
function FadeOut(a, b){
	var s = b/10;
	if(a.alpha <= 0){
		clearInterval(FadeInterval);
		return false;
	}
	a.alpha -= 0.1;
	setTimeout(function(){
		FadeOut(a, b);
	}, s);
}
function FadeIn(a, b){
	var s = b/10;
	if(a.alpha >= 1){
		clearInterval(FadeInterval);
		return false;
	}
	a.alpha += 0.1;
	setTimeout(function(){
		FadeIn(a, b);
	}, s);
}
function SlideOut(a, b){
	var s = b/10;
	if(a.scale.x <= 0 || a.scale.y <= 0){
		a.scale.set(0, 0);
		clearInterval(FadeInterval);
		return false;
	}
	a.scale.x -= 0.05;
	a.scale.y -= 0.05;
	setTimeout(function(){
		SlideOut(a, b);
	}, s);
}
function SlideIn(a, b){
	var s = b/10;
	if(a.scale.x >= 1 || a.scale.y >= 1){
		a.scale.set(1, 1);
		clearInterval(FadeInterval);
		return false;
	}
	a.scale.x += 0.05;
	a.scale.y += 0.05;
	setTimeout(function(){
		SlideIn(a, b);
	}, s);
}
function ChangeWeaponCategory(a){
	if(self.WeaponCategoryContent){
		self.WeaponCategoryContent.destroy();
	}
	self.WeaponCategoryContent = PhaserGame.add.image(a.x, a.y+a.height, "select-weapon-content");
	// Laser //
	self.SelectCategory = PhaserGame.add.button(self.WeaponCategoryContent.x, self.WeaponCategoryContent.y, "button-content", SetCategory, this, 1, 0);
	self.SelectCategory.text = PhaserGame.add.text(0, 0, "Laser", {font: "12px Arial", fill: "#00bbff"});
	self.SelectCategory.text.position.set(CenterX(self.SelectCategory.text, self.SelectCategory), CenterY(self.SelectCategory.text, self.SelectCategory)+3);
	self.SelectCategory.setDownSound(Sounds.Interfaces.Buttons.TabClick);
	// Minigun //
	self.SelectCategory = PhaserGame.add.button(self.WeaponCategoryContent.x, self.WeaponCategoryContent.y+38, "button-content", SetCategory, this, 1, 0);
	self.SelectCategory.text = PhaserGame.add.text(0, 0, "Minigun", {font: "12px Arial", fill: "#00bbff"});
	self.SelectCategory.text.position.set(CenterX(self.SelectCategory.text, self.SelectCategory), CenterY(self.SelectCategory.text, self.SelectCategory)+3);
	self.SelectCategory.setDownSound(Sounds.Interfaces.Buttons.TabClick);
	// Missile //
	self.SelectCategory = PhaserGame.add.button(self.WeaponCategoryContent.x, self.WeaponCategoryContent.y+76, "button-content", SetCategory, this, 1, 0);
	self.SelectCategory.text = PhaserGame.add.text(0, 0, "Missile", {font: "12px Arial", fill: "#00bbff"});
	self.SelectCategory.text.position.set(CenterX(self.SelectCategory.text, self.SelectCategory), CenterY(self.SelectCategory.text, self.SelectCategory)+3);
	self.SelectCategory.setDownSound(Sounds.Interfaces.Buttons.TabClick);

}
function SetCategory(a){
	WeaponCategory = a.text.text;
	PhaserGame.state.start("Shop");
}