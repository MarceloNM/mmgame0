/* Alterações
    Sinais de cor certa na posição certa a Verde
    sinais de cor certa na posição errada a Amarelo
    sinais de cor errada a Vermelho
    modificar as cores dos 'furos' 

    
    botão de início de jogo
    botão de abandonar jogo
    botão de reinício de 
    

*/


const ges = ["g00", "g01", "g02", "g03", "g10", "g11", "g12", "g13"];
// Os códigos de cores são as posições no array - em próxima versão pode vir a ser configurável
const pinos = ["blue", "red", "yellow", "green", "orange", "brown", "black", "cyan", "violet",
             "orange2", "indigo", "lettuce", "pink", "caramel", "grey", "white"];
const gridTemp = ["1fr 3fr 2fr 1fr", "1fr 4fr 2fr 1fr", "1fr 5fr 2fr 1fr", "1fr 6fr 2fr 1fr", "1fr 7fr 2fr 1fr"]

const gridCont = document.querySelector('#grid0');  // elemento inicial definido no HTML

// const handlEventLinha = () => porPino();

// variaveis de cinfiguração e servidor
var chave = [7, 6, 5, 4, 3, 2, 1, 0];   // para teste e offline - a chave fica no servidor 

var numcores = 16;    // número de cores em jogo  16
var numfuros = 5;      // número de furos por linha
var numlinhas = 16;     // número de linhas neste tabuleiro  16
var haRepCor = false;   // por omissão não há repetição de cores na chave


var linhaJogo = -1;  // linha em que é possível colocar pinos >=0 and < maxLinhas
var maxLinhas = 16;  // valor a ser definido em 'numlinhas' na configuração de cada tipo de tabuleiro
var linhaCores = [-1, -1, -1, -1, -1, -1, -1, -1];  // previsão de tabuleiro com até 7 furos
var estadoJogo = 0;  // 0 - inicio; 1 - em jogada; 2 - em validação; 3 - terminado 
var corAtual = -1;  // -1 significa que não há cor escolhida

// parâmetros para formatação da grid principal
var hh1 = 69 * numlinhas;
var hh2 = "80px " + hh1.toString() + "px";
gridCont.style.gridTemplateRows = hh2;

// criar os quatro cabeçalhos da grid 
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


const gridnl = document.querySelector('#enele');  // div para grid de números de linha

