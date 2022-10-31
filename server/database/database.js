const express= require("express")
const mongoose=require("mongoose")

const connect1=async ()=>{
    await mongoose.connect("mongodb+srv://AyushVarshney1:abcdefgh@cluster0.vojn07m.mongodb.net/?retryWrites=true&w=majority",
{},
)
}

connect1()
const connect2= async()=>{
    var db=await mongoose.connection
    await db.on("error",()=>{console.log("error")})
    await db.once("open",()=>{
        console.log("success connection")});
    }
    connect2()
    const Schema = new mongoose.Schema(
    
        {
            start:String,
            end:String,
            AlgorithmChosen:String,
            Date:String,
            Time:String,
            NumberOfPrimesReturned:String,
            TimeElapsed:String
        }
    )
    const Test= mongoose.model("test",Schema)


    module.exports= Test
    
    