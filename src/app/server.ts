/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../custom_types/twitter.d.ts" />
/// <reference path="../custom_types/webshot.d.ts" />

import * as http from "http";
import * as fs from "fs";
import express = require("express");
import {client} from "../config/twitter";
import webshot = require ("webshot");
import * as config from "../config/config";

var app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/../public/views");
app.use("/static", express.static(__dirname + "/../public"));

app.get("/", function(req, res){
  feedTweets(function(tweets) {
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

  var result = webshot(config.URL, __dirname + "/../public/assets/img/tweets.png", function(err) {
    if (err) throw err;
    fs.createReadStream(__dirname + "/../public/assets/img/tweets.png", "binary").pipe(
      fs.createWriteStream(__dirname + "/../public/assets/img/tweets.cache.png", 'binary')
    );
  });
}

function feedTweets(callback){
  var tweets = client.get("search/tweets", {q: "#BuenJueves"}, function(error, tweets, response){
    if (error) throw error;
    else {
    var tweetsArray = [];
    for (let i = 0; i < 5; i++) {
      tweetsArray[i] = tweets.statuses[i];
    }
    callback(tweetsArray);}
  });
}

setInterval(generateImage, config.TWITTER_LOOP);
app.listen(process.env.PORT || 3000);
