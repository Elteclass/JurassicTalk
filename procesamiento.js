//Variables
let imagenDino = document.getElementById('imgDino');
let btnSiguiente = document.getElementById('btnSiguiente');
let btnReiniciar = document.getElementById('btnReiniciar');

//Variables para el conteo
let turnoImg = 0;
let puntos = 0;
let siguienteContador = 0;
let fin = false;

//Variables para el reconocimiento de voz
let btnHablar = document.getElementById('btnHablar');
let btnNoHablar = document.getElementById('btnNoHablar');
let reconocimiento = new webkitSpeechRecognition();

//Parametros para la variable de reconocimiento
reconocimiento.continuous = true;
reconocimiento.lang = 'es-MX';
reconocimiento.interimResult = false;

//Array de imagenes
const imagenes = [
    "Imagenes/T-rex.jpeg",
    "Imagenes/Velociraptor.jpeg",
    "Imagenes/Triceratops.jpg",
    "Imagenes/stegosaurio.jpg",
    "Imagenes/spinosaurio.jpg",
    "Imagenes/Pteranodon.jpeg",
    "Imagenes/Diplodocus.jpeg",
    "Imagenes/carnotaurio.jpg",
    "Imagenes/ankylosaurio.jpg",
    "Imagenes/parasaurolophus.jpg"
];
//Array que incluye posibles maneras de captar las palabras.
let palabrasTrex = [
    "t-rex",
    "T rex",
    "tiranosaurio rex",
    " t-rex",
    " T rex",
    " tiranosaurio rex",
    " T Rex"
];
let palabrasVelociraptor = [
    "velociraptor",
    " velociraptor",
    "Velociraptor",
    " Velociraptor",
    "Velocirraptor",
    " velocirraptor"
];
let palabrasTriceratops = [
    "triceratops",
    " triceratops",
    "Triceratops",
    " Triceratops"
];
let palabrasStegosaurio = [
    "estegosaurio",
    " estegosaurio"
];
let palabrasSpinosaurio = [
    "espinosaurio",
    " espinosaurio"
];
let palabrasPteranodon = [
    "teranodón",
    " teranodón",
    "peteranodon",
    " peteranodon"
];
let palabrasDiplodocus = [
    "diplodocus",
    " diplodocus"
];
let palabrasCarnotaurio = [
    "carnotauro",
    " carnotauro",
    "carnotaurio",
    " carnotaurio",
];
let palabrasAnkylo = [
    "anquilosaurio",
    " anquilosaurio"
];
let palabrasParasau = [
    "para sauro",
    " para sauro",
    "para saurologos",
    " para saurologos",
    "para saurolofus",
    " para saurolofus",
    "para saurofus",
    " para saurofus",
    "para saorofus",
    " para saorofus",
    " para saurólofus"
];

//Para empezar a reconocer
btnHablar.addEventListener('click', () => {
    reconocimiento.start();
})

//Frenar el reconocimiento
btnNoHablar.addEventListener('click', () => {
    reconocimiento.abort();
})

//Logica del juego
reconocimiento.onresult = (event) => {
    const descripcion = event.results[event.results.length - 1][0].transcript;
    console.log("Texto escuchado: " + descripcion)

    //Condicional para comparar lo que dijo el usuario con la gramatica permitida
    if (
        (palabrasTrex.includes(descripcion) && imagenDino.src.endsWith("T-rex.jpeg")) ||
        (palabrasVelociraptor.includes(descripcion) && imagenDino.src.endsWith("Velociraptor.jpeg")) ||
        (palabrasTriceratops.includes(descripcion) && imagenDino.src.endsWith("Triceratops.jpg")) ||
        (palabrasStegosaurio.includes(descripcion) && imagenDino.src.endsWith("stegosaurio.jpg")) ||
        (palabrasSpinosaurio.includes(descripcion) && imagenDino.src.endsWith("spinosaurio.jpg")) ||
        (palabrasPteranodon.includes(descripcion) && imagenDino.src.endsWith("Pteranodon.jpeg")) ||
        (palabrasDiplodocus.includes(descripcion) && imagenDino.src.endsWith("Diplodocus.jpeg")) ||
        (palabrasCarnotaurio.includes(descripcion) && imagenDino.src.endsWith("carnotaurio.jpg")) ||
        (palabrasAnkylo.includes(descripcion) && imagenDino.src.endsWith("ankylosaurio.jpg"))
    ) {
        turnoImg = (turnoImg + 1) % imagenes.length;
        imagenDino.src = imagenes[turnoImg];
        puntos++;
    }
    else if((palabrasParasau.includes(descripcion) && imagenDino.src.endsWith("parasaurolophus.jpg"))){
        if(fin === true){
            console.log("limite")
        }
        else{
            puntos++;
            msjpuntaje();
        }
    }
    else{console.log("Intente de nuevo");}

}

//Pasar imagen
btnSiguiente.addEventListener('click', () =>{
    turnoImg++;
    if (turnoImg < imagenes.length){
        imagenDino.src = imagenes[turnoImg];
    }
    else{
        msjpuntaje();
    }
    siguienteContador++;
    console.log(siguienteContador);
})

//Reiniciar el juego
btnReiniciar.addEventListener('click', () =>{
    imagenDino.src = "/Imagenes/T-rex.jpeg";
    turnoImg = 0;
    puntos = 0;
    reconocimiento.abort();
    console.log(turnoImg, puntos);
})

//Mostrar mensaje de puntaje
function msjpuntaje(){
    if (puntos === 0){ // Fatal
        Swal.fire({
            icon: "error",
            title: "Investiga más!!!",
            text: "Vuelve a intentarlo! " + puntos + "/10",
        });
        fin = true;
    }
    else if (puntos >= 1 && puntos <= 5){ // Mal (1-5)
        Swal.fire({
            title: "Estuvo bien, creo?",
            text: "Puedes mejorar " + puntos + "/10",
            icon: "question"
        });
        fin = true;
    }
    else if (puntos >= 6 && puntos <= 9){ // Bien (6-9)
        Swal.fire({
            title: "Genial!",
            text: "Este fue tu puntaje " + puntos + "/10",
            imageUrl: "https://unsplash.it/400/200",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image"
        });
        fin = true;
    }
    else{ // Excelente (10)
        Swal.fire({
            title: "Excelente!!",
            text: "Tu puntaje fue " + puntos + "/10",
            icon: "success",
            draggable: true
        });
        fin = true;
    }
}