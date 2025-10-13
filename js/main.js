    // ------------------------------
    //   Simulador de Biblioteca 
    // ------------------------------

    // Array para almacenar libros
    let libros = JSON.parse(localStorage.getItem('libros')) || [];

    // Referencias al DOM
    const listaLibros = document.getElementById('lista-libros');
    const btnAgregar = document.getElementById('btn-agregar');
    const btnBuscar = document.getElementById('btn-buscar');

    // ------------------------------
    // Funciones
    // ------------------------------

    // Mostrar todos los libros
    function mostrarLibros(lista) {
        if (lista.length === 0) {
            listaLibros.innerHTML = '<p>No hay libros en la biblioteca.</p>';
            return;
        }

        listaLibros.innerHTML = `
            <ul>
            ${lista.map((libro, index) => `
                <li>
                    Título: ${libro.titulo}, Autor: ${libro.autor}
                    <button onclick="eliminarLibro(${index})">Eliminar</button>
                </li>
            `).join('')}
            </ul>
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
        const titulo = document.getElementById('titulo').value;
        const autor = document.getElementById('autor').value;
        agregarLibro(titulo, autor);
        document.getElementById('titulo').value = '';
        document.getElementById('autor').value = '';
    });

    btnBuscar.addEventListener('click', () => {
        const tituloBuscado = document.getElementById('titulo-buscar').value;
        buscarLibro(tituloBuscado);
        document.getElementById('titulo-buscar').value = '';
    });

    // Mostrar libros al cargar la página
    mostrarLibros(libros);
