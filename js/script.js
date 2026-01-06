$(document).on('ready', inicio);

//codigo de seguimiento google
// (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
// (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
// m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
// })(window,document,'script','http://www.google-analytics.com/analytics.js','ga');

// ga('create', 'UA-67138803-1', 'auto');
// ga('send', 'pageview');

//funcion de inicio
function inicio() {
    try {
        //validar Session
        validarSession();

        //Registro acceso
        is_internet_connected(registrarAcceso);

        //Botones anterior y sisguiente
        widthButtonNextPrev();
        //Evento para que el boton quede fijo al final de la pagina.
        scrollBotonTop();
        //imprime la version
        version();

        //agrego los tags de audio al final del body para todas las lecciones
        $("body").append(etiquetaAudio);
        $('#nombre').html(locache.session.get("usuario").nombre);
        $('#avatar-usuario').addClass('avatar-' + avataresAnimados[locache.session.get("usuario").avatar].img);
        $('.icono-usuario').on('click', reproducirSonidoAvatar);
        //$('#avatar-usuario').on('click',reproducirSonidoAvatar);

        $('#salir').on('click', salir);
        $('#volver').on('click', goToTop);
        $('#nav-icon1').click(function() {
            $(this).toggleClass('open');
        });

        //Animacion de los enlaces
        $(".animsition").animsition({
            //inClass               :   'fade-in-left',
            //outClass              :   'fade-out-right',
            /*inDuration            :    1500,
            outDuration           :    800,
            linkElement           :   '.animsition-link',
            loading               :    true,
            loadingParentElement  :   'body', //animsition wrapper element
            loadingClass          :   'animsition-loading',
            unSupportCss          : [ 'animation-duration',
                                      '-webkit-animation-duration',
                                      '-o-animation-duration'
                                    ],
            overlay               :   false,

            overlayClass          :   'animsition-overlay-slide',
            overlayParentElement  :   'body'*/
        }).one('animsition.start', function() {}).one('animsition.end', function() {});

        //Manejo de excepciones
        var img = '';
        if (isLeccion()) {
            img = '../../../' + avatares[locache.session.get("usuario").avatar].src;
        } else {
            img = '../../' + avatares[locache.session.get("usuario").avatar].src;
        }
        $('.icono-usuario').css('background-image', 'url(' + img + ')');
        $('.icono-usuario').attr('title', locache.session.get("usuario").nombre);
        $('.icono-usuario').attr('alt', '');

    } catch (e) {
        //console.log(e);
    }
}
//funcion que coloca el número de versión
function version() {
    $('.pagina').after("<footer class='container animsition'><p class='text-right'>Proyecto de grado univeridad Sergio Arboleda</p></footer>");
}
//funcion que cierra la session
function salir() {
    //registra la salida
    is_internet_connected(registrarSalida);
}
//Funcion que valida la session
//Si no tiene activa la session muestra el pagina de login
function validarSession(evento) {
    if (!locache.session.get("usuario")) {
        //redirige al login
        if (isLeccion()) {
            //estoy dentro de la unidad
            //estoy en home.html
            locache.session.set("usuario", {
                'documento': '9865208',
                'nombre': 'Andres',
                'avatar': 2,
            });
            //document.location.href = '../../../index.html';
        } else {
            //estoy en home.html
            locache.session.set("usuario", {
                'documento': '9865208',
                'nombre': 'Andres',
                'avatar': 2,
            });
            //document.location.href = 'index.html';
        }
    }
}
//registrarSalida
function registrarSalida(internet) {
    var fue_sincronizado = 0;
    try {
        //si hay conexion a internet
        if (internet) {
            //registra en el servidor el acceso
            fue_sincronizado = 1;
            $.ajax({
                type: "POST",
                timeout: 1000,
                url: "http://exploratorios.sucerman.com/registro",
                dataType: "html",
                data: "documento=" + locache.session.get("usuario").documento + "&nombre=" + locache.session.get("usuario").nombre + "&avatar=" + locache.session.get("usuario").avatar + "&accion=Logout&info=Cierre de session&calificacion=0&url=" + document.location.href,
                success: function(res) {
                    //console.log(res);
                }
            });
        }
    } catch (e) {
        //console.log(e);
    }
    var exploratorios = new localStorageDB("exploratorios", localStorage);
    //crea la base de datos
    if (!exploratorios.tableExists('registros')) {
        //crea la tabla registros
        exploratorios.createTable("registros", ["documento", "nombre", "avatar", "accion", "info", "fecha", "calificacion", "url", "sincronizado"]);
    }
    //registra el acceso
    exploratorios.insert("registros", {
        documento: locache.session.get("usuario").documento,
        nombre: locache.session.get("usuario").nombre,
        avatar: locache.session.get("usuario").avatar,
        accion: "Logout",
        info: 'Cierre de session',
        fecha: fechaActual(),
        calificacion: 0,
        url: document.location.href,
        sincronizado: 0
    });
    exploratorios.commit();

    //borra la session
    locache.session.flush();
    //redirige al login
    if (isLeccion()) {
        //estoy dentro de la leccion
        locache.session.set("usuario", {
            'documento': '9865208',
            'nombre': 'Andres',
            'avatar': 2,
        });
        //document.location.href = '../../../index.html';
    } else {
        //estoy en home.html
        locache.session.set("usuario", {
            'documento': '9865208',
            'nombre': 'Andres',
            'avatar': 2,
        });
        //document.location.href = 'index.html';
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
                asycn: true,
                url: "http://exploratorios.sucerman.com/registro",
                dataType: "html",
                data: "documento=" + locache.session.get("usuario").documento + "&nombre=" + locache.session.get("usuario").nombre + "&avatar=" + locache.session.get("usuario").avatar + "&accion=Vista&info=Vista leccion&calificacion=0&url=" + document.location.href,
                success: function(res) {
                    //console.log('termino el insert en exploratorios');
                    //console.log(res);
                }
            });
        }
    } catch (e) {
        //console.log(e);
    }
    var exploratorios = new localStorageDB("exploratorios", localStorage);
    //crea la base de datos
    if (!exploratorios.tableExists('registros')) {
        //crea la tabla registros
        exploratorios.createTable("registros", ["documento", "nombre", "avatar", "accion", "info", "fecha", "calificacion", "url", "sincronizado"]);
    }
    //registra el acceso
    exploratorios.insert("registros", {
        documento: locache.session.get("usuario").documento,
        nombre: locache.session.get("usuario").nombre,
        avatar: locache.session.get("usuario").avatar,
        accion: "Vista",
        info: 'Vista de leccion',
        fecha: fechaActual(),
        calificacion: 0,
        url: document.location.href,
        sincronizado: fue_sincronizado
    });
    exploratorios.commit();
}

