const express=require('express');
const { UserModel } = require('../Model/UserModel');
const userRouter=express.Router()
const bcrypt=require("bcrypt")
const access_token_key = process.env.access_token_key;
const refresh_token_key = process.env.refresh_token_key;
const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
    const { name, email, gender, password } = req.body;
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(400).send({ "msg": err });
            } else {
                const data = new UserModel({ name, email, gender, password:hash});
                await data.save();
                res.status(200).send("User is created");
            }
        });
    } catch (error) {
        res.status(400).send({ "msg": error });
    }
});

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const data = await UserModel.findOne({ email });
        if (data) {
            bcrypt.compare(password, data.password, (err, result) => {
                if (err) {
                    res.status(400).send({ "msg": err });
                } else {
                    if (result) {
                        const access_token = jwt.sign({ UserId:data.id,user:data.username }, access_token_key, { expiresIn: "1h" });
                       

                        res.cookie("access_token", access_token,{ httpOnly:true, sameSite: 'none', secure: false});
                        


                        res.status(200).send({ "msg": "Login successful" });
                    } else {
                        res.status(401).send({ "msg": "Incorrect email or password" });
                    }
                }
            });
        } else {
            res.status(404).send({ "msg": "User not found" });
        }
    } catch (error) {
        res.status(500).send({ "msg": error });
    }
});


module.exports={userRouter}