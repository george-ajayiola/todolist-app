

var nameInp = document.querySelector('.task-na')
var descInp = document.querySelector('.task-desc')
var editTask = document.querySelector('.edit-task')
var createTask = document.querySelector('.post-task-btn')
var singleTask = document.querySelector('.single-task')
var welcomeLabel = document.querySelector('.welcome-label span')

var paramsi = window.location.search
var id = new URLSearchParams(paramsi).get('id')


document.addEventListener("DOMContentLoaded",  function(event) {
    
    fetch(`api/v1/users/${id}`)
    .then(response => response.json())
    .then(data => {
        welcomeLabel.innerHTML = `${data.username}`
    })
     showAllTasks()
    
})

if(createTask){createTask.addEventListener('click' , async function(){
    

    await fetch('/api/v1/users/tasks' , 
    {
        method : 'POST',
        headers : {
            'Content-Type' :'application/json' ,
        },
        body : JSON.stringify({
            userid:id,
            name: nameInp.value,
            description: descInp.value
            
          })
    }

    )
    .then(resp => resp.json())

    showAllTasks()
})
}

function showAllTasks()
{

     fetch(`/api/v1/users/tasks/${id}`).then
    (response => response.json())
    .then
    (
        data => {
            console.log(data.length);
            const pendingSection = document.querySelector('.pending-tasks-section')
            const completedSection = document.querySelector('.completed-tasks-section')
            pendingSection.innerHTML ="<h4>Pending</h4><h5>No Tasks Pending</h5>"
            completedSection.innerHTML ="<h4>Completed</h4><h5>No Tasks Completed</h5>"
            for(let i of data){
                  
            if(i.completed)
            {
            completedSection.innerHTML += `<div class = 'single-task'  >${(i.completed)?'<i style = "color:green;"class="fas fa-check"></i>':''}
             <p class = 'task-name' >${i.name}</p> <div class = 'task-operations' ><a href = '/editTask.html?id=${i._id} ' class = 'edit-task'><div><p>Edit</p></div></a>
             <div class = 'delete-task'  onclick ='deleteTask("${i._id}")'><p>Delete</p></div>
             </div></div>`} 

             else{

                pendingSection.innerHTML += `<div class = 'single-task'  >${(i.completed)?'':'<i class="fas fa-circle-notch"></i>'}
             <p class = 'task-name' >${i.name}</p> <div class = 'task-operations' ><a href = '/editTask.html?id=${i._id} ' class = 'edit-task'><div><p>Edit</p></div></a>
             <div class = 'delete-task'  onclick ='deleteTask("${i._id}")'><p>Delete</p></div>
             </div></div>`

             }
            }

           
            

            
        }
    )
}





async function deleteTask(taskId)
{
    
    await fetch('/api/v1/tasks' , 
    {
        method : 'DELETE',
        headers : {
            'Content-Type' :'application/json' ,
        },
        body : JSON.stringify({
            id : taskId
          })
    })

    showAllTasks()
}



