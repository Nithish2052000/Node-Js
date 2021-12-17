var express=require('express');
var app=express();
var todoController=require('./controller/todoController.js')
//Template engine
app.set('view engine', 'ejs');
//uploading the static files
app.use(express.static('./public'));
//fire Controllers
todoController(app);
//Starting the server
app.listen(3000);
