const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes  = require('./routes/tasks')
const loginRouter = require('./routes/login')
const bodyParser = require('body-parser')
const path = require('path')
const todoRedirect = require('./routes/todo-redirect')
require('dotenv/config')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(express.urlencoded({extended : false}))
app.use('/api/v1' , routes)
app.use('/api/v1',loginRouter)
app.use('/api/v1/todo' , todoRedirect)



// app.get('/' , (req,res) => {
//     res.sendFile((path.join(__dirname , '/login.html')))
// })



port = 3000
const dbConnect = async () => {
    try
    {
        await mongoose.connect(process.env.DB_CONNECTION,console.log('connected to db'))
         app.listen(port ,  console.log('server is listening on port 3000'))
    }
    catch(error){
        console.log(error)
    }
}

dbConnect()






