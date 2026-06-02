const routes = {
    '/': {
        title: 'Happy Birthday',
        css: ['style.css'],
        html: `
            <div class="cursor"></div>
            <div class="container">
                <h1>Happy Birthday RISHIKA💗</h1>
                <div class="greeting"></div>
                <button class="cta-button">Click to Enter Our World 💕</button>
            </div>
        `,
        js: 'script.js'
    },
    '/cause': {
        title: 'Why You\'re My Best Friend! 💖',
        css: ['cause.css'],
        html: `
            <div class="custom-cursor">
                <svg viewBox="0 0 24 24">
                    <path fill="#ff69b4" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </div>
            <div class="container">
                <h1>Happy Birthday Rishika 💖</h1>
                <div id="reasons-container"></div>
                <button class="shuffle-button">Click Here... 💕</button>
                <div class="reason-counter"></div>
                <div class="ending-section">
                    <div class="teddy-hug">
                        <img src="./d1.jpg" alt="Teddy Hug">
                    </div>
                    <div class="ending-text">You're the BESTEST ! 💖</div>
                </div>
            </div>
        `,
        js: 'cause.js'
    },
    '/queen': {
        title: 'Happy 19 Queen 👑',
        css: ['queen.css'],
        html: `
            <div class="queen-scene">
                <div class="royal-glow"></div>
                <div class="firework-layer" aria-hidden="true"></div>
                <div class="sparkle-layer" aria-hidden="true"></div>
                <div class="balloon-layer" aria-hidden="true"></div>
                <div class="confetti-layer" aria-hidden="true"></div>
                <main class="queen-main">
                    <div class="hero-copy">
                        <span class="hero-badge">👑 Happy 19 Queen</span>
                        <h1>
                            Happy 19 <span class="golden-text">Queen</span>
                            <span class="hero-crown">👑</span>
                        </h1>
                        <p>May your smile always shine brighter than the candles on this cake and may life bring you endless happiness, success, beautiful memories, and everything you deserve.</p>
                    </div>
                    <section class="cake-hub" aria-label="Birthday cake celebration">
                        <div class="cake-plate"></div>
                        <div class="cake">
                            <div class="cake-layer layer-one"></div>
                            <div class="cake-layer layer-two"></div>
                            <div class="cake-layer layer-three"></div>
                            <div class="cake-icing"></div>
                            <div class="cake-top">
                                <div class="cake-flower cake-flower-left"></div>
                                <div class="cake-flower cake-flower-right"></div>
                                <div class="cake-decoration"></div>
                                <div class="candle-row"></div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        `,
        js: 'queen.js'
    },
    '/last': {
        title: 'Our Beautiful Memories ✨',
        css: ['last-spa.css'],
        html: `
            <div class="magic-sparkles"></div>
            <div class="floating-hearts">
                <div class="heart" style="--float-duration: 6s; --delay: 0s; --translate-x: 20px;">💝</div>
                <div class="heart" style="--float-duration: 8s; --delay: 1s; --translate-x: -30px;">💖</div>
                <div class="heart" style="--float-duration: 7s; --delay: 2s; --translate-x: 40px;">💗</div>
                <div class="heart" style="--float-duration: 9s; --delay: 3s; --translate-x: -20px;">💓</div>
                <div class="heart" style="--float-duration: 5s; --delay: 4s; --translate-x: 30px;">💕</div>
            </div>
            <section class="welcome">
                <h1>A Glimpse of Perfection</h1>
                <p>A collection of moments, smiles, and memories that made life a little brighter ...</p>
            </section>
            <div class="memory-container">
                <div class="memory-card">
                    <img src="./d1.jpg" alt="First Date" class="memory-img">
                    <div class="memory-date">Her Smile Says It All/</div>
                    <div class="memory-caption">Your smile has always had a way of making moments feel a little brighter..❤️</div>
                </div>
                <div class="memory-card">
                    <img src="./d2.jpg" alt="Beach Day" class="memory-img">
                    <div class="memory-date">Together Vibes</div>
                    <div class="memory-caption">May your journey ahead be filled with happiness, success, and endless smiles.😊💕</div>
                </div>
                <div class="memory-card">
                    <img src="./d3.jpg" alt="Movie Night" class="memory-img">
                    <div class="memory-date">Pretty Soul</div>
                    <div class="memory-caption">Keep being the amazing person you are—you make every moment brighter.🌸💖</div>
                </div>
            </div>
            <section class="final-message">
                <h2>Thank You for the Memories</h2>
                <p>Every laugh, every chat, and every moment we've shared has been truly special.💫<br>
                    I'm so grateful for the bond we have, and for the positivity you always bring into my life.<br>
                    On your birthday, I just wish for endless happiness, love, and success to come your way.🌸</p>
                <p>You deserve all the joy in the world—keep shining and spreading your beautiful energy.✨</p>
                <a href="#" class="goodbye-btn">Until We Meet Again 💝</a>
            </section>
        `,
        js: 'last.js'
    }
};

let currentRoute = '/';
let currentScriptInterval = null;

async function loadRoute(route) {
    const config = routes[route] || routes['/'];
    currentRoute = route;

    document.title = config.title;
    
    const container = document.getElementById('app-container');
    container.innerHTML = config.html;

    if (currentScriptInterval) clearInterval(currentScriptInterval);

    const script = await import(`./${config.js}`);
    if (script.init) script.init();

    window.history.pushState({ route }, '', route);
}

window.addEventListener('popstate', (event) => {
    loadRoute(event.state?.route || '/');
});

document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.href.includes(window.location.origin)) {
        e.preventDefault();
        const path = new URL(e.target.href).pathname;
        loadRoute(path);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadRoute(currentRoute);
});
