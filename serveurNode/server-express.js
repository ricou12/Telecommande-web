var express = require("express");
var app = express();

/* route / (index) */
app.get("/", function (req, res) {
    res.sendFile(__dirname + 'public_html/index.html')
});

/* route / status */
app.get("/status", function (req, res) {
    res.send("ok");
});

const port = 8080;
app.listen(port, function () {
    console.log("Express Node.js server running on port 8080.");
});
