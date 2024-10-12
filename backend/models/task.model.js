import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({

  email:{
    type:String,
    required:true,

},

  weight: {
    type: String,
    required: true,
    
  },
  
  task_type: {
    type: String,
    required: true,
  },

  
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
