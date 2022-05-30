const mongoose=require('mongoose')
const task=require('./Task').schema

const computerSchema=new mongoose.Schema({
    serviceOrder:{
        type:String,
        required:true
    },
    name:{
        type: String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false,
        required:true
    },
    tasks:[task]
})

const computerModel=mongoose.model('computer',computerSchema)

module.exports={model:computerModel,schema:computerSchema}