var Player = {}, Enemies = {}, Asteroids = {}, Level = {}, Sounds = {}, Weapons = {}, Mejoras = {}, Help = {}, ShopOption = "Armas", ShopPage = 1, ShopPages = 2, WeaponCategory = "Laser";
Help = {TiendaArmas: false, TiendaMejoras: false, Taller: false};
function Sonidos(){
	Sounds = {
		Backgrounds: {
			Marte: PhaserGame.add.audio("marte", 0.5, true, true),
			Venus: PhaserGame.add.audio("venus", 0.5, true, true),
			Mercurio: PhaserGame.add.audio("mercurio", 0.5, true, true)
		},
		Weapons: {
			Laser: PhaserGame.add.audio("laser", 0.8, false, true),
			Minigun: PhaserGame.add.audio("minigun", 0.8, false, true),
			Missile: PhaserGame.add.audio("missile", 0.8, false, true)
		},
		Effects: {
			Explosions: {
				ShipDestroy: PhaserGame.add.audio("explosion", 1, false, true)
			},
			Money: PhaserGame.add.audio("buy-sell", 0.5, false, true),
			NoMoney: PhaserGame.add.audio("no-money", 0.5, false, true)
		},
		Interfaces: {
			Windows: {
				Normal: PhaserGame.add.audio("window-normal", 1, false, true),
				Error: PhaserGame.add.audio("window-error", 1, false, true)
			},
			Buttons: {
				TabHover: PhaserGame.add.audio("tab-hover", 1, false, true),
				TabClick: PhaserGame.add.audio("tab-click", 1, false, true),
				SelectShip: PhaserGame.add.audio("click001", 1, false, true),
				SelectDiff: PhaserGame.add.audio("click002", 1, false, true),
				AddPoint: PhaserGame.add.audio("addpoint", 1, false, true)
			}
		}
	};
}
function Principiante(ship){
	// ARMAS //
	Weapons = {
		Laser: {Name: "Laser - Green Shoot", Type: "Laser", ammo: 5, MultipleFire: 1, Interval: 1000, velocity: 350, Reload: 2500, Price: {Buy: {gold: 20, silver: 0, copper: 0}, Sell: {gold: 5, silver: 57, copper: 87}}, Dmg: 1, BulletStyle: "bullet004", Key: "laser"},
		Minigun: {Name: "Minigun - Violet Shoot", Type: "Minigun", ammo: 3, MultipleFire: 1, Interval: 1000, velocity: 450, Reload: 3800, Price: {Buy: {gold: 85, silver: 30, copper: 90}, Sell: {gold: 21, silver: 32, copper: 54}}, Dmg: 2, BulletStyle: "bullet004", Key: "mini-gun"},
		Missile: {Name: "Missile - Red Shoot", Type: "Missile", ammo: 1, MultipleFire: 1, Interval: 1000, velocity: 10, Reload: 5000, Price: {Buy: {gold: 122, silver: 74, copper: 32}, Sell: {gold: 34, silver: 65, copper: 12}}, Dmg: 5, BulletStyle: "bullet004", Key: "missile"}
	};
	// MEJORAS //
	Mejoras = {
		Weapons: {
			Laser: {
				Ammo: {Name: "Municiones", count: 0, max: 100, buyCount: 1, price: {gold: 0, silver: 5, copper: 0}, Description: "La mejora de municiones te permitira\nefectuar mas disparos antes de tener\nque recargar."},
				AmmoPerFire: {Name: "Fuego Multiple", count: 0, max: 2, buyCount: 1, price: {gold: 50, silver: 0, copper: 0}, Description: "Dispara multiples proyectiles en cada\nuno de tus lasers, pero consumiendo\nmuniciones extra."},
				Dmg: {Name: "Daño Potenciado", count: 0, max: 10, buyCount: 0.5, price: {gold: 40, silver: 0, copper: 0}, Description: "Mejora tus proyectiles para añadirles\n0.5p de daño por cada compra de esta\nmejora."},
				Reload: {Name: "Recarga Rapida", count: 0, max: 2000, buyCount: 30, price: {gold: 5, silver: 0, copper: 0}, Description: "Usa esta mejora para perder menos\ntiempo en cada recarga."},
				Interval: {Name: "Fuego Rapido", count: 0, max: 950, buyCount: 10, price: {gold: 8, silver: 50, copper: 70}, Description: "Dispara mayor cantidad de municiones\nen menos tiempo para hacer\nmayor daño."},
				Velocity: {Name: "Velocidad Sonica", count: 0, max: 550, buyCount: 10, price: {gold: 10, silver: 10, copper: 52}, Description: "Alcanza al objetivo con mayor facilidad\nantes de que pueda moverse."}
			},
			Minigun: {
				Ammo: {Name: "Municiones", count: 0, max: 100, buyCount: 1, price: {gold: 10, silver: 0, copper: 0}, Description: "La mejora de municiones te permitira\nefectuar mas disparos antes de tener\nque recargar."},
				AmmoPerFire: {Name: "Fuego Multiple", count: 0, max: 5, buyCount: 1, price: {gold: 80, silver: 0, copper: 0}, Description: "Dispara multiples proyectiles en cada\nuno de tus miniguns, pero consumiendo\nmuniciones extra."},
				Dmg: {Name: "Daño Potenciado", count: 0, max: 20, buyCount: 0.5, price: {gold: 60, silver: 0, copper: 0}, Description: "Mejora tus proyectiles para añadirles\n0.5p de daño por cada compra de esta\nmejora."},
				Reload: {Name: "Recarga Rapida", count: 0, max: 3000, buyCount: 20, price: {gold: 15, silver: 0, copper: 0}, Description: "Usa esta mejora para perder menos\ntiempo en cada recarga."},
				Interval: {Name: "Fuego Rapido", count: 0, max: 950, buyCount: 10, price: {gold: 13, silver: 22, copper: 0}, Description: "Dispara mayor cantidad de municiones\nen menos tiempo para hacer\nmayor daño."},
				Velocity: {Name: "Velocidad Sonica", count: 0, max: 550, buyCount: 10, price: {gold: 23, silver: 76, copper: 31}, Description: "Alcanza al objetivo con mayor facilidad\nantes de que pueda moverse."}
			},
			Missile: {
				Ammo: {Name: "Municiones", count: 0, max: 100, buyCount: 1, price: {gold: 32, silver: 60, copper: 0}, Description: "La mejora de municiones te permitira\nefectuar mas disparos antes de tener\nque recargar."},
				AmmoPerFire: {Name: "Fuego Multiple", count: 0, max: 1, buyCount: 1, price: {gold: 120, silver: 0, copper: 0}, Description: "Dispara multiples proyectiles en cada\nuno de tus misiles, pero consumiendo\nmuniciones extra."},
				Dmg: {Name: "Daño Potenciado", count: 0, max: 30, buyCount: 0.5, price: {gold: 50, silver: 0, copper: 0}, Description: "Mejora tus proyectiles para añadirles\n0.5p de daño por cada compra de esta\nmejora."},
				Reload: {Name: "Recarga Rapida", count: 0, max: 4000, buyCount: 50, price: {gold: 23, silver: 0, copper: 0}, Description: "Usa esta mejora para perder menos\ntiempo en cada recarga."},
				Interval: {Name: "Fuego Rapido", count: 0, max: 500, buyCount: 10, price: {gold: 8, silver: 0, copper: 0}, Description: "Dispara mayor cantidad de municiones\nen menos tiempo para hacer\nmayor daño."},
				Velocity: {Name: "Velocidad Sonica", count: 0, max: 50, buyCount: 2, price: {gold: 80, silver: 98, copper: 46}, Description: "Alcanza al objetivo con mayor facilidad\nantes de que pueda moverse."}
			}
		},
		Ship: {

		}
	};
	// JUGADOR //
	Player.hp = 100;
	Player.ship = ship;
	Player.velocity = 650;
	Player.shield = {
		active: false,
		absorb: 1,
		used: false,
		style: 'shield-green'
	};
	Player.Money = {
		gold: 250,
		silver: 0,
		copper: 0
	};
	Player.weapons = {
		laser: {
			active: false,
			ammo: 0,
			ammouse: 0,
			ammoperfire: JSON.parse(JSON.stringify(Weapons.Laser.MultipleFire)),
			dmg: JSON.parse(JSON.stringify(Weapons.Laser.Dmg)),
			reload: JSON.parse(JSON.stringify(Weapons.Laser.Reload)),
			currentReload: 0,
			ReloadTime: 0,
			FireTime: 0,
			loading: false,
			interval: JSON.parse(JSON.stringify(Weapons.Laser.Interval)),
			velocity: JSON.parse(JSON.stringify(Weapons.Laser.velocity)),
			type: JSON.parse(JSON.stringify(Weapons.Laser.Key)),
			style: JSON.parse(JSON.stringify(Weapons.Laser.BulletStyle)),
			position: [],
			sound: Sounds.Weapons.Laser
		},
		minigun: {
			active: false,
			ammo: 0,
			ammouse: 0,
			ammoperfire: JSON.parse(JSON.stringify(Weapons.Minigun.MultipleFire)),
			dmg: JSON.parse(JSON.stringify(Weapons.Minigun.Dmg)),
			reload: JSON.parse(JSON.stringify(Weapons.Minigun.Reload)),
			currentReload: 0,
			ReloadTime: 0,
			FireTime: 0,
			loading: false,
			interval: JSON.parse(JSON.stringify(Weapons.Minigun.Interval)),
			velocity: JSON.parse(JSON.stringify(Weapons.Minigun.velocity)),
			type: JSON.parse(JSON.stringify(Weapons.Minigun.Key)),
			style: JSON.parse(JSON.stringify(Weapons.Minigun.BulletStyle)),
			position: [],
			sound: Sounds.Weapons.Minigun
		},
		missile: {
			active: false,
			ammo: 0,
			ammouse: 0,
			ammoperfire: JSON.parse(JSON.stringify(Weapons.Missile.MultipleFire)),
			dmg: JSON.parse(JSON.stringify(Weapons.Missile.Dmg)),
			reload: JSON.parse(JSON.stringify(Weapons.Missile.Reload)),
			currentReload: 0,
			ReloadTime: 0,
			FireTime: 0,
			loading: false,
			interval: JSON.parse(JSON.stringify(Weapons.Missile.Interval)),
			velocity: JSON.parse(JSON.stringify(Weapons.Missile.velocity)),
			type: JSON.parse(JSON.stringify(Weapons.Missile.Key)),
			style: JSON.parse(JSON.stringify(Weapons.Missile.BulletStyle)),
			position: [],
			sound: Sounds.Weapons.Missile
		}
	}
	// NAVES ENEMIGAS //
	Enemies.hp = 5;
	Enemies.ship = "enemy001";
	Enemies.velocity = 50;
	Enemies.shield = {absorb: 2, style: "shield002"};
	Enemies.weapons = {
		laser: {active: true, ammo: 10, ammouse: 0, ammoperfire: 1, dmg: 0.2, reload: 1000, currentReload: 0, ReloadTime: 0, FireTime: 0, loading: false, interval: 700, velocity: 450, type: 'laser', style: 'bullet004', position: [{x:28,y:40}], sound: "laser"},
		minigun: {active: false, ammo: 5, ammouse: 0, ammoperfire: 1, dmg: 1, reload: 5000, currentReload: 0, ReloadTime: 0, FireTime: 0, loading: false, interval: 1000, velocity: 250, type: 'mini-gun', style: 'bullet002', position: [{x:10,y:0}], sound: "minigun"},
		missile: {active: false, ammo: 2, ammouse: 0, ammoperfire: 1, dmg: 1, reload: 8000, currentReload: 0, ReloadTime: 0, FireTime: 0, loading: false, interval: 1000, velocity: 250, type: 'missile', style: 'bullet003', position: [{x:30,y:0}], sound: "missile"}
	};
	Enemies.Spawn = 0;
	Enemies.SpawnCount = [0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10];
	Enemies.Interval = 5000;
	Enemies.Money = {gold: 3, silver: 10, copper: 5};
	// ASTEROIDES //
	Asteroids = {
		hp: 1,
		size: [{w: 10, h: 10},{w: 20, h: 20},{w: 30, h: 30},{w: 40, h: 40},{w: 50, h: 50}],
		parts: 2,
		dmg: 1,
		interval: 8000,
		multiple: 1,
		velocity: {x: 150, y: 350}
	};
	// NIVEL //
	Level.MapSize = 5000;
	Level.Distance = 3500;
	Level.ActualDistance = 0;
	Level.StartGame = false;
	Level.StartGameTime = 3;
	Level.Difficulty = "Principiante";
	Level.Current = 1;

	// Comenzar Estado de Tienda //
	PhaserGame.state.start("Shop");
}
function NextLevel(diff){
	switch(diff){
		case "Principiante":
			// Jugador //
			Player.hp = 100;
			Player.weapons.laser.ammouse = 0;
			// Enemigos //
			Enemies.hp += 1;
			Enemies.velocity += 1;
			Enemies.weapons.ammo += 1;
			Enemies.weapons.dmg += 0.2;
			Enemies.weapons.reload -= 10;
			Enemies.weapons.interval -= 10;
			Enemies.weapons.velocity += 5;
			Enemies.Interval -= 10;
			Enemies.Money.gold += 10;
			Enemies.Money.silver += 60;
			Enemies.Money.copper += 90;
			// Nivel //
			Level.MapSize += 100;
			Level.Distance += 100;
			Level.ActualDistance = 0;
			Level.StartGame = false;
			Level.StartGameTime = 3;
			Level.Current += 1;
		break;
	}
	// Iniciar Juego //
	PhaserGame.state.start("Game");
}