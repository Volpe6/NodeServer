var app = require('express')();
// passa o express para o http-server
var http = require('http').Server(app);
// passa o http-server par ao socketio
var io = require('socket.io')(http);


const sEnderecoIp = '192.168.2.5';

const sMensagem       = 'sMSG';
const sAddUser        = 'addUser';
const sUserDiconected = 'uDesconectado';
const sUserConected   = 'uConectado';
const sOPonto         = 'ponto_origem';
const sDPonto         = 'ponto_destino';
const sApagar         = 'apagar';

// cria uma rota para fornecer o arquivo index.html
app.get('/', function(req, res){
  res.send('Andrew');
});

var iNumUsers = 0;

// sempre que o socketio receber uma conexão vai realizar o broadcast dela
io.on('connection', function(socket){
  var bConectado = false;
  console.log('conectado');

  //quando o cliente emite 'sMSG', recebe e executa uma função
  socket.on(sMensagem, function(data) {

      //envia uma mensagem a todos os clientes conectados, inclusive o que envio a mensagem
      io.sockets.emit(sMensagem, {
        username: socket.username,
        msg     : data
      });
      //envia mensagem para todos que estão conectados, exceto o que envio a mensagem
      /*socket.emit('sMSG', {
        username: socket.username,
        msg     : data
      });*/
      console.log('envio');
  });



  //quando o cliente emite 'sMSG', recebe e executa uma função
  //socket.on('pontos', function(arg) {

    //console.log(arg);
      //envia uma mensagem a todos os clientes conectados, inclusive o que envio a mensagem
      //io.sockets.emit('pontos', {
       // username : socket.username,
     //   caminho  : arg
     // });
      //envia mensagem para todos que estão conectados, exceto o que envio a mensagem
      /*socket.emit('sMSG', {
        username: socket.username,
        msg     : data
      });*/
   //   console.log('envio');
 // });
    
  socket.on(sOPonto, function(data) {
    console.log(data);
    socket.broadcast.emit(sOPonto, {
      username : socket.username,
      ponto    : data
    });
    console.log('envio');
  });

  socket.on(sDPonto, function(data) {
    console.log(data);
    socket.broadcast.emit(sDPonto, {
      username : socket.username,
      ponto    : data
    }); 
    console.log('envio');
  });

  socket.on(sApagar, function() {
    socket.broadcast.emit(sApagar, {
      username : socket.username
    });
  });

  //recebe o evento de adicionar um usuario
  socket.on(sAddUser, function(username) {
      if(bConectado) {
        return;
      }
      console.log(username);
      socket.username = username;
      bConectado      = true;
      iNumUsers++;

      console.log('numero de usuarios conectados ' + iNumUsers);

      socket.broadcast.emit(sUserConected, {
        username: socket.username
      });
  }); 

  //recebe um evento que é disparado quando um usuario desconecta
  socket.on('disconnect', function() {
    if(bConectado) {
        iNumUsers--;

        socket.broadcast.emit(sUserDiconected, {
          username: socket.username
        });
        console.log('numero de usuarios conectados ' + iNumUsers);
    }
  });

});

// inicia o servidor na porta informada, no caso, porta 3000
http.listen(3000, sEnderecoIp, function() {
  console.log(`Servidor rodando em: http://${sEnderecoIp}:3000`);
});
