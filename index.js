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
       name:"Zakir",
       message: "I am feeling good"
    },
    {
       name:"Shadab",
       message: "I am learning web dev"
    },
    {
       name:"Zafar",
       message: "Hi!..."
    }
]

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`)
});