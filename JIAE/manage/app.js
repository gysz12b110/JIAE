var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require("body-parser"); //URL解析库
var pools = require("./server/utils/pool"); //工具类
var tools = require("./server/utils/tools");
var userRoutes = require("./server/controller/userController");
var roleRoutes = require("./server/controller/roleController");
var MessageXSend = require('./server/sms/messageXSend.js');

var urlParser = bodyParser.urlencoded({ extended: false });
app.use(express.static(__dirname + "/admin"));

//console.log(__dirname);//F:\githubjiae\jiae\JIAE\manage

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/admin/index.html");
})

//用户路由
userRoutes(app, urlParser, tools,pools);

//角色管理
roleRoutes(app, urlParser, tools,pools);

app.listen(9000);
console.log("server start in 9000");

