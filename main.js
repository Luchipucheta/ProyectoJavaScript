console.log("Cinematika")

alert("Bienvenidos a nuestra página de Cinematika")

const edadMinima = 18;

let continuar = true;

let duracionTotal = 0

while (continuar === true) {
    const nombrePelicula = prompt("¿Qué película viste con nosotros?")

    let duracionPelicula = parseInt(prompt("¿Cuántas horas duró esa película?"))

    let edad = parseInt(prompt("Ingrese su edad"))
    console.log("Pelicula seleccionada: " + nombrePelicula)

    duracionTotal = duracionTotal + duracionPelicula
    console.log("Duracion total: " + duracionTotal + " horas")

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






