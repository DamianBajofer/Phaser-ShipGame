function LoadAssest(){
	// Sonidos - Fondos //
	PhaserGame.load.audio("venus", "./sounds/game/backgrounds/002.wav");
	PhaserGame.load.audio("marte", "./sounds/game/backgrounds/003.wav");
	PhaserGame.load.audio("mercurio", "./sounds/game/backgrounds/001.wav");
	// Sonidos - Efectos //
	PhaserGame.load.audio("laser", "./sounds/game/effects/weapons/laser.wav");
	PhaserGame.load.audio("minigun", "./sounds/game/effects/weapons/minigun.wav");
	PhaserGame.load.audio("missile", "./sounds/game/effects/weapons/missile.wav");
	PhaserGame.load.audio("explosion", "./sounds/game/effects/explosions/001.wav");
	// Sonidos - UI //
	PhaserGame.load.audio("buy-sell", "./sounds/interface/money/buy.wav");
	PhaserGame.load.audio("no-money", "./sounds/interface/money/no_money.wav");
	PhaserGame.load.audio("tab-hover", "./sounds/interface/buttons/tab_hover.wav");
	PhaserGame.load.audio("tab-click", "./sounds/interface/buttons/tab_click.wav");
	PhaserGame.load.audio("click001", "./sounds/interface/buttons/click001.wav");
	PhaserGame.load.audio("click002", "./sounds/interface/buttons/click002.wav");
	PhaserGame.load.audio("window-normal", "./sounds/interface/window/window_normal.wav");
	PhaserGame.load.audio("window-error", "./sounds/interface/window/window_error.wav");
	PhaserGame.load.audio("addpoint", "./sounds/interface/buttons/addpoint.wav");
	// UI - User Interface //
	PhaserGame.load.image("space", "./images/backgrounds/space001.jpeg");
	PhaserGame.load.image("container-menu", "./images/interface/container-menu.png");
	PhaserGame.load.image("tablero-de-juego", "./images/interface/tablero-de-juego.png");
	PhaserGame.load.image("hp-fill", "./images/interface/hp-fill.png");
	PhaserGame.load.image("hp-bar", "./images/interface/hp-bar.png");
	PhaserGame.load.image("laser-weapon", "./images/interface/laser-weapon.png");
	PhaserGame.load.image("minigun-weapon", "./images/interface/minigun-weapon.png");
	PhaserGame.load.image("missile-weapon", "./images/interface/missile-weapon.png");
	PhaserGame.load.image("free-slot", "./images/interface/free-slot.png");
	PhaserGame.load.image("weapon-bar", "./images/interface/weapon-bar.png");
	PhaserGame.load.image("exp-fill", "./images/interface/exp-fill.png");
	PhaserGame.load.image("exp-bar", "./images/interface/exp-bar.png");
	PhaserGame.load.image("shop-button", "./images/interface/shop-button.png");
	PhaserGame.load.spritesheet("exit-button", "./images/interface/exit-button.png", 53, 64);
	PhaserGame.load.image("select-diff", "./images/interface/select-diff.png");
	PhaserGame.load.image("select-ship", "./images/interface/select-ship.png");
	PhaserGame.load.image("ship-container", "./images/interface/ship-container.png");
	PhaserGame.load.spritesheet("dificultades", "./images/interface/dificultades.png", 150, 25);
	PhaserGame.load.spritesheet("left-arrow", "./images/interface/left-arrow.png", 82.5, 136);
	PhaserGame.load.spritesheet("right-arrow", "./images/interface/right-arrow.png", 82.5, 136);
	PhaserGame.load.spritesheet("play-game", "./images/interface/play-game.png", 161, 68);
	PhaserGame.load.spritesheet("moneys", "./images/moneys.png", 50, 50);
	PhaserGame.load.spritesheet("button-armas", "./images/interface/Armas.png", 141, 48);
	PhaserGame.load.spritesheet("button-mejoras", "./images/interface/Mejoras.png", 141, 48);
	PhaserGame.load.spritesheet("button-taller", "./images/interface/Taller.png", 141, 48);
	PhaserGame.load.image("money-menu", "./images/interface/Moneys.png");
	PhaserGame.load.spritesheet("sell-weapon", "./images/interface/sell-weapon.png", 164, 68);
	PhaserGame.load.image("message", "./images/interface/message.png");
	PhaserGame.load.spritesheet("button-okay", "./images/interface/button-okay.png", 220, 50);
	PhaserGame.load.spritesheet("startgame", "./images/interface/startgame.png", 220, 50);
	PhaserGame.load.spritesheet("button-buy", "./images/interface/button-buy.png", 220, 50);
	PhaserGame.load.image("enchanting-template", "./images/interface/enchanting-template.png");
	PhaserGame.load.image("select-weapon-bg", "./images/interface/select-weapon-bg.png");
	PhaserGame.load.image("select-weapon-content", "./images/interface/select-weapon-content.png");
	PhaserGame.load.spritesheet("select-weapon", "./images/interface/select-weapon.png", 134, 36);
	PhaserGame.load.spritesheet("button-content", "./images/interface/button-content.png", 136, 38);
	PhaserGame.load.spritesheet("button-masmenos", "./images/interface/button-mas-menos.png", 34, 34);
	PhaserGame.load.spritesheet("pagination-buttons", "./images/interface/pagination.png", 200, 50);
	// Sprite de Ejemplos //
	PhaserGame.load.spritesheet("fm", "./images/interface/examples/fm.png", 215, 90);
	PhaserGame.load.spritesheet("ammo", "./images/interface/examples/ammo.png", 215, 90);
	PhaserGame.load.spritesheet("dmg", "./images/interface/examples/dmg.png", 215, 90);
	PhaserGame.load.spritesheet("reload", "./images/interface/examples/reload.png", 215, 90);
	PhaserGame.load.spritesheet("fastfire", "./images/interface/examples/fastfire.png", 215, 90);
	PhaserGame.load.spritesheet("sonicfire", "./images/interface/examples/sonicfire.png", 215, 90);
	// Tienda Armas //
	PhaserGame.load.image("item-template", "./images/interface/item-template.png");
	// Ships //
	PhaserGame.load.image("ship001", "./images/player/ship001.png");
	PhaserGame.load.image("ship002", "./images/player/ship002.png");
	PhaserGame.load.image("ship003", "./images/player/ship003.png");
	// Ship Parts //
	PhaserGame.load.image("laser", "./images/player/parts/laser.png");
	PhaserGame.load.image("mini-gun", "./images/player/parts/mini-gun.png");
	PhaserGame.load.image("missile", "./images/player/parts/missile.png");
	// Ship Effects //
	PhaserGame.load.spritesheet("shield-green", "./images/player/effects/shield-green.png", 150, 150);
	// Enemy Ship Parts //
	PhaserGame.load.image("enemy-laser", "./images/enemies/parts/laser.png");
	PhaserGame.load.image("enemy-minigun", "./images/enemies/parts/mini-gun.png");
	PhaserGame.load.image("enemy-missile", "./images/enemies/parts/missile.png");
	// Bullets //
	PhaserGame.load.image("bullet001", "./images/bullets/bullet001.png");
	PhaserGame.load.image("bullet002", "./images/bullets/bullet002.png");
	PhaserGame.load.image("bullet003", "./images/bullets/bullet003.png");
	PhaserGame.load.image("bullet004", "./images/bullets/bullet004.png");
	// Enemies //
	PhaserGame.load.image("enemy001", "./images/enemies/enemy001.png");
	// Explosions //
	PhaserGame.load.spritesheet("explosion", "./images/terrain/explocion.png", 31.25, 32);
	// Fisicas //
	PhaserGame.load.physics("json", "./images/physics.json");
	PhaserGame.load.start();
}