const basket = document.getElementById('basket');
const apple = document.getElementById('apple');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const container = document.getElementById('game-container');

let score = 0;
let basketX = 160;
let appleX = Math.random() * 370;
let appleY = -40;
let speed = 4;
let isGameOver = false;

// Menggerakkan keranjang dengan Mouse / Touch (Geser Jari di HP)
container.addEventListener('mousemove', (e) => {
    if (isGameOver) return;
    const rect = container.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    basketX = mouseX - 40;
    if (basketX < 0) basketX = 0;
    if (basketX > 320) basketX = 320;
    basket.style.left = basketX + 'px';
});

container.addEventListener('touchmove', (e) => {
    if (isGameOver) return;
    const rect = container.getBoundingClientRect();
    let touchX = e.touches[0].clientX - rect.left;
    basketX = touchX - 40;
    if (basketX < 0) basketX = 0;
    if (basketX > 320) basketX = 320;
    basket.style.left = basketX + 'px';
});

// Logika Pergerakan Apel
function update() {
    if (isGameOver) return;

    appleY += speed;
    
    if (appleY > 600) {
        if (appleX + 30 > basketX && appleX < basketX + 80) {
            score++;
            scoreDisplay.innerText = score;
            speed += 0.2; 
            resetApple();
        } else {
            endGame();
        }
    }

    apple.style.top = appleY + 'px';
    apple.style.left = appleX + 'px';

    requestAnimationFrame(update);
}

function resetApple() {
    appleY = -40;
    appleX = Math.random() * 370;
}

function endGame() {
    isGameOver = true;
    gameOverScreen.style.display = 'block';
    finalScoreDisplay.innerText = score;
}

function resetGame() {
    score = 0;
    speed = 4;
    isGameOver = false;
    scoreDisplay.innerText = score;
    gameOverScreen.style.display = 'none';
    resetApple();
    update();
}

update();
