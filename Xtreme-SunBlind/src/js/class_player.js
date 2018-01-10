'use strict';

var movible = require('./class_movibl');
var HUD = require('./HUD');	
var cols = require('./handleCollisions');
var cursors;
var jumpButton;
var escudo;
var daVida;
var facingRight;

var Protagonista = function(game, entradax, entraday, entradasprite, dir, velx, vidas){
	movible.call(this, game, entradax, entraday, entradasprite, dir, velx);
	this.vidas = vidas;
	this.juego = game;
  this.revive = false;
  this.muerto = false;
  this.orina = 0;
  this.orinando = false;
  this.escala = 1.4;
  this.origVel = velx;
  this.vel = velx;
  this.corriendo = false;
  this.borracho = false;
  this.invencible = false;
  this.saltando = false;
  this.agarrado = false;
  this.atacando = false;
  this.haAtacado = false;
  this.pis;
  this.create();
}

Protagonista.prototype = Object.create(movible.prototype);
Protagonista.prototype.constructor = Protagonista;

Protagonista.prototype.create = function (){
 	this.body.gravity.y = 2000;
 	cursors = this.juego.input.keyboard.createCursorKeys();
  jumpButton = this.juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.anchor.x = 0.5;
  this.anchor.y = 0.5;
  this.reescala_imagen(1.4, 1.2);
  this.animations.add('walk', [0,1,2,3]);
  this.animations.add('stay', [4,5], 6, true);
  this.animations.add('jump', [6,7,8,9,10,11,12,13,14]);
  this.animations.add('peeing', [15,16,17,18,19,20,21,22,23,24,25]);
  this.animations.add('attack1', [26]);
  this.animations.add('attack2', [27]);
  this.animations.add('attack3', [28]);
  this.animations.play('stay');
  escudo = this.game.add.sprite(this.x ,this.y,'escudo');
  escudo.visible = false;
  escudo.width = 250;
  escudo.height = 250;
  //this.body.setSize(20,60, 20, 0);
  this.pis = this.game.add.sprite(this.x, this.y, 'enemigo');
  this.juego.physics.arcade.enable(this.pis);
  this.pis.visible = false;
}

Protagonista.prototype.update = function (){

  //Si no hay inputs consideramos que el jugador está parado
	 this.body.velocity.x = 0;
   
	 if (this.corriendo)
	 	this.vel = 2*this.vel;

	 if (this.borracho){
	 	this.vel = -this.vel;
   }

   if(this.invencible){
    this.borracho = false;

    HUD.noBorracho();
    escudo.visible = true;
    escudo.x = this.x - 125;
    escudo.y = this.y - 120;
  }
   else 
    escudo.visible = false;

   if(this.orinando){
    this.vel = 0;
    this.body.touching.down = true;
  } 


  if(this.agarrado)
    this.vel = 0;

  //this.orina = 10;
  //this.juego.debug.body(this.pis);
	/* this.juego.debug.text('VELOCIDAD: ' + this.vel, 32, 70);
   this.juego.debug.text('SALTO: ' + this.saltando, 230, 70);
   this.juego.debug.text('ORINANDO: ' + this.orinando, 500, 50);*/
   //this.juego.debug.text('VIDA: ' + this.vidas, 500, 50);
   //this.invencible = true;
  // this.orina = 10;
    if (cursors.left.isDown)
    {
        facingRight = false;
        this.body.velocity.x = -this.vel;
        if(!this.borracho)
          this.scale.x = -this.escala;
        else this.scale.x = this.escala;
        if (this.body.touching.down && !this.orinando && !this.atacando)
           this.animations.play('walk', 6, true);
         if(this.orinando)
           this.pis.body.setSize(10,60, this.x - 270, this. y -620);
    }
    else if (cursors.right.isDown)
    {
        facingRight = true;
        this.body.velocity.x = this.vel;
        if(!this.borracho)
        this.scale.x = this.escala;
        else this.scale.x = -this.escala;
        if (this.body.touching.down && !this.orinando && !this.atacando)
           this.animations.play('walk', 6, true);
         if(this.orinando)
           this.pis.body.setSize(10,60, this.x - 150, this. y -620);

    }

    this.vel = this.origVel - (this.orina * 10);
    if (jumpButton.isDown && !this.agarrado && !this.orinando && (this.body.onFloor() 
      || this.body.touching.down))

    {

        this.body.velocity.y = -1000;
    }

    if(!this.body.touching.down) //Si no toca el suelo, está saltando. Servirá para hacer pis
             this.saltando = true;
    else this.saltando = false;

    if(cursors.up.isDown && !this.saltando  && this.orina >= 10)
        {
          this.animations.play('peeing', 6, false);
          this.orina = 0;
          HUD.cambiaPis(this.orina);
          this.orinando = true;

          //Primero apagamos la plataforma en la que estamos por si acaso estuviesemos en una
          //Esto se puede dar si el jugador está en invencible encima de una plataforma
          this.pis.body.setSize(10,60, this.x - 200, this.y - 620);
          //Después ya depende del movimiento del jugador apagar la de dercha o izda
          if(facingRight)
           this.pis.body.setSize(10,60, this.x - 150, this. y -620);
         else 
           this.pis.body.setSize(10,60, this.x - 270, this. y -620);
          var prota = this;
          
          setTimeout(function(){prota.orinando = false; prota.invencible = false;}, 
              2000);
        }
        
     //Aquí actualizamos la posición del objeto jugador en su clase si es que se ha movido
      if( this.body.velocity.x != 0 ||  this.body.velocity.y != 0){
         this.cambia_pos(this.x, this.y);
       }

       if (!this.body.touching.down && !this.atacando)
        this.animations.play('jump', 10 , true);

       else if (this.body.velocity.x === 0 && !this.orinando && !this.atacando)
       	this.animations.play('stay');

       if (this.atacando){
       if (!this.haAtacado){
        var num = this.juego.rnd.integerInRange(0,3);
        var prota = this;
        prota.haAtacado = true;
       setTimeout(function(){prota.atacando = false;cols.reduceEnem(); prota.haAtacado = false;}, 700);
     }
     this.animations.play('attack'+num,4,false);
      }
}

Protagonista.prototype.incrementaOrina = function (orina){

  this.orina = this.orina + orina;
  if(this.orina>10)
    this.orina = 10; 
  HUD.cambiaPis(this.orina);

}

module.exports = Protagonista;