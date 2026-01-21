//Variables globales
//
var etiquetaAudio = '<div style="display:none;" id="audio"><audio controls="controls" id="player" preload="auto"></audio></div>';

var BASE_PATH = '/pensamiento-computacional/';

var avatares = [
  { img: 1, src: BASE_PATH + 'img/usuario-imagen-01.png' },
  { img: 2, src: BASE_PATH + 'img/usuario-imagen-02.png' },
  { img: 3, src: BASE_PATH + 'img/usuario-imagen-03.png' },
  { img: 4, src: BASE_PATH + 'img/usuario-imagen-04.png' },
  { img: 5, src: BASE_PATH + 'img/usuario-imagen-05.png' },
  { img: 6, src: BASE_PATH + 'img/usuario-imagen-06.png' },
  { img: 7, src: BASE_PATH + 'img/usuario-imagen-07.png' },
  { img: 8, src: BASE_PATH + 'img/usuario-imagen-08.png' },
  { img: 9, src: BASE_PATH + 'img/usuario-imagen-09.png' },
  { img: 10, src: BASE_PATH + 'img/usuario-imagen-10.png' }
];

var avataresAnimados = [{ img: 1, src: 'img/sprite-usuario-imagen-01.png', pasos: 10, animacion: 'animacion-1920', velocidad: '1.5s', audio: 'audio/usuario-audio-06', },
    { img: 2, src: 'img/sprite-usuario-imagen-02.png', pasos: 10, animacion: 'animacion-1920', velocidad: '0.6s', audio: 'audio/usuario-audio-06', },
    { img: 3, src: 'img/sprite-usuario-imagen-03.png', pasos: 10, animacion: 'animacion-1000', velocidad: '0.6s', audio: 'audio/usuario-audio-06', },
    { img: 4, src: 'img/sprite-usuario-imagen-04.png', pasos: 10, animacion: 'animacion-4000', velocidad: '1.5s', audio: 'audio/usuario-audio-06', },
    { img: 5, src: 'img/sprite-usuario-imagen-05.png', pasos: 10, animacion: 'animacion-3750', velocidad: '2s', audio: 'audio/usuario-audio-06', },
    { img: 6, src: 'img/sprite-usuario-imagen-06.png', pasos: 10, animacion: 'animacion-5500', velocidad: '2s', audio: 'audio/usuario-audio-06', },
    { img: 7, src: 'img/sprite-usuario-imagen-07.png', pasos: 10, animacion: 'animacion-7500', velocidad: '3s', audio: 'audio/usuario-audio-06', },
    { img: 8, src: 'img/sprite-usuario-imagen-08.png', pasos: 10, animacion: 'animacion-4500', velocidad: '2.5s', audio: 'audio/usuario-audio-06', },
    { img: 9, src: 'img/sprite-usuario-imagen-09.png', pasos: 10, animacion: 'animacion-4750', velocidad: '2s', audio: 'audio/usuario-audio-06', },
    { img: 10, src: 'img/sprite-usuario-imagen-10.png', pasos: 10, animacion: 'animacion-4000', velocidad: '2.5s', audio: 'audio/usuario-audio-06', },
];

/*USUARIOS AUTORIZADOS*/
//9865208   Sucer
//75093087  Sebastian
//1088308477  Adrian
//1088275043 Chiquito
//75086684  Felipe
//10003896  Jairo
//91524776  Raul
//14798047  David
//10025735  Francisco
//10026525  Ernesto
//42120832  Sandra
//10024967  Juan Carlos
//66729608  Maria Elena
//18610088  Diego
//41511  Invitado
//var claves = ['9865208','1088308477','75093087','75086684','10003896','91524776','14798047','10025735','42120832','10026525','10024967','18610088','1088275043','66729608','41511'];


/*
LLama a todos los recursos.
 */
$(document).on("ready", function() {
    $("[data-toggle=recurso]").on('click', function(event) {
        event.preventDefault();
        //obtiene el id del contenedor del recurso
        var sel = $(this).attr('data-target');
        $(sel).addClass("in");
        $('body').css('overflow', 'hidden');
        reproducirAudio('audio/alerta');
    });
    $("[data-backdropdismiss=true]").on('click', function(event) {
        event.preventDefault();
        $('body').css('overflow', '');
        $(this).parents('.backdrop').removeClass("in");
        reproducirAudio('audio/alerta');
    });
    $(document).on('keydown.esc-backdrop', function(e) {
        if (e.keyCode == 27) {
            $('body').css('overflow', '');
            if ($('.backdrop.in').length == 1) {
                reproducirAudio('audio/alerta');
            }
            $('.backdrop.in').removeClass('in');
        }
    });
});

