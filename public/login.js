var userName = document.querySelector('.username')
var passWord = document.querySelector('.password')
var homeHeading = document.querySelector('.home-heading h1')
var userId
var errMessage





var loginBtn = document.querySelector('.login-btn')


loginBtn.addEventListener('click' , async function(e)
{
    e.preventDefault()
    var authToken
    
    await fetch('/api/v1/login' , 
    {
        method : "POST",    
        headers : 
        {
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            username : userName.value,
            password : passWord.value
        })
    })

    .then(repsonse => repsonse.json())
    .then( data =>
        {
            if(data.message)
            {
                errMessage = data.message
            }
            else
            {
                userId = data.userid,
                authToken = data.token
            }
        }
    )
    console.log(authToken);

    await fetch('/api/v1/todo' , {
        method : 'GET',
        headers : {
            'auth-token' : (authToken)?authToken:"notoken"
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.message) window.location.href = `/todolink.html?id=${userId}`
        else console.log('what happened')
    })
    .catch(err => console.log("mememe"))
})