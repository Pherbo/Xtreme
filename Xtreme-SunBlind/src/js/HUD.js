'use strict';

var HUD = {};
var vida1; var vida2; var vida3;
var punct1; var punct2; var nivel;
var pisDentro; var pisFuera; var medPis; var fondoRet;
var ebrio;
var Temp1; var Temp2; 
var AG; 
var PA;
var juego;
var fullscreen;
var vidaExtra;

HUD.create = function(game){

	juego = game;
	//VidasPlayer
	
	vida1 =  game.add.sprite(10,10,'vidas');
	vida2 = game.add.sprite(74, 10, 'vidas');
	vida3 = game.add.sprite(138, 10, 'vidas');
	



	//Nivel

 	nivel = game.add.sprite(200,100, 'nivel');
 	nivel.width = 100;
 	nivel.height = 50;

	punct1 = game.add.sprite(300, 80, 'numeros');
 	punct1.width = 50;
 	punct1.height = 80;

 	punct2 = game.add.sprite(350,80, 'numeros');
 	punct2.width = 50;
 	punct2.height = 80;

 	//temporizador para los niveles extra
 	Temp1 = game.add.sprite(300, 80, 'numeros');
 	Temp1.width = 50;
 	Temp1.height = 80;
 	Temp1.visible = false;
 	Temp1.x = 600; Temp1.y = 20;

 	Temp2 = game.add.sprite(350,80, 'numeros');
 	Temp2.width = 50;
 	Temp2.height = 80;
 	Temp2.visible = false;
	Temp2.x = 645; Temp2.y = 20;


 	//Medidor de Pis
 	fondoRet = game.add.sprite(870, 25, 'fondoRetrete');
 	fondoRet.height = 60;
 	fondoRet.width = 400;

 	pisDentro = game.add.sprite(950,50, 'interiorPis');
 	pisDentro.height = 10;
 	pisDentro.width = 0;

 	pisFuera = game.add.sprite(950,50, 'exteriorPis');
 	pisFuera.height = 10;
 	pisFuera.width = 300; 	

 	medPis = game.add.sprite(890,20, 'medPis');
 	medPis.width = 50;
 	medPis.height = 50;
 	medPis.animations.add('maximo', [10,11]);
 	medPis.frame = 0;

 	//Jugador ebrio
 	 ebrio = game.add.sprite(0 ,0,'borracho');
 	 ebrio.visible = false;

 	 ebrio.animations.add('drunk', [0,1,2,3], 6, true);
 	 ebrio.play('drunk');

 	 //Medidor de agarre
 	 AG = game.add.sprite(950, 100, 'barraAgarrador');
 	 AG.height = 20;
 	 AG.width = 0;
 	 AG.visible = false;

 	 //Para nivel extra
 	vidaExtra = game.add.sprite(350,400, 'vidaExtra');
 	vidaExtra.width = 1000;
 	vidaExtra.height = 500;
 	vidaExtra.visible = false;

 	 //Pausa
 	 PA = game.add.sprite(0,0, 'Pausa');
 	 PA.visible = false;

}

HUD.actualizaVida = function(jug){

	if(jug.vidas >= 3){
		vida1.visible = true;
		vida2.visible = true;
		vida3.visible = true;
	}

	else if(jug.vidas === 2){
		vida1.visible = true;
		vida2.visible = true;
		vida3.visible = false;
	}

	else if(jug.vidas === 1){
		vida1.visible = true;
		vida2.visible = false;
		vida3.visible = false;
	}	

	else {
		vida1.visible = false;
		vida2.visible = false;
		vida3.visible = false;
	}
}

HUD.nivel = function(lvl){

  punct1.visible = true; punct2.visible = true; nivel.visible = true;

  punct1.frame = Math.floor(lvl / 10);

  punct2.frame = lvl % 10;

  setTimeout(function(){punct1.visible = false; punct2.visible = false; nivel.visible = false;}, 3000);
}

HUD.tempLevel = function(temp){


 Temp1.frame = Math.floor(temp / 10);

 Temp2.frame = temp % 10;

}

HUD.ocultaTempLevel = function(){

	 Temp1.visible = false; Temp2.visible = false;

}

HUD.muestraTempLevel = function(){

	Temp1.visible = true; Temp2.visible = true;
}

HUD.cambiaPis = function(pis){

	 	pisDentro.width = pis * 30;
	 	
	 	if(pis === 0){

	 		medPis.animations.stop(null, true);
	 		medPis.frame = 0;
	 	}
	 	else if(pis >= 10){
	 		medPis.animations.play('maximo', 2, true);
	 		
	 	}
	 	else {
	 		
	 		medPis.frame = pis - 1;
	 	}
	 	
}

HUD.borracho = function(){

	 ebrio.visible = true;
}

HUD.noBorracho = function(){

	ebrio.visible = false;
}

HUD.cambiaGrabber = function(llega){

	AG.width = llega * 1.5;

}

HUD.GrabberVisible = function(x,y){

	AG.visible = true;
	AG.x = x - 20;
	AG.y = y + 70;
}

HUD.GrabberInvisible = function(){

	AG.visible = false;
}

HUD.Pausa = function(){

juego.world.bringToTop(PA);
PA.visible = true;

}

HUD.quitaPausa = function(){

	PA.visible = false;
}

HUD.fullscreen = function(){

    if (juego.scale.isFullScreen)
    {
        juego.scale.stopFullScreen();
    }
    else
    {
        juego.scale.startFullScreen(false);
    }
}

HUD.cambiaExtra = function(){

	vidaExtra.visible = !vidaExtra.visible;
}

module.exports = HUD;