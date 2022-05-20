Game = {
	preload : function(){
		// TEMP //
		this.Interval;
		this.isMoveX = 0;
		this.isMoveY = 0;
		this.ClearSpritesTime = 0;
		this.ClearSpritesInterval = 5000;
		this.EnemyID = 0;
	},
	create : function(){
		// Fisica //
		PhaserGame.physics.startSystem(Phaser.Physics.ARCADE);
		PhaserGame.physics.startSystem(Phaser.Physics.P2JS);
		// Grupo de Collisiones //
		this.PlayerCollision = PhaserGame.physics.p2.createCollisionGroup();
		this.BulletCollision = PhaserGame.physics.p2.createCollisionGroup();
		PhaserGame.physics.p2.updateBoundsCollisionGroup();
		// Fondo y Ambientacion //
		PhaserGame.world.setBounds(0, 0, 0, Level.MapSize);
		this.bg = PhaserGame.add.tileSprite(0, 0, GameWidth, Level.MapSize, "space");
		PhaserGame.camera.y = Level.MapSize;
		Sounds.Backgrounds.Marte.stop();
		Sounds.Backgrounds.Marte.play();
		// Player //
		this.Player = PhaserGame.add.sprite(GameWidth/2-55, PhaserGame.camera.y+(GameHeight-300), Player.ship);
		PhaserGame.physics.p2.enable([this.Player], true);
		this.Player.scale.set(0.5, 0.5);
		this.Player.body.fixedRotation = true;
		this.Player.body.clearShapes();
		this.Player.body.loadPolygon("json", "SHIP", 0.5);
		this.Player.body.setCollisionGroup(this.PlayerCollision);
		this.Player.body.collides([this.PlayerCollision, this.BulletCollision]);
		this.Player.body.onBeginContact.add(Collision, this);
		// Ships Parts //
		this.ShipParts = PhaserGame.add.group();
		this.EnemyShipParts = PhaserGame.add.group();
		for(var i = 0; i < Player.weapons.laser.position.length; i++){
			this.ShipPart = this.ShipParts.create(this.Player.position.x+Player.weapons.laser.position[i].x, this.Player.position.y+Player.weapons.laser.position.y-10, "laser");
			this.ShipPart.scale.set(0.5, 0.5)
			this.ShipPart.id = i;
		}
		for(var i = 0; i < Player.weapons.minigun.position.length; i++){
			this.ShipPart = this.ShipParts.create(this.Player.position.x+Player.weapons.minigun.position[i].x, this.Player.position.y+Player.weapons.minigun.position.y-20, "mini-gun");
			this.ShipPart.scale.set(0.5, 0.5)
			this.ShipPart.id = i;
		}
		for(var i = 0; i < Player.weapons.missile.position.length; i++){
			this.ShipPart = this.ShipParts.create(this.Player.position.x+Player.weapons.missile.position[i].x, this.Player.position.y+Player.weapons.missile.position.y, "missile");
			this.ShipPart.scale.set(0.5, 0.5)
			this.ShipPart.id = i;
		}
		// Bullets //
		this.bullets = PhaserGame.add.group();
		this.bullets.enableBody = true;
		this.EnemyBullets = PhaserGame.add.group();
		this.EnemyBullets.enableBody = true;
		// Enemies //
		this.Enemies = PhaserGame.add.group();
		this.Enemies.enableBody = true;
		// Tablero del Jugador //
		TableroDeJuego(this);
		// Cuenta Regresiva //
		PhaserGame.paused = true;
		this.CuentaAtras = PhaserGame.add.text(0, 0, Level.StartGameTime, {font: "bold 26px Arial"});
		this.CuentaAtras.addColor("#fff", 0);
		this.CuentaAtras.position.set(GameWidth/2-this.CuentaAtras.width/2, GameHeight/2-this.CuentaAtras.height/2);
		this.CuentaAtras.fixedToCamera = true;
		console.log("Dificultad: "+Level.Difficulty+", Nivel: "+Level.Current);
		this.Interval = setInterval("Game.CuentaRegresiva()", 1000);
	},
	update : function(){

		// Escudo //
		if(Player.shield.active && Player.shield.absorb > 0){
			if(!Player.shield.used){
				this.AddShield();
				return false;
			}
			this.Shield.position.set(CenterX(this.Shield, this.Player), CenterY(this.Shield, this.Player));
		}

		// Deteccion de Colisiones //
		PhaserGame.physics.arcade.overlap(this.bullets, this.Enemies, this.EnemyImpact, null, this);
		PhaserGame.physics.arcade.overlap(this.Player, this.EnemyBullets, this.PlayerImpact, null, this);
		// Control de Bullets //
		for(var i = 0; i < this.bullets.hash.length; i++){
			if(this.bullets.hash[i].type == "missile"){
				this.bullets.hash[i].body.velocity.y -= Player.weapons.missile.velocity;
			}
			if( (this.Player.position.y-this.bullets.hash[i].position.y) > 1000 ){
				this.bullets.hash[i].destroy();
			}
		}
		for(var i = 0; i < this.EnemyBullets.length; i++){
			if(this.EnemyBullets.hash[i].type == "missile"){
				this.EnemyBullets.hash[i].body.velocity.y -= Player.weapons.missile.velocity;
			}
			if( (this.Player.position.y-this.EnemyBullets.hash[i].position.y) < -500 ){
				this.EnemyBullets.hash[i].destroy();
			}
		}
		// Partes de Nave //
		for(var i = 0; i < this.ShipParts.children.length; i++){
			if(this.ShipParts.children[i].key == "laser"){
				var partid = this.ShipParts.children[i].id;
				var PositionX = this.Player.position.x+Player.weapons.laser.position[partid].x;
				var PositionY = this.Player.position.y+Player.weapons.laser.position[partid].y;
				this.ShipParts.children[i].position.set(PositionX+this.isMoveX, PositionY+this.isMoveY);
			}else if(this.ShipParts.children[i].key == "mini-gun"){
				var partid = this.ShipParts.children[i].id;
				var PositionX = this.Player.position.x+Player.weapons.minigun.position[partid].x;
				var PositionY = this.Player.position.y+Player.weapons.minigun.position[partid].y;
				this.ShipParts.children[i].position.set(PositionX+this.isMoveX, PositionY+this.isMoveY);
			}else if(this.ShipParts.children[i].key == "missile"){
				var partid = this.ShipParts.children[i].id;
				var PositionX = this.Player.position.x+Player.weapons.missile.position[partid].x;
				var PositionY = this.Player.position.y+Player.weapons.missile.position[partid].y;
				this.ShipParts.children[i].position.set(PositionX+this.isMoveX, PositionY+this.isMoveY);
			}
		}
		// Funciones al comenzar el Juego //
		if(Level.StartGame){
			// Estado de Nivel //
			this.LevelStatus();
			// Controls del Player //
			this.PlayerControls();
			// Generar Enemigos //
			this.EnemyGenerate();
			// Seguir al Player //
			this.EnemyFollow();
			// Fuego Enemigo //
			for(var i = 0; i < this.Enemies.length; i++){
				if(this.Enemies.hash[i].exists){
					// Barra de Municiones Enemigas //
					if(this.Enemies.hash[i].custom.weapons.laser.active){
						this.EnemyFire(i, this.Enemies.hash[i].custom.weapons.laser);
						this.Enemies.hash[i].custom.weapons.laser.ammobar.position.set(CenterX(this.Enemies.hash[i].custom.weapons.laser.ammobar, this.Enemies.hash[i]), this.Enemies.hash[i].position.y-10);
					}
					if(this.Enemies.hash[i].custom.weapons.minigun.active){
						this.EnemyFire(i, this.Enemies.hash[i].custom.weapons.minigun);
						this.Enemies.hash[i].custom.weapons.minigun.ammobar.position.set(CenterX(this.Enemies.hash[i].custom.weapons.minigun.ammobar, this.Enemies.hash[i]), this.Enemies.hash[i].position.y-20);
					}
					if(this.Enemies.hash[i].custom.weapons.missile.active){
						this.EnemyFire(i, this.Enemies.hash[i].custom.weapons.missile);
						this.Enemies.hash[i].custom.weapons.missile.ammobar.position.set(CenterX(this.Enemies.hash[i].custom.weapons.missile.ammobar, this.Enemies.hash[i]), this.Enemies.hash[i].position.y-30);
					}
					// Acoplar armas a naves enemigas //
					for(var a = 0; a < this.EnemyShipParts.length; a++){
						if(this.EnemyShipParts.children[a].id == this.Enemies.hash[i].id){
							var partid = this.Enemies.hash[i].id;
							if(this.EnemyShipParts.children[a].key == "enemy-laser"){
								//var partid = this.EnemyShipParts.children[a].id;
								var PositionX = this.Enemies.hash[i].position.x+this.Enemies.hash[i].custom.weapons.laser.position[0].x;
								var PositionY = this.Enemies.hash[i].position.y+this.Enemies.hash[i].custom.weapons.laser.position[0].y;
								this.EnemyShipParts.children[a].position.set(PositionX, PositionY);
							}
							if(this.EnemyShipParts.children[a].key == "enemy-minigun"){
								//var partid = this.EnemyShipParts.children[a].id;
								var PositionX = this.Enemies.hash[i].position.x+this.Enemies.hash[i].custom.weapons.minigun.position[0].x;
								var PositionY = this.Enemies.hash[i].position.y+this.Enemies.hash[i].custom.weapons.minigun.position[0].y;
								this.EnemyShipParts.children[a].position.set(PositionX, PositionY);
							}
							if(this.EnemyShipParts.children[a].key == "enemy-missile"){
								//var partid = this.EnemyShipParts.children[a].id;
								var PositionX = this.Enemies.hash[i].position.x+this.Enemies.hash[i].custom.weapons.missile.position[0].x;
								var PositionY = this.Enemies.hash[i].position.y+this.Enemies.hash[i].custom.weapons.missile.position[0].y;
								this.EnemyShipParts.children[a].position.set(PositionX, PositionY);
							}
						}
					}
				}
			}
			// Limpieza de Sprites //
			this.ClearSprites();
			// Control de Monedas //
			if(Player.Money.silver >= 100){
				Player.Money.silver -= 100;
				Player.Money.gold += 1;
			}
			if(Player.Money.copper >= 100){
				Player.Money.copper -= 100;
				Player.Money.silver += 1;
			}
			// Actualizar Monedas //
			this.Gold.text = Player.Money.gold;
			this.Silver.text = Player.Money.silver;
			this.Copper.text = Player.Money.copper;
			// Denter Tiempo en Pausa //
			if(this.GamePuase){
				PhaserGame.time.now = this.FreezeTime;
			}
		}
	},
	LevelStatus: function(){
		if(Level.ActualDistance >= Level.Distance){
			NextLevel(Level.Difficulty);
			return false;
		}
		this.camera.y -= 1;
		Level.ActualDistance++;
		this.expBar.width = Level.ActualDistance/Level.Distance*633;
	},
	ClearSprites: function(){
		if(PhaserGame.time.now > this.ClearSpritesTime){
			for(var i = 0; i < this.Enemies.length; i++){
				if(!this.Enemies.hash[i].exists){
					this.Enemies.hash[i].destroy();
				}
			}
			for(var i = 0; i < this.bullets.length; i++){
				if(!this.bullets.hash[i].exists){
					this.bullets.hash[i].destroy();
				}
			}
		}
	},
	EnemyGenerate: function(){
		if(PhaserGame.time.now > Enemies.Spawn){
			for(var i = 0; i < 3; i++){
				this.Enemy = this.Enemies.create(Math.floor((Math.random())*1000), PhaserGame.camera.y+50, Enemies.ship);
				this.Enemy.scale.set(0.3, 0.3);
				this.Enemy.custom = JSON.parse(JSON.stringify(Enemies));
				this.Enemy.id = this.EnemyID;
				this.Enemy.body.velocity.y = -Enemies.velocity;
				// REORDENAR CODE //
				/*if(this.Enemy.custom.weapons.laser.active){
					for(var i = 0; i < this.Enemy.custom.weapons.laser.position.length; i++){
						this.EnemyShipPart = this.EnemyShipParts.create(this.Enemy.x+this.Enemy.custom.weapons.laser.position[i].x, this.Enemy.y+this.Enemy.custom.weapons.laser.position[i].x, "enemy-laser");
						this.EnemyShipPart.scale.set(0.5, 0.5)
						this.EnemyShipPart.id = this.EnemyID;
					}
				}
				if(this.Enemy.custom.weapons.minigun.active){
					for(var i = 0; i < this.Enemy.custom.weapons.minigun.position.length; i++){
						this.EnemyShipPart = this.EnemyShipParts.create(this.Enemy.x+this.Enemy.custom.weapons.minigun.position[i].x, this.Enemy.y+this.Enemy.custom.weapons.minigun.position[i].x, "enemy-minigun");
						this.EnemyShipPart.scale.set(0.5, 0.5)
						this.EnemyShipPart.id = this.EnemyID;
					}
				}
				if(this.Enemy.custom.weapons.missile.active){
					for(var i = 0; i < this.Enemy.custom.weapons.missile.position.length; i++){
						this.EnemyShipPart = this.EnemyShipParts.create(this.Enemy.x+this.Enemy.custom.weapons.missile.position[i].x, this.Enemy.y+this.Enemy.custom.weapons.missile.position[i].x, "enemy-missile");
						this.EnemyShipPart.scale.set(0.5, 0.5)
						this.EnemyShipPart.id = this.EnemyID;
					}
				}*/
				if(this.Enemy.custom.weapons.laser.active){
					this.Enemy.custom.weapons.laser.ammobar = PhaserGame.add.tileSprite(0, 0, 105, 9, "weapon-bar");
					this.Enemy.custom.weapons.laser.ammobar.position.set(this.Enemy.position.x, this.Enemy.position.y-20);
				}
				if(this.Enemy.custom.weapons.minigun.active){
					this.Enemy.custom.weapons.minigun.ammobar = PhaserGame.add.tileSprite(0, 0, 105, 9, "weapon-bar");
					this.Enemy.custom.weapons.minigun.ammobar.position.set(this.Enemy.position.x, this.Enemy.position.y-10);
				}
				if(this.Enemy.custom.weapons.missile.active){
					this.Enemy.custom.weapons.missile.ammobar = PhaserGame.add.tileSprite(0, 0, 105, 9, "weapon-bar");
					this.Enemy.custom.weapons.missile.ammobar.position.set(this.Enemy.position.x, this.Enemy.position.y);
				}
				this.EnemyID++;
			}
			Enemies.Spawn = PhaserGame.time.now+Enemies.Interval;
		}
	},
	EnemyFire: function(i, weapon){
		if(weapon.ammouse == weapon.ammo){
			this.EnemyReload(weapon);
			return false;
		}
		if(PhaserGame.time.now > weapon.FireTime){
			if(weapon.position.length >= 1){
				if((weapon.ammo-weapon.ammouse) < weapon.position.length*weapon.ammoperfire){
					if( (weapon.ammo-weapon.ammouse) >= weapon.ammoperfire){
						for(var c = 0; c < weapon.ammoperfire; c++){
							weapon.ammouse++;
							weapon.ammobar.width -= 105/weapon.ammo;
							this.EnemyGenerateBullet(weapon, this.Enemies.hash[i].position.x+weapon.position[0].x, this.Enemies.hash[i].position.y+weapon.position[0].y);
						}
					}else{
						weapon.ammouse++;
						weapon.ammobar.width -= 105/weapon.ammo;
						this.EnemyGenerateBullet(weapon, this.Enemies.hash[i].position.x+weapon.position[0].x, this.Enemies.hash[i].position.y+weapon.position[0].y);
					}
				}else{
					for(var a = 0; a < weapon.position.length; a++){
						for(var b = 0; b < weapon.ammoperfire; b++){
							weapon.ammouse++;
							weapon.ammobar.width -= 105/weapon.ammo;
							this.EnemyGenerateBullet(weapon, this.Enemies.hash[i].position.x+weapon.position[a].x, this.Enemies.hash[i].position.y+weapon.position[a].y);
						}
					}
				}
			}
			weapon.FireTime = PhaserGame.time.now+weapon.interval;
		}
	},
	EnemyReload: function(a){
		if(a.ReloadTime >= a.reload){
			//clearInterval(a.ReloadInterval);
			a.ammouse = 0;
			a.loading = false;
			a.ReloadTime = 0;
			a.currentReload = 0;
			a.ReloadInterval = undefined;
			return false;
		}
		a.ReloadTime += 20;
		a.ammobar.width = 105*a.ReloadTime/a.reload;
	},
	EnemyFollow: function(){
		for(var i = 0; i < this.Enemies.length; i++){
			if(this.Enemies.hash[i].exists){
				if(this.Enemies.hash[i].position.x < CenterX(this.Enemies.hash[i], this.Player)){
					this.Enemies.hash[i].body.velocity.x = Enemies.velocity;
				}else if(this.Enemies.hash[i].position.x > CenterX(this.Enemies.hash[i], this.Player)){
					this.Enemies.hash[i].body.velocity.x = -Enemies.velocity;
				}else{
					this.Enemies.hash[i].body.velocity.x = 0;
				}
			}
		}
	},
	EnemyImpact: function(a, b){
		a.kill();
		this.explosion = PhaserGame.add.sprite(0, 0, "explosion");
		this.explosion.position.set(CenterX(this.explosion, b), CenterY(this.explosion, b));
		PhaserGame.physics.arcade.enable(this.explosion);
		this.explosion.body.velocity.y = -60;
		this.explosion.animations.add("explosion-anim", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 24, false);
		this.explosion.animations.play("explosion-anim");
		this.explosion.events.onAnimationComplete.add(function(e){
			e.destroy();
		}, this);
		if(a.dmg >= b.custom.hp){
			b.kill();
			Player.Money.gold += b.custom.Money.gold;
			Player.Money.silver += b.custom.Money.silver;
			Player.Money.copper += b.custom.Money.copper;
			if(b.custom.weapons.laser.active){
				b.custom.weapons.laser.ammobar.kill();
				clearInterval(b.custom.weapons.laser.ReloadInterval);
				for(var i = 0; i < this.EnemyShipParts.length; i++){
					if(this.EnemyShipParts.children[i].id == b.id){
						this.EnemyShipParts.children[i].destroy();
					}
				}
			}
			if(b.custom.weapons.minigun.active){
				b.custom.weapons.minigun.ammobar.kill();
				clearInterval(b.custom.weapons.minigun.ReloadInterval);
				for(var i = 0; i < this.EnemyShipParts.length; i++){
					if(this.EnemyShipParts.children[i].id == b.id){
						this.EnemyShipParts.children[i].destroy();
					}
				}
			}
			if(b.custom.weapons.missile.active){
				b.custom.weapons.missile.ammobar.kill();
				clearInterval(b.custom.weapons.missile.ReloadInterval);
				for(var i = 0; i < this.EnemyShipParts.length; i++){
					if(this.EnemyShipParts.children[i].id == b.id){
						this.EnemyShipParts.children[i].destroy();
					}
				}
			}
			Sounds.Effects.Explosions.ShipDestroy.play();
		}else{
			b.custom.hp -= a.dmg;
		}
	},
	PlayerImpact: function(a, b){
		b.kill();
		this.explosion = PhaserGame.add.sprite(0, 0, "explosion");
		this.explosion.position.set(CenterX(this.explosion, a), CenterY(this.explosion, a));
		PhaserGame.physics.arcade.enable(this.explosion);
		this.explosion.body.velocity.y = -60;
		this.explosion.animations.add("explosion-anim", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 24, false);
		this.explosion.animations.play("explosion-anim");
		this.explosion.events.onAnimationComplete.add(function(e){
			e.destroy();
		}, this);
		if(Player.shield.active){
			if(b.dmg >= Player.shield.absorb){
				Player.shield.active = false;
				this.Shield.destroy();
			}
			Player.shield.absorb -= b.dmg;
			return false;
		}
		if(b.dmg >= Player.hp){
			Sounds.Backgrounds.Marte.stop();
			Menu.Loser = true;
			PhaserGame.state.start("Menu");
		}else{
			Player.hp -= b.dmg;
			this.hpBar.height += -(-56*b.dmg/100);
		}
	},
	PlayerControls: function(){
		this.Player.body.velocity.x = 0;
		if(this.BossInCourse){
			this.Player.body.velocity.y = 0;
		}else{
			this.Player.body.velocity.y = -60;
		}
		//this.isMove = false;
		this.isMoveX = 0;
		this.isMoveY = 0;
		if(PhaserGame.input.keyboard.addKey(Phaser.Keyboard.UP).isDown){
			this.Player.body.velocity.y = -Player.velocity;
			this.isMoveY = -Player.velocity/50;
		}
		if(PhaserGame.input.keyboard.addKey(Phaser.Keyboard.DOWN).isDown){
			this.Player.body.velocity.y = Player.velocity;
			this.isMoveY = Player.velocity/50;
		}
		if(PhaserGame.input.keyboard.addKey(Phaser.Keyboard.LEFT).isDown){
			this.Player.body.velocity.x = -Player.velocity;
			if(this.Player.position.x < -(220*this.Player.scale.x)){
				this.Player.position.x = GameWidth+100;
			}
			this.isMove = true;
			this.isMoveX = -Player.velocity/50;
		}
		if(PhaserGame.input.keyboard.addKey(Phaser.Keyboard.RIGHT).isDown){
			this.Player.body.velocity.x = Player.velocity;
			if(this.Player.position.x > 1000){
				this.Player.position.x = -100;
			}
			this.isMove = true;
			this.isMoveX = Player.velocity/50;
		}
		if(PhaserGame.input.keyboard.addKey(Phaser.Keyboard.A).isDown){
			if(Player.weapons.laser.active){
				this.Fire(Player.weapons.laser);
			}
		}
		if(PhaserGame.input.keyboard.addKey(Phaser.Keyboard.S).isDown){
			if(Player.weapons.minigun.active){
				this.Fire(Player.weapons.minigun);
			}
		}
		if(PhaserGame.input.keyboard.addKey(Phaser.Keyboard.D).isDown){
			if(Player.weapons.missile.active){
				this.Fire(Player.weapons.missile);
			}
		}
		if(PhaserGame.input.keyboard.addKey(Phaser.Keyboard.P).isDown){
			if(Player.weapons.laser.ReloadInterval == undefined && Player.weapons.minigun.ReloadInterval == undefined && Player.weapons.missile.ReloadInterval == undefined){
				PhaserGame.paused = !PhaserGame.paused;
			}
		}
	},
	CuentaRegresiva: function(){
		if(Level.StartGameTime <= 0){
			clearInterval(this.Interval);
			this.CuentaAtras.destroy();
			PhaserGame.paused = false;
			Level.StartGame = true;
			return false;
		}
		Level.StartGameTime--;
		this.CuentaAtras.text = Level.StartGameTime;

	},
	Fire: function(weapon){
		if(PhaserGame.time.now > weapon.FireTime){
			if(weapon.loading){
				return false;
			}
			/*
				REVISAR ESTA PARTE, ERROR AL TENER MAS DE 1 BULLET POR ARMA;
			*/
			if(weapon.position.length > 0){
				if((weapon.ammo-weapon.ammouse) < weapon.position.length*weapon.ammoperfire){
					var Fires = weapon.ammo-weapon.ammouse;
					for(var i = 0; i < Fires; i++){
						weapon.ammouse++;
						weapon.ammobar.width -= 105/weapon.ammo;
						this.GenerateBullet(weapon, weapon.position[i].x, weapon.position[i].y, i);
					}
				}else if((weapon.ammo-weapon.ammouse) >= weapon.position.length*weapon.ammoperfire){
					for(var i = 0; i < weapon.position.length; i++){
						weapon.ammouse++;
						weapon.ammobar.width -= 105/weapon.ammo;
						this.GenerateBullet(weapon, weapon.position[i].x, weapon.position[i].y, i);
					}
				}
			}
			if(weapon.ammouse == weapon.ammo){
				weapon.loading = true;
				weapon.ReloadInterval = setInterval("WeaponReload('"+weapon.type+"')", 1);
			}
			weapon.FireTime = PhaserGame.time.now+weapon.interval;
		}
	},
	WeaponReload: function(a){
		if(a.ReloadTime >= a.reload){
			clearInterval(a.ReloadInterval);
			a.ammouse = 0;
			a.loading = false;
			a.ReloadTime = 0;
			a.currentReload = 0;
			a.ammobar.width = 105;
			a.reloadbar.width = 0;
			a.ReloadInterval = undefined;
			return false;
		}
		var IncrementBar = 105/a.reload;
		a.ReloadTime += 5;
		a.currentReload += 5;
		a.reloadbar.width = IncrementBar*a.currentReload;
	},
	GenerateBullet: function(weapon, x, y, w){
		this.bullet = this.bullets.create(0, 0, weapon.style);
		this.bullet.dmg = weapon.dmg;
		this.bullet.type = weapon.type;
		this.bullet.position.set(this.Player.position.x+x, this.Player.position.y+y);
		this.bullet.body.velocity.y = -weapon.velocity;
		weapon.sound.play();
	},
	EnemyGenerateBullet: function(weapon, x, y){
		//this.EnemyBullet = this.EnemyBullets.create(x, y, weapon.style);
		this.EnemyBullet = PhaserGame.add.sprite(x, y, weapon.style);
		// physics //
		PhaserGame.physics.p2.enable([this.EnemyBullet], true);
		this.EnemyBullet.body.setCircle(5);
		this.EnemyBullet.body.setCollisionGroup(this.BulletCollision);
		this.EnemyBullet.body.collides([this.BulletCollision, this.PlayerCollision]);
		// etc //
		this.EnemyBullet.dmg = weapon.dmg;
		this.EnemyBullet.body.velocity.y = weapon.velocity;
		if(weapon.type == "laser"){
			Sounds.Weapons.Laser.play();
		}
		if(weapon.type == "minigun"){
			Sounds.Weapons.Minigun.play();
		}
		if(weapon.type == "missile"){
			Sounds.Weapons.Missile.play();
		}
	},
	AddShield: function(){
		this.Shield = PhaserGame.add.sprite(0, 0, Player.shield.style);
		this.Shield.animations.add("shield", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);
		this.Shield.animations.play("shield");
		Player.shield.used = true;
	}
}
function WeaponReload(type){
	switch(type){
		case "laser":
		Game.WeaponReload(Player.weapons.laser);
		break;
		case "mini-gun":
		Game.WeaponReload(Player.weapons.minigun);
		break;
		case "missile":
		Game.WeaponReload(Player.weapons.missile);
		break;
	}
}
function EnemyReload(type, i){
	if(Game.Enemies.hash[i] == undefined){
		return false;
	}
	switch(type){
		case "laser":
		Game.EnemyReload(Game.Enemies.hash[i].custom.weapons.laser);
		break;
		case "mini-gun":
		Game.EnemyReload(Game.Enemies.hash[i].custom.weapons.minigun);
		break;
		case "missile":
		Game.EnemyReload(Game.Enemies.hash[i].custom.weapons.missile);
		break;
	}
}
function CenterX(a, b){
	var x = b.x+(b.width/2-(a.width/2));
	return x;
}
function CenterY(a, b){
	var y = b.y+(b.height/2-(a.height/2));
	return y;
}
function Collision(a){
	console.log(a);
}