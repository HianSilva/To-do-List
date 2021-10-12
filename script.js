let tasksNumber = 0

const doneArea = document.querySelector('#doneArea')
const toDoArea = document.querySelector('#toDoArea')
const body = document.querySelector('body')

body.addEventListener('keypress', (event) => { //Event to make possible add tasks with Enter Key
  addTaskWithEnter(event)
})

function updateEmptyAreaAlert() {
  const toDoIsEmpty = toDoArea.querySelectorAll('div').length === 0
  const doneIsEmpty = doneArea.querySelectorAll('div').length === 0

  const toDoAreaEmptyAlert = document.querySelector('#emptyToDoArea')
  const doneAreaEmptyAlert = document.querySelector('#emptyDoneArea')

  if(!toDoIsEmpty) {
    toDoAreaEmptyAlert.style.display = 'none'
    console.log('empty')
  }else {
    toDoAreaEmptyAlert.style.display = 'block'
  }

  if(!doneIsEmpty) {
    doneAreaEmptyAlert.style.display = 'none'
  }else {
    doneAreaEmptyAlert.style.display = 'block'
  }
}

function getTaskId() {
  const test = document.querySelector('#task' + tasksNumber)

  if(test === null) {
    return 'task' + tasksNumber
  }else{
    return 'task' + (tasksNumber+1)
  }
}

function addTaskWithEnter(event) {
  const enterPressed = event.key == 'Enter'
  const textInputIsOnFocus= document.querySelector('#newTaskInput') == document.activeElement
  
  if(enterPressed && textInputIsOnFocus) {
    console.log('Enter Pressed')
    addTask()
  }
}

function addTask() {
  tasksNumber++

  const newTask = document.createElement('div')
  const taskId = getTaskId()
  const textInput = document.querySelector('#newTaskInput')
  const taskText = textInput.value
  
  newTask.setAttribute('id', taskId)
  newTask.setAttribute('class', 'task')

  newTask.innerHTML = `
    <span>${taskText}</span>
    <div>
      <button onClick='deleteTask(${taskId})')' id='deleteTaskButton'> 🗑 </button>
      <button onClick='completeTask(${taskId})' id='completeTaskButton'> ✔ </button>
    </div>
  `

  if(taskText == '') {
    alert('The task have no content!')
  }else {
    toDoArea.appendChild(newTask)

    textInput.value = ''
    textInput.focus()
  }

  updateEmptyAreaAlert()
}

function deleteTask(value) {
  tasksNumber--
  const taskToDelete = document.querySelector('#' + value.id)
  const taskAreaId = '#' + taskToDelete.parentElement.id //get the parent element from the task to be deleted

  taskToDelete.setAttribute('class', 'deletedTask')
  
  setTimeout(function() {
    document.querySelector(taskAreaId).removeChild(taskToDelete)
    updateEmptyAreaAlert()
  }, 150)
}

function completeTask(value) {
  const taskCompleted = document.querySelector('#' + value.id)
  const button = taskCompleted.querySelector('#completeTaskButton')
  
  button.setAttribute('id', 'undoTaskButton')
  button.setAttribute('onClick', `undoTask(${value.id})`)
  button.innerHTML = '✖'

  doneArea.appendChild(taskCompleted)

  updateEmptyAreaAlert()
}

function undoTask(value) {
  const taskToUndo = document.querySelector('#' + value.id)
  const button = taskToUndo.querySelector('#undoTaskButton')
  
  button.setAttribute('onClick', `completeTask(${value.id})`)
  button.setAttribute('id', 'completeTaskButton')
  button.innerHTML = '✔'

  toDoArea.appendChild(taskToUndo)

  updateEmptyAreaAlert()
}