const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// __dirname gives the current directory location
// So when the webserver is hosted on an actual server and we might not know the exact location of the file, this helps
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});


app.post("/", function (req, res) {
    var num1 = Number(req.body.num1)
    var num2 = Number(req.body.num2)
    var addition = num1 + num2
    res.send("The result of the very difficult calculation is " + addition)
});

app.get("/bmicalculator", function (req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function (req, res) {
    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);
    var bmi = weight / (height ** 2);
    res.send("Your bmi is " + bmi)
});





app.listen(3000, function () {
    console.log("Server has started at port 3000")
});