// Clase Nodo para la lista doblemente enlazada
class Node {
    constructor(product) {
        this.product = product;
        this.next = null;
        this.prev = null;
    }
}

// Clase Lista Doblemente Enlazada
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    // Método para agregar producto al final de la lista
    append(product) {
        const newNode = new Node(product);
        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
    }

    // Método para eliminar producto por código
    removeByCode(code) {
        let current = this.head;
        while (current) {
            if (current.product.code === code) {
                if (current === this.head) {
                    this.head = current.next;
                    if (this.head) this.head.prev = null;
                } else if (current === this.tail) {
                    this.tail = current.prev;
                    this.tail.next = null;
                } else {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                }
                return current.product; // Retorna el producto eliminado
            }
            current = current.next;
        }
        return null;
    }

    // Método para ordenar la lista por nombre de productos
    sort() {
        if (!this.head) return;

        let current = this.head;
        while (current) {
            let nextNode = current.next;
            while (nextNode) {
                if (current.product.name.localeCompare(nextNode.product.name) > 0) {
                    // Intercambiar productos
                    const tempProduct = current.product;
                    current.product = nextNode.product;
                    nextNode.product = tempProduct;
                }
                nextNode = nextNode.next;
            }
            current = current.next;
        }
    }

    // Método para recorrer la lista y devolver un arreglo de productos
    toArray() {
        const productsArray = [];
        let current = this.head;
        while (current) {
            productsArray.push(current.product);
            current = current.next;
        }
        return productsArray;
    }
}

// Lista doblemente enlazada para los productos
const productList = new DoublyLinkedList();
const removedProducts = [];

// Generar código de producto
function generateProductCode() {
    return Math.floor(100 + Math.random() * 900); // Genera un código de 3 dígitos
}

// Agregar producto a la lista doblemente enlazada
document.getElementById('addProductBtn').addEventListener('click', () => {
    const name = document.getElementById('productName').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);

    if (name === '' || isNaN(price) || price < 0) {
        alert('Por favor, ingresa un nombre válido y un precio correcto.');
        return;
    }

    const code = generateProductCode();
    const product = { name, price, code };
    productList.append(product);
    
    displayProducts();
    updateTotalCost();

    // Limpiar campos
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
});

// Mostrar productos de la lista doblemente enlazada
function displayProducts() {
    productList.sort(); // Ordenar la lista por nombre
    const productsArray = productList.toArray(); // Convertir la lista en un array
    const productListElement = document.getElementById('productList');
    productListElement.innerHTML = productsArray.map(product => 
        `<li>${product.name} - $${product.price.toFixed(2)} (Código: ${product.code})</li>`
    ).join('');
}

// Calcular el costo total de los productos
function updateTotalCost() {
    const productsArray = productList.toArray();
    const totalCost = productsArray.reduce((acc, product) => acc + product.price, 0);
    document.getElementById('totalCost').textContent = `Total: $${totalCost.toFixed(2)}`;
}

// Eliminar producto de la lista doblemente enlazada por código
document.getElementById('removeProductBtn').addEventListener('click', () => {
    const code = parseInt(document.getElementById('removeCode').value);

    const removedProduct = productList.removeByCode(code);
    if (removedProduct) {
        removedProducts.push(removedProduct); // Agregar a la lista de eliminados
        displayProducts();
        updateTotalCost();
        displayRemovedProducts();
    } else {
        alert('Código de producto no encontrado.');
    }

    // Limpiar campo
    document.getElementById('removeCode').value = '';
});

// Mostrar productos eliminados
function displayRemovedProducts() {
    const removedList = document.getElementById('removedProducts');
    removedList.innerHTML = removedProducts.map(product => 
        `<li>${product.name} - $${product.price.toFixed(2)} (Código: ${product.code}) <button onclick="addProductBack(${product.code})">Agregar de nuevo</button></li>`
    ).join('');
}

// Restaurar producto a la lista principal desde los eliminados
function addProductBack(code) {
    const index = removedProducts.findIndex(product => product.code === code);
    if (index !== -1) {
        const restoredProduct = removedProducts.splice(index, 1)[0]; // Eliminar de la lista de eliminados
        productList.append(restoredProduct); // Agregar a la lista de productos
        displayProducts();
        updateTotalCost();
        displayRemovedProducts();
    }
}
