const express = require("express");
const app = express();
const path = require("path");

let Port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

let posts = [];

app.get("/",(req,res)=>{
    res.render("index",{posts});
});



app.post("/",(req,res)=>{
    let details = req.body;
    posts.push(details);
    console.log(posts);
    res.redirect("/");
})

app.get("/addpost",(req,res)=>{
    res.render("addpost");
})

app.get("/editpost",(req,res)=>{
    res.send("This is the edit post page");
})

app.post("/deletepost",(req,res)=>{
    res.send("This is the delete post page");
});


app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
});