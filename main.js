console.log("Cinematika")

alert("Bienvenidos a nuestra página de Cinematika")

const nombrePelicula = prompt("¿Qué película viste con nosotros?")

let duracionPelicula1 = parseInt(
    prompt("¿Cuántas horas duró esa película?"))

let duracionPelicula2 = parseInt(
    prompt("¿Cuántas horas duró la segunda película que viste?"))

console.log("Película seleccionada: " + nombrePelicula)

let duracionTotal = duracionPelicula1 + duracionPelicula2

console.log("La duración total de las dos películas fue de " + duracionTotal + " horas")

const edadMinima = 18;

let ingresa = true;

while (ingresa === true) {

    let edad = parseInt(prompt("Ingrese su edad"));

    if (edad >= edadMinima) {

        console.log("Es mayor de edad, puede ingresar a la película");

    } else if (edad === 17) {

        console.log("Tiene 17 años, no puede ingresar a la película");

    } else {

        console.log("Es menor de edad, no puede ingresar a la película");

        ingresa = false;
    }
}