'use strict';


var handleRequest = {};
	
handleRequest.Peticion = function(){}
 //Script sacado de la recopilación de varios sitios web. Con varios quiero decir MUCHISIMO.
  var httpRequest;
  makeRequest();

  function makeRequest() {
  	console.log('Mensaje Enviado');
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('No se puede crear la instancia.');
      return false;
    }
    var url = 'https://jacord01.github.io/Xtreme/Xtreme-SunBlind/src/scores.json';
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', url);

    httpRequest.send();
  }

  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        //alert(httpRequest.responseText);
        console.log('Ha llegado la respuesta.');
        var respuesta = JSON.parse(httpRequest.response);
/*
  alert(json["name"]); 
  alert(json.name); 

  alert(json.address.streetAddress); 
  alert(json["address"].city); 

  alert(json.phoneNumber[0].number);
  alert(json.phoneNumber[1].type); */
  		console.log("Visitas a la pagina: " + respuesta.Visitas)
        console.log(respuesta.score[0].nombre);
        console.log(respuesta.score[0].punct);
        console.log(respuesta.score[1].nombre);
        console.log(respuesta.score[1].punct);

      } else {
        alert('Problema con la petición.');
      }
    }
  }
}();

}

module.exports = handleRequest;