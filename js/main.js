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
document.getElementById('mostrarTodos').addEventListener('click', () => renderizarLibros());

async function cargarLibros() {
  const guardados = localStorage.getItem('libros');

  if (guardados) {
    libros = JSON.parse(guardados);
    renderizarLibros();
    return;
  }

  try {
    const response = await fetch('./data.json');
    const data = await response.json();
    libros = data;
    guardarLibros();
    renderizarLibros();
  } catch (err) {
    console.error("Error cargando el archivo JSON:", err);
  }
}

function guardarLibros() {
  localStorage.setItem('libros', JSON.stringify(libros));
}

function agregarLibro() {
  const { titulo, autor, anio, genero, editorial, idioma, estado } = formInputs;

  if (!titulo.value.trim() || !autor.value.trim()) {
    Swal.fire('Error', 'Debe completar al menos título y autor', 'error');
    return;
  }

  const existe = libros.some(
    libro => libro.titulo.toLowerCase() === titulo.value.toLowerCase() &&
             libro.autor.toLowerCase() === autor.value.toLowerCase()
  );

  if (existe) {
    Swal.fire('Error', 'Este libro ya existe', 'error');
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
  precargarFormulario();
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

function cambiarEstado(index) {
  Swal.fire({
    title: 'Cambiar estado',
    input: 'select',
    inputOptions: {
      'Disponible': 'Disponible',
      'Prestado': 'Prestado',
      'Pendiente': 'Pendiente'
    },
    inputPlaceholder: 'Seleccionar nuevo estado',
    showCancelButton: true
  }).then(res => {
    if (res.isConfirmed) {
      libros[index].estado = res.value;
      guardarLibros();
      renderizarLibros();
      Swal.fire('Éxito', 'Estado actualizado', 'success');
    }
  });
}

function renderizarLibros(arr = libros) {
  if (arr.length === 0) {
    listaLibros.innerHTML = '<p>No hay libros para mostrar.</p>';
    return;
  }

  listaLibros.innerHTML = arr.map((libro, index) => `
    <div class="card">
      <h3>${libro.titulo}</h3>
      <p><strong>Autor:</strong> ${libro.autor}</p>
      <p><strong>Año:</strong> ${libro.anio || '—'}</p>
      <p><strong>Género:</strong> ${libro.genero || '—'}</p>
      <p><strong>Editorial:</strong> ${libro.editorial || '—'}</p>
      <p><strong>Idioma:</strong> ${libro.idioma || '—'}</p>
      <p><strong>Estado:</strong> ${libro.estado}</p>
      <button onclick="cambiarEstado(${index})">Cambiar Estado</button>
    </div>
  `).join('');
}

function precargarFormulario() {
  formInputs.titulo.value = "Ejemplo de libro";
  formInputs.autor.value = "Autor Ejemplo";
  formInputs.anio.value = "2025";
  formInputs.genero.value = "Ficción";
  formInputs.editorial.value = "Editorial Demo";
  formInputs.idioma.value = "Español";
  formInputs.estado.value = "Disponible";
}

precargarFormulario();
cargarLibros();
