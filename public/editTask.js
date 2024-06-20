
var taskName = document.querySelector('.task-name')
var taskDesc = document.querySelector('.task-desc')
var taskId = document.querySelector('.task-id')
var taskCheck = document.querySelector('.checkb')
var doneBtn = document.querySelector('.done-btn')


const params = window.location.search
var id = new URLSearchParams(params).get('id')

document.addEventListener('DOMContentLoaded' , function(e)
{
    fetch(`/api/v1/tasks/${id}`)
    .then(response => response.json())
    .then(data => {
        taskName.innerHTML = data.name
        taskDesc.value = data.description
        taskId.innerHTML = `Task id : ${data._id}`

        if(data.completed) taskCheck.checked = true
    })
})

doneBtn.addEventListener('click' , async function(e)
{
    e.preventDefault()

    await fetch(`/api/v1/tasks/${id}` , 
    {
        method : 'PATCH',

        headers : {
            'Content-Type' : 'application/json'
        },

        body : JSON.stringify({
            
            description: taskDesc.value,
            completed : taskCheck.checked
            
          })
    })

    var editMessage = document.createElement('p')
    editMessage.className = "edit-message"
    editMessage.innerHTML = 'task updated'
    var editContainer = document.querySelector('.edit-task-container')
    editContainer.appendChild(editMessage)
})