const express=require("express");
const { PostModel } = require("../Model/PostModel");
const postRouter=express.Router();


postRouter.post("/create",async(req,res)=>{
    try {
       const data= new PostModel(req.body);
       await data.save()
       res.send({"msg":"post has been created"})
    } catch (error) {
        res.send({"msg":error})
    }
})

postRouter.get("/",async(req,res)=>{
    try {
        const userId = req.user.userId; 
        const { device } = req.query;
        let query = { user: userId };
        if (device) {
          query.device = device;
        }
        const posts = await PostModel.find(query);
        res.json(posts);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    try {
        await PostModel.findByIdAndUpdate({_id:id},req.body)
        res.send({"msg":`Post has been updated by Id ${id}`})
    } catch (error) {
        res.send({"msg":error})
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
try {
    await PostModel.findByIdAndDelete({_id:id})
    res.send({"msg":`post has been deleted by Id ${id}`})
} catch (error) {
    
    res.send({"msg":error})
}
})

module.exports={postRouter}