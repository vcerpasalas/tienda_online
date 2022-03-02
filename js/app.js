'use strict'

class Producto {
    constructor(nombre, precio, imagen) {
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

const productos = [
    new Producto("Papas Lays", 2.5, "papas_lays.jpg"),
    new Producto("Plátano", 4, "banana.jpg"),
    new Producto("Pizza", 12, "pizza.png"),
    new Producto("Ariel", 7, "ariel.jpg"),
    new Producto("Doritos", 3, "doritos.jfif"),
    new Producto("Pasta Colgate", 5.5, "pasta_colgate.png"),
    new Producto("Coca Cola", 2.5, "coca_cola.jfif"),
    new Producto("Inca Kola", 2, "inca_kola.jfif"),
]

const folderImages = "imgs"

const myTimeout = setTimeout(darBienvenida, 3000);

for (let i = 0; i < productos.length; i++) {
    const li = document.createElement("li");

    const img = document.createElement("img");
    img.src = folderImages + "/" + productos[i].imagen;
    img.width = 100;
    img.height = 100;
    li.appendChild(img);

    const nombre = document.createElement("h3");
    nombre.textContent = productos[i].nombre;
    li.appendChild(nombre);

    const precio = document.createElement("h4");
    precio.textContent = "S/. " + productos[i].precio;
    li.appendChild(precio);

    const divBotones = document.createElement("div");

    const botonAnhadir = document.createElement("button");
    botonAnhadir.textContent = "Añadir";
    botonAnhadir.className = "button-add";
    botonAnhadir.addEventListener("click", function () {
        anhadirProducto(i);
    });
    divBotones.appendChild(botonAnhadir);

    const botonRemover = document.createElement("button");
    botonRemover.textContent = "Remover";
    botonRemover.className = "button-remove";
    botonRemover.addEventListener("click", function () {
        removerProducto(i);
    });
    divBotones.appendChild(botonRemover);

    li.appendChild(divBotones);

    document.getElementById("ulProductos").appendChild(li);
}

const carritoProductos = new Map();

crearProductosCarrito();


// Funciones:

function darBienvenida() {
    const h2Bienvenida = document.getElementById("h2Bienvenida");

    try {
        h2Bienvenida.textContent = "¡Bienvenid@ a nuestra tienda!";
    } catch (error) {
        console.error(error);
    }
}

function anhadirProducto(id) {
    console.log("Se añadió un producto con id = " + id);

    const valor = carritoProductos.get(id);
    if (valor == undefined) {
        carritoProductos.set(id, 1);
    } else {
        carritoProductos.set(id, valor + 1);
    }

    borrarProductosCarrito();
    crearProductosCarrito();
}

function removerProducto(id) {
    console.log("Se removió un producto con id = " + id);

    const valor = carritoProductos.get(id);
    if (valor != undefined) {
        if (valor == 1) {
            carritoProductos.delete(id);
        } else {
            carritoProductos.set(id, valor - 1);
        }
    }

    borrarProductosCarrito();
    crearProductosCarrito();
}

function crearProductosCarrito() {
    const table = document.createElement("table");
    table.id = "tableCarrito";
    table.className = "container-table"

    const firstRow = document.createElement("tr");

    const frC1 = document.createElement("th");
    frC1.textContent = "Producto";
    firstRow.appendChild(frC1);

    const frC2 = document.createElement("th");
    frC2.textContent = "Cantidad";
    firstRow.appendChild(frC2);

    const frC3 = document.createElement("th");
    frC3.textContent = "Precio";
    firstRow.appendChild(frC3);

    table.appendChild(firstRow);

    let precioTotal = 0
    for (const [id, cantidad] of carritoProductos) {
        const ithRow = document.createElement("tr");

        const ithC1 = document.createElement("td");
        ithC1.textContent = productos[id].nombre;
        ithRow.appendChild(ithC1);

        const ithC2 = document.createElement("td");
        ithC2.textContent = cantidad;
        ithRow.appendChild(ithC2);

        const ithC3 = document.createElement("td");
        const precioPorCantidad = productos[id].precio * cantidad;
        ithC3.textContent = "S/. " + precioPorCantidad;
        ithRow.appendChild(ithC3);

        table.appendChild(ithRow);

        precioTotal += precioPorCantidad;
    }

    const lastRow = document.createElement("tr");

    const lrC1 = document.createElement("th");
    lrC1.textContent = "Total";
    lastRow.appendChild(lrC1);

    const lrC2 = document.createElement("th");
    lrC2.textContent = "";
    lastRow.appendChild(lrC2);

    const lrC3 = document.createElement("th");
    lrC3.textContent = myStringConcat("S/. ", precioTotal);
    lastRow.appendChild(lrC3);

    table.appendChild(lastRow);

    document.getElementById("divCarrito").appendChild(table);
}


// Funcion pura de concatenación de cadenas de texto

function myStringConcat(str1, str2) {
    return str1 + str2;
}

function borrarProductosCarrito() {
    document.getElementById("tableCarrito").remove();
}


// Animate Button for Buying

var animateButton = function (e) {

    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');

    e.target.classList.add('animate');
    setTimeout(function () {
        e.target.classList.remove('animate');
    }, 700);
};

var classname = document.getElementsByClassName("tienda__button");

for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', animateButton, false);
}

document.addEventListener("DOMContentLoaded", documentReady);