//funcion que determina si esta dentro de una leccion 
function isLeccion() {
    var url = document.location.href;
    var index = url.indexOf("unidad");
    if (index != -1) {
        return true;
    } else {
        return false;
    }
}
//funcion que determina si esta en el inicio
function isHome() {
    var url = document.location.href;
    var index = url.indexOf("home.html");
    if (index != -1) {
        return true;
    } else {
        return false;
    }
}
//retorna la fecha actual
function fechaActual() {
    var fecha = new Date()
    var hora = fecha.getHours()
    var minuto = fecha.getMinutes()
    var segundo = fecha.getSeconds()
    if (hora < 10) {
        hora = "0" + hora;
    }
    if (minuto < 10) {
        minuto = "0" + minuto;
    }
    if (segundo < 10) {
        segundo = "0" + segundo;
    }
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1;
    var anyo = fecha.getFullYear();
    var str_timestamp = anyo + '-' + mes + '-' + dia + ' ' + hora + ":" + minuto + ":" + segundo;

    return str_timestamp;
}

//funcion que verifica si hay conexion a internet e invoca a un callback
function is_internet_connected(callbackhandler, parametros) {
    $.ajax({
        url: "http://contenidos.sucerman.com/assets/img/transparente.png",
        timeout: 1000,
        async: true,
        error: function(jqXHR) {
            if (jqXHR.status == 0) {
                console.log('No internet');
                callbackhandler(false, parametros);
            }
        },
        success: function() {
            //console.log('Respuesta Internet OK');
            callbackhandler(true, parametros);
        }
    });
}


function animacionExito() {
    try {
        $('#img-actividad').css("background-image", 'url(img/sprite-aprendiendo.png)');
        $('#img-actividad').css("-webkit-animation-name", 'animacion-exito');
        $('#img-actividad').css("-webkit-animation-timing-function", 'steps(4)');
        $('#img-actividad').css("-webkit-animation-duration", '1.5s');
    } catch (e) {
        console.log(e);
    }

}

function animacionError() {
    try {
        $('#img-actividad').css("background-image", 'url(assets/img/sprite-nino-nina-error.png)');
        $('#img-actividad').css("-webkit-animation-name", 'animacion-error');
        $('#img-actividad').css("-webkit-animation-timing-function", 'steps(26)');
        $('#img-actividad').css("-webkit-animation-duration", '1.5s');
    } catch (e) {
        console.log(e);
    }
}
//Reproducir audio de Avatar
function reproducirSonidoAvatar() {
    var audio = avataresAnimados[locache.session.get("usuario").avatar].audio;
    if (isLeccion()) {
        audio = '../../../' + audio;
    } else {
        if (!isHome()) {
            audio = '../../' + audio;
        }
    }
    reproducirAudio(audio);
}
//Cargar y Reproducir AudioAudio
function reproducirAudio(audio, callback) { //funcion que carga y reproduce un audio
    try {
        var idaudio = 'player';

        viejo_audio = document.getElementById(idaudio); //Carga el Audio
        audio_padre = viejo_audio.parentNode;
        audio_padre.removeChild(viejo_audio);

        nuevo_audio = document.createElement("audio");
        nuevo_audio.setAttribute("id", idaudio);
        nuevo_audio.setAttribute("preload", "auto");

        source_mp3 = document.createElement("source");
        source_mp3.setAttribute("src", audio + ".mp3");
        source_mp3.setAttribute("type", "audio/mpeg");
        nuevo_audio.appendChild(source_mp3);

        source_m4a = document.createElement("source");
        source_m4a.setAttribute("src", audio + ".m4a");
        source_m4a.setAttribute("type", "audio/m4a");
        nuevo_audio.appendChild(source_m4a);

        source_ogg = document.createElement("source");
        source_ogg.setAttribute("src", audio + ".ogg");
        source_ogg.setAttribute("type", "audio/ogg");
        nuevo_audio.appendChild(source_ogg);

        audio_padre.appendChild(nuevo_audio);
        //Reproduce el audio
        document.getElementById(idaudio).play();
        setTimeout(callback, 2500);

    } catch (e) {
        console.log(e);
    }
}

/**
 * Desordena un array de valores
 * @param  {Array} a
 * @return {Array}
 */
