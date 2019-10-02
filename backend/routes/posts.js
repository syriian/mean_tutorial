const express = require("express");

const Post = require("../models/post");
const router = express.Router();

router.post("", (req, res, next) => {
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

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    res.status(200).json({ message: "update successful!" });
  });
});

//use app - create routing
//can change to get for down narrowing
// extracts data from post then sets posts to incoming data
router.get("", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "posts fetched successfully!",
      posts: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      console.log("failed");
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "post deleted!" }); //send back status 200 with response
  });
});

module.exports = router;
