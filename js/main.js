// ------------------------------
// Simulador de Biblioteca
// ------------------------------

// Array para almacenar libros
let libros = [];

// Función para agregar un libro
function agregarLibro(titulo, autor) {
    let libro = [titulo, autor];
    libros.push(libro);
    alert("Libro agregado:\nTítulo: " + titulo + "\nAutor: " + autor);
    console.log("Array de libros actualizado:", libros);
}

// Función para mostrar todos los libros
function mostrarLibros(listaLibros) {
    if (listaLibros.length === 0) {
        alert("No hay libros en la biblioteca.");
        return;
    }
    let mensaje = "Libros en la biblioteca:\n";
    for (let libro of listaLibros) {
        mensaje += "Título: " + libro[0] + ", Autor: " + libro[1] + "\n";
    }
    alert(mensaje);
}

// Función para buscar un libro por título
function buscarLibro(tituloBuscado, listaLibros) {
    let encontrado = false;
    for (let libro of listaLibros) {
        if (libro[0] === tituloBuscado) {
            alert("Libro encontrado:\nTítulo: " + libro[0] + "\nAutor: " + libro[1]);
            encontrado = true;
            break;
        }
    }
    if (!encontrado) {
        alert("No se encontró ningún libro con ese título.");
    }
}

// ------------------------------
// Interacción con el usuario
// ------------------------------
alert("Bienvenido al Simulador de Biblioteca");

let opcion;
do {
    opcion = prompt(
        "Elige una acción:\n1. Agregar libro\n2. Mostrar libros\n3. Buscar libro\n4. Salir"
    );

    switch(opcion) {
        case "1":
            let titulo = prompt("Ingresa el título del libro:");
            let autor = prompt("Ingresa el autor del libro:");
            agregarLibro(titulo, autor);
            break;
        case "2":
            mostrarLibros(libros);
            break;
        case "3":
            let tituloBuscado = prompt("Ingresa el título del libro a buscar:");
            buscarLibro(tituloBuscado, libros);
            break;
        case "4":
            alert("Gracias por usar el simulador. ¡Hasta luego!");
            break;
        default:
            alert("Pulsa un número del 1 al 4 para seleccionar una opción. Intenta nuevamente.");
    }

} while(opcion !== "4");
