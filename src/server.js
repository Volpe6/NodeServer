// yarn diadraw

var app = require('express')();
// passa o express para o http-server
var http = require('http').Server(app);
// passa o http-server par ao socketio
var io = require('socket.io')(http);
var os = require('os');

const sMensagem       = 'sMSG';
const sAddUser        = 'addUser';
const sUserDiconected = 'uDesconectado';
const sUserConected   = 'uConectado';
const sOPonto         = 'ponto_origem';
const sDPonto         = 'ponto_destino';
const sApagar         = 'apagar';

// cria uma rota para fornecer o arquivo index.html
app.get('/', function(req, res){
  var sRet = 'Servidor aberto em ';
  var interfaces = os.networkInterfaces();
  var addresses = [];
  for (var k in interfaces) {
      for (var k2 in interfaces[k]) {
          var address = interfaces[k][k2];
          if (address.family === 'IPv4' && !address.internal) {
              addresses.push(address.address);
          }
      }
  }
  sRet += (addresses.map((sEl) => {
    return sEl + ' ';
  }));
  res.send(sRet);
});

var iNumUsers = 0;

// sempre que o socketio receber uma conexão vai realizar o broadcast dela
io.on('connection', function(socket){
  var bConectado = false;

  //quando o cliente emite 'sMSG', recebe e executa uma função
  socket.on(sMensagem, function(data) {
      //envia uma mensagem a todos os clientes conectados, inclusive o que envio a mensagem
      io.sockets.emit(sMensagem, {
        username: socket.username,
        msg     : data
      });
      //envia mensagem para todos que estão conectados, exceto o que envio a mensagem
      console.log('envio');
  });
    
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
  socket.on(sAddUser, function(username, color) {
      if(bConectado) {
        return;
      }
      console.log('Conectado: ' + username + ' com a cor ' + color +  ' via IP: '+ socket.handshake.address);
      socket.username = username;
      socket.color    = color;
      bConectado      = true;
      iNumUsers++;

      console.log('numero de usuarios conectados ' + iNumUsers);

      socket.broadcast.emit(sUserConected, {
        username: socket.username,
        color:    cor
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
http.listen(3000);