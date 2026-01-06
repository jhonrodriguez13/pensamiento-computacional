/*js de la Lección*/
$(document).on('ready',inicioLeccion);

function inicioLeccion(){
	$('#btn_mcm').on('click',mcm);
	$('#btn_mcd').on('click',mcd);

	/*$('#recurso1Content .num1 div[class^=bt-calculadora]').on('click',{recurso:"#recurso1Content",numero:".num1"},digitar);
	$('#recurso1Content .num1 .bt-borrar').on('click',{recurso:"#recurso1Content",numero:".num1"},borrar);
	
	$('#recurso1Content .num2 div[class^=bt-calculadora]').on('click',{recurso:"#recurso1Content",numero:".num2"},digitar);
	$('#recurso1Content .num2 .bt-borrar').on('click',{recurso:"#recurso1Content",numero:".num2"},borrar);

	$('#recurso2Content .num1 div[class^=bt-calculadora]').on('click',{recurso:"#recurso2Content",numero:".num1"},digitar);
	$('#recurso2Content .num1 .bt-borrar').on('click',{recurso:"#recurso2Content",numero:".num1"},borrar);
	
	$('#recurso2Content .num2 div[class^=bt-calculadora]').on('click',{recurso:"#recurso2Content",numero:".num2"},digitar);
	$('#recurso2Content .num2 .bt-borrar').on('click',{recurso:"#recurso2Content",numero:".num2"},borrar);*/
}

function borrar(evento){
	var recurso = evento.data.recurso;
	var num = evento.data.numero;
	var contenido = $(recurso+' '+ num +' .display-calculadora').html();
	//contenido=contenido.substr(0, contenido.length-1);
	//$(recurso+' '+ num +' .display-calculadora').html(contenido);
	$(recurso+' '+ num +' .display-calculadora').html('');
}
//digito de la calculadora
function digitar(evento){
	var recurso = evento.data.recurso;
	var num = evento.data.numero;
	var contenido = $(recurso+' '+ num +' .display-calculadora').html();
	if(contenido.length < 6){
		var numero=$(this).attr('data-numero');
		$(recurso+' '+ num +' .display-calculadora').html( contenido +numero);
	}
}

//digito del teclado
function digitarTeclado(numero,recurso,num){
	var contenido = $(recurso+' '+ num +' .display-calculadora').html();
	if(contenido.length < 6){
		console.log(numero);
		$(recurso+' '+ num +' .display-calculadora').html( contenido +numero );
	}
}

//Minimo comun multiplo
function mcm(){
	var gogosMath = GogosMath();
	var a = $('#input_mcm_num1').val();
	var b = $('#input_mcm_num2').val();
	//var a = parseInt($('#recurso1Content .num1 .display-calculadora').html());
	//var b = parseInt($('#recurso1Content .num2 .display-calculadora').html());

	var html ="<mark>";
	if(a!="" && !isNaN(a) && b!="" && !isNaN(b)){
		$('p.help-text.mcm').removeClass('campo-requerido');
		respuesta = gogosMath.getMcdMcm(a,b);
		html += '<div class="respuesta"> El Mínimo Común Múltiplo entre '+a+' y '+b+' es: <div class="text-center"><h2>'+respuesta.mcm+'</h2></div></div>';
		html += '</mark>';
		$('#resultado_mcm').html(html);
	}else{
		//alert('Debes ingresar dos números enteros');
		$('p.help-text.mcm').addClass('campo-requerido');
	}
	return false;
}

//Maximo comun divisor
function mcd(){
	var gogosMath = GogosMath();
	var a = $('#input_mcd_num1').val();
	var b = $('#input_mcd_num2').val();
	//var a = parseInt($('#recurso2Content .num1 .display-calculadora').html());
	//var b = parseInt($('#recurso2Content .num2 .display-calculadora').html());

	var html ="<mark>";
	if(a!="" && !isNaN(a) && b!="" && !isNaN(b)){
		$('p.help-text.mcd').removeClass('campo-requerido');
		respuesta = gogosMath.getMcdMcm(a,b);
		html += '<div class="respuesta">El Máximo Común Divisor entre '+a+' y '+b+' es: <div class="text-center"><h2>'+respuesta.mcd+'</h2></div></div>';
		html += '</mark>';
		$('#resultado_mcd').html(html);
	}else{
		//alert('Debes ingresar dos números enteros');
		$('p.help-text.mcd').addClass('campo-requerido');
	}
	return false;
}