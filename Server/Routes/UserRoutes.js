const express=require('express');
const { UserModel } = require('../Model/UserModel');
const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    try {
        const { name, email, gender, password } = req.body;
        const newUser = new UserModel({ name, email, gender, password });
        await newUser.save();
        res.status(201).json(newUser);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})