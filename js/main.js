// ------------------------------
// Simulador de Biblioteca
// ------------------------------

// Array para almacenar libros
let libros = JSON.parse(localStorage.getItem('libros')) || [];

// ------------------------------
// Funciones
// ------------------------------

// Agregar libro
function agregarLibro(titulo, autor) {
    let libro = { titulo, autor }; // Usamos objeto para poder manipular más fácilmente
    libros.push(libro);
    guardarLibros();
    mostrarLibros(libros);
}

// Mostrar libros
function mostrarLibros(listaLibros) {
    const lista = document.getElementById('libros');
    if (listaLibros.length === 0) {
        lista.innerHTML = "<li>No hay libros en la biblioteca.</li>";
        return;
    }
    lista.innerHTML = listaLibros.map(libro => 
        `<li>Título: ${libro.titulo}, Autor: ${libro.autor}</li>`
    ).join('');
}

// Buscar libro
function buscarLibro(tituloBuscado) {
    const resultado = libros.filter(libro => libro.titulo.toLowerCase() === tituloBuscado.toLowerCase());
    mostrarLibros(resultado);
}

// Guardar libros en localStorage
function guardarLibros() {
    localStorage.setItem('libros', JSON.stringify(libros));
}

// ------------------------------
// Eventos
// ------------------------------

// Formulario agregar libro
const formAgregar = document.getElementById('formAgregar');
formAgregar.addEventListener('submit', function(e) {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value.trim();
    const autor = document.getElementById('autor').value.trim();
    if(titulo && autor) {
        agregarLibro(titulo, autor);
        formAgregar.reset();
    }
});

// Botón buscar libro
const btnBuscar = document.getElementById('btnBuscar');
btnBuscar.addEventListener('click', function() {
    const tituloBuscado = document.getElementById('buscarTitulo').value.trim();
    if(tituloBuscado) {
        buscarLibro(tituloBuscado);
    }
});

// Mostrar libros al cargar la página
document.addEventListener('DOMContentLoaded', () => mostrarLibros(libros));
