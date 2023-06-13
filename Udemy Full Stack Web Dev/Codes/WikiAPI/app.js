// Modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// App settings
const app = new express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = 3000;

// Mongoose
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB").catch((err) => {
  console.log(err);
});

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", (req, res) => {
  Article.find({})
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/articles", (req, res) => {
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
  });
  article
    .save()
    .then(() => {
      res.send("Success");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.delete("/articles", (req, res) => {
  Article.deleteMany({})
    .then(() => {
      res.send("Success");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
