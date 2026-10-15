
console.log("Cinematika");

alert("Bienvenidos a nuestra página de Cinematika");

const edadMinima = 18;

let continuar = true;
let duracionTotal = 0;
let proximoId = 4;

class Pelicula {
    constructor(id, nombre, duracion, genero) {
        this.id = id;
        this.nombre = nombre;
        this.duracion = duracion;
        this.genero = genero;
    }

    mostrarInformacion() {
        console.log(
            "ID: " + this.id +
            " | Película: " + this.nombre +
            " | Duración: " + this.duracion +
            " horas" +
            " | Género: " + this.genero
        );
    }

    extenderDuracion(horasExtra) {
        if (horasExtra > 0) {
            this.duracion = this.duracion + horasExtra;
        }
    }
}

const pelicula1 = new Pelicula(
    1,
    "Harry Potter",
    3,
    "Fantasía"
);

const pelicula2 = new Pelicula(
    2,
    "Duro de matar",
    2,
    "Acción"
);

const pelicula3 = new Pelicula(
    3,
    "El Rey León",
    2,
    "Animación"
);

const peliculasCinematika = [
    pelicula1,
    pelicula2,
    pelicula3
];

console.log("ANTES de modificar la película:");
pelicula1.mostrarInformacion();

pelicula1.extenderDuracion(1);

console.log("DESPUÉS de modificar la película:");
pelicula1.mostrarInformacion();

function mostrarPelicula(nombrePelicula, duracionPelicula) {
    console.log("Película seleccionada: " + nombrePelicula);
    console.log("Duración: " + duracionPelicula + " horas");
}

function calcularDuracionTotal(duracionTotal, duracionPelicula) {
    return duracionTotal + duracionPelicula;
}

const mostrarDuracionTotal = (duracionTotal) => {
    console.log("Duración total: " + duracionTotal + " horas");
};

function mostrarPeliculas(peliculas) {
    for (const pelicula of peliculas) {
        console.log(
            "🎬 " +
            pelicula.nombre +
            " - " +
            pelicula.genero +
            " - " +
            pelicula.duracion +
            " horas"
        );
    }
}

pelicula1.mostrarInformacion();
pelicula2.mostrarInformacion();
pelicula3.mostrarInformacion();

while (continuar === true) {
    const nombrePelicula = prompt(
        "¿Qué película viste con nosotros?"
    );

    let duracionPelicula = parseInt(
        prompt("¿Cuántas horas duró esa película?")
    );

    let generoPelicula = prompt(
        "¿Qué género tiene la película?"
    );

    const nuevaPelicula = new Pelicula(
        proximoId,
        nombrePelicula,
        duracionPelicula,
        generoPelicula
    );

    peliculasCinematika.push(nuevaPelicula);

    proximoId++;

    mostrarPelicula(
        nombrePelicula,
        duracionPelicula
    );

    duracionTotal = calcularDuracionTotal(
        duracionTotal,
        duracionPelicula
    );

    mostrarDuracionTotal(duracionTotal);

    let edad = parseInt(
        prompt("Ingrese su edad")
    );

    if (edad >= edadMinima) {
        console.log(
            "Es mayor de edad, puede ingresar a la película"
        );
    } else if (edad === 17) {
        console.log(
            "Tiene 17 años, no puede ingresar a la película"
        );
    } else {
        console.log(
            "Es menor de edad, no puede ingresar a la película"
        );
    }

    let otraPelicula = prompt(
        "¿Querés cargar otra película?"
    ).toLowerCase();

    if (otraPelicula === "no") {
        continuar = false;
    }
}

let peliculaEliminada = peliculasCinematika.pop();

console.log(
    "Se eliminó la película: " + peliculaEliminada.nombre
);

peliculasCinematika.unshift(
    new Pelicula(
        proximoId,
        "Jurassic Park",
        2,
        "Aventura"
    )
);

proximoId++;

console.log("Se agregó Jurassic Park al inicio de la lista.");

console.log("Catálogo completo de Cinematika:");
mostrarPeliculas(peliculasCinematika);

let nombresPeliculas = peliculasCinematika.map(
    pelicula => pelicula.nombre
);

let peliculaBuscada = prompt(
    "¿Qué película querés buscar en Cinematika?"
);

if (nombresPeliculas.includes(peliculaBuscada)) {
    let posicion = nombresPeliculas.indexOf(peliculaBuscada);

    console.log("La película está disponible.");
    console.log("Se encuentra en la posición: " + posicion);

    const peliculaEncontrada = peliculasCinematika.find(
        pelicula =>
            pelicula.nombre.toLowerCase() ===
            peliculaBuscada.toLowerCase()
    );

    if (peliculaEncontrada) {
        console.log("Información de la película encontrada:");
        peliculaEncontrada.mostrarInformacion();
    }
} else {
    console.log("La película no está disponible.");
}

peliculasCinematika.splice(
    2,
    1,
    new Pelicula(
        proximoId,
        "Avengers: Endgame",
        3,
        "Acción"
    )
);

proximoId++;

console.log("Se reemplazó la película de la posición 2.");

const opcionFiltro = prompt(
    "¿Querés ver las películas que duran 3 horas o más? Escribí si o no:"
).toLowerCase();

if (opcionFiltro === "si" || opcionFiltro === "sí") {
    const peliculasLargas = peliculasCinematika.filter(
        pelicula => pelicula.duracion >= 3
    );

    if (peliculasLargas.length > 0) {
        console.log("Películas que duran 3 horas o más:");
        mostrarPeliculas(peliculasLargas);
    } else {
        console.log("No hay películas que cumplan ese criterio.");
    }
}

const opcionTitulos = prompt(
    "¿Querés ver solamente los títulos de las películas? Escribí si o no:"
).toLowerCase();

if (opcionTitulos === "si" || opcionTitulos === "sí") {
    const titulosPeliculas = peliculasCinematika.map(
        pelicula => pelicula.nombre
    );

    console.log("Títulos de las películas de Cinematika:");
    console.log(titulosPeliculas);
}




