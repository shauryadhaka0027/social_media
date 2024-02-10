const express=require("express");
const { PostModel } = require("../Model/PostModel");
const postRouter=express.Router();


postRouter.post("/create",auth,async(req,res)=>{
    try {
       const data= new PostModel(req.body);
       await data.save()
       res.send({"msg":"note has been created"})
    } catch (error) {
        res.send({"msg":error})
    }
})

postRouter.get("/",auth,async(req,res)=>{
    try {
        const data=await PostModel.find()
        res.send(data)
    } catch (error) {
        res.send({"Msg":error})
    }
})

postRouter.patch("/update/:id",auth,async(req,res)=>{
    const {id}=req.params
    try {
        await PostModel.findByIdAndUpdate({_id:id},req.body)
        res.send({"msg":`note has been updated by Id ${id}`})
    } catch (error) {
        res.send({"msg":error})
    }
})

postRouter.delete("/delete/:id",auth,async(req,res)=>{
    const {id}=req.params
try {
    await PostModel.findByIdAndDelete({_id:id})
    res.send({"msg":`note has been deleted by Id ${id}`})
} catch (error) {
    
    res.send({"msg":error})
}
})

module.exports={postRouter}