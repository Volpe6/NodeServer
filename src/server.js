// --Terminal: yarn diadraw
const desenho  = require('./eventos/desenho.js')
const mensagem = require('./eventos/mensagem.js')
const usuario  = require('./eventos/usuario.js')

var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);
var os   = require('os');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/ips', function(req, res){
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
  res.send(addresses.map((sEl) => {
    return sEl + ' ';
  }));
});

// sempre que o socketio receber uma conexão vai realizar o broadcast dela
io.on('connection', function(socket){
  desenho(socket);
  mensagem(socket, io);
  usuario(socket);
});

// inicia o servidor na porta informada, no caso, porta 3000
http.listen(3000, function() {
  console.log('servidor rodando na porta 3000');
});