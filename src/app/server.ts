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

function generateImage(){
  fs.createReadStream(__dirname + "/../public/assets/img/tweets.png").pipe(fs.createWriteStream(__dirname + "/../public/assets/img/tweets.cache.png"));
  var renderStream:any = webshot(config.URL, {screenSize: {width: 560, height: 700}, shotSize: {width: 650, height: "all"}});
  var file = fs.createWriteStream(__dirname + "/../public/assets/img/tweets.png", {encoding: "binary"});
  renderStream.on('data', function(data){
    file.write(data.toString("binary"), "binary");
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

setInterval(generateImage, 60000);
app.listen(process.env.PORT || 3000);
