const express = require("express")
app=express()

// ADD THIS
var cors = require('cors');
const { Mongoose, default: mongoose, connect } = require("mongoose");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 const Test= require("./database/database")
 app.use(cors(corsOptions)) // Use this after th
app.listen(3001,console.log("listening to port 3001"))
app.get("/",(req,res)=>{
    Test.find().then((Result) => {
        res.send( Result )
    })
    
})



// console.log(new Date.)


function checkPrime1(num){
for(let i=2;i<=num/2;i++)
{
    if(num%i==0){
        return(false)
    }

    
}
return(true)
}


function checkPrime2(num){
    var j
    j=Math.sqrt(num)
    console.log(j)
    for (let i=2;i<=j;i++){
        if(num%i==0){
            return(false)
        }
    }
    return(true)
}

app.post("/",(req,res)=>{
    var time1= new Date().getTime()


    var flag=req.body.algo
    var resArray=[]
    var start=req.body.start
    var end= req.body.end
    // console.log(start,end,flag)
    start=parseInt(start)
    end=parseInt(end)
    if(start===2){
        resArray.push(2)
    }
    if(start%2==0){
        start+=1
}
    if(flag==="one"){
        for (let i=start;i<end+1;i+=2){
            if(checkPrime1(i)===true){
                resArray.push(i)
            }
        }        
    }
    else if(flag==="two"){
        console.log(start,end,"two algorithm")
        for(let i=start;i<end+1;i+=2){
            if(checkPrime2(i)===true){
                resArray.push(i)
            }
        }
    
    }


    const date=new Date()
    const hours= date.getHours()
    const min= date.getMinutes()
    
    var time2= new Date().getTime()

    var timeElapsed= time2-time1
    
    Test.insertMany(
        [{
            start: req.body.start,
            end: req.body.end,
            Date: new Date().toString(),
            Time: hours + ":" + min,
            AlgorithmChosen: req.body.algo,
            NumberOfPrimesReturned:resArray.length.toString(),
            TimeElapsed:timeElapsed.toString()+"ms"
        }]
        )
    res.send(resArray)

})




