$(document).on('ready', inicio);
//codigo de seguimiento google
(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'http://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-67138803-1', 'auto');
ga('send', 'pageview');

//lista de avatares
//Avatar Aleatorio
//var avatar_actual = Math.floor((Math.random() * avatares.length-1) + 1);
//var avatar_actual = Math.floor((Math.random() * avataresAnimados.length - 1) + 1);
var avatar_actual = Math.floor(Math.random() * 10);

//funcion video de inicio
function videoInicio() {
    setTimeout(function() {
        $('#videoModal').modal({
            backdrop: 'static',
            show: true
        });
        document.getElementById('video-player').play();
    }, 3000);

    $('.close').on('click', function() {
        document.getElementById('video-player').pause();
    });
}

function inicio(evento) {
    $('#form_ingreso').on('submit', ingresar);
    $('#btn-prev').on('click', anterior);
    $('#btn-next').on('click', siguiente);
    $('#img-avatar').addClass('avatar-' + avataresAnimados[avatar_actual].img);
    $(document).on('keydown', function(event) {
        if ($("form input[type=text]:focus").size() == 0 || $("form input[type=text]:focus").val() == '') {
            switch (event.keyCode) {
                case 37:
                    anterior();
                    $("#btn-prev").addClass("hover");
                    window.setTimeout(function() {
                        $("#btn-prev").removeClass("hover");
                    }, 200);
                    break;
                case 39:
                    siguiente();
                    $("#btn-next").addClass("hover");
                    window.setTimeout(function() {
                        $("#btn-next").removeClass("hover");
                    }, 200);
                    break;
                default:
                    break;
            }
        }
    });
    //Consulta si hay usuarios nuevos
    //is_internet_connected(actualizarUsuarios);
    //Consulta si hay datos sin sincronizar
    //is_internet_connected(sincronizar);
}

function ingresar(evento) {
    var valido = true;

    // Validar usuario vacío
    if ($('#nombre').val() == "") {
        $('#nombre').parent().addClass('campo-requerido');
        valido = false;
    } else {
        $('#nombre').parent().removeClass('campo-requerido');
    }

    // Validar contraseña vacía
    if ($('#documento').val() == "") {
        $('#documento').parent().addClass('campo-requerido');
        valido = false;
    } else {
        $('#documento').parent().removeClass('campo-requerido');
    }

    $(".campo-requerido").first().find('input').focus();

    // ❌ Si hay campos vacíos, NO continúa
    if (!valido) {
        return false;
    }

    // ✅ VALIDACIÓN DE USUARIO Y CONTRASEÑA
    var usuarioCorrecto = "estudiante";
    var claveCorrecta = "gjprogram2025";

    if (
        $('#nombre').val() !== usuarioCorrecto ||
        $('#documento').val() !== claveCorrecta
    ) {
        alert("Usuario o contraseña incorrectos");
        return false; // 🔴 BLOQUEA EL ACCESO
    }

    // ✅ Guarda la sesión
    locache.session.set("usuario", {
        'documento': $('#documento').val(),
        'nombre': $('#nombre').val(),
        'avatar': avatar_actual,
    });

    // Función de navegación
        var navegar = function () {
        document.location.href = 'Niveles.html';
    };

    // Reproduce audio y luego navega
    reproducirAudio(avataresAnimados[avatar_actual].audio, navegar);

    // Animación de salida
    animarSalida();

    return false;
}

function animarSalida() {
    $('#img-logos').css('animation-delay', '0s');
    $('#img-logos').addClass('bounceOut');
    $('.ingreso').css('animation-delay', '0.8s');
    $('.ingreso').addClass('flipOutX');
    $('.avatar').css('animation-delay', '1.3s');
    $('.avatar').addClass('bounceOutLeft');
    $('.proyecto').css('animation-delay', '2s');
    $('.proyecto').addClass('zoomOutDown');
}

function anterior() {
    $('#img-avatar').removeClass('avatar-' + avataresAnimados[avatar_actual].img);
    if (avatar_actual == 0) {
        avatar_actual = avatares.length - 1;
    } else {
        avatar_actual--;
    }
    $('#img-avatar').addClass('avatar-' + avataresAnimados[avatar_actual].img);
}

function siguiente() {
    $('#img-avatar').removeClass('avatar-' + avataresAnimados[avatar_actual].img);
    if (avatar_actual == avatares.length - 1) {
        avatar_actual = 0;
    } else {
        avatar_actual++;
    }
    $('#img-avatar').addClass('avatar-' + avataresAnimados[avatar_actual].img);
}