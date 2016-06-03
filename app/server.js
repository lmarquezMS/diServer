var fs = require("fs");
var express = require("express");
var twitter_1 = require("../config/twitter");
var webshot = require("webshot");
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
    fs.createReadStream(__dirname + "/../public/assets/img/tweets.png").pipe(fs.createWriteStream(__dirname + "/../public/assets/img/tweets.cache.png"));
    var renderStream = webshot("http://localhost:3000", { screenSize: { width: 560, height: 700 }, shotSize: { width: 650, height: "all" } });
    var file = fs.createWriteStream(__dirname + "/../public/assets/img/tweets.png", { encoding: "binary" });
    renderStream.on('data', function (data) {
        file.write(data.toString("binary"), "binary");
    });
}
function feedTweets(callback) {
    var tweets = twitter_1.client.get("search/tweets", { q: "#Buenviernes" }, function (error, tweets, response) {
        if (error) throw error;
        else{
          console.log(tweets);
        var tweetsArray = [];
        for (var i = 0; i < 5; i++) {
            tweetsArray[i] = tweets.statuses[i];
        }
        callback(tweetsArray);}
    });
}
setInterval(generateImage, 600000);
app.listen(process.env.PORT || 3000);
