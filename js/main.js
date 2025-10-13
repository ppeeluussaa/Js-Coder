    // ------------------------------
//   Simulador de Biblioteca 
// ------------------------------

// Array para almacenar libros
let libros = JSON.parse(localStorage.getItem('libros')) || [];

// Referencias al DOM
const listaLibros = document.getElementById('libros');
const btnAgregar = document.getElementById('btn-agregar');
const btnBuscar = document.getElementById('btn-buscar');

// ------------------------------
// Funciones
// ------------------------------

// Mostrar todos los libros
function mostrarLibros(lista) {
    if (lista.length === 0) {
        listaLibros.innerHTML = '<li>No hay libros en la biblioteca.</li>';
        return;
    }

    listaLibros.innerHTML = `
        ${lista.map((libro, index) => `
            <li>
                Título: ${libro.titulo}, Autor: ${libro.autor}
                <button onclick="eliminarLibro(${index})">Eliminar</button>
            </li>
        `).join('')}
    `;
}

// Agregar un libro
function agregarLibro(titulo, autor) {
    if (!titulo || !autor) return;
    libros.push({titulo, autor});
    localStorage.setItem('libros', JSON.stringify(libros));
    mostrarLibros(libros);
}

// Buscar libro por título
function buscarLibro(tituloBuscado) {
    const filtrados = libros.filter(libro => 
        libro.titulo.toLowerCase().includes(tituloBuscado.toLowerCase())
    );
    mostrarLibros(filtrados);
}

// Eliminar libro por índice
function eliminarLibro(index) {
    libros.splice(index, 1);
    localStorage.setItem('libros', JSON.stringify(libros));
    mostrarLibros(libros);
}

// ------------------------------
// Eventos
// ------------------------------

btnAgregar.addEventListener('click', () => {
    const titulo = document.getElementById('titulo').va
