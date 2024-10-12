import Plastic from "../models/plastic.model.js";



export const Createplastic = async (req, res, next) => {
    try {
        const newBin = await Plastic.create(req.body);
        return res.status(201).json(newBin);
    } catch (error) {
        next(error);
    }
};

export const Plasticview = async(req,res,next) =>{

    try{
 
        const email = req.params.email;
        const user = await Plastic.find({email});
        
        if(!user){
            return res.status(404).json("Bin not found!");
        }
 
        res.status(200).json(user);
  
     }catch(error){
        next(error);
     }
 
 }

 export const deleteplastic = async(req , res ,next) => {
 
    try{
 
       const id = req.params.id ;
 
       
  
        await Plastic.findByIdAndDelete(id);
       res.status(200).json('Notification has been deleted');
 
 
    }catch( error){
       next(error);
    }
 };