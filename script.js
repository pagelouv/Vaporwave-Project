// Capturando elementos do DOM
const startButton = document.getElementById('startButton');
const gameContainer = document.getElementById('gameContainer');
const startScreen = document.querySelector('.containerStart');
const car = document.getElementById('car');
const collisionArea = document.getElementById('collisionArea');
const scoreElement = document.getElementById('score');
const loja = document.querySelector('.loja');
const estatua = document.getElementById('estatua');
const golfinho = document.getElementById('golfinho');
const walkman = document.getElementById('walkman');





///////////////////////////////////////////////////////////////////////////////////////////////////////
let score = 0;
let gameInterval;
const itemFrequency = 2000; // Frequência com que os itens caem (em milissegundos)
const bombChance = 0.1; // 10% de chance de aparecer uma bomba

// botão de iniciar
startButton.addEventListener('click', startGame);

// Função para iniciar o jogo
function startGame() {
    gameContainer.classList.remove('hidden');
    startScreen.style.display = 'none';
    // Exibindo a loja
    loja.classList.remove('hidden');

    gameInterval = setInterval(createItem, itemFrequency);
}

// Função para mover o carro horizontalmente
function moveCar(event) {
    const containerWidth = gameContainer.clientWidth;
    const carWidth = car.offsetWidth;
    const mouseX = event.clientX - gameContainer.getBoundingClientRect().left;
    let carX = mouseX - (carWidth / 2);
    carX = Math.max(0, Math.min(containerWidth - carWidth, carX));
    car.style.left = carX + 'px';
}

// Função para criar itens que caem
function createItem() {
    const item = document.createElement('div');
    item.classList.add('item');

    // Decidir se este item é uma bomba
    if (Math.random() < bombChance) {
        item.classList.add('bomb');
    }

    item.style.left = Math.random() * (gameContainer.clientWidth - 50) + 'px';
    item.style.top = '0px';
    gameContainer.appendChild(item);

    // Animar o item para cair
    let itemInterval = setInterval(() => {
        item.style.top = parseInt(item.style.top) + 5 + 'px';

        // Checar colisão com o carro
        if (checkCollision(collisionArea, item)) {
            if (item.classList.contains('bomb')) {
                // Se colidir com uma bomba, terminar o jogo
                alert('Você colidiu com uma bomba! Jogo encerrado.');
                scoreElement.textContent = 'Pontos: ' + score;
                clearInterval(gameInterval);
                clearInterval(itemInterval);
                item.remove();
                resetGame();
            } else {
                // Se colidir com um item normal, aumentar a pontuação
                score += 10;
                scoreElement.textContent = 'Pontos: ' + score;
                item.remove();
                clearInterval(itemInterval);
            }
        }

        // Remover item se passar da área de jogo
        if (parseInt(item.style.top) > gameContainer.clientHeight) {
            item.remove();
            clearInterval(itemInterval);
        }
    }, 20);
}

// Função para checar colisão entre dois elementos
function checkCollision(car, item) {
    const carRect = car.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    return !(
        carRect.top > itemRect.bottom ||
        carRect.bottom < itemRect.top ||
        carRect.left > itemRect.right ||
        carRect.right < itemRect.left
    );
}

// movimento do mouse para mover o carro
document.addEventListener('mousemove', moveCar);

// Função para resetar o jogo
function resetGame() {
    gameContainer.classList.add('hidden');
    startScreen.style.display = 'flex';
    loja.classList.add('hidden');

    // Remover todos os itens do jogo
    document.querySelectorAll('.item').forEach(item => item.remove());
}







//////////////////////////////////////////////////////////////////////////////////////////////////////
// Função para comprar itens
function comprarItem(itemId, preco) {
    if (score >= preco) {
        score -= preco;
        scoreElement.textContent = 'Pontos: ' + score;
        const item = document.getElementById(itemId);
        item.classList.remove('hidden');

        // Ações específicas para cada item
        if (itemId === 'golfinho') {
            item.addEventListener('click', () => {
                const audio = new Audio('golfinho.mp3');
                audio.play();
            });
        } else if (itemId === 'walkman') {
            const audio = new Audio('walkman.mp3');
            audio.play();
        }

    } else {
        alert('Pontos insuficientes!');
    }
}






///////////////////////////////////////////////////////////////////////////////////////////////////
// Configurações das partículas
const particleCount = 50;
const particleSpeed = 1;
const particleSize = 3;

// Criação do canvas
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Define o tamanho do canvas como o tamanho da janela
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array para armazenar as partículas
let particles = [];

// Função para criar uma partícula
function createParticle() {
    const particle = {
        x: Math.random() * canvas.width,
        y: canvas.height + particleSize,
        speed: Math.random() * particleSpeed + 1,
    };
    particles.push(particle);
}

// Função para atualizar as partículas
function updateParticles() {
    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        // Move a partícula para cima
        particle.y -= particle.speed;

        // Remove a partícula se ela sair do topo da tela
        if (particle.y < 0) {
            particles.splice(i, 1);
            i--;
        }
    }
}

// Função para desenhar as partículas com gradiente
function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Cria um gradiente linear
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#ff00ff'); // Cor inicial
    gradient.addColorStop(1, '#00ffff'); // Cor final

    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient; // Aplica o gradiente como cor de preenchimento
        ctx.fill();
    }
}

// Função principal de animação
function animate() {
    requestAnimationFrame(animate);

    // Cria uma nova partícula a cada quadro
    if (particles.length < particleCount) {
        createParticle();
    }

    updateParticles();
    drawParticles();
}

// Inicia a animação
animate();
