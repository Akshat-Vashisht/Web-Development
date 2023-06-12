//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://akashat2003:ZP2yETg8WPqcUJzI@cluster0.bqcvmve.mongodb.net/todolistDB");
}

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your to-do list",
});
const item2 = new Item({
  name: "Click the + icon to add new item",
});
const item3 = new Item({
  name: "<-- Hit this to remove an item",
});

const defaultItems = [item1, item2, item3];

const ListSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema],
});

const List = mongoose.model("list", ListSchema);

app.get("/", function (req, res) {
  Item.find({})
    .then((arr) => {
      if (arr.length === 0) {
        Item.insertMany(defaultItems)
          .then(() => {
            console.log("Successfully saved into our DB.");
          })
          .catch((err) => {
            console.log(err);
          });
        res.redirect("/");
      } else {
        res.render("list", { listTitle: "Today", newListItems: arr });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/", function (req, res) {
  const item = new Item({
    name: req.body.newItem,
  });

  if (req.body.list === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: req.body.list }).then((arr) => {
      arr.items.push(item);
      arr.save();
      res.redirect("/" + req.body.list);
    });
  }
});

app.post("/delete", function (req, res) {
  const listName = req.body.listName;
  if (listName === "Today") {
    Item.findByIdAndRemove(req.body.checkbox)
      .then((deletedItem) => {
        console.log("Succesfully deleted " + deletedItem);
      })
      .catch((err) => {
        console.log(err);
      });
    res.redirect("/");
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: req.body.checkbox } } }
    )
      .then((doc) => {
        res.redirect("/" + listName);
        console.log(doc);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.get("/:listTitle", function (req, res) {
  const listTitle = _.capitalize(req.params.listTitle);
  List.findOne({ name: listTitle })
    .then((arr) => {
      if (!arr) {
        const list = new List({
          name: listTitle,
          items: defaultItems,
        });
        list.save();
        res.redirect("/" + listTitle);
      } else {
        res.render("list", { listTitle: arr.name, newListItems: arr.items });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
