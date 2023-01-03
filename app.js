const express = require('express');
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const blogRoute = require("./routes/blogRoutes");

// express app
const app = express();

app.set("view engine", 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));


// connected to MongoDB
const dbURI = "mongodb+srv://admin-peng:YuPeng1123@cluster0.isojl.mongodb.net/Blog?retryWrites=true&w=majority"
mongoose.connect(dbURI)
.then((result) => app.listen(3000))
.catch((error) => console.log(error));

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "the second new blog",
    snippet: "second about my new blog",
    body: "second more about my new blog"
  });
  blog.save()
  .then((result) => {
    res.send(result)
  })
  .catch((error) => {
    console.log(error);
  })
})

app.get("/all-blogs", (req, res) => {
  Blog.find().sort({createdAt: -1})
  .then((result) => {
    res.render("index", {title: "Home", blogs:result})
  })
  .catch((error) => {
    console.log(error)
  })
})

app.get("/single-blog", (req, res) => {
  Blog.findById("631a543597c255d794127c41")
  .then((result) => {
    res.send(result)
  })
  .catch((error) => {
    console.log(error)
  })
})

app.get('/', (req, res) => {
  res.redirect("/blogs");
});

app.get('/about', (req, res) => {
  res.render("about",  {title: "About"})
});

// blog router
app.use("/blogs", blogRoute)

// 404 page
app.use((req, res) => {
  res.status(404).render("404",  {title: "404"});
});
