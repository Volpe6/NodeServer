// Exporta os eventos de controle do desenho
const CRIA_PONTO_ORIGEM  = 'ponto_origem';
const CRIA_PONTO_DESTINO = 'ponto_destino';
const APAGA_PONTO        = 'apagar';
module.exports = function(socket){
    
    // Adiciona o evento de definir um ponto de origem.
    socket.on(CRIA_PONTO_ORIGEM, function(data) {
        console.log(data);
        socket.broadcast.emit(CRIA_PONTO_ORIGEM, {
            username : socket.username,
            ponto    : data
        });
        console.log('envio');
    });
    
    // Adiciona o evento de definir um ponto de destino.
    socket.on(CRIA_PONTO_DESTINO, function(data) {
      console.log(data);
      socket.broadcast.emit(CRIA_PONTO_DESTINO, {
        username : socket.username,
        ponto    : data
      }); 
      console.log('envio');
    });
  
    socket.on(APAGA_PONTO, function() {
      socket.broadcast.emit(APAGA_PONTO, {
        username : socket.username
      });
    });

}