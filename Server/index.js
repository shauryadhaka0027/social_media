const express = require("express");
const app = express();
const connection = require("./db");
require("dotenv").config();
const PORT = process.env.PORT;
const {userRouter}=require("./Routes/UserRoutes")

app.use(express.json());
app.use("/user",userRouter)

app.get("/", (req, res) => {
    res.send({"msg": "shaurya"});
});

app.listen(PORT, async () => {
    try {
        await connection;
        console.log("db is connected");
        console.log("server is connected");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
});
