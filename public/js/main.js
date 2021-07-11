let socket = io.connect();
socket.on('message', function(data){
  console.log(data);
  render(data);
});

function render(data){
  var html=data.map(function(elem,index){
    return(`<div>
      <strong>${elem.author}<span style="color:blue">
        <em>${elem.email}</em></span></strong>
        <span style="color:brown"><em>${elem.datetime}</em></span>
      <span style="color:green"><i><em>${elem.text}</em></i></span> </div>`)
  }).join(" ");
  document.getElementById('messages').innerHTML=html;
}
socket.on('messages',function(data){ render(data); });

function addMessage(e){
    var mensaje={
      author: document.getElementById('username').value,
      email: document.getElementById('email').value,
      text: document.getElementById('texto').value,
      datetime: (new Date(Date.now())).toLocaleString()
    };
    console.log(mensaje);
    socket.emit('new-message',mensaje);
    return false;
}
