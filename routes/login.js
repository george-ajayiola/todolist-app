const router = require('express').Router()
const users = require('../models/login')
const bcrypt = require('bcrypt')
const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken')
require('dotenv/config')
const {loginValidation , registerValidation} = require('../validate')




router.post('/login',async (req,res) => {
    try{
    const validated = await loginValidation(req.body)
    const {error} = validated

    if(error)
    {
        return res.json({message : error.details[0].message})
    }

    const findUser = await users.findOne({username : req.body.username})
    if(findUser) 
    {
        const checkPass = await bcrypt.compare(req.body.password,findUser.password)
        if(checkPass)
        {
            const token = jwt.sign({password:findUser.password} , process.env.TOKEN_SECRET)
            return res.header('auth-token',token).json({token:token ,
                userid : findUser._id })
        }
    }

    return res.json({message : 'user not found'})
}
catch(error)
{
    console.log(error);
}
    
})


router.post('/register',async (req,res) => {
    try{
    const validated = await registerValidation(req.body)
    const {error} = validated

    if(error)
    {
        return res.send(error.details[0].message)
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password , salt)

    const createUser = await users.create({

        email:req.body.email,
        username : req.body.username, 
        password : hashedPassword
    })

    const savedUser = await createUser.save()


    if(savedUser) return res.json(savedUser)

    return res.json({message : 'user not created'})
}
catch(error)
{
    console.log(error);
}
    
})

router.get('/users/:id', async(req,res) => {
    const user = await users.findById({_id : req.params.id})
    res.json(user)
})



module.exports = router