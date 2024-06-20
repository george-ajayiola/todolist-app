const router = require('express').Router()
const tasks = require('../models/tasks')




router.get('/users/tasks/:userid' , async (req,res) => {
    try
    {
        const allTasks = await tasks.find(req.params)
        if(allTasks)
        {
            return res.json(allTasks)
        }
        return res.send('no tasks found')

    }
    catch(err)
    {
        console.log(err)
    }
})

router.post('/users/tasks' , async (req,res) => {
    try
    {
        const created = await tasks.create(req.body)
        res.status(201).json(created)
    }
    catch(error)
    {
        console.log(error)
    }

    
})

router.get('/tasks/:id' , async (req,res) => {
    const {id} = req.params
    
    try {
        const singleTask = await tasks.findOne({
            _id : id
        })
        res.json(singleTask)
    } catch (error) {
        console.log(error)
    }
    

})

router.delete('/tasks',async(req,res) => {
    try{
        const deletedTask = await tasks.deleteOne({
            _id:req.body.id
        })
        res.json(deletedTask)
    }
    catch(error )
    {
        console.log(error);
    }
})

router.patch('/tasks/:id' , async (req,res) => {
    const {id} = req.params
    
    try{
    const updatedTask = await tasks.updateOne(
        {
            _id : id
        },
        {
            description:req.body.description,
            completed:req.body.completed
        }
        
    )   
    res.json({message : true})

   }
    catch(error)
    {
        console.log(error);
    }

    
})

router.get('/tasks' , async(req,res) => {
    const allTasks = await tasks.find()
    res.json(allTasks)
})

module.exports = router