// grid com os números de linha (o número é sempre mais 1 que o efetivo)
for (let i = 1; i <= numlinhas; i++) {     
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
gridItem.style.gridTemplateColumns = repetir(numfuros);
grid11.appendChild(gridItem);

const gridjogo = document.querySelector('#jogadas'); // grid com numfuros x numlinhas

// grid com a zona de colocação de pinos
for (let i = 0; i < numlinhas * numfuros; i++) {
    //let gridItem = document.createElement('div');
    //gridItem.className = 'subitem';
    //gridItem.id = "h"+i.toString();
    // gridItem.innerHTML = "<img src='furo.png'>";
    //gridjogo.appendChild(gridItem);
    let imgItem = document.createElement('img');
    imgItem.className = 'subitem';
    imgItem.id = "i"+i.toString();
    imgItem.src = 'img55/furo7.png';
    gridjogo.appendChild(imgItem);
}

const grid12 = document.getElementById('g12');  // grid segunda linha, terceira coluna, marcações de acertos
gridItem = document.createElement('div');
gridItem.className = 'pontos';
gridItem.id = 'pontos';
gridItem.style.gridTemplateColumns = repetir(numfuros);
grid12.appendChild(gridItem);

const gridpontos = document.querySelector('#pontos'); // grid com espaço para resultados

// grid com imagens de resultados
for (let i = 0; i < numlinhas * numfuros; i++) {
    let gridItem = document.createElement('img');
    gridItem.className = 'subitem';
    gridItem.id = "p"+i.toString();
    //gridItem.innerHTML = "<img src='beigestick2.png'>";
    // gridItem.src = 'beigestick2.png';
    gridItem.src = 'img55/greystick.png';
    gridpontos.appendChild(gridItem);
}

const grid13 = document.getElementById('g13');  // grid segunda linha, quarta coluna, palete de pinos
gridItem = document.createElement('div');
gridItem.className = 'palete';
gridItem.id = 'palete';
grid13.appendChild(gridItem);

const gridcores = document.querySelector('#palete'); // grid para as cores disponíveis

// grid com botões de escolha de cor a jogar
for (let i = 0; i < numcores; i++) {
    let gridItem = document.createElement('div');
    gridItem.className = 'subitem';
    gridItem.id = "cor"+i.toString();
    let auxid = "pin"+i.toString();
    gridItem.innerHTML = "<button class='button' id =" + auxid + "><img src='img55/" + pinos[i] + ".png'></button>";
    gridcores.appendChild(gridItem);
    // auxid = "#"+auxid;
    let item = document.querySelector("#"+auxid); 
    item.addEventListener("click", function() { escolheCor(i) });
    item.myParam = auxid;

    // document.querySelector("#"+auxid).addEventListener("click", escolheCor(i),true);
}

// Escolhe cor do pino que vai ser colocado, na sequência do click na 'palete'
function escolheCor(cor) {
    // alert("Botão clicado "+pinos[cor]);
    corAtual = cor;
    // let corid = evt.currentTarget.myParam;
    if (estadoJogo == 0 || estadoJogo == 2) {
        estadoJogo = 1;
        linhaJogo++;
        console.log("abrir linha");
        abrirLinha();
    }
    document.querySelector("#g03").innerHTML = pinos[cor];
}

// Abre os orifícios da linha onde passa a ser possível inserir pinos
function abrirLinha() {
    let ini = (linhaJogo) * numfuros;
    let fini = (linhaJogo) * numfuros + numfuros;
    for (let i = ini; i < fini; i++ ) {
        let aidi = "#i"+i.toString();
        let furo = document.querySelector(aidi);
        furo.src = 'img55/furo25.png';
        // var fn = function () {porPino(i)};
        // furo.addEventListener("click", handlEventLinha, false);
        furo.myParam = i;
        furo.addEventListener("click", porPino, false);
    }
}

// Fecha a hipótese de trocar as cores na linha que estava ativa
function fecharLinha() {
    let ini = (linhaJogo) * numfuros;
    let fini = (linhaJogo) * numfuros + numfuros;
    for (let i = ini; i < fini; i++ ) {
        let aidi = "#i"+i.toString();
        let furo = document.querySelector(aidi);
        furo.removeEventListener("click", porPino);
    }
}

// coloca pino da cor escolhida no furo escolhido
function porPino(evt) {
    ativaJogar();
    // console.log(evt.currentTarget.myParam);
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

// desativa botão jogar durante o processo de 'cálculo' de resultado
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
    // estadoJogo = 2;
}

// coloca os sinais de certos e errados sem posição
function calcula() {   
    let mpretos = pinCertos();
    let mbrancos = corCertas() - mpretos;
    // console.log("certos "+mpretos);
    // console.log("cores "+mbrancos);
    let i = 0;
    for (let p = 0; p < mpretos; p++) {

        let x = linhaJogo*numfuros+i;
        let aidi = "#p"+x.toString();
        console.log("pretos "+aidi)
        document.querySelector(aidi).src = 'img55/greenstick.png';
        i++;
    }
    for (let p = 0; p < mbrancos; p++) {
        let x = linhaJogo*numfuros+i;
        let aidi = "#p"+x.toString();
        console.log("pretos "+aidi)
        document.querySelector(aidi).src = 'img55/orangestick.png';
        i++;
    }
    for (; i < numfuros; i++) {
        let x = linhaJogo*numfuros+i;
        let aidi = "#p"+x.toString();
        console.log("pretos "+aidi)
        document.querySelector(aidi).src = 'img55/redstick.png';
    }
    if (mpretos == numfuros) {
        estadoJogo = 3;
        let verifica = document.querySelector('#g01');
        verifica.innerHTML = "Parabéns, conseguiu!!!";
        verifica.removeEventListener("click", enviar);    
    } else {
        if (linhaJogo +1 == numlinhas) {
            estadoJogo = 3;
            let verifica = document.querySelector('#g01');
            verifica.innerHTML = "Não conseguiu, tente de novo.";
            verifica.removeEventListener("click", enviar);    
            } else {
            estadoJogo = 2;
        }
    }
}

// conta as cores certas na posição certa
function pinCertos() {  
    let tot = 0;
    for(let i = 0; i < numfuros; i++) {
        if (linhaCores[i] === chave[i]) tot++;
    }
    return tot;
}

// conta as cores que estão certas
function corCertas() {  
    let tot = 0;
    for(let i = 0; i < numfuros; i++) {
        for(let j = 0; j < numfuros; j++) {
            if (linhaCores[j] === chave[i]) tot++;
        }
    }
    return tot;
}

function repetir(n) {
    let str = "";
    for (let i = 0; i < n; i++ ) {
        str += "1fr ";
    }
    return str;
}