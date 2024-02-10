const express = require("express");
const app = express();
const connection = require("./db");
require("dotenv").config();
const PORT = process.env.PORT;
const {userRouter}=require("./Routes/UserRoutes");
const { postRouter } = require("./Routes/PostRoute");
const { auth } = require("./Middleware/Auth.middleware");
const cookieParser = require("cookie-parser");
const cors =require("cors")
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: ["http://127.0.0.1:5173"],
    credentials: true
  }));
 
app.use("/user",userRouter)
app.use('/post',auth,postRouter)

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
