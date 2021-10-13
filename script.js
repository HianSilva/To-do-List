let tasksNumber = 0

const doneArea = document.querySelector('#doneArea')
const toDoArea = document.querySelector('#toDoArea')
const body = document.querySelector('body')

render();

body.addEventListener('keypress', (event) => { //Event to make possible add tasks with Enter Key
  addTaskWithEnter(event)
})

function updateEmptyAreaAlert() {
  const toDoIsEmpty = toDoArea.querySelectorAll('div').length === 0
  const doneIsEmpty = doneArea.querySelectorAll('div').length === 0
  const noTasks = tasksNumber < 0

  const toDoAreaEmptyAlert = document.querySelector('#emptyToDoArea')
  const doneAreaEmptyAlert = document.querySelector('#emptyDoneArea')

  if(toDoIsEmpty && !noTasks) {
    toDoAreaEmptyAlert.style.display = 'block'
  }else {
    toDoAreaEmptyAlert.style.display = 'none'
  }

  if(doneIsEmpty && !noTasks) {
    doneAreaEmptyAlert.style.display = 'block'
  }else {
    doneAreaEmptyAlert.style.display = 'none'
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
      <button onClick='deleteTask(${taskId})')' id='deleteTaskButton'>🗑</button>
      <button onClick='completeTask(${taskId})' id='completeTaskButton'>✔</button>
    </div>
  `

  if(taskText == '') {
    alert('The task have no content!')
  }else {
    toDoArea.appendChild(newTask)
    textInput.value = ''
    textInput.focus()
    
    updateCookies()
    updateEmptyAreaAlert()
  }
}

function deleteTask(value) {
  tasksNumber--
  const taskToDelete = document.querySelector('#' + value.id)
  const taskAreaId = '#' + taskToDelete.parentElement.id //get the parent element from the task to be deleted

  taskToDelete.setAttribute('class', 'deletedTask')
  
  setTimeout(() => { //delay to delete, update emptyAreaAlert and Cookies only when the deleteAnimation end.
    document.querySelector(taskAreaId).removeChild(taskToDelete)
    updateEmptyAreaAlert()
    updateCookies()
  }, 150)
}

function completeTask(value) {
  const taskCompleted = document.querySelector('#' + value.id)
  const button = taskCompleted.querySelector('#completeTaskButton')
  
  button.setAttribute('id', 'undoTaskButton')
  button.setAttribute('onClick', `undoTask(${value.id})`)
  button.innerHTML = '✖'

  doneArea.appendChild(taskCompleted)

  updateCookies()
  updateEmptyAreaAlert()
}

function undoTask(value) {
  const taskToUndo = document.querySelector('#' + value.id)
  const button = taskToUndo.querySelector('#undoTaskButton')
  
  button.setAttribute('onClick', `completeTask(${value.id})`)
  button.setAttribute('id', 'completeTaskButton')
  button.innerHTML = '✔'

  toDoArea.appendChild(taskToUndo)

  updateCookies()
  updateEmptyAreaAlert()
}

//Cookies functions

function render() {
  if(Cookies.get('tasksToDo') !== undefined) {
    toDoArea.innerHTML = Cookies.get('tasksToDo')
  }

  if(Cookies.get('tasksDone') !== undefined) {
    doneArea.innerHTML = Cookies.get('tasksDone')
  }
  
  if(Cookies.get('tasksNumber') !== undefined) {
    tasksNumber = Cookies.get('tasksNumber')
  }

  updateEmptyAreaAlert()
}

function updateCookies() {
  let tasksToDo 
  let tasksDone 

  if(toDoArea.querySelectorAll('.task').length >= 0) {
    tasksToDo = toDoArea.innerHTML
  }

  if(doneArea.querySelectorAll('.task').length >= 0) {
    tasksDone = doneArea.innerHTML
  }

  Cookies.set('tasksToDo', tasksToDo, { expires: 3650})
  Cookies.set('tasksDone', tasksDone, { expires: 3650})
  Cookies.set('tasksNumber', tasksNumber, { expires: 3650})
}