// Exporta os eventos de adicionar/remover um usuário.
const EVENTO_ADD_USER                = 'addUser';
const BROADCAST_USUARIO_CONECTADO    = 'uConectado';
const BROADCAST_USUARIO_DESCONECTADO = 'uDesconectado';
module.exports = function(socket) {
    var bConectado = false;
    var iNumUsers = 0;

    // Adiciona o evento de criar um usuário.
    socket.on(EVENTO_ADD_USER, function(username, color) {
        if(bConectado) {
          return;
        }
        console.log('Conectado: ' + username + ' com a cor ' + color +  ' via IP: '+ socket.handshake.address);
        socket.username = username;
        socket.color    = color;
        bConectado      = true;
        iNumUsers++;
  
        console.log('numero de usuarios conectados ' + iNumUsers);
  
        socket.broadcast.emit(BROADCAST_USUARIO_CONECTADO, {
          username: socket.username,
          color:    color
        });
    });

    //recebe um evento que é disparado quando um usuario desconecta
    socket.on('disconnect', function() {
      if(bConectado) {
          iNumUsers--;
  
          socket.broadcast.emit(BROADCAST_USUARIO_DESCONECTADO, {
            username: socket.username
          });
          console.log('numero de usuarios conectados ' + iNumUsers);
      }
    });

}