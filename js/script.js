// ------------------------------
// Simulador de Biblioteca
// ------------------------------

// Array para almacenar libros
let libros = [];

// Función para agregar un libro (entrada de datos)
function agregarLibro() {
    let titulo = prompt("Ingresa el título del libro:");
    let autor = prompt("Ingresa el autor del libro:");
    
    // Creamos un objeto libro y lo agregamos al array
    let libro = {
        titulo: titulo,
        autor: autor
    };
    
    libros.push(libro);
    alert(`Libro agregado:\nTítulo: ${titulo}\nAutor: ${autor}`);
    console.log("Array de libros actualizado:", libros);
}

// Función para mostrar todos los libros (procesamiento + salida)
function mostrarLibros() {
    if(libros.length === 0){
        alert("No hay libros en la biblioteca.");
        return;
    }
    let mensaje = "Libros en la biblioteca:\n";
    for(let i = 0; i < libros.length; i++){
        mensaje += `${i + 1}. Título: ${libros[i].titulo}, Autor: ${libros[i].autor}\n`;
    }
    alert(mensaje);
}

// Función para buscar un libro por título (uso de condicional)
function buscarLibro() {
    let tituloBuscado = prompt("Ingresa el título del libro a buscar:");
    let encontrado = false;

    for(let i = 0; i < libros.length; i++){
        if(libros[i].titulo === tituloBuscado){
            alert(`Libro encontrado:\nTítulo: ${libros[i].titulo}\nAutor: ${libros[i].autor}`);
            encontrado = true;
            break;
        }
    }

    if(!encontrado){
        alert("No se encontró ningún libro con ese título.");
    }
}

// ------------------------------
// Interacción inicial con el usuario
// ------------------------------
alert("Bienvenido al Simulador de Biblioteca");

// Bucle para permitir varias acciones
let opcion;
do {
    opcion = prompt(
        "Elige una acción:\n1. Agregar libro\n2. Mostrar libros\n3. Buscar libro\n4. Salir"
    );

    if(opcion === "1") {
        agregarLibro();
    } else if(opcion === "2") {
        mostrarLibros();
    } else if(opcion === "3") {
        buscarLibro();
    } else if(opcion === "4") {
        alert("Gracias por usar el simulador. ¡Hasta luego!");
    } else {
        alert("Pulse un numero para seleccionar una opcion. Intenta nuevamente.");
    }

} while(opcion !== "4");
