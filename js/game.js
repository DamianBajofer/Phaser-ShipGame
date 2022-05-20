var PhaserGame, Preload, Menu, Game, GameWidth, GameHeight;
GameWidth = 1000*window.devicePixelRatio;
GameHeight = 650*window.devicePixelRatio;
PhaserGame = new Phaser.Game(GameWidth, GameHeight, Phaser.AUTO, "PhaserGame");
PhaserGame.state.add("Preload", Preload);
PhaserGame.state.add("Menu", Menu);
PhaserGame.state.add("Game", Game);
PhaserGame.state.add("Shop", Shop);
PhaserGame.state.start("Preload");