function shuffle(a) {
    var array = a.slice(0);
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
//consulta los usuarios registrados en la base de datos local
function getClaves() {
    try {
        var exploratorios = new localStorageDB("exploratorios", localStorage);
        var usuarios = exploratorios.queryAll("claves");
        var claves = [];
        for (var i in usuarios) {
            claves.push(usuarios[i].documento);
        }
        return claves;

    } catch (e) {
        console.log(e);
    }
}

//registrarAcceso
function registrarAcceso(internet) {
    var fue_sincronizado = 0;
    try {
        if (internet) {
            //registra en el servidor el acceso
            fue_sincronizado = 1;
            $.ajax({
                type: "POST",
                timeout: 1000,
                url: "http://exploratorios.sucerman.com/registro",
                dataType: "html",
                data: "documento=" + locache.session.get("usuario").documento + "&nombre=" + locache.session.get("usuario").nombre + "&avatar=" + locache.session.get("usuario").avatar + "&accion=Ingreso&info=Ingreso&calificacion=0&url=" + document.location.href,
                success: function(res) {
                    //console.log(res);
                },
                error: function() {
                    console.log('error de conexion');
                    fue_sincronizado = 0;
                },
            });

        }
    } catch (e) {
        console.log(e);
    }

    var exploratorios = new localStorageDB("exploratorios", localStorage);
    //crea la base de datos
    if (!exploratorios.tableExists('registros')) {
        //crea la tabla registros
        exploratorios.createTable("registros", ["documento", "nombre", "avatar", "accion", "info", "fecha", "calificacion", "url", "sincronizado"]);
        console.log("crea la tabla registros en registrar acceso");
    }
    //registra el acceso
    exploratorios.insert("registros", {
        documento: locache.session.get("usuario").documento,
        nombre: locache.session.get("usuario").nombre,
        avatar: locache.session.get("usuario").avatar,
        accion: "Ingreso",
        info: 'Ingreso',
        fecha: fechaActual(),
        calificacion: 0,
        url: document.location.href,
        sincronizado: fue_sincronizado
    });
    exploratorios.commit();


}


//funcion que sincroniza los datos
function sincronizar(internet) {
    try {
        if (internet) {
            //consulta los items sin sincronizar
            var exploratorios = new localStorageDB("exploratorios", localStorage);
            //crea la base de datos
            if (!exploratorios.tableExists('registros')) {
                //crea la tabla registros
                exploratorios.createTable("registros", ["documento", "nombre", "avatar", "accion", "info", "fecha", "calificacion", "url", "sincronizado"]);
                console.log("crea la tabla registro en sincronizar");
            }
            var por_sincronizar = exploratorios.queryAll("registros", {
                query: { sincronizado: 0 }
            });
            //recorro los elementos por sincronizar
            for (var i in por_sincronizar) {
                $.ajax({
                    type: "POST",
                    url: "http://exploratorios.sucerman.com/registro",
                    dataType: "html",
                    timeout: 1000,
                    data: "documento=" + por_sincronizar[i].documento + "&nombre=" + por_sincronizar[i].nombre + "&avatar=" + por_sincronizar[i].avatar + "&accion=" + por_sincronizar[i].accion + "&info=" + por_sincronizar[i].info + "&calificacion=" + por_sincronizar[i].calificacion + "&url=" + por_sincronizar[i].url + "&fecha=" + por_sincronizar[i].fecha,
                    success: function(res) {
                        //console.log(res);
                    },
                    error: function() {
                        console.log('error de conexion');
                    },
                });
                //Actualizar
                exploratorios.update("registros", { ID: por_sincronizar[i].ID }, function(row) {
                    row.sincronizado = 1;
                    return row;
                });
                exploratorios.commit();
            }
        }
    } catch (e) {
        console.log(e);
    }
}

//funcion actualizar usuarios
function actualizarUsuarios(internet) {
    try {
        if (internet) {
            //consulta los items sin sincronizar
            var exploratorios = new localStorageDB("exploratorios", localStorage);
            //crea la base de datos
            if (!exploratorios.tableExists('claves')) {
                //crea la tabla registros
                exploratorios.createTable("claves", ["documento"]);
                exploratorios.insert('claves', { 'documento': '41511' });
                exploratorios.commit();

                console.log("crea la tabla claves en actualizarUsuarios");
            }
            var cantidad_claves_local = exploratorios.rowCount("claves");
            console.log('claves locales ' + cantidad_claves_local);
            var cantidad_claves_servidor = 0;
            console.log('claves servidor ' + cantidad_claves_servidor);
            $.ajax({
                type: "POST",
                url: "http://exploratorios.sucerman.com/cantidad-claves",
                dataType: "html",
                async: false,
                success: function(res) {
                    var respuesta = JSON.parse(res);
                    cantidad_claves_servidor = respuesta.total;
                    console.log('claves servidor ' + cantidad_claves_servidor);
                },
                error: function() {
                    console.log('error de conexion');
                    return false;
                },
            });
            if (cantidad_claves_local != cantidad_claves_servidor) {
                //consulto las claves del servidor
                $.ajax({
                    type: "POST",
                    url: "http://exploratorios.sucerman.com/claves",
                    dataType: "html",
                    async: false,
                    success: function(res) {
                        var claves = JSON.parse(res);
                        console.log(claves);
                        //Borro todos los registros de la tabla 
                        exploratorios.truncate('claves');
                        exploratorios.commit();

                        for (var i in claves) {
                            exploratorios.insert('claves', { 'documento': claves[i].documento });
                            exploratorios.commit();
                        }
                        //console.log(exploratorios.queryAll("claves"));
                    },
                    error: function() {
                        console.log('error de conexion');
                        return false;
                    },
                });
            }
        }
    } catch (e) {
        console.log(e);
    }
}
