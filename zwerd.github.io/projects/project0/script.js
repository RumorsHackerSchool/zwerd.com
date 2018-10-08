const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
let todos = []
let id = 0
let unchecked = []

function createTodo(id,text) {
  list.innerHTML += '<li id="'+id+'">'
      +'<button class="delete" onClick="deleteTodo('+id+')">Delete</button>'
      +'<span class="span" id="'+id+'" onClick="changeTodo(this)">'+text+'</span>'
      +'</li>'
}

function newTodo() {
  let text = callPrompt() // get text
  if(typeof(text) !== 'string'|| text==''){return;}
  id += 1;
  todos.push(String(id))
  unchecked.push(String(id))
  console.log(todos.length)
  createTodo(id,text) // invoke createTodo()
  itemCountSpan.innerHTML = todos.length   // update counts
  uncheckedCountSpan.innerHTML = unchecked.length
}

function deleteTodo(id) {
  let element = document.getElementById(id)
  list.removeChild(element)// remove
  todos = todos.filter(item => item !== String(id))// update counts
  unchecked = unchecked.filter(item => item !== String(id))
  itemCountSpan.innerHTML = todos.length
  uncheckedCountSpan.innerHTML = unchecked.length
}

function changeTodo(element){
  if (unchecked.includes(element.id)){
    element.style.backgroundColor = 'lightgreen'
    unchecked = unchecked.filter(item => item !== element.id)
    uncheckedCountSpan.innerHTML = unchecked.length
  }else{
    element.style.backgroundColor = 'silver'
    unchecked.push(element.id)
    uncheckedCountSpan.innerHTML = unchecked.length
  }
}
function callPrompt(){
  let text = prompt("Insert TODO in the list:")
  if(text == ''){
    alert("Invalide value!")
    callPrompt()
  }return text;
 }
