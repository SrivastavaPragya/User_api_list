const express = require('express');
const mongoose = require('mongoose');
const listRoutes = require('./Routes/ListRoute');
const InitDatabase = require('./db/connection')
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;
InitDatabase();


// Test Route 
app.get("/",(req,res)=>{
    res.json({
        message:"Welcome to User_list_App!"
    })
})


app.use('/lists', listRoutes);

app.listen(3000, () => {
  console.log(`server is running on ${PORT}`);
});
