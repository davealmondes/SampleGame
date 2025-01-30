let score = 0;
const targetButton = document.getElementById('target');
const scoreDisplay = document.getElementById('score');

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
  moveButton(); // Move o botão após cada clique
}

// Adiciona um evento de clique ao botão
targetButton.addEventListener('click', updateScore);

// Inicia o jogo movendo o botão para a primeira posição aleatória
moveButton();