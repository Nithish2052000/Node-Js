var socket=io.connect('http://127.0.0.1:4000/');
var message=document.getElementById('message');
var handle=document.getElementById('handle');
var btn=document.getElementById('send');
var output=document.getElementById('output');
btn.addEventListener('click',function(){
  socket.emit('chat', {
    message:message.value,
    handle:handle.value
  });
});
message.addEventListener('keypress', function(){
  socket.emit('typing', handle.value);
});

socket.on('chat', function(data){
  feedback.innerHTML="";
  output.innerHTML+='<p><strong>'+data.handle+':</strong>'+data.message+'</p>';
  console.log(data);
});
//ZAID SABIH
socket.on('typing', function(data){
  feedback.innerHTML='<p><em>'+data+' is typing....</em></p>';
})
