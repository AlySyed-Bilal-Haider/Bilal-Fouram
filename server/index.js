import express from 'express';
import cors from 'cors';
import router from './Routes/routes.js';
import connectDB from './Database/ConnectDB.js';
const url="mongodb+srv://bilal:minerdao12345@cluster0.flytvry.mongodb.net/?retryWrites=true&w=majority";
const app=express();
const port=process.env.port || 4000;
app.use(cors("*"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectDB(url);
app.get("/",(req,res)=>{
    res.send("server file");
})
app.use(router);
app.listen(port,(req,res)=>{
 console.log("server start");
})
