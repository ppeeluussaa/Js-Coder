// ------------------------------
//   Simulador de Biblioteca 
// ------------------------------

// Array para almacenar libros (si no hay, se precargan los de Harry Potter)
let libros = JSON.parse(localStorage.getItem('libros')) || [
  { titulo: "Harry Potter y la piedra filosofal", autor: "J.K. Rowling" },
  { titulo: "Harry Potter y la cámara secreta", autor: "J.K. Rowling" },
  { titulo: "Harry Potter y el prisionero de Azkaban", autor: "J.K. Rowling" },
  { titulo: "Harry Potter y el cáliz de fuego", autor: "J.K. Rowling" },
  { titulo: "Harry Potter y la Orden del Fénix", autor: "J.K. Rowling" },
  { titulo: "Harry Potter y el misterio del príncipe", autor: "J.K. Rowling" },
  { titulo: "Harry Potter y las reliquias de la muerte", autor: "J.K. Rowling" },
  { titulo: "Animales fantásticos y dónde encontrarlos", autor: "J.K. Rowling" },
  { titulo: "Los cuentos de Beedle el Bardo", autor: "J.K. Rowling" }
];

// Guardar en localStorage si aún no están
if (!localStorage.getItem('libros')) {
  localStorage.setItem('libros', JSON.stringify(libros));
}

// Referencias al DOM
const listaLibros = document.getElementById('libros');
const btnAgregar = document.getElementById('btn-agregar');
const btnBuscar = document.getElementById('btn-buscar');
const inputTitulo = document.getElementById('titulo');
const inputAutor = document.getElementById('autor');
const inputTituloBuscar = document.getElementById('titulo-buscar');

// ------------------------------
// Funciones
// ------------------------------

// Mostrar todos los libros
function mostrarLibros(lista) {
  if (lista.length === 0) {
    listaLibros.innerHTML = '<li>No hay libros en la biblioteca.</li>';
    return;
  }

  listaLibros.innerHTML = lista.map((libro, index) => `
      <li>
        <strong>${libro.titulo}</strong> - ${libro.autor}
        <br>
        <button onclick="eliminarLibro(${index})">Eliminar</button>
      </li>
  `).join('');
}

// Agregar un libro
function agregarLibro(titulo, autor) {
  if (!titulo || !autor) return alert("Por favor, completá todos los campos.");

  const existe = libros.some(l => l.titulo.toLowerCase() === titulo.toLowerCase());
  if (existe) return alert("Ese libro ya está en la biblioteca.");

  libros.push({ titulo, autor });
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
  if (!confirm(`¿Seguro que querés eliminar "${libros[index].titulo}"?`)) return;
  libros.splice(index, 1);
  localStorage.setItem('libros', JSON.stringify(libros));
  mostrarLibros(libros);
}

// ------------------------------
// Eventos
// ------------------------------

btnAgregar.addEventListener('click', () => {
  const titulo = inputTitulo.value.trim();
  const autor = inputAutor.value.trim();
  agregarLibro(titulo, autor);
  inputTitulo.value = '';
  inputAutor.value = '';
});

btnBuscar.addEventListener('click', () => {
  const tituloBuscado = inputTituloBuscar.value.trim();
  buscarLibro(tituloBuscado);
  inputTituloBuscar.value = '';
});

// Mostrar libros al cargar la página
mostrarLibros(libros);
