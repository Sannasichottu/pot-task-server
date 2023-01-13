const express = require("express");
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();

const port = 3001;


//mongoose connection
const uri = process.env.MONGO_URL;

mongoose.set('strictQuery', false);
mongoose.connect(uri,err => {
    if(err) throw err;
})
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Db connection successfully")
})


app.get("/",(req,res) => {
    res.send("Hlo nanba")
})

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})