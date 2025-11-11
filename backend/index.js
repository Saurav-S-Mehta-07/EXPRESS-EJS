const express = require('express');
const app = express();

let Port = 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get("/register",(req,res)=>{
    console.log(req.query);
    res.send("register page get");
})

app.post("/register",(req,res)=>{
    console.log(req.body);
    res.send("registering user post");
})


app.listen(Port, ()=>{
    console.log(`listening to port : ${Port}`);
})