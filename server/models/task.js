
  const mongoose = require('mongoose')
  const userSchema = new mongoose.Schema({
      
    name:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    remindDate:{
        type:Date,
        default:null
    },
    owner: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    }
},{timestamps:true})

const Task = mongoose.model('tasks', userSchema)

module.exports=Task

