//Módulo que exporta datos a un archivo csv
//Andrés Sucerquia Osorio 
//andressucer@gmail.com
//06-07-2015
var GogosMath = (function(){
	//Variables y funciones privadas
	var _factores = [];
	var _pasos = [];
	var _isprime = function(x){
	    //si es divisible por 2 no es primo
	    if (x % 2 == 0) {
	        return false;
	    }
	    //va hasta la raiz cuadra del numero de 2 en 2
	    var endvalue = Math.ceil(Math.sqrt(x));
	    for (a = 3; a <= endvalue; a += 2) {
	        if ((x % a) == 0) return false;
	    }
	    return true;
	}
	//Funcion que calcula los factores primos de un numero
	var _calcprimefactors= function(n){
	    var found = false;
	    var factores = [];
	    if (n % 2 == 0) {
	        //es divisible por 2
	        factores.push(2);
	        found = true;
	    }
	    for (div = 3; div <= n / 2; div++) {
	        if ((n % div) == 0) {
	            if (_isprime(div) == true) {
	                factores.push(div);
	                found = true;
	            }
	        }
	    }
	    return factores;
	}
	//funcion que realiza el desglose de los factores primos
	var _explicacion = function(n){
		_factores = _calcprimefactors(n);
		if(_factores.length==0){
			//es un numero primo
			_pasos.push({dividendo:n,divisor:n,resultado:1});
			return _pasos;
		}
		var div = n;
		do{
			for (var i in _factores){
				if(div % _factores[i] == 0){ 
					_pasos.push({dividendo:div,divisor:_factores[i],resultado:div/_factores[i]});
					div=div/_factores[i];
					break;
				}
			}
		}while(div!=1);
		return _pasos;
	}
	//maximo comun divisor y minimo comun multiplo
	var _mcdmcm = function(x,y) {
	    //guardo copia de los valores originales
	    gx = x;
	    gy = y;
	    //calculo el maximo comun divisor
	    while (y != 0) {
	        //w residuo
	        w = x % y;
	        //el dividendo ahora es el divisor
	        x = y;
	        //el divisor ahora es el residuo
	        y = w;
	    }
	    //el maximo comun divisor es el ultimo divisor
	    mcd = x;
	    //el minimo comun multiplo es la multiplicacion de los numeros divido por
	    //el maximo comun divisor
	    mcm = gx * gy / mcd;
	    //devuelvo los dos valores
	    return {'mcd':mcd,'mcm':mcm};
	}


	return {
		//interfaz pública
		getFactoresPrimos: function(n){
			//realiza la descomposicion en factores primos
			return _explicacion(n);
		},
		getMcdMcm: function(x,y){
			//realiza el calculo del maximo comun divisor y del minimo comun multiplo
			return _mcdmcm(x,y);
		}
	}
});