import asyncHandler from "express-async-handler"
import { Catagory } from "../models/Categories/catagory.js"

export const createCatagory = asyncHandler(async(req , res)=>{
    let {name} = req.body;
    let {id}= req.userAuth;
    let iscatagoryPresent = await Catagory.findOne({name});
    if(iscatagoryPresent)
    {
        throw new Error("Catagory  Already exixts ")
    }
    let catagory = await Catagory.create({name:name, author:id})
    return res.json({
        message:"Catagory Created",
        status:"Success",
        catagory
    })
})
export const getAllCatagories = asyncHandler(async(req,res)=>{
    let allCatagories = await Catagory.find({}).populate({
        path:"posts",
        model:"Post",
        
    });
    if(!allCatagories)
    {
        throw new Error("No catagories Available");
    }
    return res.json({
        status:"success",
        message:"All Catagory Successfully Fetched",
        allCatagories
    })
})

export const deleteCatagory  = asyncHandler(async(req,res)=>{
        let {id} = req.params
        await Catagory.findByIdAndDelete(id);
        return res.json({
            status:"success",
            message:"Catagory Successfully Deleted"
            
        })
})
export const updateCatagory  = asyncHandler(async(req,res)=>{
        let {id} = req.params
        let {name} = req.body;
        let updatedCatagory = await Catagory.findByIdAndUpdate(id,{name:name},{new:true,runValidators:true})
        return res.json({
            status:"success",
            message:"Catagory Successfully Deleted",
            updatedCatagory
            
        })
})