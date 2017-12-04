'use strict';
var go = require('./class_object');
var mov = require('./class_movibl');
var player = require('./class_player');
var plat = require('./class_platform');
var tort = require('./class_turtle');
var env = require('./class_environment');
var ener = require('./class_bebidaEnergetica');
var alc = require('./class_alcohol');

var jugador; var nivel;
var platforms; var platformsIni;
var enemies; var numeroEnemigos; var enemigosPorNivel; var enemigosEnPantalla;
var deadZone1; var deadZone2;
var juego;
var perder;
var powerUps; var PU;


var PlayScene = {
  create: function () {

  	juego = this.game;
  	nivel = 1;
  	numeroEnemigos = (nivel * 4 ); 
  	enemigosPorNivel = 2;
  	enemigosEnPantalla = 0;

  this.game.add.sprite(0,0, 'perder');
  //Activamos la física del juego
  this.game.physics.startSystem(Phaser.Physics.ARCADE);

  //Imagen de fondo
  var fondo = this.game.add.sprite(0,0,'fond');
  fondo.width = 1280;
  fondo.height = 720;
  perder = new go(juego, 500,0, 'perder');
  perder.reescala_imagen(0.2,0.2);
  perder.visible = false;

  //Creamos grupo de plataformas
  platforms = this.game.add.physicsGroup();
  platformsIni = this.game.add.physicsGroup();
  powerUps = this.game.add.physicsGroup();

  PU = 0; //Número de bebidas en el juego

  var anchorx;
  var anchory;	
  var anchoPlat = 500;
  var largoPlat = 50;


  //conjuntos de plataformas
  var sprite;
  var numbr = this.game.rnd.integerInRange(0, 2);
  if (numbr === 0)
  	sprite = 'plat0';
  else if (numbr === 1)
  	sprite = 'plat1';
  else 
  	sprite = 'plat2';

  anchorx = 0; anchory = 0;
  for (var a = -1; a < 26; a++){
  	creaPlat(a, anchorx, anchory, juego, true, false, sprite);
  }
  anchorx = 0; anchory = 200;
  for (var a = 0; a < 8; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false, sprite);
  }
  anchorx = 1280-anchoPlat; anchory = 200;
  for (var a = 0; a < 8; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false, sprite);
  }
  anchorx = 350; anchory = 375;
  for (var a = 1; a < 8; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false, sprite);
  }
  anchorx = 0; anchory = 400;
  for (var a = 0; a < 4; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false, sprite);
  }
  anchorx = 1280 - 250; anchory = 400;
  for (var a = 0; a < 4; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false, sprite);
  }
  anchorx = 0; anchory = 550;
  for (var a = 0; a < 8; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false, sprite);
  }
  anchorx = 1280-anchoPlat; anchory = 550;
  for (var a = 0; a < 8; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false, sprite);
  }
  anchorx = 0; anchory = 700;
  for (var a = -1; a < 26; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false, sprite);
  }

  //Plataformas para cuando muera el jugador
   var anchorx = 510; var anchory = 100;
  	for (var a = 0; a < 4; a++){
  	creaPlat(a, anchorx, anchory, juego, false, true, sprite);
  }		
   	platformsIni.visible = false;

  //Creamos al jugador
  jugador = new player(this.game, 200, 600, 'player', 1, 400, 3);

  //Creamos enemigos
  enemies = this.game.add.physicsGroup();
  //Hay que crear dos enemigos primero por nivel

  	   		var enemigo = new tort(this.game, 0, 0, 'enemigo', 1, 75);
  			enemies.add(enemigo);
  			enemigo.cambia_pos(0, 0);  		
  			enemigosEnPantalla++;

  			var enemigo2 = new tort(this.game, 0, 0, 'enemigo', 1, 75);
  			enemies.add(enemigo2);
  			enemigo.cambia_pos(1200, 0);  		
  			enemigo.cambia_dir();
  			enemigosEnPantalla++;
    	

  //Creamos las deadzones
  deadZone1 = new env(this.game, -50, 640, 'fond');
  deadZone1.reescala_imagen(0.05,0.08);
  deadZone1.visible = false;

  deadZone2 = new env(this.game, 1260, 640, 'fond');
  deadZone2.reescala_imagen(0.05,0.08);
  deadZone2.visible = false;

 },

  update: function (){
    //Para que choque el personaje con las plataformas
    juego.physics.arcade.collide(jugador, platforms, collisionHandlerJug);
    if(jugador.revive)
    	juego.physics.arcade.collide(jugador, platformsIni);
    juego.physics.arcade.collide(enemies, platforms, collisionHandlerPlat);
    juego.physics.arcade.collide(enemies, jugador, collisionHandlerEnem);
    juego.physics.arcade.collide(enemies, deadZone1, DeadZone1);
    juego.physics.arcade.collide(enemies, deadZone2, DeadZone2);
    juego.physics.arcade.collide(powerUps, platforms);
    juego.physics.arcade.collide(powerUps, jugador, collisionHandlerPower);    

    	if(enemigosEnPantalla < enemigosPorNivel && numeroEnemigos > 1){
    		var aleatorio = juego.rnd.integerInRange(0,2);
    		var x = 0;
    		if(aleatorio == 0)
    			x = 0;
    		else 
    			x = 1200;
    		var enemigo = new tort(this.game, 0, 0, 'enemigo', 1, 75);
  			enemies.add(enemigo);
  			enemigo.cambia_pos(x, 0);
  				if (x != 0)
  					enemigo.cambia_dir();
  				enemigosEnPantalla++;
    	}


    	if(PU === 0){

    		var aleatorio = juego.rnd.integerInRange(0, 2);

    		if(aleatorio === 0){
    		var energetica = new ener(juego,'energetica');
 			powerUps.add(energetica);
  			PU++;
  			}

  			else if(aleatorio === 1){
  			var alcohol = new alc(juego, 'alcohol');
  			powerUps.add(alcohol);
  			PU++;
  		}
}	

  },

  render: function(){
  	juego.debug.text('VIDAS: ' + jugador.vidas, 32, 50);
  	juego.debug.text('ORINA: ' + jugador.orina, 32, 30);
  	//he movido la vel al update del jugador para que se vean los cambios
  }
};

