var userName = document.querySelector('.username')
var passWord = document.querySelector('.password')
var Email = document.querySelector('.email')
var userId
var errMessage

var reBtn = document.querySelector('.rebtn')


reBtn.addEventListener('click' , async function(e)
{
    e.preventDefault()
    var authToken
    
    await fetch('/api/v1/register' , 
    {
        method : "POST",    
        headers : 
        {
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email:Email.value,
            username : userName.value,
            password : passWord.value
        })
    })

    .then(repsonse => repsonse.json())
    .then( data =>
        {
            if(data._id)
            {
                window.location.href = "/index.html"
            }
            else
            {
                alert("try again")
            }
        }
    )
    })