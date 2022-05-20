Shop = {
	preload: function(){
		PhaserGame.physics.startSystem(Phaser.Physics.ARCADE);
		this.background = PhaserGame.add.tileSprite(0, 0, GameWidth, 1000, "space");
		this.ItemMejora = [];
		this.ItemMejoraID = 0;
		this.ShopItems = [];
		switch(ShopOption){
			case "Armas":
				TiendaArmas(Shop, Help.TiendaArmas);
			break;
			case "Mejoras":
				TiendaMejoras(Shop, ShopPage);
			break;
			case "Taller":
				Taller(Shop, Help.Taller);
			break;
		}
		//PhaserGame.world.setBounds(0, 0, GameWidth, 1000);
	},
	create: function(){

	},
	update: function(){
		// Vender Item //
		if(this.ShipPart){
			for(var i = 0; i < this.ShipPart.length; i++){
				PhaserGame.physics.arcade.overlap(this.ShipPart[i], this.SellWeapon, this.SellItem, null, this);
			}
		}
		// Control de Monedas //
		if(Player.Money.silver >= 100){
			Player.Money.silver -= 100;
			Player.Money.gold += 1;
		}
		if(Player.Money.copper >= 100){
			Player.Money.copper -= 100;
			Player.Money.silver += 1;
		}
		if(Player.Money.silver < 0){
			Player.Money.silver += 100;
			Player.Money.gold -= 1;
		}
		if(Player.Money.copper < 0){
			Player.Money.copper += 100;
			Player.Money.silver -= 1;
		}
		this.GoldMoney.text = Player.Money.gold;
		this.SilverMoney.text = Player.Money.silver;
		this.CopperMoney.text = Player.Money.copper;
		// Mover Armas de Nave //
		if(this.ShipPartMove){
			var ShipPartID = this.ShipPart[this.ShipPartFocus].posID;
			this.ShipPart[this.ShipPartFocus].position.set(PhaserGame.input.mousePointer.position.x-this.ShipPart[this.ShipPartFocus].width/2, PhaserGame.input.mousePointer.position.y-this.ShipPart[this.ShipPartFocus].height/2);
			if(this.ShipPart[this.ShipPartFocus].type == "laser"){
				Player.weapons.laser.position[ShipPartID].x = (this.ShipPart[this.ShipPartFocus].position.x-this.NaveGuerra.position.x)/2;
				Player.weapons.laser.position[ShipPartID].y = (this.ShipPart[this.ShipPartFocus].position.y-this.NaveGuerra.position.y)/2;
				if(Player.weapons.laser.position[ShipPartID].x < 0){
					Player.weapons.laser.position[ShipPartID].x = 0;
				}
				if(Player.weapons.laser.position[ShipPartID].x > 110-6.5){
					Player.weapons.laser.position[ShipPartID].x = 100+6.5;
				}
				if(Player.weapons.laser.position[ShipPartID].y < 0){
					Player.weapons.laser.position[ShipPartID].y = 0;
				}
				if(Player.weapons.laser.position[ShipPartID].y > 110-22){
					Player.weapons.laser.position[ShipPartID].y = 110-22;
				}
			}
			if(this.ShipPart[this.ShipPartFocus].type == "minigun"){
				Player.weapons.minigun.position[ShipPartID].x = (this.ShipPart[this.ShipPartFocus].position.x-this.NaveGuerra.position.x)/2;
				Player.weapons.minigun.position[ShipPartID].y = (this.ShipPart[this.ShipPartFocus].position.y-this.NaveGuerra.position.y)/2;
				if(Player.weapons.minigun.position[ShipPartID].x < 0){
					Player.weapons.minigun.position[ShipPartID].x = 0;
				}
				if(Player.weapons.minigun.position[ShipPartID].x > 110-11){
					Player.weapons.minigun.position[ShipPartID].x = 110-11;
				}
				if(Player.weapons.minigun.position[ShipPartID].y < 0){
					Player.weapons.minigun.position[ShipPartID].y = 0;
				}
				if(Player.weapons.minigun.position[ShipPartID].y > 110-16.5){
					Player.weapons.minigun.position[ShipPartID].y = 110-16.5;
				}
			}
			if(this.ShipPart[this.ShipPartFocus].type == "missile"){
				Player.weapons.missile.position[ShipPartID].x = (this.ShipPart[this.ShipPartFocus].position.x-this.NaveGuerra.position.x)/2;
				Player.weapons.missile.position[ShipPartID].y = (this.ShipPart[this.ShipPartFocus].position.y-this.NaveGuerra.position.y)/2;
				if(Player.weapons.missile.position[ShipPartID].x < 0){
					Player.weapons.missile.position[ShipPartID].x = 0;
				}
				if(Player.weapons.missile.position[ShipPartID].x > 110-6){
					Player.weapons.missile.position[ShipPartID].x = 100+6;
				}
				if(Player.weapons.missile.position[ShipPartID].y < 0){
					Player.weapons.missile.position[ShipPartID].y = 0;
				}
				if(Player.weapons.missile.position[ShipPartID].y > 110-32.5){
					Player.weapons.missile.position[ShipPartID].y = 110-32.5;
				}
			}
		}
		if(Player.weapons.laser.position.length > 0){
			Player.weapons.laser.active = true;
		}else{
			Player.weapons.laser.active = false;
		}
		if(Player.weapons.minigun.position.length > 0){
			Player.weapons.minigun.active = true;
		}else{
			Player.weapons.minigun.active = false;
		}
		if(Player.weapons.missile.position.length > 0){
			Player.weapons.missile.active = true;
		}else{
			Player.weapons.missile.active = false;
		}
	},
	SellItem: function(a, b){
		b.frame = 1;
		if(PhaserGame.input.mousePointer.isUp){
			switch(a.type){
				case "laser":
					var PositionID = 0;
					Player.weapons.laser.position.splice(a.posID, 1);
					this.ShipPart.splice(a.id, 1);
					Player.Money.gold += Weapons.Laser.Price.Sell.gold;
					Player.Money.silver += Weapons.Laser.Price.Sell.silver;
					Player.Money.copper += Weapons.Laser.Price.Sell.copper;
					for(var i = 0; i < this.ShipPart.length; i++){
						if(this.ShipPart[i].type == "laser"){
							this.ShipPart[i].posID = PositionID;
							PositionID++;
						}
					}
					a.destroy();
					b.frame = 0;
					Sounds.Effects.Money.play();
				break;
				case "minigun":
					var PositionID = 0;
					Player.weapons.minigun.position.splice(a.posID, 1);
					this.ShipPart.splice(a.id, 1);
					Player.Money.gold += Weapons.Minigun.Price.Sell.gold;
					Player.Money.silver += Weapons.Minigun.Price.Sell.silver;
					Player.Money.copper += Weapons.Minigun.Price.Sell.copper;
					for(var i = 0; i < this.ShipPart.length; i++){
						if(this.ShipPart[i].type == "minigun"){
							this.ShipPart[i].posID = PositionID;
							PositionID++;
						}
					}
					a.destroy();
					b.frame = 0;
					Sounds.Effects.Money.play();
				break;
				case "missile":
					var PositionID = 0;
					Player.weapons.missile.position.splice(a.posID, 1);
					this.ShipPart.splice(a.id, 1);
					Player.Money.gold += Weapons.Missile.Price.Sell.gold;
					Player.Money.silver += Weapons.Missile.Price.Sell.silver;
					Player.Money.copper += Weapons.Missile.Price.Sell.copper;
					for(var i = 0; i < this.ShipPart.length; i++){
						if(this.ShipPart[i].type == "missile"){
							this.ShipPart[i].posID = PositionID;
							PositionID++;
						}
					}
					a.destroy();
					b.frame = 0;
					Sounds.Effects.Money.play();
				break;
			}
			// Reacomodar las ids de las partes //
			for(var i = 0; i < this.ShipPart.length; i++){
				this.ShipPart[i].id = i;
			}
		}
	},
	Enchant: function(action, enchantAmmo, enchantWeapon, playerWeapon, weapon, id){
		switch(action){
			case "add":
				if(enchantAmmo.count >= enchantAmmo.max){
					enchantAmmo.count = enchantAmmo.max;
					Sounds.Interfaces.Windows.Error.play();
					return false;
				}
				if(this.ValidatePrice(Player, enchantAmmo)){
					this.MoneyDistribution(action, Player, enchantAmmo);
					this.getBetter(action, enchantAmmo, id);
					this.UpdatePlayerEnchanting(enchantAmmo, enchantWeapon, playerWeapon, weapon);
				}else{
					Sounds.Effects.NoMoney.play();
				}
			break;
			case "remove":
				if(enchantAmmo.count <= 0){
					enchantAmmo.count = 0;
					Sounds.Interfaces.Windows.Error.play();
					return false;
				}
				if(enchantAmmo.count > 0){
					this.MoneyDistribution(action, Player, enchantAmmo);
					this.getBetter(action, enchantAmmo, id);
					this.UpdatePlayerEnchanting(enchantAmmo, enchantWeapon, playerWeapon, weapon);
				}
			break;
		}
	},
	ValidatePrice: function(player, enchantAmmo){
		if(player.Money.gold > enchantAmmo.price.gold){
			return true;
		}else if(player.Money.gold == enchantAmmo.price.gold && player.Money.silver == enchantAmmo.price.silver && player.Money.copper >= enchantAmmo.price.copper){
			return true;
		}else if(player.Money.gold == enchantAmmo.price.gold && player.Money.silver > enchantAmmo.price.silver){
			return true;
		}else{
			return false;
		}
	},
	MoneyDistribution: function(action, player, enchantAmmo){
		if(action == "add"){
			player.Money.gold -= enchantAmmo.price.gold;
			player.Money.silver -= enchantAmmo.price.silver;
			player.Money.copper -= enchantAmmo.price.copper;
		}else{
			player.Money.gold += enchantAmmo.price.gold;
			player.Money.silver += enchantAmmo.price.silver;
			player.Money.copper += enchantAmmo.price.copper;
		}
	},
	getBetter: function(action, enchantAmmo, id){
		if(action == "add"){
			enchantAmmo.count += enchantAmmo.buyCount;
			this.ItemMejora[id].text = enchantAmmo.count+" / "+enchantAmmo.max;
			this.ItemMejora[id].x = CenterX(this.ItemMejora[id], this.ShopItems[id]);
			Sounds.Effects.Money.play();
		}else{
			enchantAmmo.count -= enchantAmmo.buyCount;
			this.ItemMejora[id].text = enchantAmmo.count+" / "+enchantAmmo.max;
			this.ItemMejora[id].x = CenterX(this.ItemMejora[id], this.ShopItems[id]);
			Sounds.Effects.Money.play();
		}
	},
	UpdatePlayerEnchanting: function(enchantAmmo, enchantWeapon, playerWeapon, weapon){
		playerWeapon.ammo = JSON.parse(JSON.stringify(weapon.ammo*playerWeapon.position.length+enchantWeapon.Ammo.count));
		playerWeapon.reload = JSON.parse(JSON.stringify(weapon.Reload-enchantWeapon.Reload.count));
		playerWeapon.interval = JSON.parse(JSON.stringify(weapon.Interval-enchantWeapon.Interval.count));
		playerWeapon.velocity = JSON.parse(JSON.stringify(weapon.velocity+enchantWeapon.Velocity.count));
		playerWeapon.ammoperfire = JSON.parse(JSON.stringify(weapon.MultipleFire+enchantWeapon.AmmoPerFire.count));
		playerWeapon.dmg = JSON.parse(JSON.stringify(weapon.Dmg+enchantWeapon.Dmg.count));
		// Verificacion //
		/*console.log("---- -- UPDATE -- ----");
		console.log(">> Ammo: "+playerWeapon.ammo);
		console.log(">> Reload: "+playerWeapon.reload);
		console.log(">> Interval: "+playerWeapon.interval);
		console.log(">> Velocity: "+playerWeapon.velocity);
		console.log(">> AmmoPerFire: "+playerWeapon.ammoperfire);
		console.log(">> Damage: "+playerWeapon.dmg);*/
	}
}