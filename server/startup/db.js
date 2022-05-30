const mongoose=require('mongoose')

module.exports=()=>{
    mongoose.connect('mongodb://127.0.0.1/recap1',()=>console.log('mongoDB connected...'))
}