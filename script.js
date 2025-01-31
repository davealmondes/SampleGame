const startScreen = document.getElementById('start-screen');
const gameArea = document.getElementById('game-area');
const gameOverScreen = document.getElementById('game-over-screen');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const finalScoreDisplay = document.getElementById('final-score');

let score = 0;
let timeLeft = 60;
let gameInterval;
let timerInterval;

function startGame() {
    // Esconde a tela inicial e a tela de Game Over
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');

    // Mostra a área do jogo
    gameArea.classList.remove('hidden');
    gameArea.classList.add('active');

    // Reinicia a pontuação e o tempo
    score = 0;
    timeLeft = 60;
    scoreDisplay.textContent = `Pontuação: ${score}`;
    timerDisplay.textContent = `Tempo: ${timeLeft}`;

    // Limpa intervalos anteriores (caso existam)
    clearInterval(gameInterval);
    clearInterval(timerInterval);

    // Cria balões a cada segundo
    gameInterval = setInterval(createBalloon, 1000);

    // Atualiza o timer a cada segundo
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = `Tempo: ${timeLeft}`;

    // Verifica se o tempo acabou
    if (timeLeft <= 0) {
        endGame();
    }
}

function endGame() {
    // Para de criar balões e atualizar o timer
    clearInterval(gameInterval);
    clearInterval(timerInterval);

    // Esconde a área do jogo e mostra a tela de Game Over
    gameArea.classList.remove('active');
    gameArea.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');

    // Exibe a pontuação final
    finalScoreDisplay.textContent = score;
}

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');

    // Tamanho e pontuação aleatórios
    const size = Math.floor(Math.random() * 100) + 50; // Entre 50px e 150px
    const points = Math.floor(150 - size); // Balões menores valem mais pontos

    // Cor aleatória
    const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Posição inicial aleatória
    const x = Math.random() * (window.innerWidth - size);
    const y = Math.random() * (window.innerHeight - size);

    // Estiliza o balão
    balloon.style.width = `${size}px`;
    balloon.style.height = `${size}px`;
    balloon.style.backgroundColor = color;
    balloon.style.left = `${x}px`;
    balloon.style.top = `${y}px`;
    balloon.textContent = points; // Exibe os pontos no balão

    // Velocidade de movimento baseada na pontuação
    const speed = (points / 50) * 2; // Balões com mais pontos se movem mais rápido

    // Movimentação do balão
    let dx = (Math.random() - 0.5) * speed;
    let dy = (Math.random() - 0.5) * speed;

    function move() {
        let currentX = parseFloat(balloon.style.left);
        let currentY = parseFloat(balloon.style.top);

        // Verifica colisão com as bordas da tela
        if (currentX + dx < 0 || currentX + dx + size > window.innerWidth) {
            dx = -dx;
        }
        if (currentY + dy < 0 || currentY + dy + size > window.innerHeight) {
            dy = -dy;
        }

        // Atualiza a posição do balão
        balloon.style.left = `${currentX + dx}px`;
        balloon.style.top = `${currentY + dy}px`;

        // Continua a movimentação
        requestAnimationFrame(move);
    }

    move();

    // Tempo de vida do balão (entre 2 e 5 segundos)
    const lifeTime = Math.random() * 3000 + 2000; // Entre 2 e 5 segundos

    // Estoura o balão automaticamente após o tempo de vida
    const autoPopTimeout = setTimeout(() => {
        balloon.remove(); // Remove o balão sem adicionar pontos
    }, lifeTime);

    // Estourar o balão ao clicar
    balloon.addEventListener('click', () => {
        clearTimeout(autoPopTimeout); // Cancela o estouro automático
        score += points;
        scoreDisplay.textContent = `Pontuação: ${score}`;
        balloon.style.animation = 'pop 0.2s forwards'; // Animação de estouro
        setTimeout(() => balloon.remove(), 200); // Remove o balão após a animação
    });

    // Adiciona o balão à área do jogo
    gameArea.appendChild(balloon);
}

// Event listeners para os botões
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);