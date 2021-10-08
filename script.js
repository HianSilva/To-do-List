let taskNumber = 0

function removeEmptyMessage() {
  const toDoisEmpty = document.querySelector('#toDoArea').querySelectorAll('div').length === 0
  const doneIsEmpty = document.querySelector('#doneArea').querySelectorAll('div').length === 0

  const toDoText = document.querySelector('#emptyToDoArea')
  const doneAreaText = document.querySelector('#emptyDoneArea')

  if(!toDoisEmpty) {
    toDoText.style.display = 'none'
  }else {
    toDoText.style.display = 'block'
  }

  if(!doneIsEmpty) {
    doneAreaText.style.display = 'none'
  }else {
    doneAreaText.style.display = 'block'
  }
}

function getTaskId() {
  const test = document.querySelector('#task' + taskNumber)

  if(test === null) {
    return 'task' + taskNumber
  }else{
    return 'task' + (taskNumber+1)
  }
}

function addTask() {
  taskNumber++
  const newTask = document.createElement('div');
  const taskId = getTaskId();
  
  newTask.setAttribute('class', 'task')
  newTask.setAttribute('id', taskId);
  
  const inputText = document.querySelector('#newTaskInput')
  const text = inputText.value
  
  newTask.innerHTML = `
    <span>${text}</span>
    <div>
      <button onClick='deleteTask(${taskId})')' id='deleteTaskButton'> 🗑 </button>
      <button onClick='completeTask(${taskId})' id='completeTaskButton'> ✔ </button>
    </div>
  `
  
  if(text == '') {
    alert('The task is empty')
  }else {
    document.querySelector('#toDoArea').appendChild(newTask)
    inputText.value = ""
    inputText.focus()
  }

  removeEmptyMessage()
}

function deleteTask(value) {  
  taskNumber--;
  const taskToDelete = document.querySelector('#' + value.id)
  const deleteArea = taskToDelete.parentElement.id

  document.querySelector('#' + deleteArea).removeChild(taskToDelete)

  removeEmptyMessage()
}

function completeTask(value) {
  const taskCompleted = document.querySelector('#' + value.id)
  const button = taskCompleted.querySelector('#completeTaskButton')
  
  button.setAttribute('onClick', `undoTask(${value.id})`)
  button.setAttribute('id', 'undoTaskButton')
  button.innerHTML = '✖'

  document.querySelector('#doneArea').appendChild(taskCompleted)

  removeEmptyMessage()
}

function undoTask(value) {
  const taskToUndo = document.querySelector('#' + value.id)
  const button = taskToUndo.querySelector('#undoTaskButton')
  
  button.setAttribute('onClick', `completeTask(${value.id})`)
  button.setAttribute('id', 'completeTaskButton')
  button.innerHTML = '✔'

  document.querySelector('#toDoArea').appendChild(taskToUndo)

  removeEmptyMessage()
}