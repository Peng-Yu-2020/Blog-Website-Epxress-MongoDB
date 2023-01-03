// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete
const Blog = require("../models/blog")

const blog_index = (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then((result) => {
      res.render("index", {title: "Home", blogs:result})
    })
    .catch((error) => {
      console.log(error)
    })
  };

const blog_details = (req, res) => {
    Blog.findById(req.params.id)
    .then((result) => {
        res.render("details", {blog: result, title:"Blog Detail"})
    })
    .catch((error) => {
        console.log(error)
    })
    };

const blog_create_get = (req, res) => {
    res.render("create",  {title: "Creat a new blog"});
    };

const blog_create_post = (req, res) => {
    const newBlog = new Blog({
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body
    })
    newBlog.save()
    .then((result) => {
        res.redirect("/blogs")
    })
    .catch((error) => {
        console.log(error)
    })
    };

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/blogs'})
    })
    .catch((error) => {
        console.log(error)
    })
    };

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}