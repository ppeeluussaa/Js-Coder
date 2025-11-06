class Libro {
  constructor(titulo, autor, anio, genero, editorial, idioma, estado) {
    this.titulo = titulo;
    this.autor = autor;
    this.anio = anio;
    this.genero = genero;
    this.editorial = editorial;
    this.idioma = idioma;
    this.estado = estado;
  }
}

let libros = [];

const listaLibros = document.getElementById('libros');
const formInputs = {
  titulo: document.getElementById('titulo'),
  autor: document.getElementById('autor'),
  anio: document.getElementById('anio'),
  genero: document.getElementById('genero'),
  editorial: document.getElementById('editorial'),
  idioma: document.getElementById('idioma'),
  estado: document.getElementById('estado')
};

document.getElementById('agregar').addEventListener('click', agregarLibro);
document.getElementById('buscar').addEventListener('click', buscarLibro);
document.getElementById('mostrarTodos').addEventListener('click', renderizarLibros);

function guardarLibros() {
  localStorage.setItem('libros', JSON.stringify(libros));
}

function cargarLibros() {
  const data = localStorage.getItem('libros');
  if (data) {
    libros = JSON.parse(data);
    renderizarLibros();
  } else {
    fetch('data/libros.json')
      .then(res => res.json())
      .then(data => {
        libros = data;
        guardarLibros();
        renderizarLibros();
      });
  }
}

function agregarLibro() {
  const { titulo, autor, anio, genero, editorial, idioma, estado } = formInputs;

  if (!titulo.value.trim() || !autor.value.trim()) {
    Swal.fire('Error', 'Debe completar al menos título y autor', 'error');
    return;
  }

  const nuevoLibro = new Libro(
    titulo.value,
    autor.value,
    anio.value,
    genero.value,
    editorial.value,
    idioma.value,
    estado.value
  );

  libros.push(nuevoLibro);
  guardarLibros();
  renderizarLibros();

  Swal.fire('Éxito', 'Libro agregado correctamente', 'success');

  Object.values(formInputs).forEach(input => (input.value = ''));
}

function buscarLibro() {
  const termino = document.getElementById('busqueda').value.toLowerCase();
  const filtrados = libros.filter(libro =>
    libro.titulo.toLowerCase().includes(termino)
  );

  if (filtrados.length > 0) {
    renderizarLibros(filtrados);
  } else {
    listaLibros.innerHTML = '<p>No se encontraron resultados.</p>';
  }
}

function renderizarLibros(arr = libros) {
  if (arr.length === 0) {
    listaLibros.innerHTML = '<p>No hay libros para mostrar.</p>';
    return;
  }

  listaLibros.innerHTML = arr.map(libro => `
    <div class="card">
      <h3>${libro.titulo}</h3>
      <p><strong>Autor:</strong> ${libro.autor}</p>
      <p><strong>Año:</strong> ${libro.anio || '—'}</p>
      <p><strong>Género:</strong> ${libro.genero || '—'}</p>
      <p><strong>Editorial:</strong> ${libro.editorial || '—'}</p>
      <p><strong>Idioma:</strong> ${libro.idioma || '—'}</p>
      <p><strong>Estado:</strong> ${libro.estado}</p>
    </div>
  `).join('');
}

cargarLibros();
