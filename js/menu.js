Menu = {
	preload : function(){
		this.shipsInfo = [{Name: "F17A-23G", Style: "ship001"},{Name: "SYX-N32", Style: "ship002"},{Name: "IOG-90C", Style: "ship003"}];
		this.ShipPreviewID = 0;
		this.dificultad = "N/A";
	},
	create : function(){
		// Mapa, Fondo y Ambientacion //
		PhaserGame.world.setBounds(0, 0, 0, 5000);
		this.background = PhaserGame.add.tileSprite(0, 0, GameWidth, 5000, "space");
		this.background.position.y = -4350;
		Sonidos(); // ----> carga la lista de sonidos de efectos e interfaces.
		Sounds.Backgrounds.Venus.play();
		this.MenuInicial();
		// Añadir Nave al Contenedor //
		this.ShipPreview = PhaserGame.add.image(this.shipContainer.position.x+(this.shipContainer.width-220), this.shipContainer.position.y+(this.shipContainer.height-130), this.shipsInfo[this.ShipPreviewID].Style);
		this.ShipPreview.anchor.set(0.5, 0.5);
		this.ShipPreview.fixedToCamera = true;
		// Nombre de Nave //
		this.ShipName = PhaserGame.add.text(this.shipContainer.position.x+20, this.shipContainer.position.y+20, this.shipsInfo[this.ShipPreviewID].Name, {font: "16px Arial"});
		this.ShipName.addColor("#00aeff", 0);
		this.ShipName.setShadow(0, 0, "#00f7ff", 6);
		this.ShipName.fixedToCamera = true;
		if(this.Loser){
			this.stateStop = true;
			ShowMessage("¡PIERDES!", "Te han aniquilado las naves enemigas, vuelve a jugar para\nsuperar tu marca y aparecer en el 'Top 10'.", UpdateTop, Sounds.Interfaces.Windows.Error, this);
		}
	},
	update : function(){
		// Rotar Naves //
		this.ShipRotate();
	},
	SelectDiff: function(a){
		if(this.stateStop){
			return false;
		}
		this.dificultad = a.diff;
		this.TitleDiff.text = "Seleccionar Dificultad:       [ "+this.dificultad+" ]";
		Sounds.Interfaces.Buttons.SelectDiff.play();
	},
	PreviousShip: function(){
		if(this.stateStop){
			return false;
		}
		if(this.ShipPreviewID >= 2){
			this.ShipPreviewID = 0;
		}else{
			this.ShipPreviewID++;
		}
		this.ShipPreview.destroy();
		this.ShipPreview = PhaserGame.add.image(this.shipContainer.position.x+(this.shipContainer.width-220), this.shipContainer.position.y+(this.shipContainer.height-130), this.shipsInfo[this.ShipPreviewID].Style);
		this.ShipPreview.anchor.set(0.5, 0.5);
		this.ShipPreview.angle = this.ShipAngle;
		Sounds.Interfaces.Buttons.SelectShip.play();
	},
	NextShip: function(a){
		if(this.stateStop){
			return false;
		}
		if(this.ShipPreviewID <= 0){
			this.ShipPreviewID = this.shipsInfo.length;
		}
		this.ShipPreviewID--;
		this.ShipPreview.destroy();
		this.ShipPreview = PhaserGame.add.image(this.shipContainer.position.x+(this.shipContainer.width-220), this.shipContainer.position.y+(this.shipContainer.height-130), this.shipsInfo[this.ShipPreviewID].Style);
		this.ShipPreview.anchor.set(0.5, 0.5);
		this.ShipPreview.angle = this.ShipAngle;
		Sounds.Interfaces.Buttons.SelectShip.play();
	},
	StartGame: function(){
		if(this.stateStop){
			return false;
		}
		if(this.dificultad == "N/A"){
			ShowMessage("IMPORTANTE", "Necesitas seleccionar una dificultad antes de comenzar a jugar.", RemoveMessage, Sounds.Interfaces.Windows.Error, this);
			return false;
		}
		Sounds.Backgrounds.Venus.stop();
		switch(this.dificultad){
			case "PRINCIPIANTE":
				Principiante(this.shipsInfo[this.ShipPreviewID].Style);
			break;
			case "INTERMEDIO":
				Intermedio(this.shipsInfo[this.ShipPreviewID].Style);
			break;
			case "VETERANO":
				Veterano(this.shipsInfo[this.ShipPreviewID].Style);
			break;
		}
	},
	ShipRotate: function(){
		this.ShipPreview.angle += 1;
		this.ShipAngle = this.ShipPreview.angle;
		this.ShipPreview.alpha = 0.6
		this.ShipPreview.scale.set(0.8, 0.8);
		this.ShipName.text = this.shipsInfo[this.ShipPreviewID].Name;
	},
	MenuInicial: function(){
		// Contenedor Principal //
		this.container = PhaserGame.add.image(GameWidth/2-791/2, GameHeight/2-516/2, "container-menu");
		// Texto Seleccion de Dificultad //
		this.TitleDiff = PhaserGame.add.text(this.container.position.x+30, this.container.position.y+20, "Seleccionar Dificultad:   [ N/A ]", {font: "20px Arial", fill: "#00eeff"});
		// Dificultades //
		this.diff = PhaserGame.add.sprite(this.container.position.x+60, this.container.position.y+80, "dificultades");
		this.diff.diff = "PRINCIPIANTE";
		this.diff.inputEnabled = true;
		this.diff.events.onInputOut.add(function(a){a.frame = 0;}, this);
		this.diff.events.onInputOver.add(function(a){a.frame = 3;}, this);
		this.diff.events.onInputDown.add(this.SelectDiff, this);
		this.diff = PhaserGame.add.sprite(this.container.position.x+325, this.container.position.y+80, "dificultades");
		this.diff.diff = "INTERMEDIO";
		this.diff.frame = 1;
		this.diff.inputEnabled = true;
		this.diff.events.onInputOut.add(function(a){a.frame = 1;}, this);
		this.diff.events.onInputOver.add(function(a){a.frame = 4;}, this);
		this.diff.events.onInputDown.add(this.SelectDiff, this);
		this.diff = PhaserGame.add.sprite(this.container.position.x+560, this.container.position.y+80, "dificultades");
		this.diff.frame = 2;
		this.diff.diff = "VETERANO";
		this.diff.inputEnabled = true;
		this.diff.events.onInputOut.add(function(a){a.frame = 2;}, this);
		this.diff.events.onInputOver.add(function(a){a.frame = 5;}, this);
		this.diff.events.onInputDown.add(this.SelectDiff, this);
		// Texto Seleccion de Naves //
		this.TitleShip = PhaserGame.add.text(this.container.position.x+30, this.container.position.y+130, "Seleccionar Nave de Guerra:", {font: "20px Arial", fill: "#00eeff"});
		// Flecha Nave Previa //
		this.arrow = PhaserGame.add.sprite(this.container.position.x+20, this.TitleShip.position.y+120, "left-arrow");
		this.arrow.inputEnabled = true;
		this.arrow.events.onInputOut.add(function(a){a.frame = 0;}, this);
		this.arrow.events.onInputOver.add(function(a){a.frame = 1;}, this);
		this.arrow.events.onInputDown.add(this.PreviousShip, this);
		// Flecha Nave Siguiente //
		this.arrow = PhaserGame.add.sprite(this.arrow.position.x+this.container.width-130, this.arrow.position.y, "right-arrow");
		this.arrow.inputEnabled = true;
		this.arrow.events.onInputOut.add(function(a){a.frame = 0;}, this);
		this.arrow.events.onInputOver.add(function(a){a.frame = 1;}, this);
		this.arrow.events.onInputDown.add(this.NextShip, this);
		this.arrow.fixedToCamera = true;
		// Contenedor de Nave //
		this.shipContainer = PhaserGame.add.image(this.container.position.x+(this.container.width/2-209.5), this.arrow.position.y+(this.arrow.height/2-127), "ship-container");
		// Boton Play //
		this.PlayButton = PhaserGame.add.sprite(this.shipContainer.position.x+(this.shipContainer.width/2-110), this.shipContainer.position.y+(this.shipContainer.height+10), "startgame");
		this.PlayButton.inputEnabled = true;
		this.PlayButton.animations.add("Bplay-over", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false);
		this.PlayButton.animations.add("Bplay-out", [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 10, false);
		this.PlayButton.events.onInputOut.add(function(a){a.animations.play("Bplay-out");a.animations.currentAnim.speed = 50;}, this);
		this.PlayButton.events.onInputOver.add(function(a){a.animations.play("Bplay-over");a.animations.currentAnim.speed = 50;}, this);
		this.PlayButton.events.onInputDown.add(function(){this.StartGame();}, this);
	}
}