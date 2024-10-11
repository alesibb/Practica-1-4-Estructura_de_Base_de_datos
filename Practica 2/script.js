// Clase para representar un nodo en la lista enlazada
class ListNode {
    constructor(value, next = null) {
        this.value = value;  // El valor almacenado en el nodo
        this.next = next;    // Referencia al siguiente nodo (inicialmente null)
    }
}

// Clase para representar una lista enlazada simple
class LinkedList {
    constructor() {
        this.head = null;  // El primer nodo (la cabeza) de la lista
    }

    // Método para agregar un valor al final de la lista
    add(value) {
        const newNode = new ListNode(value);
        if (!this.head) {
            this.head = newNode;  // Si la lista está vacía, el nuevo nodo es la cabeza
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;  // Recorre la lista hasta llegar al último nodo
            }
            current.next = newNode;  // Añade el nuevo nodo al final
        }
    }

    // Método para obtener todos los valores en la lista como un array
    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.value);  // Agrega cada valor de los nodos al array
            current = current.next;  // Avanza al siguiente nodo
        }
        return result;
    }
}

// Función para generar números aleatorios y añadirlos a una lista enlazada
function generateRandomNumbers(count) {
    const numbersList = new LinkedList();
    for (let i = 0; i < count; i++) {
        const randomNum = Math.floor(Math.random() * 100) + 1;  // Números aleatorios entre 1 y 100
        numbersList.add(randomNum);  // Agrega cada número a la lista enlazada
    }
    return numbersList;
}

// Función para categorizar números como pares o impares usando listas enlazadas
function categorizeNumbers(numbersList) {
    const evenNumbers = new LinkedList();
    const oddNumbers = new LinkedList();

    let current = numbersList.head;
    while (current) {
        if (current.value % 2 === 0) {
            evenNumbers.add(current.value);  // Si es par, lo agrega a la lista de pares
        } else {
            oddNumbers.add(current.value);  // Si es impar, lo agrega a la lista de impares
        }
        current = current.next;  // Avanza al siguiente nodo
    }

    return { evenNumbers, oddNumbers };
}

// Evento para generar y mostrar números
document.getElementById('generateBtn').addEventListener('click', () => {
    const randomNumbersList = generateRandomNumbers(10);  // Genera una lista enlazada con 10 números aleatorios
    const randomNumbersArray = randomNumbersList.toArray();  // Convierte la lista en un array para mostrarla
    document.getElementById('randomNumbers').innerHTML = randomNumbersArray.map(num => `<li>${num}</li>`).join('');

    // Categoriza los números en pares e impares
    const { evenNumbers, oddNumbers } = categorizeNumbers(randomNumbersList);
    
    // Convierte las listas enlazadas de pares e impares en arrays para mostrarlas
    const evenNumbersArray = evenNumbers.toArray();
    const oddNumbersArray = oddNumbers.toArray();
    
    // Muestra los números pares e impares en la interfaz
    document.getElementById('evenNumbers').innerHTML = evenNumbersArray.map(num => `<li>${num}</li>`).join('');
    document.getElementById('oddNumbers').innerHTML = oddNumbersArray.map(num => `<li>${num}</li>`).join('');
});
