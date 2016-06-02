/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./custom_types/twitter.d.ts" />
/// <reference path="./custom_types/webshot.d.ts" />

import * as http from "http";
import * as fs from "fs";
import express = require("express");
import {client} from "./config/twitter";
import webshot = require ("webshot");


var output = "./dist/img/image.png";
var app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/view");

app.get("/", function(req, res){
  // res.render('index2', {user: "gran usuario", title: "homepage"});
  feedTweets(function(tweets) {
    res.render("index", {
      tweets: tweets
    });
    // res.sendFile(__dirname + "/view/twittFeeds.html");
  });
});


function sendFile(req, res) {
  res.sendFile(__dirname + "/img/tweets.cache.png");
}
app.get("/img", sendFile);

function generateImage(){
  var renderStream:any = webshot("http://localhost:3000", {screenSize: {width: 560, height: 700}, shotSize: {width: 650, height: "all"}});
  var file = fs.createWriteStream(__dirname + "/img/tweets.cache.png", {encoding: "binary"});
  renderStream.on('data', function(data){
    file.write(data.toString("binary"), "binary");
  });
}

function feedTweets(callback){
  var tweets = client.get("search/tweets", {q: "#BuenMiercoles"}, function(error, tweets, response){
    if (error) throw error;
    var tweetsArray = [];
    for (let i = 0; i < 5; i++) {
      tweetsArray[i] = tweets.statuses[i];
    }
    callback(tweetsArray);
  });
}

setInterval(generateImage, 30000);
app.listen(process.env.PORT || 3000);
