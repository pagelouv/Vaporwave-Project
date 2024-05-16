// Capturando o elemento da estrada e do carro
const container = document.querySelector('.container');
const road = document.querySelector('.road');
const car = document.getElementById('car');

// Adicionando um evento de mousemove à estrada
container.addEventListener('mousemove', moveCar);

// Função para mover o carro
function moveCar(event) {
    // Obtendo a largura da área do jogo e do carro
    const containerWidth = container.clientWidth;
    const carWidth = car.offsetWidth;

    // Obtendo a posição do mouse em relação à área do jogo
    const mouseX = event.clientX - container.getBoundingClientRect().left - window.pageXOffset;

    // Calculando a nova posição horizontal do carro
    let carX = mouseX - (carWidth / 2);

    // Limitando a posição do carro para não ultrapassar os limites da área do jogo
    carX = Math.max(0, Math.min(containerWidth - carWidth, carX));

    // Atualizando a posição horizontal do carro
    car.style.left = carX + 'px';
}
