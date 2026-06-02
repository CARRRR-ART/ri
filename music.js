const musicStateKey = 'happyBirthdayMusicState';
const audioPath = "./background-music.mp3";
const audioElement = document.getElementById('backgroundMusic');
const playButton = document.getElementById('musicToggle');
const muteButton = document.getElementById('muteToggle');
const musicControl = document.getElementById('musicControl');
let saveStateInterval = null;

function safeJSONParse(value) {
    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
}

function getStoredMusicState() {
    if (!window.localStorage) return null;
    return safeJSONParse(localStorage.getItem(musicStateKey));
}

function saveMusicState(state) {
    if (!window.localStorage) return;
    try {
        localStorage.setItem(musicStateKey, JSON.stringify(state));
    } catch {
        // Ignore storage errors.
    }
}

function updateMusicUI() {
    if (!playButton || !muteButton || !audioElement) return;
    playButton.textContent = audioElement.paused ? '▶' : '⏸';
    playButton.setAttribute('aria-label', audioElement.paused ? 'Play background music' : 'Pause background music');
    muteButton.textContent = audioElement.muted ? '🔇' : '🔊';
    muteButton.setAttribute('aria-label', audioElement.muted ? 'Unmute background music' : 'Mute background music');
}

function saveCurrentState() {
    if (!audioElement) return;
    saveMusicState({
        playing: !audioElement.paused,
        muted: audioElement.muted,
        volume: audioElement.volume,
        currentTime: Math.floor(audioElement.currentTime)
    });
}

function startPeriodicSave() {
    if (saveStateInterval) clearInterval(saveStateInterval);
    saveStateInterval = setInterval(() => {
        saveCurrentState();
    }, 500);
}

function stopPeriodicSave() {
    if (saveStateInterval) {
        clearInterval(saveStateInterval);
        saveStateInterval = null;
    }
}

function initializeMusic(autoplayOnInteraction = false) {
    if (!audioElement || audioElement.dataset.musicInitialized === 'true') return;
    audioElement.dataset.musicInitialized = 'true';
    audioElement.src = audioPath;
    audioElement.loop = true;
    audioElement.preload = 'auto';

    const storedState = getStoredMusicState();
    
    audioElement.volume = storedState?.volume ?? 0.3;
    if (storedState?.muted) {
        audioElement.muted = true;
    }

    audioElement.addEventListener('play', () => {
        updateMusicUI();
        saveCurrentState();
        startPeriodicSave();
    });

    audioElement.addEventListener('pause', () => {
        updateMusicUI();
        saveCurrentState();
        stopPeriodicSave();
    });

    audioElement.addEventListener('volumechange', () => {
        updateMusicUI();
        saveCurrentState();
    });

    audioElement.addEventListener('canplay', () => {
        if (storedState?.currentTime && audioElement.currentTime === 0) {
            audioElement.currentTime = storedState.currentTime;
        }
    });

    audioElement.addEventListener('error', () => {
        if (musicControl) {
            musicControl.style.display = 'none';
        }
    });

    updateMusicUI();

    if (storedState?.playing || autoplayOnInteraction) {
        audioElement.play().catch(() => {
            // Browsers may block autoplay; user can still use the button.
        });
    }
}

function togglePlayPause() {
    if (!audioElement) return;
    if (audioElement.paused) {
        audioElement.play().catch(() => {
            // Ignore playback errors.
        });
    } else {
        audioElement.pause();
    }
}

function toggleMuteUnmute() {
    if (!audioElement) return;
    audioElement.muted = !audioElement.muted;
}

if (playButton) {
    playButton.addEventListener('click', (event) => {
        event.stopPropagation();
        initializeMusic(true);
        togglePlayPause();
    });
}

if (muteButton) {
    muteButton.addEventListener('click', (event) => {
        event.stopPropagation();
        initializeMusic(true);
        toggleMuteUnmute();
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const storedState = getStoredMusicState();
    if (storedState?.muted && audioElement) {
        audioElement.muted = true;
    }
    updateMusicUI();
    initializeMusic();
});

window.addEventListener('beforeunload', () => {
    stopPeriodicSave();
    saveCurrentState();
});

window.addEventListener('pointerdown', () => initializeMusic(true), { once: true, passive: true });
window.addEventListener('keydown', () => initializeMusic(true), { once: true, passive: true });
