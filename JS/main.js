
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

let peliculasCinematika = [];

try {
    const datosGuardados = JSON.parse(
        localStorage.getItem(CLAVE_STORAGE) ?? "null"
    );

    if (Array.isArray(datosGuardados)) {
        peliculasCinematika = datosGuardados.map(
            ({ id, nombre, duracion, genero }) =>
                new Pelicula(id, nombre, duracion, genero)
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
} catch (error) {
    console.error("No se pudieron recuperar las películas:", error);

    peliculasCinematika = [
        new Pelicula(1, "Harry Potter", 3, "Fantasía"),
        new Pelicula(2, "Duro de matar", 2, "Acción"),
        new Pelicula(3, "El Rey León", 2, "Animación")
    ];
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
const mensajeTemporizador = document.querySelector("#mensaje-temporizador");
const estadoCarga = document.querySelector("#estado-carga");

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${tipo}`;
}

function guardarPeliculas() {
    localStorage.setItem(
        CLAVE_STORAGE,
        JSON.stringify(peliculasCinematika)
    );
}

function mostrarAvisoInicial() {
    setTimeout(() => {
        mensajeTemporizador.textContent =
            "🔔 ¡Explorá tu catálogo y descubrí tu próxima película!";
    }, 2500);
}

function obtenerPeliculas() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!Array.isArray(peliculasCinematika)) {
                reject(new Error("Los datos del catálogo no son válidos."));
                return;
            }

            resolve(peliculasCinematika);
        }, 1500);
    });
}

function renderizarPeliculas(listaPeliculas) {
    contador.textContent = `${listaPeliculas.length} película(s)`;

    catalogoPeliculas.innerHTML = listaPeliculas.length === 0
        ? `<p class="vacio">No hay películas para mostrar.</p>`
        : listaPeliculas.map(({ id, nombre, duracion, genero }) => `
            <article class="tarjeta-pelicula">
                <div class="icono-pelicula">🎬</div>
                <h3>${nombre}</h3>
                <span class="etiqueta-genero">${genero}</span>
                <p class="duracion">Duración: ${duracion} horas</p>
                <button
                    type="button"
                    class="boton-eliminar"
                    data-id="${id}"
                >
                    Eliminar película
                </button>
            </article>
        `).join("");
}

function actualizarCatalogo() {
    const textoBuscado = buscador.value.trim().toLowerCase();

    const peliculasFiltradas = peliculasCinematika.filter((pelicula) =>
        (pelicula.nombre?.toLowerCase() ?? "").includes(textoBuscado)
    );

    renderizarPeliculas(peliculasFiltradas);
}

async function cargarCatalogo() {
    estadoCarga.textContent = "⏳ Cargando películas...";
    formulario.querySelector("button[type='submit']").disabled = true;

    try {
        const peliculasCargadas = await obtenerPeliculas();

        actualizarCatalogo();

        estadoCarga.textContent =
            `✔️ ${peliculasCargadas.length} películas cargadas correctamente.`;
    } catch (error) {
        console.error("Error al cargar el catálogo:", error);

        estadoCarga.textContent =
            "⚠️ No se pudo cargar el catálogo. Intentá de nuevo.";

        mostrarMensaje(
            "No se pudo procesar la operación, intentá de nuevo.",
            "error"
        );
    } finally {
        formulario.querySelector("button[type='submit']").disabled = false;
        console.log("Finalizó el proceso de carga del catálogo.");
    }
}

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    try {
        const nombre = inputNombre.value.trim();
        const duracion = Number(inputDuracion.value);
        const genero = inputGenero.value;

        if (
            nombre === "" ||
            genero === "" ||
            !Number.isInteger(duracion) ||
            duracion <= 0
        ) {
            throw new Error("Los datos ingresados no son válidos.");
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

        inputNombre.focus();
    } catch (error) {
        console.error("Error al agregar la película:", error);

        mostrarMensaje(
            "No se pudo procesar la operación, intentá de nuevo.",
            "error"
        );
    } finally {
        console.log("Finalizó el intento de agregar una película.");
    }
});

buscador.addEventListener("input", actualizarCatalogo);

catalogoPeliculas.addEventListener("click", (evento) => {
    const botonEliminar = evento.target.closest(".boton-eliminar");

    if (!botonEliminar) {
        return;
    }

    try {
        const idPelicula = Number(botonEliminar.dataset.id);

        const peliculaEliminada = peliculasCinematika.find(
            (pelicula) => pelicula.id === idPelicula
        );

        if (!peliculaEliminada) {
            throw new Error("No se encontró la película seleccionada.");
        }

        peliculasCinematika = peliculasCinematika.filter(
            (pelicula) => pelicula.id !== idPelicula
        );

        guardarPeliculas();
        actualizarCatalogo();

        mostrarMensaje(
            `La película "${peliculaEliminada.nombre}" se eliminó correctamente.`,
            "exito"
        );
    } catch (error) {
        console.error("Error al eliminar la película:", error);

        mostrarMensaje(
            "No se pudo procesar la operación, intentá de nuevo.",
            "error"
        );
    } finally {
        console.log("Finalizó el intento de eliminar una película.");
    }
});

mostrarAvisoInicial();
cargarCatalogo();
