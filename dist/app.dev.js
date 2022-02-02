"use strict";

var express = require("express");

var app = express();

var path = require("path");

var server_port = process.env.YOUR_PORT || process.env.PORT || 8080;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
app.use(express["static"](path.join(__dirname, "/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});
app.listen(server_port, server_host, function (_) {
  return console.log("`React app is listening `");
});