const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');


const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

let posts = [
    {
       id: uuidv4(),
       username:"Zakir",
       content: "I am feeling good"
    },
    {  id: uuidv4(),
       username:"Shadab",
       content: "I am learning web dev"
    },
    {
       id: uuidv4(),
       username:"Zafar",
       content: "Hi!..."
    }
]

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    console.log(id);
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    console.log(post);
    res.send("patch request working");
});

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`)
});