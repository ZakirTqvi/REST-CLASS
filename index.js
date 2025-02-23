const express = require("express");
const app = express();
const path = require("path");

const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

let posts = [
    {
       username:"Zakir",
       content: "I am feeling good"
    },
    {
       username:"Shadab",
       content: "I am learning web dev"
    },
    {
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
    posts.push({username, content});
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`)
});