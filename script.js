// Declarar las variables globales
let video;
let escaneando = false;
let camaraTrasera = true;

// Función para iniciar la cámara
async function iniciarCamara() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: camaraTrasera ? 'environment' : 'user'
            }
        });
        video.srcObject = stream;
    } catch (error) {
        console.error('Error al acceder a la cámara: ', error);
    }
}

// Función para cambiar la cámara
function cambiarCamara() {
    camaraTrasera = !camaraTrasera;
    iniciarCamara();
}

// Función para escanear
function escanear(resultado) {
    if (!escaneando) {
        escaneando = true;

        // Oculta todos los botones excepto "Iniciar de Nuevo"
        ocultarBotonesExcepto('iniciarDenuevoBtn');

        document.getElementById("resultado").innerHTML = "Escaneando...";
        document.getElementById("resultado").classList.add("escaneando");

        // Pausa la cámara durante 4 segundos
        pausarCamara(4000);

        // Simula el escaneo durante 4 segundos
        setTimeout(function() {
            document.getElementById("resultado").innerHTML = resultado;
            document.getElementById("resultado").classList.remove("escaneando");
            document.getElementById("resultado").classList.add(resultado.toLowerCase());

            // Si el resultado es "aprobado" o "rechazado", oculta todos los botones excepto "Iniciar de Nuevo"
            if (resultado.toLowerCase() === 'aprobado' || resultado.toLowerCase() === 'rechazado') {
                ocultarBotonesExcepto('iniciarDenuevoBtn');
            } else {
                // Muestra todos los botones al finalizar el escaneo
                mostrarTodosLosBotones();
            }

            escaneando = false;
        }, 4000);
    }
}

// Función para pausar la cámara
function pausarCamara(tiempo) {
    video.pause();
    setTimeout(function() {
        video.play();
    }, tiempo);
}

// Función para volver al menú
function volverAlMenu() {
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("resultado").classList.remove("aprobado", "rechazado", "escaneando");

    // Muestra todos los botones al volver al menú
    mostrarTodosLosBotones();
}

// Función para ocultar todos los botones excepto uno específico
function ocultarBotonesExcepto(idBotonVisible) {
    const botones = document.querySelectorAll('.botones-container button');
    botones.forEach(boton => {
        if (boton.id !== idBotonVisible) {
            boton.style.display = 'none';
        }
    });
}

// Función para mostrar todos los botones
function mostrarTodosLosBotones() {
    const botones = document.querySelectorAll('.botones-container button');
    botones.forEach(boton => {
        boton.style.display = 'inline-block'; // o el estilo que tenías antes
    });
}

// Iniciar la cámara al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    video = document.getElementById("camara");
    iniciarCamara();
});
