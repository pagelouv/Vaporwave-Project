// Capturando elementos do DOM
const startButton = document.getElementById('startButton');
const gameContainer = document.getElementById('gameContainer');
const startScreen = document.querySelector('.containerStart');
const car = document.getElementById('car');
const collisionArea = document.getElementById('collisionArea');
const scoreElement = document.getElementById('score');

let score = 0;
let gameInterval;
const itemFrequency = 2000; // Frequência com que os itens caem (em milissegundos)
const bombChance = 0.1; // 10% de chance de aparecer uma bomba

// Adicionando evento de clique ao botão de iniciar
startButton.addEventListener('click', startGame);

// Função para iniciar o jogo
function startGame() {
    // Exibindo o container do jogo
    gameContainer.classList.remove('hidden');
    // Removendo o container do botão de iniciar
    startScreen.style.display = 'none';

    // Iniciando o intervalo para criar itens
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

// Adicionando evento de movimento do mouse para mover o carro
document.addEventListener('mousemove', moveCar);

// Função para resetar o jogo
function resetGame() {
    // Esconder o container do jogo
    gameContainer.classList.add('hidden');
    // Mostrar a tela inicial
    startScreen.style.display = 'flex';

    // Remover todos os itens do jogo
    document.querySelectorAll('.item').forEach(item => item.remove());
}
