const express = require("express");
const app = express();
const path = require("path");
const data = require("./data.json");

let Port = 3000;

app.set("view engine","ejs");
app.set("views",path.join(__dirname, "/views"));

app.get("/",(req,res)=>{
    res.render("home");
})

app.get("/insta/:username",(req,res)=>{
    let {username}= req.params;
    let User = data[username];
    res.render("insta",{User});
})

// app.use((req, res)=>{
//     res.send("all routes");
// })

app.listen(Port,()=>{
    console.log(`Listening to Port : ${Port}`);
})