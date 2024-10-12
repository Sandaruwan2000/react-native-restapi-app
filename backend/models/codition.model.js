import mongoose from "mongoose";

const conditionSchema = new mongoose.Schema({

  email:{
    type:String,
    required:true,
    unique:true,

},

  size: {
    type: Number,
    default:0    
  },
 
}, { timestamps: true });

const Condition = mongoose.model('Condition', conditionSchema);

export default Condition;
