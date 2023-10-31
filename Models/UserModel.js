const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema =new mongoose.Schema({
 email:{
  type:String,
  required:[ true, "Your email"],
  unique:true,
 },
 username:{
  type:String,
  required:[true, "your username is requireds"],
 },
 password: {
  type:String,
  required:[true,"your password is required"]
 },
 createdAt:{
  type:Date,
  default:new Date(),
 },
})

userSchema.pre("save", async function(){
 this.password=await bcrypt.hash(this.password,12);
})

module.exports =mongoose.model("User",userSchema);