class ProductNode {
    constructor(product, next = null) {
        this.product = product;  // Producto actual
        this.next = next;        // Referencia al siguiente nodo
    }
}

// Clase para representar la lista enlazada simple
class ProductLinkedList {
    constructor() {
        this.head = null;  // Primer nodo de la lista
    }

    // Método para agregar un producto al final de la lista
    addProduct(product) {
        const newNode = new ProductNode(product);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    // Método para eliminar el último producto de la lista
    removeLastProduct() {
        if (!this.head) {
            return null; // Lista vacía
        }
        if (!this.head.next) {
            const removedProduct = this.head.product;
            this.head = null;
            return removedProduct;
        }
        
        let current = this.head;
        while (current.next.next) {
            current = current.next;
        }
        const removedProduct = current.next.product;
        current.next = null;
        return removedProduct;
    }

    // Método para obtener todos los productos de la lista
    getProducts() {
        const products = [];
        let current = this.head;
        while (current) {
            products.push(current.product);
            current = current.next;
        }
        return products;
    }
}

// Instanciamos las listas enlazadas para productos disponibles y removidos
const availableProducts = new ProductLinkedList();
const removedProducts = new ProductLinkedList();

// Función para generar un número entero aleatorio entre min y max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Evento para agregar un producto
document.getElementById('addProductBtn').addEventListener('click', () => {
    const quantity = getRandomInt(1, 100);
    const price = (getRandomInt(1, 100) + Math.random()).toFixed(2);
    const productName = `Producto ${availableProducts.getProducts().length + 1}`;
    const newProduct = new Product(productName, quantity, price);
    
    availableProducts.addProduct(newProduct);
    displayAvailableProducts();
});

// Evento para eliminar un producto
document.getElementById('removeProductBtn').addEventListener('click', () => {
    const removedProduct = availableProducts.removeLastProduct();
    
    if (removedProduct) {
        removedProducts.addProduct(removedProduct);
        displayAvailableProducts();
        displayRemovedProducts();
    } else {
        alert('No hay productos disponibles para retirar.');
    }
});

// Función para mostrar los productos disponibles
function displayAvailableProducts() {
    const availableList = document.getElementById('availableProducts');
    availableList.innerHTML = '';
    
    availableProducts.getProducts().forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - Cantidad: ${product.quantity} - Precio: $${product.price}`;
        availableList.appendChild(li);
    });
}

// Función para mostrar los productos eliminados
function displayRemovedProducts() {
    const removedList = document.getElementById('removedProducts');
    removedList.innerHTML = '';
    
    removedProducts.getProducts().forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - Cantidad: ${product.quantity} - Precio: $${product.price}`;
        removedList.appendChild(li);
    });
}
