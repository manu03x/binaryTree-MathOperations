class Node{
    constructor(data){
        this.data = data;
        this.lc = null;
        this.rc = null;
        this.sig = null;
        this.ant = null;
    }
}

class QueueNode {
    constructor(data){
        this.data = data;
        this.sig = null;
        this.ant = null;
    }
}

// Pila
class Queue {
    constructor(){
      this.primero=null;
      this.ultimo= null;
    }
         
    agregar(nuevoDato, order){ 
        let nuevo = this.operaciones(nuevoDato,order);  // Antes de agregar a la pila, valido que dato va a entrar
        if(isNaN(Number(nuevo.data))) {
            return;
        }
        if (this.primero==null){
            this.primero=nuevo;
            this.ultimo=nuevo;
        }else{
            this.ultimo.sig=nuevo;
            nuevo.ant=this.ultimo;
            this.ultimo=nuevo;
        }

    }
    operaciones(node , order) { // Se hacen las operaciones, pero si el dato es numero solamente lo retorna

        if(isNaN(Number(node.data))) {
            let res = 0;
            let no1;
            let no2;

            if(order == 'postorder') {
                no2 = Number(this.extraer().data);
                no1 = Number(this.extraer().data);
            } else {
                no1 = Number(this.extraer().data);
                no2 = Number(this.extraer().data);
            }
            switch (node.data) {
                case '+':
                    res = no1 + no2;
                    break;
                case '-':
                    res = no1 - no2;
                    break;
                case '/':
                    res = no1 / no2;
                    break;
                case '*':
                    res = no1 * no2;
                    break;
                default:
                    break;
            }
            queueNode = new Node(res);
            return queueNode;
        }

        return node
    }

    extraer() {
        let aux = this.ultimo;

        this.delete(this.ultimo);

        return aux;
    }

    delete(nodo) {
        if(this.primero == nodo) {
            this.primero = this.primero.sig;
            return;
        }
        if(nodo.sig && nodo.ant) {
          nodo.sig.ant = nodo.ant;
          nodo.ant.sig = nodo.sig;
          return;
        }
  
        if(!nodo.sig) {
          this.ultimo = nodo.ant;
          nodo.ant.sig = nodo.sig;
          return;
        }
    }

    listar() {
        let element = this.primero;
        let res = '';
        while(element){
            res += element.data + ' ';
            element = element.sig;
        }

        return res;
    }

  }
  let queue = new Queue();
  let queueNode;

// Esto es un hibrido entre lista enlazada y arbol binario
class LogicUnit {
    constructor(){
        this.root = null;
        this.primero=null;
        this.ultimo= null;
    }

    postOrder(){

        if(this.root === null) {
            return null;
            
        }
        else{
            
            return this.recursivePostOrder(this.root);
        }
    }
    recursivePostOrder(root){ //IDR
        let txt = ``;
        if(root.lc){
            txt += `${this.recursivePostOrder(root.lc)}`;
        }
        if(root.rc){
            txt += `${this.recursivePostOrder(root.rc)}`;
         
        }
        txt += `${root.data} `;
        queueNode = new QueueNode(root.data);
        queue.agregar(queueNode, 'postorder');
        return txt;
    }

    preOrder(){

        if(this.root === null) {
            return null;
            
        }
        else{
            
            return this.recursivePreOrder(this.root);
        }
    }
    recursivePreOrder(root){ //IDR
        let txt = ``;
        txt += `${root.data} `;
        if(root.lc){
            txt += `${this.recursivePreOrder(root.lc)}`;
        }
        if(root.rc){
            txt += `${this.recursivePreOrder(root.rc)}`;
         
        }
        return txt;
    }

    //DOUBLY LINKED LIST

    addLinkedList(nuevo){
        if (this.primero==null){
            this.primero=nuevo;
            this.ultimo=nuevo;
        }else{
            this.ultimo.sig=nuevo
            nuevo.ant=this.ultimo;
            this.ultimo=nuevo;
        }
      }
    convertToTree() {
        let element = this.primero;
        let condition;
        while(element){
            condition = element.data === '/' || element.data === '*';
            this.checkToTree(element,condition);
            element = element.sig;
        }

        element = this.primero
        while(element){
            condition = element.data === '+' || element.data === '-';
            this.checkToTree(element, condition);
            if (!element.sig) {
                this.root = element;
            }
            element = element.sig;
        }
    }

    checkToTree(element , condition) {
        if(condition) {
            element.lc = element.ant;
            element.rc = element.sig;

            this.delete(element.ant);
            this.delete(element.sig);
        }
    }

    delete(nodo) {
        if(this.primero == nodo) {
            this.primero = this.primero.sig;
            return;
        }
        if(nodo.sig && nodo.ant) {
        nodo.sig.ant = nodo.ant;
        nodo.ant.sig = nodo.sig;
        return;
        }

        if(!nodo.sig) {
        this.ultimo = nodo.ant;
        nodo.ant.sig = nodo.sig;
        return;
        }
    }
}

let logicUnit = new LogicUnit();
let node;

// Preparar pre order

function preparePre() { // Debido a que el agregado directo con preorder no funciona
    const preOrderElements = logicUnit.preOrder().split(' '); // Con un array recorro los elementos al reves
    preOrderElements.pop()

    for (let i = preOrderElements.length - 1; i >= 0; i--) {
        queueNode = new QueueNode(preOrderElements[i])
        queue.agregar(queueNode, 'preorder')
        preOrderElements.pop()
    }

    return preOrderElements
}


console.log(queue.listar())

// CONSOLE USE

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

readline.question('Inserta una operacion usando (+ , - , *, /) con espacios \n EJEMPLO: 5 * 50 / 20 + 75 - 40: ', operation => {
    readline.question('Elige el metodo a recorrer el arbol binario( "preorder", "postorder" ): ', order => {
        let op = operation.split(' ')
        op.forEach(element => {
            node = new Node(element)
            logicUnit.addLinkedList(node)
        });

        logicUnit.convertToTree()
        console.log(`${order}: ` + `${order === 'preorder' ? preparePre() : logicUnit.postOrder()}`)
        console.log('Resultado: ' + queue.listar())

        readline.close();
    });
  });


