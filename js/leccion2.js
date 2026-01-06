/*js de la Lección*/
$(document).on('ready',inicioLeccion);

function inicioLeccion(){
	$('#recurso1Content div[class^=bt-calculadora]').on('click',digitar);
	$('#recurso1Content .bt-borrar').on('click',borrar);
	$('#btn_calcular').on('click',calcular);

	$(document).on('keydown', function(event){
	 	//si esta abierto el recurso
        if($('#recurso1Content').attr('class')=="backdrop in"){
            switch(event.keyCode){
                case 8://backspace
                case 46:
                	event.preventDefault();
                    borrar();
                    break;
                case 13:
                	calcular();
                	break;
                case 48://numero 0
                case 96:
                    digitarTeclado(0);
                    break;
                case 49://numero 1
                case 97:
                    digitarTeclado(1);
                    break;
                case 50://numero 2
                case 98:
                    digitarTeclado(2);
                    break;
                case 51://numero 3
                case 99:
                    digitarTeclado(3);
                    break;
                case 52://numero 4
                case 100:
                    digitarTeclado(4);
                    break;
                case 53://numero 5
                case 101:
                    digitarTeclado(5);
                    break;
                case 54://numero 6
                case 102:
                    digitarTeclado(6);
                    break;
                case 55://numero 7
                case 103:
                    digitarTeclado(7);
                    break;
                case 56://numero 8
                case 104:
                    digitarTeclado(8);
                    break;
                case 57://numero 9
                case 105:
                    digitarTeclado(9);
                    break;
                default:
                    break;
            }
        }
    });
}
//Borra todo el conenido del display
function borrar(evento){
	var contenido = $('#recurso1Content .display-calculadora').html();
	//contenido=contenido.substr(0, contenido.length-1);
	//$('#recurso1Content .display-calculadora').html(contenido);
    $('#recurso1Content .display-calculadora').html('');
}
//digito de la calculadora
function digitar(evento){
	$('p.help-text').removeClass('campo-requerido');
    var contenido = $('#recurso1Content .display-calculadora').html();
	if(contenido.length < 6){
		var numero=$(this).attr('data-numero');
		$('#recurso1Content .display-calculadora').html( contenido +numero);
	}
}
//digito del teclado
function digitarTeclado(numero){
	$('p.help-text').removeClass('campo-requerido');
    var contenido = $('#recurso1Content .display-calculadora').html();
	if(contenido.length < 6){
		console.log(numero);
		$('#recurso1Content .display-calculadora').html( contenido +numero );
	}
}

function calcular(){
	var gogosMath = GogosMath();
	var n = parseInt($('#recurso1Content .display-calculadora').html());
	var explicacion ={};
	var html ="<div>";
	var divisores = [];
	if(n!="" && !isNaN(n) ){
		$('p.help-text').removeClass('campo-requerido');
        explicacion = gogosMath.getFactoresPrimos(n);
		for (var i in explicacion){
			html += '<div><span class="dividendo">'+explicacion[i].dividendo+'</span><span class="divisor">'+explicacion[i].divisor+'</span></div>';
			divisores.push(explicacion[i].divisor);
		}
		html += '<div><span class="dividendo">1</span><span class="divisor"></span></div>';
		html += '<div>'+n+' = '+divisores.join(" * ");
		html +='</div>';
		$('#resultado').html(html);
	}else{
		$('p.help-text').addClass('campo-requerido');
	}
	return false;
}