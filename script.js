function addTask() {
  const taskNumber = document.querySelector('#toDoArea').childElementCount
  const newTask = document.createElement('div');
  const taskId = 'task' + taskNumber;
  
  newTask.setAttribute('class', 'task')
  newTask.setAttribute('id', taskId);
  
  const inputText = document.querySelector('#newTaskInput')
  const text = inputText.value
  
  newTask.innerHTML = `
    <span>${text}</span>
    <div>
      <button onClick='deleteTask(${taskId})' id='deleteButton'> ❌ </button>
      <button onClick='completeTask(${taskId})' id='completeButton'> ✔ </button>
    </div>
  `

  if(text == '') {
    alert('The task is empty')
  }else {
    document.querySelector('#toDoArea').appendChild(newTask)
    inputText.value = ""
    inputText.focus()
  }
}


function deleteTask(value) {  
  const taskToDelete = document.querySelector('#' + value.id)
  const deleteArea = taskToDelete.parentElement.id

  document.querySelector('#' + deleteArea).removeChild(taskToDelete)
}

function completeTask(value) {
  const taskCompleted = document.querySelector('#' + value.id)

  document.querySelector('#doneArea').appendChild(taskCompleted)
}