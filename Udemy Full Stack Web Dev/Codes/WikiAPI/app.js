// Modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// App settings
const app = express();
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

app
  .route("/articles")
  .get((req, res) => {
    Article.find({})
      .then((docs) => {
        res.send(docs);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .post((req, res) => {
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
  })
  .delete((req, res) => {
    Article.deleteMany({})
      .then(() => {
        res.send("Success");
      })
      .catch((err) => {
        res.send(err);
      });
  });

app
  .route("/articles/:articleTitle")
  .get((req, res) => {
    Article.find({ title: req.params.articleTitle })
      .then((docs) => {
        res.send(docs);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .put((req, res) => {
    Article.replaceOne(
      {
        title: req.params.articleTitle,
      },
      {
        title: req.body.title,
        content: req.body.content,
      }
    )
      .then((docs) => {
        if (docs.modifiedCount === 0) {
          res.send("No articles found with that title");
        } else {
          res.send("Success");
        }
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .patch((req, res) => {
    Article.updateOne(
      {
        title: req.params.articleTitle,
      },
      {
        $set: req.body,
      }
    )
      .then(() => {
        res.send("Success");
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .delete((req, res) => {
    Article.deleteOne({ title: req.params.articleTitle })
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
