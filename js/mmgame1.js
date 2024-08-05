
const ges = ["g00", "g01", "g02", "g03", "g10", "g11", "g12", "g13"];
const pinos = ["blue", "red", "yellow", "green", "orange", "brown", "black", "cyan", "violet",
             "orange2", "indigo", "lettuce", "pink", "caramel", "grey", "white"];

const gridCont = document.querySelector('#grid0');


var linhaJogo = 0;  // linha em que é possível colocar pinos >=1 and <=maxLinhas
var maxLinhas = 16;  // valor a ser definido na configuração de cada tipo de tabuleiro
var linhaCores = ["", "", "", "", "", "", "", ""];  // previsão de tabuleiro com 7 furos
var estadoJogo = 0;  // 0 - inicio; 1 - em jogada; 2 - em validação; 3 - terminado 
var corAtual = -1;


for (let g of ges) {
    let gridItem = document.createElement('div');
    gridItem.className = 'grid-item';
    gridItem.id = g;
    // gridItem.innerHTML = "<img src='bola.png'>";
    gridCont.appendChild(gridItem);
}


const grid10 = document.getElementById('g10');
let gridItem = document.createElement('div');
gridItem.className = 'numlinha';
gridItem.id = 'enele';
grid10.appendChild(gridItem);

const gridnl = document.querySelector('#enele');

for (let i = 1; i < 17; i++) {
    let gridItem = document.createElement('div');
    gridItem.className = 'numlinhas';
    /*gridItem.id = g;*/
    gridItem.innerHTML = i;
    gridnl.appendChild(gridItem);
}

const grid11 = document.getElementById('g11');
gridItem = document.createElement('div');
gridItem.className = 'jogadas';
gridItem.id = 'jogadas';
grid11.appendChild(gridItem);

const gridjogo = document.querySelector('#jogadas');

for (let i = 1; i < 81; i++) {
    let gridItem = document.createElement('div');
    gridItem.className = 'subitem';
    gridItem.id = "h"+i.toString();
    // gridItem.innerHTML = "<img src='furo.png'>";
    gridjogo.appendChild(gridItem);
    let imgItem = document.createElement('img');
    imgItem.className = 'img';
    imgItem.id = "i"+i.toString();
    imgItem.src = 'furo.png';
    gridItem.appendChild(imgItem);
}

const grid12 = document.getElementById('g12');
gridItem = document.createElement('div');
gridItem.className = 'pontos';
gridItem.id = 'pontos';
grid12.appendChild(gridItem);

const gridpontos = document.querySelector('#pontos');

for (let i = 1; i < 81; i++) {
    let gridItem = document.createElement('div');
    gridItem.className = 'pontuacao';
    gridItem.id = "p"+i.toString();
    gridItem.innerHTML = "<img src='beigestick2.png'>";
    gridpontos.appendChild(gridItem);
}

const grid13 = document.getElementById('g13');
gridItem = document.createElement('div');
gridItem.className = 'palete';
gridItem.id = 'palete';
grid13.appendChild(gridItem);

const gridcores = document.querySelector('#palete');

for (let i = 0; i < 16; i++) {
    let gridItem = document.createElement('div');
    gridItem.className = 'subitem';
    gridItem.id = "cor"+i.toString();
    let auxid = "pin"+i.toString();
    gridItem.innerHTML = "<button class='button' id =" + auxid + "><img src='img55/" + pinos[i] + ".png'></button>";
    gridcores.appendChild(gridItem);
    // auxid = "#"+auxid;
    document.querySelector("#"+auxid).addEventListener("click", function() { escolheCor(i) });
    // document.querySelector("#"+auxid).addEventListener("click", escolheCor(i),true);

}

// Escolhe cor do pino que vai ser colocado, na sequência do click na 'palete'
function escolheCor(cor) {
    // alert("Botão clicado "+pinos[cor]);
    corAtual = cor;
    if (estadoJogo == 0 || estadoJogo == 3) {
        estadoJogo = 1;
        linhaJogo++;
        abrirLinha();
    }
}


function abrirLinha() {
    let ini = (linhaJogo-1) * 5 + 1;
    let fini = (linhaJogo-1) * 5 + 6;
    for (let i = ini; i < fini; i++ ) {
        let aidi = "#i"+i.toString();
        let furo = document.querySelector(aidi);
        furo.src = 'furo25.png';
        furo.addEventListener("click", () => { porPino(i)});
        // furo.addEventListener("click", porPino(), true);
    }
}

function fecharLinha() {
    alert("fechar linha");
    let ini = (linhaJogo-1) * 5 + 1;
    let fini = (linhaJogo-1) * 5 + 6;
    for (let i = ini; i < fini; i++ ) {
        let aidi = "#i"+i.toString();
        // console.log(aidi);
        let furo = document.querySelector(aidi);
        // furo.innerHTML = "<img src='furo25.png'>";
        furo.removeEventListener("click", () => { porPino(i)});
        // document.querySelector("#i"+i.toString()).removeEventListener("click", function() { porPino(i)});
        // furo.removeEventListener("click", porPino(), true);
    }
}

// coloca pino da cor escolhida no furo escolhido
function porPino(pino) {
    ativaJogar();
    let aidi = "#i"+pino.toString();
    // alert("aidi "+ aidi);
    let furo = document.querySelector(aidi);
    //let laidi = document.querySelector("#i"+pino.toString());
    furo.src = 'img55/'+pinos[corAtual]+'.png';
    //document.querySelector("#i"+pino.toString()).addEventListener("click", function() { porPino(pino)});
}

// ativa botão jogar 
// a chamar quando uma jogada estiver preenchida
// ou validar esse preenchimento na função enviar()
function ativaJogar() {
    let verifica = document.querySelector('#g02');
    verifica.innerHTML = "Jogar";
    verifica.addEventListener("click", enviar);
}

function desativaJogar() {
    let verifica = document.querySelector('#g02');
    verifica.innerHTML = "Calcular";
    verifica.removeEventListener("click", enviar);
}


// envia linha escolhida para ser validada 
// na versão final fará o envio para o servidor
function enviar() {
    fecharLinha();
    desativaJogar();
}


