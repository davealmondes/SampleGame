let score = 0;
let timeLeft = 30;
let timerInterval;
const targetButton = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const gameOverScreen = document.getElementById('gameOver');
const finalScoreDisplay = document.getElementById('finalScore');
const restartButton = document.getElementById('restart');

// Função para mover o botão para uma posição aleatória
function moveButton() {
  const x = Math.random() * (window.innerWidth - targetButton.offsetWidth);
  const y = Math.random() * (window.innerHeight - targetButton.offsetHeight);
  targetButton.style.position = 'absolute';
  targetButton.style.left = `${x}px`;
  targetButton.style.top = `${y}px`;
}

// Função para atualizar a pontuação
function updateScore() {
  score++;
  scoreDisplay.textContent = `Pontuação: ${score}`;
  moveButton();
  reduceButtonSize(); // Reduz o tamanho do botão
}

// Função para reduzir o tamanho do botão
function reduceButtonSize() {
  const currentWidth = targetButton.offsetWidth;
  const currentHeight = targetButton.offsetHeight;
  if (currentWidth > 50 && currentHeight > 20) {
    targetButton.style.width = `${currentWidth * 0.9}px`;
    targetButton.style.height = `${currentHeight * 0.9}px`;
  }
}

// Função para atualizar o timer
function updateTimer() {
  timeLeft--;
  timerDisplay.textContent = `Tempo: ${timeLeft}`;
  if (timeLeft <= 0) {
    endGame();
  }
}

// Função para encerrar o jogo
function endGame() {
  clearInterval(timerInterval);
  targetButton.classList.add('hidden');
  gameOverScreen.classList.remove('hidden');
  finalScoreDisplay.textContent = `Sua pontuação: ${score}`;
}

// Função para reiniciar o jogo
function restartGame() {
  score = 0;
  timeLeft = 30;
  targetButton.style.width = 'auto';
  targetButton.style.height = 'auto';
  scoreDisplay.textContent = `Pontuação: ${score}`;
  timerDisplay.textContent = `Tempo: ${timeLeft}`;
  gameOverScreen.classList.add('hidden');
  targetButton.classList.remove('hidden');
  moveButton();
  timerInterval = setInterval(updateTimer, 1000);
}

// Adiciona um evento de clique ao botão
targetButton.addEventListener('click', updateScore);

// Adiciona um evento de clique ao botão de reiniciar
restartButton.addEventListener('click', restartGame);

// Inicia o jogo
restartGame();