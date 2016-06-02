"use strict";
var fs = require("fs");
var express = require("express");
var twitter_1 = require("./config/twitter");
var webshot = require("webshot");
var output = "./dist/img/image.png";
var app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/view");
app.get("/", function (req, res) {
    feedTweets(function (tweets) {
        res.render("index", {
            tweets: tweets
        });
    });
});
function sendFile(req, res) {
    res.sendFile(__dirname + "/img/tweets.cache.png");
}
app.get("/img", sendFile);
function generateImage() {
    var renderStream = webshot("https://diserver.herokuapp.com", { screenSize: { width: 560, height: 700 }, shotSize: { width: 650, height: "all" } });
    var file = fs.createWriteStream(__dirname + "/img/tweets.cache.png", { encoding: "binary" });
    renderStream.on('data', function (data) {
        file.write(data.toString("binary"), "binary");
    });
}
function feedTweets(callback) {
    var tweets = twitter_1.client.get("search/tweets", { q: "#BuenMiercoles" }, function (error, tweets, response) {
        if (error)
            throw error;
        var tweetsArray = [];
        for (var i = 0; i < 5; i++) {
            tweetsArray[i] = tweets.statuses[i];
        }
        callback(tweetsArray);
    });
}
setInterval(generateImage, 3000);
app.listen(process.env.PORT || 3000);
