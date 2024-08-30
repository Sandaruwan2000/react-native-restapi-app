import Cart from "../models/cart.model.js";

export const Addcart = async (req, res, next) => {
    try {
        const newCart = await Cart.create(req.body);
        return res.status(201).json(newCart);
    } catch (error) {
        next(error);
    }
};
export const getAllcarts = async (req , res , next) => {
    try{
 
       const allcart = await Cart.find();
       res.status(200).json(allcart);
 
 
    }catch (error){
       next(error);
    }
 };

//  export const onecart = async (req , res , next) => {

//     try{
 
//        const id = req.params.id;
//        const userExist = await Cart.findById(id);
 
//        res.status(200).json(userExist);
 
//     }catch(error){
//        next(error);
//     }
 
 
//  };

 export const deletecart = async(req , res ,next) => {

    try{
 
       const id = req.params.id ;
 
       
  
        await Cart.findByIdAndDelete(id);
       res.status(200).json('Item has been deleted');
 
 
    }catch( error){
       next(error);
    }
 };
