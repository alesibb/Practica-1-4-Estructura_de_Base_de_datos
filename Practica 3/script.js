// Clase para representar un nodo en la lista doblemente enlazada
class DoubleListNode {
    constructor(value, next = null, prev = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

// Clase para la lista doblemente enlazada
class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    // Método para añadir un nodo al final de la lista
    add(value) {
        const newNode = new DoubleListNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
    }

    // Método para convertir la lista en un array para mostrarla
    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }
}

const students = new DoubleLinkedList(); // Usamos una lista doblemente enlazada para todos los estudiantes

document.getElementById('addStudentBtn').addEventListener('click', () => {
    const name = document.getElementById('studentName').value.trim();
    const grade = parseFloat(document.getElementById('studentGrade').value);

    if (name === '' || isNaN(grade) || grade < 0 || grade > 10) {
        alert('Por favor, ingresa un nombre válido y una calificación entre 0 y 10.');
        return;
    }

    students.add({ name, grade }); // Añadimos el estudiante a la lista enlazada doble

    displayResults();

    // Limpiar campos de entrada
    document.getElementById('studentName').value = '';
    document.getElementById('studentGrade').value = '';
});

function displayResults() {
    // Listas enlazadas doblemente para aprobados y reprobados
    const passedStudents = new DoubleLinkedList();  // Lista doblemente enlazada para aprobados
    const failedStudents = new DoubleLinkedList();  // Lista doblemente enlazada para reprobados

    let current = students.head;
    while (current) {
        if (current.value.grade >= 7) {
            passedStudents.add(current.value);  // Estudiantes con calificación >= 7 en la lista de aprobados
        } else {
            failedStudents.add(current.value);  // Estudiantes con calificación < 7 en la lista de reprobados
        }
        current = current.next;
    }

    // Convertimos las listas enlazadas a arrays para mostrarlas
    const passedArray = passedStudents.toArray();
    const failedArray = failedStudents.toArray();

    // Mostramos los estudiantes aprobados
    document.getElementById('passedStudents').innerHTML = passedArray.map(student => `<li>${student.name} - ${student.grade}</li>`).join('');

    // Mostramos los estudiantes reprobados
    document.getElementById('failedStudents').innerHTML = failedArray.map(student => `<li>${student.name} - ${student.grade}</li>`).join('');
}
