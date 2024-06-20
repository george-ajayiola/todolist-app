const router = require('express').Router()
const verify = require('../verifyToken')

router.get('/' ,verify,(req,res) => {
    //res.json(req.user)
    res.json({message : 'back'})
})

module.exports = router