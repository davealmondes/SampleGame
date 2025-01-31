let pontuacao = 0;
let tempo = 30;
let jogoAtivo = false;

function criarBalao() {
    if (!jogoAtivo) return;
    
    const balao = document.createElement("div");
    const tamanho = Math.random() * 50 + 30;
    const cor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    const pontos = Math.round(100 - tamanho);
    const velocidade = 200 - pontos;
    
    balao.classList.add("balao");
    balao.style.width = `${tamanho}px`;
    balao.style.height = `${tamanho}px`;
    balao.style.backgroundColor = cor;
    balao.style.top = `${Math.random() * (window.innerHeight - tamanho)}px`;
    balao.style.left = `${Math.random() * (window.innerWidth - tamanho)}px`;
    balao.innerText = `+${pontos}`;
    document.body.appendChild(balao);
    
    let dx = (Math.random() - 0.5) * 4;
    let dy = (Math.random() - 0.5) * 4;
    
    function moverBalao() {
        let rect = balao.getBoundingClientRect();
        if (rect.left <= 0 || rect.right >= window.innerWidth) dx *= -1;
        if (rect.top <= 0 || rect.bottom >= window.innerHeight) dy *= -1;
        
        balao.style.left = `${rect.left + dx * (velocidade / 100)}px`;
        balao.style.top = `${rect.top + dy * (velocidade / 100)}px`;
    }
    
    const intervalo = setInterval(moverBalao, 20);
    
    balao.onclick = () => {
        pontuacao += pontos;
        document.getElementById("pontuacao").innerText = `Pontos: ${pontuacao}`;
        balao.classList.add("estourado");
        clearInterval(intervalo);
        setTimeout(() => balao.remove(), 200);
    };
    
    setTimeout(() => {
        clearInterval(intervalo);
        balao.remove();
    }, 5000);
}

function iniciarJogo() {
    jogoAtivo = true;
    pontuacao = 0;
    tempo = 30;
    document.getElementById("pontuacao").innerText = "Pontos: 0";
    document.getElementById("timer").innerText = "Tempo: 30";
    document.getElementById("gameOver").style.display = "none";
    document.getElementById("startButton").style.display = "none";
    
    const intervaloBalao = setInterval(criarBalao, 1000);
    const intervaloTempo = setInterval(() => {
        if (tempo <= 0) {
            clearInterval(intervaloBalao);
            clearInterval(intervaloTempo);
            jogoAtivo = false;
            document.getElementById("gameOver").style.display = "block";
            document.getElementById("finalScore").innerText = pontuacao;
            document.getElementById("startButton").style.display = "block";
        } else {
            tempo--;
            document.getElementById("timer").innerText = `Tempo: ${tempo}`;
        }
    }, 1000);
}

document.getElementById("startButton").addEventListener("click", iniciarJogo);
