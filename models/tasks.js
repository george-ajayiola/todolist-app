const { required } = require('@hapi/joi');
const mongoose = require('mongoose');


const taskSchema = mongoose.Schema({
    userid : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },

    description : String ,

    completed : {
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model('tasks' , taskSchema)