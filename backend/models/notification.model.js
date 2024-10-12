import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({

  email:{
    type:String,
    required:true,

},

  bin_type: {
    type: String,
    required: true,
    
  },
  
  notification: {
    type: String,
  },

  
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
