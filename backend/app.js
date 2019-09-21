// mongodb user: admin, pass: w2xPCYurS3WFNoli

//imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

const app = express();

// connect to database then validate connection
mongoose
  .connect(
    "mongodb+srv://admin:w2xPCYurS3WFNoli@cluster0-edhyv.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected to databse");
  })
  .catch(() => {
    console.log("connection failed");
  });

////////// middlewares //////////////////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS
app.use((req, res, next) => {
  //manipulate response to allow access for different hosts(client2server)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Orgin, X-rRequested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

//endpoint for incoming request
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  res.status(201).json({
    message: "post added successfully" //custom message
  }); // working, new resource created
});

//use app - create routing
//can change to get for down narrowing
app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "lskfdjfl",
      title: "first server sidda post",
      content: "this is coming from server"
    },
    {
      id: "blablabla",
      title: "second server sidda post",
      content: "this is coming from server!"
    }
  ];
  //response with message and some dummy data
  res.status(200).json({
    message: "posts fetched successfully!",
    posts: posts
  });
});

//export app
module.exports = app;
