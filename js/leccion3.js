//Leccion 3
$(document).on('ready', inicioLeccion);
//variable globales
function inicioLeccion() {
    //play 1
    var imgs1 = [
        ["drag1.png", "drag2.png", "drag3.png", "drag4.png", "drag5.png"],
    ];
    activityDrag("scratch", "Programas en scratch", "img/", imgs1);
}

var activityDrag = function(actividadID, nombre, path, listas) {
    var originalImgs = listas;
    var origen = "#list-origen-" + actividadID;
    var destino = "#list-destino-" + actividadID;
    var connected = "list-connected-" + actividadID;
    var lista = shuffle(listas[0]);
    var initList = function() {
        $(origen).html("").addClass(connected);
        $(destino).html("").addClass(connected);
        for (var i = 0; i < lista.length; i++) {
            var img = lista[i];
            $(origen).append('<li class="img' + (i + 1) + '"><img src="' + path + img + '" alt="img"></li>');
            $(destino).append('<li class="img' + (i + 1) +'"></li>');
        };
        $(origen + " li, " + destino + " li").sortable({
            connectWith: "." + connected + " li:empty",
            receive: function(event, ui) {
                ui.item.attr('style', '');
            }
        }).disableSelection();
        $(".btn-calificar-" + actividadID).on('click', calificar);
    }
    var reset= function(){
        $(destino).find('.incorrecta').each(function(index){
            $(this).removeClass('incorrecta');
            $(origen).find("li:empty").first().append($(this).find('img'));
        });
    }
    var calificar = function() {
        var modalID = "#calificacionModal";
        var mensaje = "Inténtalo nuevamente."
        var puntaje = 0;
        var exito = false;
        $(destino).find("li").each(function(index) {
            $(this).removeClass('correcta incorrecta');
            $(this).addClass('incorrecta');
        	for (var i = 0; i < originalImgs.length; i++) {
                var l = originalImgs[i];
                if ($(this).find('img').size() == 1 && $(this).find('img').attr('src') == path + l[index]) {
                    $(this).removeClass('incorrecta');
                    $(this).addClass('correcta');
                	puntaje++;
                    break;
                }
            };
        });
        puntaje = (puntaje / lista.length)*100;
        puntaje = puntaje.toFixed(2);
        if(puntaje==100){
            exito = true;
            mensaje = "¡Felicitaciones!"
        }

        registrarActividad('Actividad', nombre, puntaje);
        mostrarCalificacion(modalID, puntaje + '%', mensaje, exito, reset);
    }
    initList();
}