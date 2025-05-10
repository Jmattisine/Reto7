class Libro {
    constructor(titulo, autor, anio) {
        this.titulo = titulo;
        this.autor = autor;
        this.anio = anio;
        this.disponible = true;
    }

    prestar() {
        if (this.disponible) {
            this.disponible = false;
            return `El libro "${this.titulo}" ha sido prestado.`;
        } else {
            return `El libro "${this.titulo}" no está disponible.`;
        }
    }

    devolver() {
        this.disponible = true;
    }
}

class Biblioteca {
    constructor() {
        this.libros = [];
    }

    agregarLibro(libro) {
        this.libros.push(libro);
    }

    buscarPorTitulo(titulo) {
        return this.libros.filter(libro =>
            libro.titulo.toLowerCase().includes(titulo.toLowerCase())
        );
    }

    prestarLibro(titulo) {
        const libro = this.buscarPorTitulo(titulo)[0];
        if (libro) {
            return libro.prestar();
        } else {
            return `El libro "${titulo}" no se encuentra en la biblioteca.`;
        }
    }

    mostrarLibros() {
        return this.libros.map(libro => {
            const tipo = libro instanceof LibroInfantil ? "Infantil" : "General";
            const estado = libro.disponible ? "Disponible" : "No disponible";
            return `${libro.titulo} - ${libro.autor} (${libro.anio}) [${tipo}] - ${estado}`;
        });
    }
}

class LibroInfantil extends Libro {
    constructor(titulo, autor, anio, edadMinima) {
        super(titulo, autor, anio);
        this.edadMinima = edadMinima;
    }
}
// Funciones conectadas al HTML
function mostrarLibros() {
    const lista = document.getElementById("listaLibros");
    lista.innerHTML = "";
    const libros = biblioteca.mostrarLibros();
    libros.forEach(texto => {
        const li = document.createElement("li");
        li.textContent = texto;
        lista.appendChild(li);
    });
}
function buscarLibro() {
    const titulo = document.getElementById("inputBuscar").value;
    const resultado = biblioteca.buscarPorTitulo(titulo);
    const resultadoDiv = document.getElementById("resultadoBusqueda");
    if (resultado.length > 0) {
        resultadoDiv.textContent = `Resultado: ${resultado.map(libro => libro.titulo).join(", ")}`;
    } else {
        resultadoDiv.textContent = "No se encontraron libros con ese título.";
    }
}
function prestarLibro() {
    const titulo = document.getElementById("inputPrestar").value;
    const mensaje = biblioteca.prestarLibro(titulo);
    document.getElementById("resultadoPrestamo").textContent = mensaje;
    mostrarLibros();
}
//ejemplo de uso
biblioteca.prestarLibro("El Principito");
biblioteca.prestarLibro("Harry Potter y la piedra filosofal");
biblioteca.prestarLibro("Cien años de soledad");
biblioteca.prestarLibro("El jardín secreto");
// Mostrar todos los libros
biblioteca.mostrarLibros();
// Prestar un libro
biblioteca.prestarLibro("El Principito");


