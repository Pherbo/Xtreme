'use strict';

var entorno = require('./class_entorno');
var juego = require('./main');	

var plataforma = function(texture){
	entorno.call(this, texture);
	this.reescala_imagen(0.1, 0.05);
}

plataforma.prototype = Object.create(entorno.prototype);
plataforma.prototype.constructor = plataforma;

module.exports = plataforma;
