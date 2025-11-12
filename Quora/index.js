const express = require("express");
const app = express();
const path = require("path");
const uuid = require("uuid").v1;
const methodOverride = require("method-override");

let Port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));

let posts = [];

app.get("/posts",(req,res)=>{
    res.render("index",{posts});
});


app.post("/posts",(req,res)=>{
    let details = req.body;
    details.id = uuid();
    posts.push(details);
    res.redirect("/posts");
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((a)=>a.id != id);
    res.redirect("/posts");
})

app.get("/posts/addpost",(req,res)=>{
    res.render("addpost");
})

app.get("/posts/editpost/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((a)=>a.id === id);
    res.render("editpost",{post});
})

app.patch("/posts/editpost/:id",(req,res)=>{
    let {id} = req.params;
    let {username, description} = req.body;
    let post = posts.find((a)=>a.id === id);
    if(!id || !post){
        res.render("error");
        return;
    }
    post.username = username;
    post.description = description;
    post.id = id;
    res.redirect(`/posts/show/${id}`);
})

app.get("/posts/show/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((a)=>a.id === id);
    if(!id || !post){
        res.render("error");
        return;
    }
    res.render("show",{post});
});

app.use((req,res)=>{
    res.render("error");
})


app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
});