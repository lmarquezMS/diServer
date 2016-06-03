var fs = require("fs");
var express = require("express");
var twitter_1 = require("../config/twitter");
var webshot = require("webshot");
var config = require("../config/config");
var app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/../public/views");
app.use("/static", express.static(__dirname + "/../public"));
app.get("/", function (req, res) {
    feedTweets(function (tweets) {
        res.render("index", {
            tweets: tweets
        });
    });
});
function sendFile(req, res) {
    res.sendFile(__dirname + "/../public/assets/img/tweets.cache.png");
}
app.get("/img", sendFile);
function generateImage() {
    console.log(config.URL);
    var result = webshot(config.URL, __dirname + "/../public/assets/img/tweets.png", function (err) {
        if (err)
            throw err;
        fs.createReadStream(__dirname + "/../public/assets/img/tweets.png", "binary").pipe(fs.createWriteStream(__dirname + "/../public/assets/img/tweets.cache.png", 'binary'));
    });
}
function feedTweets(callback) {
    var tweets = twitter_1.client.get("search/tweets", { q: "#BuenJueves" }, function (error, tweets, response) {
        if (error)
            throw error;
        else {
            var tweetsArray = [];
            for (var i = 0; i < 5; i++) {
                tweetsArray[i] = tweets.statuses[i];
            }
            callback(tweetsArray);
        }
    });
}
setInterval(generateImage, 30000);
app.listen(process.env.PORT || 3000);
