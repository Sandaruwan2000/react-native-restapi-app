import mongoose from "mongoose";

const binSchema = new mongoose.Schema({

  email:{
    type:String,
    required:true,

},

  bin_type: {
    type: String,
    required: true,
    
  },
  
  height: {
    type: Number,
    default: 10
  },
  weight: {
    type: Number,
    default:0
  },
  time: {
    type: Number,
    default:0
  },
  image: {
    type: String,
    default: "https://img.freepik.com/premium-psd/wheelie-bin-isolated-transparent-background_1092965-2328.jpg?w=740"
  },
  
}, { timestamps: true });

const Bin = mongoose.model('Bin', binSchema);

export default Bin;
