var loginBtn = document.querySelector('.login-btn')
var userName = document.querySelector('.username')
var passWord = document.querySelector('.password')
var userid;

loginBtn.addEventListener('click' , async function (e)
{
    e.preventDefault()
    var jwt_token
    await fetch('/api/v1/login' , 
    {
        method : 'POST',
        headers : 
        {
            'Content-Type':'application/json'
        },
        body : JSON.stringify({
            username : userName.value,
            password : passWord.value
        })
    }).then(response => response.json())
    .then(data => {if(data.message)alert(data.message)
        if(data.token){jwt_token = data.token;
                   userid = data.userid }})

    

    
    

//     var req = new XMLHttpRequest();
//     await req.open('POST', '/', false);
//     req.send(null);
// // associate array to store all values
//     var data = new Object();
// // get all headers in one call and parse each item
//     var headers = req.getAllResponseHeaders().toLowerCase();
//     var aHeaders = headers.split('\n');
//     var i =0;
//     var thisItem = aHeaders[1].substring(aHeaders[0].indexOf(':') + 1)
//     console.log(thisItem);

    
    
    await fetch('/api/v1/todo' , {
        method : 'GET',
        headers : {
            'auth-token' : (jwt_token)?jwt_token:"notoken"
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.message) window.location.href = `/todolink.html?id=${userid}`
        else console.log('what happened')
    })
    .catch(err => console.log(err))

})