var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require("body-parser"); //URL解析库
var pools = require("./server/utils/pool"); //工具类
var tools = require("./server/utils/tools");
var userRoutes = require("./server/controller/userController");
var myindentRoutes = require("./server/controller/myindentRoutesController");
var MessageXSend = require('./server/sms/messageXSend.js');
var urlParser = bodyParser.urlencoded({ extended: false });
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/pages/myindent.html");
})

//用户路由
userRoutes(app, urlParser, tools,pools);
//提交
myindentRoutes(app, urlParser, tools,pools);
app.listen(9100);
console.log("server start in 9100");


//短信验证码
app.post("/sms",urlParser,function(req,res){
//	console.log("sms...."+req.body.account);
    var random=Math.floor(Math.random()*899999)+100000;
    var messageXSend = new MessageXSend();
    messageXSend.add_to(req.body.account);
    phone=req.body.account;
    messageXSend.set_project('OyIeK4');
    messageXSend.add_var('code',random);
    messageXSend.add_var("time","5分钟");
    messageXSend.xsend();
    res.send(random+"");
});

