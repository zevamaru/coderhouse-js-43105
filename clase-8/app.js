class Carrito {
  constructor() {
    this.productos = [];
    this.total = 0;
  }

  // Ejemplo ultra-facha para saber si un producto está en el array.
  // find() devuelve el primer elemento que encuentra, de lo contrario
  // devuelve undefined
  // enCarrito(nuevoProducto) {
  //   return this.productos.find(
  //     (producto) => producto.nombre == nuevoProducto.nombre
  //   );
  // }

  enCarrito(nuevoProducto) {
    return this.productos.find((producto) => {
      if (producto.nombre == nuevoProducto.nombre && producto.precio == nuevoProducto.precio) {
        return true;
      }
      return false;
    });
  }

  // Agregar al carrito
  agregar(nuevoProducto) {
    // Si encuentra algún producto, lo guardo en una variable
    let productoEncontrado = this.enCarrito(nuevoProducto);
    if (productoEncontrado) {
      // Con el producto en una variable, puedo sumarle directamente
      // la cantidad y multiplicar su precio
      productoEncontrado.cantidad += 1;
      productoEncontrado.precio = nuevoProducto.precio;
      productoEncontrado.subtotal = nuevoProducto.precio * productoEncontrado.cantidad;
    } else {
      // Si no está en el carrito, lo agrego al array.
      this.productos.push(nuevoProducto);
      alert("El producto " + nuevoProducto.nombre + " fue agregado al carrito.");
    }
    // Muestro la lista de productos llamando al método listar
    this.listar();
  }

  // Muestro la lista de productos en consola
  listar() {
    console.clear(); // Limpia consola
    console.log("Mis productos en el carrito:");
    // Variante usando forEach en vez de el clásico for
    this.productos.forEach((producto) => {
      console.log("------");
      console.log("Nombre: " + producto.nombre);
      console.log("Precio: " + producto.precio);
      console.log("Cantidad: " + producto.cantidad);
      console.log("Subtotal: " + producto.subtotal);
    });

    // Uso la el método reduce para sumar el total de los productos
    this.total = this.productos.reduce(
      (acumulador, producto) => acumulador + producto.precio * producto.cantidad,
      0
    );
    console.log("------");
    console.log("TOTAL DEl CARRITO: $" + this.total);
  }

  // Remueve un producto del carrito
  quitar(producto) {
    // Abstracción: readapto y reutilzo código de una solución
    // previa (método enCarrito)
    let productoEncontrado = this.enCarrito(producto);
    if (productoEncontrado) {
      // Obtengo el índice
      let indice = this.productos.indexOf(productoEncontrado);
      this.productos.splice(indice, 1); // Lo vuelo con splice
      alert("El producto " + producto.nombre + " fue borrado del carrito");
      this.listar();
    }
  }

  // Buscador con filter e includes en una sola línea (is majeco)
  buscar(nombreProducto) {
    // El filter devuelve un array con los resultados encontrados
    // y en caso de no encontrar nada, devuelve un array vacío []
    let resultado = this.productos.filter((producto) =>
      // El método includes en un string se fija si esa palabra
      // esta incluída en el string, si está devuelve true, sino false
      // Al devolver true, filter lo guarda en el array, sino lo ignora
      producto.nombre.includes(nombreProducto)
    );
    // Muestro consola (estoy repitiendo código del método this.listar
    // se podría optimizar y adaptar para reutilizar ese código)
    console.clear();
    console.log("Productos encontrados:");
    resultado.forEach((producto) => {
      console.log("------");
      console.log("Nombre: " + producto.nombre);
      console.log("Precio: " + producto.precio);
      console.log("Cantidad: " + producto.cantidad);
      console.log("Subtotal: " + producto.subtotal);
    });
  }
}

// Creo el objeto carrito
const carrito = new Carrito();

// Funciones para los botones

function agregarProducto() {
  // Pido por prompt los datos del producto

  // Nombre
  let nombre = prompt("Introduzca el nombre del producto");
  // Validación
  if (nombre == "") {
    alert("El nombre ingresado es inválido, ingrese los datos de nuevo.");
    return;
  }

  // Precio
  let precio = prompt("Introduzca el precio del producto");
  // Validación
  if (precio == "" || parseInt(precio) <= 0) {
    alert("El precio ingresado es inválido, ingrese los datos de nuevo.");
    return;
  }

  // Creo un objeto con los datos obtenidos del prompt
  const nuevoProducto = {
    nombre: nombre,
    precio: parseInt(precio),
    cantidad: 1,
    subtotal: parseInt(precio),
  };

  // Llamo al método agregar del carrito y le paso el objeto del producto
  // que acabo de crear como parámetro
  carrito.agregar(nuevoProducto);
}

function quitarProducto() {
  // Pido por prompt el nombre del producto que quiero quitar
  let nombre = prompt("Introduzca el nombre del producto que desea quitar");
  let precio = prompt("Introduzca el precio del producto que desea quitar");

  // Llamo al método quitar del carrito y le paso por parámetro el nombre
  // del producto que quiero quitar del carrito
  carrito.quitar({ nombre: nombre, precio: precio });
}

function buscarProducto() {
  // Pido por prompt el nombre del producto que quiero buscar
  let nombre = prompt("Introduzca el nombre del producto que desea buscar");

  // Llamo al método buscar del carrito y le paso por parámetro el nombre
  // del producto que quiero buscar
  carrito.buscar(nombre);
}
