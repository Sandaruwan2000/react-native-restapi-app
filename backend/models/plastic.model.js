import mongoose from "mongoose";

const plasticSchema = new mongoose.Schema({

  email:{
    type:String,
    required:true,

},

  weight: {
    type: String,
    required: true,
    
  },

  
}, { timestamps: true });

const Plastic = mongoose.model('Plastic', plasticSchema);

export default Plastic;
