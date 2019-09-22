const mongoose = require("mongoose");

//Schema for data we want to store in documents.
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

module.exports = mongoose.model("Post", postSchema); // collection: posts automatically created
