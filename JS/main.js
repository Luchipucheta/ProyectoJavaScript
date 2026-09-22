console.log("Cinematika")

alert("Bienvenidos a nuestra página de Cinematika")

const edadMinima = 18;

let continuar = true;

let duracionTotal = 0

const peliculasCinematika = [
    "Harry Potter",
    "Duro de matar",
    "El Rey León",
    "Juego de gemelas",
    "Toy Story"
]

function mostrarPelicula(nombrePelicula, duracionPelicula) {
    console.log("Película seleccionada: " + nombrePelicula);
    console.log("Duración: " + duracionPelicula + " horas");
}

function calcularDuracionTotal(duracionTotal, duracionPelicula) {
    return duracionTotal + duracionPelicula
}

const mostrarDuracionTotal = (duracionTotal) => {
    console.log("Duración total: " + duracionTotal + " horas")
}

while (continuar === true) {

    const nombrePelicula = prompt("¿Qué película viste con nosotros?")

    let duracionPelicula = parseInt(prompt("¿Cuántas horas duró esa película?"))

    peliculasCinematika.push(nombrePelicula)

    mostrarPelicula(nombrePelicula, duracionPelicula);

    duracionTotal = calcularDuracionTotal(duracionTotal, duracionPelicula)

    mostrarDuracionTotal(duracionTotal)

    let edad = parseInt(prompt("Ingrese su edad"))

    if (edad >= edadMinima) {
        console.log("Es mayor de edad, puede ingresar a la película")
    } else if (edad === 17) {
        console.log("Tiene 17 años, no puede ingresar a la película")
    } else {
        console.log("Es menor de edad, no puede ingresar a la película")
    }

    let otraPelicula = prompt("Queres cargar otra pelicula?").toLowerCase()
    if (otraPelicula === "no") {
        continuar = false
    }
}