function collisionHandlerPower(jug, pw){

	jug.incrementaOrina(pw.orina);
	pw.efecto(jug);
	pw.kill();
	PU--; 

}

function collisionHandlerEnem (jug, enem){
	if(!enem.stunt){
  	jugador.kill();
  	jugador.vidas--;
  	jugador.vel = jugador.origVel;
  	if(jugador.vidas > 0){
  	setTimeout(function(){ revive(jug); platformsIni.visible = true; jugador.orina = 0; jugador.vel = jugador.origVel;}, 1000);
  	}

  	else perder.visible = true;
  	 	
 	}

  else {
  	enem.kill();
  	enemigosEnPantalla--;
  	numeroEnemigos--;
  }
  }

  function revive(jug, game){
  	jugador.muerto = true;
  	jugador.revive = true;
  	jug.reset(640,0); 
  	setTimeout(function(){ jugador.revive = false; platformsIni.visible = false; jugador.muerto = false;}, 2000);

   }

function collisionHandlerJug (jug, plat){
  	if(jugador.body.touching.up === true){
   		plat.cambia_tocada();
   		plat.jump();
  	}
  }

  function collisionHandlerPlat(enem, plat){
  	if(plat.tocada){
  		plat.cambia_tocada();
  		enem.stunt = true;
  		setTimeout(function(){ enem.stunt = false; }, 3000);
  	}
  }

  function DeadZone1(dead, enem){

  	enem.cambia_pos(1200,0);
  }

  function DeadZone2(dead, enem){
  	enem.cambia_pos(0,0);
  }

  function creaPlat(a, anchorx, anchory, juego, superior, ini, sprite){
  	var p = (new plat(juego, 0, 0, sprite));
  	if(superior)
  		p.reescala_imagen(1, 0.1);
  	p.cambia_pos(anchorx + (a*p.width), anchory);
  	if(!ini)
  	platforms.add(p);
  	else
  	platformsIni.add(p);
  }


module.exports = PlayScene;


