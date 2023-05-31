const express = require("express");
const app = express();
const bodyParser = require("body-parser")
// Native node module to make get request to external servers
const https = require("https");
app.use(bodyParser.urlencoded({ extended: true }))
const port = 3000;


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const cityName = req.body.cityName
    const apiKey = "{Enter API KEY}"
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=" + units
    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const icon = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
            res.write("<h1> Temp in " + cityName + " is " + weatherData.main.temp + "</h1 > ");
            res.write("<p>Description: " + weatherData.weather[0].description + "</p>");
            res.write("<img src = " + icon + " >")
            res.send()
        })
    });
})

app.listen(port, function () {
    console.log("Server is running on port " + port)
})