
const ges = ["g00", "g01", "g02", "g03", "g10", "g11", "g12", "g13"];
// Os códigos de cores são as posições no array - em próxima versão pode vir a ser configurável
const pinos = ["blue", "red", "yellow", "green", "orange", "brown", "black", "cyan", "violet",
             "orange2", "indigo", "lettuce", "pink", "caramel", "grey", "white"];

const gridCont = document.querySelector('#grid0');  // elemento inicial definido no HTML

// const handlEventLinha = () => porPino();

// variaveis de cinfiguração e servidor
var chave = [4, 3, 2, 1, 0, -1, -1, -1];   // para teste e offline - a chave fica no servidor 

var numcores = 16;    // número de cores em jogo
var numfuros = 5;      // número de furos por linha
var numlinhas = 16;     // númerode linhas neste tabuleiro


var linhaJogo = -1;  // linha em que é possível colocar pinos >=0 and < maxLinhas
var maxLinhas = 16;  // valor a ser definido em 'numlinhas' na configuração de cada tipo de tabuleiro
var linhaCores = [-1, -1, -1, -1, -1, -1, -1, -1];  // previsão de tabuleiro com até 7 furos
var estadoJogo = 0;  // 0 - inicio; 1 - em jogada; 2 - em validação; 3 - terminado 
var corAtual = -1;  // -1 significa que não há cor escolhida


for (let g of ges) {   // para todas as grids
    let gridItem = document.createElement('div');     // cria um elemento 'div'
    gridItem.className = 'grid-item';                  // com a classe 'grid-item'
    gridItem.id = g;                                    // com o id da posição no array 'ges'
    // gridItem.innerHTML = "<img src='bola.png'>";  // teste
    gridCont.appendChild(gridItem);                     // incorpora na DOM o novo elemento
}


const grid10 = document.getElementById('g10');    // grid segunda linha, primeira coluna
let gridItem = document.createElement('div');   // 'div' para conter a coluna com número de linha
gridItem.className = 'numlinha';
gridItem.id = 'enele';
grid10.appendChild(gridItem);

const gridnl = document.querySelector('#enele');

for (let i = 1; i < 17; i++) {     // grid com os números de linha (o número é sempre mais 1 que o efetivo)
    let gridItem = document.createElement('div');
    gridItem.className = 'numlinhas';
    /*gridItem.id = g;*/
    gridItem.innerHTML = i;
    gridnl.appendChild(gridItem);
}

const grid11 = document.getElementById('g11');   // grid segunda linha, segunda coluna
gridItem = document.createElement('div'); // div para conter a coluna com as jogadas
gridItem.className = 'jogadas';
gridItem.id = 'jogadas';
grid11.appendChild(gridItem);

const gridjogo = document.querySelector('#jogadas'); // grid com numfuros x numlinhas

for (let i = 0; i < numlinhas * numfuros; i++) {
    //let gridItem = document.createElement('div');
    //gridItem.className = 'subitem';
    //gridItem.id = "h"+i.toString();
    // gridItem.innerHTML = "<img src='furo.png'>";
    //gridjogo.appendChild(gridItem);
    let imgItem = document.createElement('img');
    imgItem.className = 'subitem';
    imgItem.id = "i"+i.toString();
    imgItem.src = 'furo.png';
    gridjogo.appendChild(imgItem);
}

const grid12 = document.getElementById('g12');  // grid segunda linha, terceira coluna, marcações de acertos
gridItem = document.createElement('div');
gridItem.className = 'pontos';
gridItem.id = 'pontos';
grid12.appendChild(gridItem);

const gridpontos = document.querySelector('#pontos');

for (let i = 0; i < numlinhas * numfuros; i++) {
    let gridItem = document.createElement('img');
    gridItem.className = 'subitem';
    gridItem.id = "p"+i.toString();
    //gridItem.innerHTML = "<img src='beigestick2.png'>";
    gridItem.src = 'beigestick2.png';
    gridpontos.appendChild(gridItem);
}

const grid13 = document.getElementById('g13');  // grid segunda linha, quarta coluna, palete de pinos
gridItem = document.createElement('div');
gridItem.className = 'palete';
gridItem.id = 'palete';
grid13.appendChild(gridItem);

const gridcores = document.querySelector('#palete');

for (let i = 0; i < numcores; i++) {
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
    if (estadoJogo == 0 || estadoJogo == 2) {
        estadoJogo = 1;
        linhaJogo++;
        console.log("abrir linha");
        abrirLinha();
    }
}


function abrirLinha() {
    let ini = (linhaJogo) * 5;
    let fini = (linhaJogo) * 5 + 5;
    for (let i = ini; i < fini; i++ ) {
        let aidi = "#i"+i.toString();
        let furo = document.querySelector(aidi);
        furo.src = 'furo25.png';
        // var fn = function () {porPino(i)};
        // furo.addEventListener("click", handlEventLinha, false);
        furo.myParam = i;
        furo.addEventListener("click", porPino, false);
    }
}

function fecharLinha() {
    let ini = (linhaJogo) * 5;
    let fini = (linhaJogo) * 5 + 5;
    for (let i = ini; i < fini; i++ ) {
        let aidi = "#i"+i.toString();
        let furo = document.querySelector(aidi);
        furo.removeEventListener("click", porPino);
    }
}

// coloca pino da cor escolhida no furo escolhido
function porPino(evt) {
    ativaJogar();
    console.log(evt.currentTarget.myParam);
    let pino = evt.currentTarget.myParam;
    let coluna = pino % numfuros;
    let aidi = "#i"+pino.toString();
    let furo = document.querySelector(aidi);
    furo.src = 'img55/'+pinos[corAtual]+'.png';
    linhaCores[coluna] = corAtual;
    // console.log(linhaCores);
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
    calcula();
    estadoJogo = 2;
}

function calcula() {
    let mpretos = pinCertos();
    let mbrancos = corCertas() - mpretos;
    console.log("certos "+mpretos);
    console.log("cores "+mbrancos);
    let i = 0;
    for (let p = 0; p < mpretos; p++) {

        let x = linhaJogo*5+i;
        let aidi = "#p"+x.toString();
        console.log("pretos "+aidi)
        document.querySelector(aidi).src = 'blackstick2.png';
        i++;
    }
    for (let p = 0; p < mbrancos; p++) {
        let x = linhaJogo*5+i;
        let aidi = "#p"+x.toString();
        console.log("pretos "+aidi)
        document.querySelector(aidi).src = 'whitestick2.png';
        i++;
    }
    for (; i < numfuros; i++) {
        let x = linhaJogo*5+i;
        let aidi = "#p"+x.toString();
        console.log("pretos "+aidi)
        document.querySelector(aidi).src = 'blackstick1.png';
    } 
}

function pinCertos() {
    let tot = 0;
    for(let i = 0; i < numfuros; i++) {
        if (linhaCores[i] === chave[i]) tot++;
    }
    return tot;
}

function corCertas() {
    let tot = 0;
    for(let i = 0; i < numfuros; i++) {
        for(let j = 0; j < numfuros; j++) {
            if (linhaCores[j] === chave[i]) tot++;
        }
    }
    return tot;
}

