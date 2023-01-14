const express = require("express");
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoute = require('./routes/auth');

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

//MiddleWare
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use('/user',authRoute)

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})