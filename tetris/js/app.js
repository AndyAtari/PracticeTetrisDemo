document.addEventListener('DOMContentLoaded', () => {

const grid = document.querySelector('.grid');
const takenDiv = document.querySelector('.taken');
const scoreDisplay = document.querySelector('#score');
const startBtn = document.querySelector('#start-button');
const width = 10 
const height = 20

function tetrisBoard() {
    for(i=0; i<200; i++) {
        let board = document.createElement('div');
        grid.appendChild(board)
        }
    }

function takenDivs() {
    for(i=0; i<10; i++) {
        let div = document.createElement('div');
        div.className = "taken";
        grid.appendChild(div)
    }
}
    
tetrisBoard();
takenDivs();

let squares = Array.from(document.querySelectorAll('.grid div'))


// Tetrominoes

const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2, width*2+1],
    [width, width*2, width*2+1, width*2+2]
]

const zTetromino = [
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1]
]

const tTetromino = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
]

const oTetrimino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
]

const iTetrimino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
]

const theTetrominoes = [lTetromino, zTetromino, oTetrimino, iTetrimino, tTetromino]


let currentPosition = 4;
let currentRotation = 0;

let randomTetromino = Math.floor(Math.random()*theTetrominoes.length);
let current = theTetrominoes[randomTetromino][currentRotation];

function draw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino')
    })
}

function undraw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino')
    })
}

timerId = setInterval(moveDown, 1000);


function controller(event) {
    if(event.keyCode === 65) {
        moveLeft()
    } else if (event.keyCode === 68) {
        moveRight()
    } else if (event.keyCode === 87) {
        rotate()
    } else if (event.keyCode === 83) {
        //moveDown()
    }
}

document.addEventListener('keyup', controller);

function moveDown() {
    undraw() 
    currentPosition += width;
    draw()
    freeze()
}

function freeze() {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      randomTetromino = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[randomTetromino][currentRotation]
      currentPosition = 4
      draw()
    }
}

function moveLeft() {
    undraw();
    const leftEdge = current.some(index => (currentPosition + index) % width === 0)

    if(!leftEdge) currentPosition -=1;

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
        currentPosition +=1;
    }

    draw();
}

function moveRight() {
    undraw();
    const rightEdge = current.some(index => (currentPosition + index) % width === width -1);
    
    if(!rightEdge) currentPosition +=1;

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
        currentPosition -=1;
    }
    draw();
}

function rotate() {
    undraw();
    currentRotation ++;
    if(currentRotation === current.length) {
        currentRotation = 0
    }
    current = theTetrominoes[randomTetromino][currentRotation]
    draw();
}


})