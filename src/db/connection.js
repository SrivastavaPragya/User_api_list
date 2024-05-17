const mongoose = require('mongoose')

 const InitDatabase=()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connection is succesful")
 }).catch((e)=>{
console.log(e)
 })
}

module.exports = InitDatabase;

