// Exporta os eventos de recebimento de mensagens.
const MENSAGEM_RECEBIMENTO = 'sMSG';
module.exports = function(socket, io){

    //quando o cliente emite 'sMSG', recebe e executa uma função
    socket.on(MENSAGEM_RECEBIMENTO, function(data) {
        //envia uma mensagem a todos os clientes conectados, inclusive o que envio a mensagem
        io.sockets.emit(MENSAGEM_RECEBIMENTO, {
          username: socket.username,
          msg     : data
        });
        //envia mensagem para todos que estão conectados, exceto o que envio a mensagem
        console.log('envio');
    });
}