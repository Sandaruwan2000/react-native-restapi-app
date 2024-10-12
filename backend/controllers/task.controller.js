import Task from "../models/task.model.js";

export const Createtask = async (req, res, next) => {
    try {
        const newBin = await Task.create(req.body);
        return res.status(201).json(newBin);
    } catch (error) {
        next(error);
    }
};

export const taskview = async (req , res , next) => {
    try{
 
       const task = await Task.find();
       res.status(200).json(task);
 
 
    }catch (error){
       next(error);
    }
 };