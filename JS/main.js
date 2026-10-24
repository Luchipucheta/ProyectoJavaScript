class Pelicula {
    constructor(id, nombre, duracion, genero) {
        this.id = id;
        this.nombre = nombre;
        this.duracion = duracion;
        this.genero = genero;
    }

    mostrarInformacion() {
        return `${this.nombre} - ${this.genero} - ${this.duracion} horas`;
    }
}

let proximoId = 4;

let peliculasCinematika = [
    new Pelicula(1, "Harry Potter", 3, "Fantasía"),
    new Pelicula(2, "Duro de matar", 2, "Acción"),
    new Pelicula(3, "El Rey León", 2, "Animación")
];

const catalogoPeliculas = document.querySelector("#catalogo-peliculas");
const contador = document.querySelector("#contador");

function renderizarPeliculas(listaPeliculas) {
    catalogoPeliculas.innerHTML = "";

    contador.textContent = `${listaPeliculas.length} película(s)`;

    if (listaPeliculas.length === 0) {
        catalogoPeliculas.innerHTML = `
            <p class="vacio">No hay películas para mostrar.</p>
        `;
        return;
    }

    for (const pelicula of listaPeliculas) {
        catalogoPeliculas.innerHTML += `
            <article class="tarjeta-pelicula">
                <div class="icono-pelicula">🎬</div>
                <h3>${pelicula.nombre}</h3>
                <span class="etiqueta-genero">${pelicula.genero}</span>
                <p class="duracion">Duración: ${pelicula.duracion} horas</p>
            </article>
        `;
    }
}

renderizarPeliculas(peliculasCinematika);


