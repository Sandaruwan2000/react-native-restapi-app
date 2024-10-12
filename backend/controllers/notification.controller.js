import Notification from "../models/notification.model.js";



export const Createnotification = async (req, res, next) => {
    try {
        const newBin = await Notification.create(req.body);
        return res.status(201).json(newBin);
    } catch (error) {
        next(error);
    }
};

export const Notificationview = async(req,res,next) =>{

    try{
 
        const email = req.params.email;
        const user = await Notification.find({email});
        
        if(!user){
            return res.status(404).json("Bin not found!");
        }
 
        res.status(200).json(user);
  
     }catch(error){
        next(error);
     }
 
 }

 export const deletenotification = async(req , res ,next) => {
 
    try{
 
       const id = req.params.id ;
 
       
  
        await Notification.findByIdAndDelete(id);
       res.status(200).json('Notification has been deleted');
 
 
    }catch( error){
       next(error);
    }
 };