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
    console.log("Película seleccionada: " + nombrePelicula)
    console.log("Duración: " + duracionPelicula + " horas")
}

function calcularDuracionTotal(duracionTotal, duracionPelicula) {
    return duracionTotal + duracionPelicula
}

const mostrarDuracionTotal = (duracionTotal) => {
    console.log("Duración total: " + duracionTotal + " horas")
}

function mostrarPeliculas(peliculas) {

    for (const pelicula of peliculas) {
        console.log("🎬 " + pelicula)
    }

}

while (continuar === true) {

    const nombrePelicula = prompt("¿Qué película viste con nosotros?")

    let duracionPelicula = parseInt(prompt("¿Cuántas horas duró esa película?"))

    peliculasCinematika.push(nombrePelicula)

    mostrarPelicula(nombrePelicula, duracionPelicula)

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

let peliculaEliminada = peliculasCinematika.pop()

console.log("Se eliminó la película: " + peliculaEliminada)

peliculasCinematika.unshift("Jurassic Park")

console.log("Se agregó Jurassic Park al inicio de la lista.")

let peliculaBuscada = prompt(
    "¿Qué película querés buscar en Cinematika?"
);

if (peliculasCinematika.includes(peliculaBuscada)) {

    let posicion = peliculasCinematika.indexOf(peliculaBuscada)

    console.log("La película está disponible.")
    console.log("Se encuentra en la posición: " + posicion)

} else {

    console.log("La película no está disponible.")

}

peliculasCinematika.splice(2, 1, "Avengers: Endgames")

console.log("Se reemplazó la película de la posición 2.")

mostrarPeliculas(peliculasCinematika)






