const express = require("express");
const app = express();
const path = require("path");

const server_port =  process.env.PORT || 5000;
const server_host = '0.0.0.0';

app.use(express.static(path.join(__dirname, "/build")));

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(server_port, server_host, (_)=>console.log("`React app is listening `"));