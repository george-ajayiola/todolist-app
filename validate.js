const Joi = require('@hapi/joi')


const loginValidation = (data) => {
    try
    {
        const schema = Joi.object({
            username : Joi.string().min(4).required(),
            password : Joi.string().min(6).required()
        })

        return schema.validate(data)

    }
    catch(error)
    {
        console.log(error)
    }

}

const registerValidation = (data) => {
    try
    {
        const schema = Joi.object({
            email:Joi.string().required().email(),
            username : Joi.string().min(4).required(),
            password : Joi.string().min(6).required()
        })

        return schema.validate(data)

    }
    catch(error)
    {
        console.log(error)
    }

}

module.exports.loginValidation = loginValidation
module.exports.registerValidation = registerValidation