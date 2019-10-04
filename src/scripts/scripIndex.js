import io from 'socket.io-client';

const CRIA_PONTO_ORIGEM  = 'ponto_origem';
const CRIA_PONTO_DESTINO = 'ponto_destino';
const APAGA_PONTO        = 'apagar';


const dvMain     = document.getElementById("div-main");
const cvCanvas   = document.createElement("canvas");
const ctContexto = cvCanvas.getContext("2d");
const iCorrecao  = cvCanvas.getBoundingClientRect(); 

const oSocket = io.connect("http://localhost:3000");

let bMovendo = false;

cvCanvas.id = "canvas";
dvMain.appendChild(cvCanvas);

function moverPara(x, y) {
    ctContexto.moveTo(x, y);
}

function linhaPara(x, y) {
    ctContexto.lineTo(x, y);
}

function mousePressionado(e) {
    bMovendo = true;
    moverPara(e.clientx, e.clientY);
}

function mouseSolto() {
    bMovendo = false;
}

function mouseMovendo() {
    if(bMovendo) {
        linhaPara(e.clientX - iCorrecao.left, e.clientY - iCorrecao.top);
    }
}

oSocket.emit(EVENTO_ADD_USER, "AndrewAdm", -16776961);

oSocket.on(CRIA_PONTO_ORIGEM, function(username, ponto) {
    moverPara(ponto.x, ponto.y);
});

oSocket.on(CRIA_PONTO_DESTINO, function(username, ponto) {
    linhaPara(ponto.x, ponto.y);
});


cvCanvas.addEventListener("mousedown", mousePressionado);
cvCanvas.addEventListener("mousemove", mouseMovendo);
window.addEventListener("mouseup"  , mouseSolto);