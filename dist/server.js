var express = require("express");
var output = "./dist/img/image.png";
var app = express();
app.get("/", function (req, res) {
    console.log("entro");
    res.sendFile(__dirname + "/view/twittFeeds.html");
});
app.get("/img", function (req, res) {
    res.sendFile(__dirname + "/img/image.png");
});
app.listen(3000);
