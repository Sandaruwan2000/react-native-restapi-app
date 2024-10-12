import Bin from "../models/bin.model.js";



export const Createbin = async (req, res, next) => {
    try {
        const newBin = await Bin.create(req.body);
        return res.status(201).json(newBin);
    } catch (error) {
        next(error);
    }
};

export const Binview = async(req,res,next) =>{

    try{
 
        const email = req.params.email;
        const user = await Bin.find({email});
        
        if(!user){
            return res.status(404).json("Bin not found!");
        }
 
        res.status(200).json(user);
  
     }catch(error){
        next(error);
     }
 
 }


 export const updatebin = async(req , res , next) => {

    try{
 
       const id = req.params.id ;
 
       
  
       const updatebin = await Bin.findByIdAndUpdate(id, req.body, {new:true});
       res.status(200).json(updatebin);
 
 
    }catch( error){
       next(error);
    }
 }

  export const onebin = async (req , res , next) => {

    try{
 
       const id = req.params.id;
       const userExist = await Bin.findById(id);
 
       res.status(200).json(userExist);
 
    }catch(error){
       next(error);
    }
 
 
 };

 export const deletebin = async(req , res ,next) => {
 
    try{
 
       const id = req.params.id ;
 
       
  
        await Bin.findByIdAndDelete(id);
       res.status(200).json('Bin has been deleted');
 
 
    }catch( error){
       next(error);
    }
 };