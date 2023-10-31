const express= require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require("./Routes/AuthRoute");

dotenv.config();
const config =require('./config/config')
const app= express();

app.use(cors({
 methods:["GET","POST","PUT","DELETE"],
 credentials:true,
}));
// app.ption('*',cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express());
app.use("/", authRoute);

mongoose.connect(config.MONGODB_URI , {
useNewUrlParser:true,
useUnifiedTopology:true,
})

const db = mongoose.connection;
db.on('error' ,console.error.bind(console, 'Error de connexion à la base de donnée : '));
db.once('open', ()=>{
 console.log('Ma base donnée est bien et belle connectée ')
} )

app.get('/', (req,res)=>{
 res.json({
  message :'Bienvenue chez zoumtech'
 })
})

const Port = process.env.Port || 4000;

app.listen(Port,()=>{
 console.log("Server est en cour d'execution");
}) 