const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
const timeOut = document.querySelector('.time');
const box = document.querySelector('.box');

let score = 0;
let time = 0;
let interval = 0;

btn.addEventListener('click', startGame);
box.addEventListener('click', uploadScore);

function startGame(event) {

    event.preventDefault();

    if(input.value) {
        score = 0;
        clearInterval(interval);

        time = input.value;
        input.value = '';

        interval = setInterval(decreaseTime, 1000);
        createBall()

        let result = document.querySelector('.result');
        result.style.display = 'none'
    }
    
}

function decreaseTime() {

    if(!time) {
        endGame();
        return;
    }

    let seconds = --time;
    let minutes = 0;

    if(seconds < 10) {
        seconds = '0' + seconds;
        timeOut.style.color = 'red';
    }

    timeOut.innerText = seconds + ' секунд';
}

function endGame() {

    box.innerHTML = `<h1 class="result">Вы набрали: <span>${score}</span> очков</h1>`;
}

function createBall() {

    const ball = document.createElement('div');

    let {width, height} = box.getBoundingClientRect();
    
    let size = random(20, 80);
    let x = random(0, width - size);
    let y = random(0, height - size);

    ball.style.width = size + 'px';
    ball.style.height = size + 'px';
    ball.classList.add('ball');
    ball.style.background = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
    ball.style.borderRadius = random(0, 1) === 1 ? '50%' : '0%';
    ball.style.top = x + 'px';
    ball.style.left = y + 'px';

    box.append(ball)
}

function random(max, min) {

    return Math.round(Math.random() * (max - min) + min)
}

function uploadScore(event) {
    if(event.target.classList.contains('ball')) {
        score++;
        event.target.remove()
        createBall();
    }
}