'use strict';
let main = document.querySelector('main');

//rutas de las imágenes:
const aImgs = [
    'img/02.jpg',
    'img/03.jpg',
    'img/04.jpg',
    'img/05.jpg',
    'img/06.jpg',
    'img/07.jpg',
    'img/08.jpg',
    'img/09.jpg',
    'img/02.jpg',
    'img/03.jpg',
    'img/04.jpg',
    'img/05.jpg',
    'img/06.jpg',
    'img/07.jpg',
    'img/08.jpg',
    'img/09.jpg'
];

//colores del reverso:
const aColores = [
    'blueviolet',
    'darkcyan',
    'darkblue',
    'cornflowerblue',
    'darkorange',
    'darkmagenta',
    'forestgreen',
    '#f3a08c', //MemoTest color
    '#00aba9' //teal
];

let aPar = []; //variable para guardar las rutas de las imagenes seleccionadas cada vez

//Determinar el color del reverso aleatoriamente:
function randomIndex() {
    let num = Math.random();
    let max = aColores.length - 1;
    let min = 0;
    let rango = max - min;
    num = num * rango;
    num = Math.floor(num);
    num = num + min;
    return (num);
}

let cont = 0;
let color = aColores[randomIndex()];
jugar();
agregarBotones();

function jugar() {
    var shuffledCards = shuffle(aImgs);

    for (let i = 0; i < shuffledCards.length; i++) {
        let div = document.createElement('div');
        div.addEventListener("click", displayCard);
        div.dataset.imgSrc = 'url(' + shuffledCards[i] + ')';
        div.style.background = color;
        main.appendChild(div);
    }
}

function displayCard() {

    if (aPar.length < 2 && !(this.classList.contains('disabled') || this.classList.contains('matched'))) {
        this.classList.add('disabled');
        aPar.push(this.dataset.imgSrc);
        this.style.background = this.dataset.imgSrc;
        this.style.backgroundSize = 'cover';
        this.classList.add('open');

        if (aPar.length == 2) {
            let aDisabled = document.querySelectorAll('main>div:not([class="disabled open"])');

            for (let disabled of aDisabled) {
                disabled.classList.add('disabled');
            }
            let aMatch = document.querySelectorAll('.open');
            if (aPar[0] == aPar[1]) {
                aMatch[0].classList.add('matched');
                aMatch[1].classList.add('matched');
                setTimeout(() => {
                    aMatch[0].style.background = 'white';
                    aMatch[1].style.background = 'white';
                }, 300);
                cont += 2;
                if (cont == 16) {
                    ganar();
                }
            } else {
                setTimeout(() => {
                    aMatch[1].style.background = color;
                    aMatch[0].style.background = color;
                }, 1000);
            };
            aMatch[1].classList.remove('open');
            aMatch[1].classList.remove('disabled');
            aMatch[0].classList.remove('open');
            aMatch[0].classList.remove('disabled');
            aPar = [];
            for (let disabled of aDisabled) {
                disabled.classList.remove('disabled');
            }
        }
    }
}

// Fisher-Yates (aka Knuth) Shuffle
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function ganar() {
    let botones = document.querySelector('.botones');
    document.querySelector('body').removeChild(botones);

    let div = document.createElement('div');
    div.className = 'congrats';
    document.querySelector('body').appendChild(div);

    let div2 = document.createElement('div');
    div.appendChild(div2);

    let p = document.createElement('p');
    p.innerHTML = 'Felicitaciones!!!';
    div2.appendChild(p);

    p = document.createElement('p');
    p.innerHTML = 'Has ganado!';
    div2.appendChild(p);

    let button = document.createElement('button');
    button.innerHTML = 'Jugar de nuevo';
    button.onclick = reiniciar;
    div2.appendChild(button);
}

function reiniciar() {
    cont = 0;
    cambiarColor();
    document.querySelector('main').innerHTML = '';
    if (document.querySelector('.congrats')) {
        let congrats = document.querySelector('.congrats');
        document.querySelector('body').removeChild(congrats);
    }
    if (!document.querySelector('.botones')) {
        agregarBotones();
    }
    jugar();
}

function cambiarColor() {
    color = aColores[randomIndex()];
    let aElements = document.querySelectorAll('main > div:not(.matched)');
    for (let div of aElements) {
        div.style.background = color;
    }
}

function agregarBotones() {
    let div = document.createElement('div');
    div.className = 'botones';
    document.querySelector('body').appendChild(div);

    let button = document.createElement('button');
    button.innerHTML = 'Cambiar color';
    button.onclick = cambiarColor;
    div.appendChild(button);

    button = document.createElement('button');
    button.innerHTML = 'Reiniciar';
    button.onclick = reiniciar;
    div.appendChild(button);
}
