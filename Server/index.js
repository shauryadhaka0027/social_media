const express = require("express");
const app = express();
const connection = require("./db");
require("dotenv").config();
const PORT = process.env.PORT;


app.use(express.json());


app.listen(PORT, async () => {
    try {
        await connection;
        console.log("db is connected");
        console.log("server is connected");
    } catch (error) {
        console.error("Error connecting to database:", error);
        
    }
});