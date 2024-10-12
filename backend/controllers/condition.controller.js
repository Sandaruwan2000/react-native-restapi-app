import Condition from "../models/codition.model.js";

export const Createconditon = async (req, res, next) => {
    try {
        const newBin = await Condition.create(req.body);
        return res.status(201).json(newBin);
    } catch (error) {
        next(error);
    }
};

export const Viewcondition = async(req,res,next) =>{

    try{
 
        const email = req.params.email;
        const user = await Condition.find({email});
        
        if(!user){
            return res.status(404).json("User not found!");
        }
 
        res.status(200).json(user);
  
     }catch(error){
        next(error);
     }
 
 }

 export const onecondition = async (req , res , next) => {

    try{
 
       const id = req.params.id;
       const userExist = await Condition.findById(id);
 
       res.status(200).json(userExist);
 
    }catch(error){
       next(error);
    }
 
 
 };



 export const Updatecodition = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await Condition.findById(id);

        if (!user) {
            return res.status(404).json("Condition not found!");
        }

        if (user.size >= 3) {
            return res.status(403).json("Update limit reached. You can only update this condition 3 times.");
        }

        
        user.size += 1; 
        const updatedCondition = await user.save(); 

        res.status(200).json(updatedCondition);
    } catch (error) {
        next(error);
    }
};