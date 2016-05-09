/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./custom_types/node-render.d.ts" />
/// <reference path="./custom_types/twitter.d.ts" />
/// <reference path="./custom_types/html2png.d.ts" />

import * as http from "http";
import * as fs from "fs";
import express = require("express");
import nRender = require("node-render");
import {client} from "./config/twitter";
var output = "./dist/img/image.png";

var app = express();

app.get("/", function(req, res){
  console.log("entro");
  res.sendFile(__dirname + "/view/twittFeeds.html");
});

app.get("/img", function(req, res){
  res.sendFile(__dirname + "/img/image.png");
});

app.listen(3000);

//
//
// function refreshImage(input) {
//     // console.log(client);
//     // var twitts = client.get("search/tweets", {q: "#viernes"}, function(error, tweets, responses){
//     //   console.log(tweets);
//     // });
//     // console.log(input);
//     // nRender.render(input , output, {
//     //   paperSize: {orientation: 'portrait', format: 'A4'},
//     //   viewportSize: {width: 800, height: 900, margin: '0px'},
//     //   onConsoleMessage: undefined,
//     //   quality: 100,
//     //   format: 'png', // if you are using renderToBuffer this is PNG
//     //   root: '/'
//     // });
//     // var screenshot = html2png({
//     //   width: 1280, height: 720, browser: 'phantomjs'
//     // });
//     //
//     // html22png.renderUrl("http://www.facebook.com", function(err, data){
//     //
//     //
//     //   console.log(data);
//     // })
// }
//
// function sendFile(req: http.ServerRequest, res:http.ServerResponse) {
//     var headers:string= req.headers.accept;
//     var regExp =  /html/;
//     console.log(headers);
// if (headers.match(/css/)) {
//       fs.readFile("./dist/view/styles.css", function(err, data){
//         res.writeHead(200, {"Content-Type": "text/css"});
//         res.end(data);
//       });
//     }
//     else{
//       fs.readFile("./dist/view/twittFeeds.html", function(err, data){
//         if (err)
//           throw err;
//         res.writeHead(200, {"Content-Type": "text/html"});
//         res.end(data);
//       });
//     }
// }
//
// setInterval(refreshImage, 1000, customHTML());
//
// function customHTML(){
//   	var html = 	'<ul style="width: \"600px\"; background-color: \"#00FF00\";"><li>hola</li></ul>';
//
//
//   return html;
// }
//
// var server = http.createServer(sendFile);
// var port = process.env.port || 1337;
// server.listen(port);
// console.log("Running server at localhost:" + port);
