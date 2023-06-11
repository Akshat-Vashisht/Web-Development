// CONNECTING TO MONGOOSE

const mongoose = require("mongoose");

main().catch((err) => console.log(err));

// Create a new fruitsDB database if not exists
// url + db name
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB");
}

// INSERTING DOCS

// Creating a new Schema
// You can add validators also by creating js objects of the keys, type will be the datatype and you can add other validators
const fruitSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

// Creating a new model out of the schema
const Fruit = mongoose.model("Fruit", fruitSchema);

// Creating new objects to insert into the schema
const fruit = new Fruit({
  name: "Apple",
  rating: 8,
  review: "It is an amazing fruit.",
});

// fruit.save();

// Challenge

const personSchema = mongoose.Schema({
  name: String,
  age: Number,
  // Embedding document (establishing relationship)
  favoriteFruit: fruitSchema,
});

const Person = mongoose.model("Person", personSchema);

// To save many at once

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 9,
  review: "It is a very good fruit.",
});

const banana = new Fruit({
  name: "Banana",
  rating: 5,
  review: "Not very good.",
});

// banana.save();

const person = new Person({
  name: "John",
  age: 37,
  favoriteFruit: kiwi,
});

// person.save();

// modelName.insertMany
// Fruit.insertMany([kiwi, banana]);

// Fruit.insertMany([kiwi, banana]).then(function () {
//   console.log("SUCCESS");
// });

// FINDING DOCS
// Model.find({query},{projection}).then(function(documents){
//     console.log(array of documents);
// })

// Fruit.find({}).then(function (arr) {
//   console.log(arr);
// });

// Challenge of accessing elements

// Fruit.find({}).then((arr) => {
//   arr.forEach((fruit) => {
//     console.log(fruit.name);
//   });
//   // To close the connection once task is done!
//   mongoose.connection.close();
// });

// UPDATING DOCS
// Fruit.updateOne({ _id: "64842fb85c3aea0e78f0ffaf" }, { rating: 5 }).then(
//   (result) => {
//     console.log(result);
//     mongoose.connection.close();
//   }
// );

// DELETING DOCS
// Fruit.deleteOne({ _id: "64842fb85c3aea0e78f0ffaf" })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
