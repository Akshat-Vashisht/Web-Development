const express = require("express")
const app = express()

// Req = request 
// Res = response
app.get("/", function (req, res) {
    console.log(req);
    res.send("<h1>Hello World</h1>");
})

app.get("/about", function (req, res) {
    res.send("<h1>Akshat Vashisht is the name</h1>");
})

app.listen(3000, function () {
    console.log("Server started\nPort: 3000")
});