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
    //connecting to localhost ////"mongodb://localhost:27017/1177"
    "mongodb+srv://admin:w2xPCYurS3WFNoli@cluster0-edhyv.mongodb.net/node-angular?retryWrites=true&w=majority",
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
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

//endpoint for incoming request

//export app
module.exports = app;
