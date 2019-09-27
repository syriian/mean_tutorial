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
    //connecting to localhost "mongodb+srv://admin:w2xPCYurS3WFNoli@cluster0-edhyv.mongodb.net/node-angular?retryWrites=true&w=majority"
    "mongodb://localhost:27017/1177",
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
  // save const post to database via mongoose
  post.save().then(result => {
    res.status(201).json({
      message: "post added successfully", //custom message
      postId: result._id
    }); // working, new resource created
  });
  console.log(post);
});

//use app - create routing
//can change to get for down narrowing
// extracts data from post then sets posts to incoming data
app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "posts fetched successfully!",
      posts: documents
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "post deleted!" }); //send back status 200 with response
  });
});
//export app
module.exports = app;
