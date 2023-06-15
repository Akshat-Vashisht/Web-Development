require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1:27017/userDB")
  .then(() => {
    console.log("MongoDB connection established");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (!err) {
      const user = new User({
        username: req.body.username,
        password: hash,
      });
      user
        .save()
        .then(() => {
          res.render("secrets");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(err);
    }
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ username: username }).then((docs) => {
    if (docs === null) {
      console.log("No registered user with that email");
    } else {
      bcrypt.compare(password, docs.password, (err, result) => {
        if (!err) {
          if (result === true) {
            res.render("secrets");
          }
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
