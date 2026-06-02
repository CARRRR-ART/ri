const queenScene = document.querySelector('.queen-scene');
const candleRow = document.querySelector('.candle-row');

function createCandles() {
    if (!candleRow) return;
    const count = 19;
    for (let i = 0; i < count; i += 1) {
        const candle = document.createElement('div');
        candle.className = 'candle';
        const flame = document.createElement('div');
        flame.className = 'flame';
        candle.appendChild(flame);
        candle.style.left = `${6 + (i * 84) / (count - 1)}%`;
        flame.style.animationDelay = `${Math.random() * 0.7}s`;
        candleRow.appendChild(candle);
    }
}

function createBalloons() {
    if (!queenScene) return;
    const balloonCount = 12;
    for (let i = 0; i < balloonCount; i += 1) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = `${6 + (i % 6) * 14}%`;
        balloon.style.top = `${20 + (i < 6 ? 0 : 18)}%`;
        balloon.style.animationDuration = `${7 + (i % 4)}s`;
        balloon.style.background = `radial-gradient(circle at 30% 25%, rgba(255, ${140 + (i % 5) * 15}, ${182 + (i % 3) * 14}, 0.96), rgba(238, 163, 227, 0.92))`;
        balloon.addEventListener('click', (event) => {
            event.stopPropagation();
            balloon.classList.add('pop');
            setTimeout(() => balloon.remove(), 420);
            createClickSparkles(event.clientX, event.clientY);
        });
        queenScene.appendChild(balloon);
    }
}

function createClickSparkles(x, y) {
    const sparkleCount = 14;
    for (let i = 0; i < sparkleCount; i += 1) {
        const sparkle = document.createElement('div');
        sparkle.className = 'confetti-piece';
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        sparkle.style.background = `linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(255, 205, 243, 0.9))`;
        sparkle.style.transform = `rotate(${Math.random() * 360}deg)`;
        sparkle.style.animationDuration = `${1.4 + Math.random() * 0.8}s`;
        sparkle.style.animationDelay = `${Math.random() * 0.1}s`;
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 2200);
    }
}

function createInitialClickEffects() {
    const sparkle = document.createElement('div');
    sparkle.className = 'confetti-piece';
    sparkle.style.left = '50%';
    sparkle.style.top = '50%';
    sparkle.style.animationDuration = '2.1s';
    sparkle.style.transform = 'translateX(-50%)';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 2200);
}

function createCenterFirework() {
    if (!queenScene) return;
    const firework = document.createElement('div');
    firework.className = 'firework-burst';
    queenScene.appendChild(firework);
    setTimeout(() => firework.remove(), 2700);
}

document.addEventListener('DOMContentLoaded', () => {
    createCandles();
    createBalloons();
    createCenterFirework();

    document.body.addEventListener('click', (event) => {
        if (event.target.closest('.balloon')) return;
        createClickSparkles(event.clientX, event.clientY);
    });
});
