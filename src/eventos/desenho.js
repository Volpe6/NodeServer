// Exporta os eventos de controle do desenho
const CRIA_PONTO_ORIGEM    = 'ponto_origem';
const CRIA_PONTO_DESTINO   = 'ponto_destino';
const CRIA_PONTO_MOVIMENTO = 'ponto_movimento'; 
const MUNDANCA_PINTURA     = 'mudanca_pintura';
const APAGA_PONTO          = 'apagar';
module.exports = function(socket, io){
    
    // Adiciona o evento de definir um ponto de origem.
    socket.on(CRIA_PONTO_ORIGEM, function(data) {
      console.log('Ponto origem: ' + data);
        socket.broadcast.emit(CRIA_PONTO_ORIGEM, {
            username : socket.username,
            ponto    : data
        });
        console.log('envio');
    });

    socket.on(CRIA_PONTO_MOVIMENTO, function(data) {
         console.log('Ponto movimento: ' + data);
        socket.broadcast.emit(CRIA_PONTO_MOVIMENTO, {
          username : socket.username,
          ponto    : data
        });
    });
    
    // Adiciona o evento de definir um ponto de destino.
    socket.on(CRIA_PONTO_DESTINO, function() {
      console.log('Ponto destino');
      socket.broadcast.emit(CRIA_PONTO_DESTINO, {
        username : socket.username,
      }); 
      console.log('envio');
    });
  
    socket.on(MUNDANCA_PINTURA, function(data) {
      console.log("Mundanca pintura " + data);
      // socket.broadcast.emit(MUNDANCA_PINTURA, {
      //   username : socket.username,
      //   tipo     : data
      // });

      io.sockets.emit(MUNDANCA_PINTURA, {
        username : socket.username,
        tipo     : data
      }) 
    });

    socket.on(APAGA_PONTO, function() {
      socket.broadcast.emit(APAGA_PONTO, {
        username : socket.username
      });
    });

}