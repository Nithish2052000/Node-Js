/*function callBack(fun){
  fun();
}
var sayBye=function(){
  console.log('Bye');
}

var time=0;
var timer=setInterval(function(){
time+=2;
console.log(`There has been ${time} seconds passed`);
if (time>5) {
callBack(sayBye);
clearInterval(timer);
}
}, 2000)
//modules
var stuff=require('./stuff');
console.log(stuff.counter(['apple', 'banana', 'oranges']));
console.log(stuff.adder(5,6));
console.log(stuff.adder(stuff.pi,6));

var events=require('events');
var myEmitter=new events.EventEmitter();
myEmitter.on('someEvent', function(msg){
  console.log(msg);
})
myEmitter.emit('someEvent', 'The someEvent was called');

var util=require('util');
var Person=function(name){
  this.name=name;
}
util.inherits(Person, events.EventEmitter);
var james=new Person('james');
var john=new Person('john');
var joseph=new Person('joseph');
var people=[james, john, joseph];
people.forEach(function(person){
person.on('speak', function(msg){
  console.log(person.name+' said : '+msg);
});
});
james.emit('speak', 'Hello dude');

//Asnchronous method is often used in order to make the process delay efficient asnyc>sync
var fs=require('fs');
//var readMe=fs.readFileSync('readMe.txt', 'utf8');
//console.log(readMe);
//fs.writeFileSync('writeMe.txt', readMe);
fs.readFile('readMe.txt', 'utf8', function(err, data){
  console.log(data);
  fs.writeFile('writeMe.txt', data);
});
//Creating a file directory
var fs=require('fs');
fs.unlinkSync('./stuff/writeMe.txt');
fs.rmdirSync('stuff');
fs.mkdir('stuff', function(){
fs.readFile('readMe.txt','utf8', function(err, data){
    fs.writeFile('./stuff/writeMe.txt', data, function(err, result){
    if(err)
    console.log('error');
    });
  })
})

var http=require('http');

var server=http.createServer(function(req, res){
  if(req.url=='/hello/dudes'){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Yay Hello Dudes');
}else{
  res.end('Wrong Server');
}
});
server.listen(3000, '127.0.0.1');
console.log("Hey, guys connected the server successfully");

var http=require('http');
var fs=require('fs');
var myReadStream=fs.createReadStream('C:/Users/Srinivasan/Documents/nodejs/readMe.txt','utf8');
var myWriteStream=fs.createWriteStream('C:/Users/Srinivasan/Documents/nodejs/readMe.txt');
myReadStream.on('data', function(chunk){
  console.log('new chunk received');
  myWriteStream.write(chunk);
});

var http=require('http');
var fs=require('fs');
var server=http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var myReadStream=fs.createReadStream(__dirname+'/readMe.txt','utf8');
  //var myWriteStream=fs.createWriteStream(__dirname+'/writeMe.txt');
  myReadStream.pipe(res);
});
server.listen(3000, '127.0.0.1');
console.log('Listening to the server');

var http=require('http');
var fs=require('fs');
var server=http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  var myReadStream=fs.createReadStream(__dirname+'/index.html','utf8');
  myReadStream.pipe(res);
})
server.listen(3000, '127.0.0.1');
console.log('Yo listen to the server');

var http=require('http');
var fs=require('fs');
var server=http.createServer(function(req, res){
  console.log(`Request was made on the server ${req.url} `);
  res.writeHead(200, {'Conent-Type':'applicaion/json'})
  var myObj={
    name:'John',
    job:'Entrepreneur',
    age:29
  };
  res.end(JSON.stringify(myObj));
})

server.listen(3000, '127.0.0.1');
console.log('Guys listening to the server ');

var http=require('http');
var fs=require('fs');
var server=http.createServer(function(req, res){
if(req.url==='/home'|| req.url==='/'){
  res.writeHead(200, {'Content-Type' : 'text/html'});
  var myReadStream=fs.createReadStream(__dirname + '/index.html');
  myReadStream.pipe(res);
}else if(req.url==='/contact'){
  res.writeHead(200, {'Content-Type' : 'text/html'});
  var myReadStream=fs.createReadStream(__dirname + '/contact.html');
  myReadStream.pipe(res);
}else if(req.url==='/api/myObj'){
  var myObj=[{name:'John',age:29},{name:'Joseph',age:30},{name:'james',age:31}];
  res.writeHead(200, {'Content-Type' : 'application/json'});
  res.end(JSON.stringify(myObj));
}else{
  res.writeHead(404, {'Content-Type':'text/html'});
  fs.createReadStream(__dirname+'/404.html').pipe(res);
}
});
server.listen(3000, '127.0.0.1');
console.log('Listening to the server');

var express=require('express');
var app =express();

app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});
app.get('/contact', function(req, res){
res.sendFile(__dirname + '/contact.html');
});
app.get('/404', function(req, res){
res.sendFile(__dirname + '/404.html');
});
//app.get('/profile/:id', function(req, res){
//  res.send('You requested to see the profile with the id :'+req.params.id)
//})
app.get('/profile/:name', function(req, res){
  res.send('You requested to see the profile with the name : '+req.params.name);
})
app.listen(3000);

var express=require('express');
var app=express();
app.set('view engine', 'ejs');
//app.use('/assets', function(req, res, next){
//  console.log(req.url);
//  next();
//})
app.get('/', function(req, res){
  res.render('index');
});
app.get('/contact', function(req, res){
  res.render('contact');
});
//app.get('/404', function(req, res){
//  res.sendFile(__dirname+'/404.html');
//});
app.get('/profile/:name', function(req, res){
  var data={ age:29, job:'Entrepreneur', hobbies:['walking', 'running', 'jogging']};
  res.render('profile',{person:req.params.name, data});
});
app.listen(3000);
*/
var express=require('express');
var bodyParser = require('body-parser');
var app=express();
var urlencodedParser=bodyParser.urlencoded({ extended: false })
app.set('view engine', 'ejs');
app.get('/', function(req, res){
  res.render('index');
});

app.get('/contact', function(req,res){
  console.log(req.query);
  res.render('contact',{qs:req.query});
//app.get('')
})
app.post('/contact',urlencodedParser, function(req, res){
  console.log(req.body);
  res.render('contact-success',{data:req.body});
})
app.listen(3000);