//Guarda la calificacion en el servidor
function guardarActividadServer(internet, parametros) {
    //Los parametros son
    //accion, info, calificacion, callback
    if (internet) {
        $.ajax({
            type: "POST",
            timeout: 1000,
            url: "http://exploratorios.sucerman.com/registro",
            dataType: "html",
            data: "documento=" + locache.session.get("usuario").documento + "&nombre=" + locache.session.get("usuario").nombre + "&avatar=" + locache.session.get("usuario").avatar + "&accion=" + parametros.accion + "&info=" + parametros.info + "&calificacion=" + parametros.calificacion + "&url=" + document.location.href,
            success: function(res) {
                console.log('guardo en el servidor la calificacion');
                console.log(res);
                guardarActividadLocal(parametros.accion, parametros.info, parametros.calificacion, true);
            }
        });
    } else {
        console.log('no guardo en el servidor');
        guardarActividadLocal(parametros.accion, parametros.info, parametros.calificacion, false);
    }
}
//Guarda la calificacion en la base de datos local
function guardarActividadLocal(accion, info, calificacion, fue_sincronizado) {
    var exploratorios = new localStorageDB("exploratorios", localStorage);
    //crea la base de datos
    if (!exploratorios.tableExists('registros')) {
        //crea la tabla registros
        exploratorios.createTable("registros", ["documento", "nombre", "avatar", "accion", "info", "fecha", "calificacion", "url", "sincronizado"]);
    }
    //registra el acceso
    exploratorios.insert("registros", {
        documento: locache.session.get("usuario").documento,
        nombre: locache.session.get("usuario").nombre,
        avatar: locache.session.get("usuario").avatar,
        accion: accion,
        info: info,
        fecha: fechaActual(),
        calificacion: calificacion,
        url: document.location.href,
        sincronizado: fue_sincronizado
    });
    exploratorios.commit();
}
//registrarAcceso
function registrarActividad(accion, info, calificacion) {
    try {
        var parametros = { 'accion': accion, 'info': info, 'calificacion': calificacion };
        is_internet_connected(guardarActividadServer, parametros);
    } catch (e) {
        console.log(e);
    }
}
//Funcion que anima el scroll
function goToTop() {
    $('html, body').animate({
        scrollTop: 0
    }, 800);
}
//*** Calcula el ancho de los botones next y prev
function widthButtonNextPrev() {
    var widthNext = $("nav.nav-roundslide a.next>.roundslide-label").outerWidth(true) + 60;
    var widthPrev = $("nav.nav-roundslide a.prev>.roundslide-label").outerWidth(true) + 60;
    var styleNext = ".nav-roundslide a.next:hover { width: " + widthNext + "px; }\n";
    var stylePrev = ".nav-roundslide a.prev:hover { width: " + widthPrev + "px; }";
    $("head").append($("<style>").append(styleNext + stylePrev));
}

function mostrarCalificacion(modalID, puntaje, mensaje, exito, resetcallback) {
    $(modalID).find('.calificacion-mensaje').text(mensaje);
    $(modalID).find('.calificacion-puntaje').text(puntaje);
    //Si es exitoso se muestra el boton cerrar de lo contrario el boton intentar nuevamente.
    if (exito) {
        $(modalID).find('.calificacion-intentar').addClass('hide');
        $(modalID).find('.calificacion-cerrar').removeClass('hide');
        $(modalID).find('.avatar').addClass('avatar-exito');
        $(modalID).find('.avatar').removeClass('avatar-error');
        reproducirAudio('../../../assets/audio/exito-actividad');
    } else {
        $(modalID).find('.calificacion-intentar').removeClass('hide').on('click', resetcallback);
        $(modalID).find('.calificacion-cerrar').addClass('hide');
        $(modalID).find('.avatar').removeClass('avatar-exito');
        $(modalID).find('.avatar').addClass('avatar-error');
        reproducirAudio('../../../assets/audio/error-actividad');
    }
    $(modalID).modal({
        backdrop: 'static',
        show: true
    });
}

function scrollBotonTop() {
    $(window).scroll(function() {
        var d = $(window).scrollTop() + $(window).height() - $(document).height();
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 80) {
            $("#volver").parent().css('bottom', (d + 80 + 15) + 'px');
        } else {
            $("#volver").parent().css('bottom', '');
        }
    });
}

