const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();

let items = [];
let workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
// Serving static files
app.use(express.static("public"));

app.get("/", function (req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let day = today.toLocaleDateString("en-IN", options);
  res.render("list", { listTitle: day, items: items, route: "/" });
});

app.post("/", function (req, res) {
  let newItem = req.body.newItem;
  items.push(newItem);
  res.redirect("/");
});

app.get("/work", function (req, res) {
  res.render("list", {
    listTitle: "Work list",
    items: workItems,
    route: "/work",
  });
});

app.post("/work", function (req, res) {
  let newItem = req.body.newItem;
  workItems.push(newItem);
  res.redirect("/work");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(port, function () {
  console.log("The server is up and running at port " + port);
});
