Preload = {
	preload : function(){
		PhaserGame.load.image("bg", "./images/preload/bg.png");
		PhaserGame.load.image("text", "./images/preload/text.png");
		PhaserGame.load.image("box", "./images/preload/box.png");
		PhaserGame.load.image("progress", "./images/preload/progress.png");
	},
	create : function(){
		Preload.bg = PhaserGame.add.tileSprite(0, 0, GameWidth, GameHeight, "bg");
		Preload.box = PhaserGame.add.image(PhaserGame.world.centerX-180, PhaserGame.world.centerY-18, "box");
		Preload.progress = PhaserGame.add.tileSprite(PhaserGame.world.centerX-180, PhaserGame.world.centerY-18, 360, 36, "progress");
		Preload.progress.width = 0;
		Preload.text = PhaserGame.add.image(Preload.box.position.x+12, Preload.box.position.y-16, "text");
		PhaserGame.load.onFileComplete.add(Loading, this);
		PhaserGame.load.onLoadComplete.add(LoadFinished, this);
		LoadAssest();
	},
	update : function(){}
}
function Loading(progress){
	Preload.progress.width = 360*progress/100;
}
function LoadFinished(){
	PhaserGame.state.start("Menu");
}