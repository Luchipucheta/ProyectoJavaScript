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

const CLAVE_STORAGE = "cinematikaPeliculas";

const datosGuardados = JSON.parse(
    localStorage.getItem(CLAVE_STORAGE) ?? "null"
);

let peliculasCinematika;

if (Array.isArray(datosGuardados)) {
    peliculasCinematika = datosGuardados.map((pelicula) =>
        new Pelicula(
            pelicula.id,
            pelicula.nombre,
            pelicula.duracion,
            pelicula.genero
        )
    );
} else {
    peliculasCinematika = [
        new Pelicula(1, "Harry Potter", 3, "Fantasía"),
        new Pelicula(2, "Duro de matar", 2, "Acción"),
        new Pelicula(3, "El Rey León", 2, "Animación")
    ];

    localStorage.setItem(
        CLAVE_STORAGE,
        JSON.stringify(peliculasCinematika)
    );
}

let proximoId = peliculasCinematika.reduce(
    (mayorId, pelicula) => Math.max(mayorId, pelicula.id),
    0
) + 1;

const formulario = document.querySelector("#formulario-pelicula");
const inputNombre = document.querySelector("#nombre");
const inputDuracion = document.querySelector("#duracion");
const inputGenero = document.querySelector("#genero");
const buscador = document.querySelector("#buscador");
const catalogoPeliculas = document.querySelector("#catalogo-peliculas");
const contador = document.querySelector("#contador");
const mensaje = document.querySelector("#mensaje");

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${tipo}`;
}

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
                <p class="duracion">
                    Duración: ${pelicula.duracion} horas
                </p>
                <button
                    type="button"
                    class="boton-eliminar"
                    data-id="${pelicula.id}"
                >
                    Eliminar película
                </button>
            </article>
        `;
    }
}

function actualizarCatalogo() {
    const textoBuscado = buscador.value.trim().toLowerCase();

    const peliculasFiltradas = peliculasCinematika.filter((pelicula) =>
        pelicula.nombre.toLowerCase().includes(textoBuscado)
    );

    renderizarPeliculas(peliculasFiltradas);
}

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = inputNombre.value.trim();
    const duracion = Number(inputDuracion.value);
    const genero = inputGenero.value;

    if (
        nombre === "" ||
        genero === "" ||
        !Number.isInteger(duracion) ||
        duracion <= 0
    ) {
        mostrarMensaje("Completá todos los campos correctamente.", "error");
        return;
    }

    const nuevaPelicula = new Pelicula(
        proximoId,
        nombre,
        duracion,
        genero
    );

    peliculasCinematika.push(nuevaPelicula);
    proximoId++;
    guardarPeliculas();

    formulario.reset();
    actualizarCatalogo();

    mostrarMensaje(
        `¡La película "${nombre}" se agregó correctamente!`,
        "exito"
    );
});

buscador.addEventListener("input", actualizarCatalogo);

catalogoPeliculas.addEventListener("click", (evento) => {
    const botonEliminar = evento.target.closest(".boton-eliminar");

    if (!botonEliminar) {
        return;
    }

    const idPelicula = Number(botonEliminar.dataset.id);

    const peliculaEliminada = peliculasCinematika.find(
        (pelicula) => pelicula.id === idPelicula
    );

    if (!peliculaEliminada) {
        return;
    }

    peliculasCinematika = peliculasCinematika.filter(
        (pelicula) => pelicula.id !== idPelicula
    );
    guardarPeliculas();

    actualizarCatalogo();

    function guardarPeliculas() {
    localStorage.setItem(
        CLAVE_STORAGE,
        JSON.stringify(peliculasCinematika)
    );
}

    mostrarMensaje(
        `La película "${peliculaEliminada.nombre}" se eliminó correctamente.`,
        "exito"
    );
});

renderizarPeliculas(peliculasCinematika);