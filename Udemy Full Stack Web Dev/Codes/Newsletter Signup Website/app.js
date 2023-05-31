// Modules
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

// Server settings
const port = 3000;
const app = express();
// To serve up static files (css, images, logos, etc), inside bracket is the name of the folder 
app.use(express.static("static"))
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    console.log(firstName, lastName, email)

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data)
    const url = "https://us17.api.mailchimp.com/3.0/lists/"
    const options = {
        method: "POST",
        auth: "Akshat:"
    }
    const request = https.request(url, options, function (response) {
        response.on("data", function (data) {
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData)
    request.end()
});

app.listen(port, function () {
    console.log("Server started on port " + port + " successfully. ");
});

