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
        takenDiv.appendChild(div)
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

let randomTetromino = Math.floor(Math.random()*theTetrominoes.length);
let randomRotation = Math.floor(Math.random()*4);
let current = theTetrominoes[randomTetromino][randomRotation];

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

function moveDown() {
    undraw() 
    currentPosition += width;
    draw()
}

})