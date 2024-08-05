
const ges = ["g00", "g01", "g02", "g03", "g10", "g11", "g12", "g13"];
const pinos = ["blue", "red", "yellow", "green", "orange", "brown", "black", "cyan", "violet",
             "orange2", "indigo", "lettuce", "pink", "caramel", "grey", "white"];

const gridCont = document.getElementById('grid0');

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

const gridnl = document.getElementById('enele');

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

const gridjogo = document.getElementById('jogadas');

for (let i = 1; i < 81; i++) {
    let gridItem = document.createElement('div');
    gridItem.className = 'subitem';
    gridItem.id = "h"+i.toString();
    gridItem.innerHTML = "<img src='furo25.png'>";
    gridjogo.appendChild(gridItem);
}

const grid12 = document.getElementById('g12');
gridItem = document.createElement('div');
gridItem.className = 'pontos';
gridItem.id = 'pontos';
grid12.appendChild(gridItem);

const gridpontos = document.getElementById('pontos');

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

const gridcores = document.getElementById('palete');

for (let i = 0; i < 16; i++) {
    let gridItem = document.createElement('div');
    gridItem.className = 'subitem';
    gridItem.id = "cor"+i.toString();
    gridItem.innerHTML = "<button class='button' onclick='escolheCor(`pinos[i]`)'><img src='img55/" + pinos[i] + ".png'></button>";
    //gridItem.addEventListener("click", escolheCor(this));
    gridcores.appendChild(gridItem);
}

function escolheCor(cor) {
    alert("Botão clicado "+cor);
}