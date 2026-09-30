const triggerStoryBtn = document.getElementById('trigger-story-btn');
const welcomeSplash = document.getElementById('welcome-splash');
const masterStage = document.querySelector('.master-stage');
const audioSoundtrack = document.getElementById('audio-soundtrack');
const interactiveEnvelope = document.getElementById('interactive-envelope');
const parchmentLetter = document.getElementById('parchment-letter');
const finishLetterBtn = document.getElementById('finish-letter-btn');
const btnChoiceYes = document.getElementById('btn-choice-yes');
const btnChoiceNo = document.getElementById('btn-choice-no');
const particlesLayer = document.getElementById('particles-layer');
const typewriterText = document.getElementById('typewriter-text');
const mainVinyl = document.getElementById('main-vinyl');

// 1. GENERADOR DE PARTÍCULAS COMPLEMENTARIAS
const assetIcons = ['🍁', '🍂', '❤️', '✨'];
function spawnParticle() {
    if (!particlesLayer) return;
    const node = document.createElement('div');
    node.classList.add('floating-node');
    node.innerText = assetIcons[Math.floor(Math.random() * assetIcons.length)];
    
    node.style.left = Math.random() * 100 + 'vw';
    node.style.animationDuration = Math.random() * 3 + 5 + 's';
    node.style.fontSize = Math.random() * 8 + 16 + 'px';
    
    particlesLayer.appendChild(node);
    setTimeout(() => { node.remove(); }, 8000);
}
setInterval(spawnParticle, 300);

// 2. DISPARADOR INICIAL (Activa música de fondo y remueve el Splash)
if (triggerStoryBtn) {
    triggerStoryBtn.addEventListener('click', () => {
        if (mainVinyl) mainVinyl.style.animationPlayState = 'paused';
        if (audioSoundtrack) {
            audioSoundtrack.play().catch(err => console.log("Audio en espera:", err));
        }
        if (welcomeSplash) welcomeSplash.classList.add('fade-out-action');
        setTimeout(() => {
            if (welcomeSplash) welcomeSplash.classList.add('hidden-stage');
            if (masterStage) masterStage.classList.remove('hidden-stage');
        }, 800);
    });
}

// 3. EFECTO TYPEWRITER AUTO-ESCRITURA (NUEVA CARTA ACTUALIZADA)
const letterContent = `My dearest love,\n\nI don’t know what it is about October, but I feel like it makes everything seem a little different. The air changes, the days start to feel calmer, and—I don’t know why—it makes me think of you.\n\nI think if I had to associate a time of year with you, it would be this one. Not because everything is perfect or because I planned on falling in love with you, but simply because it happened. You came into my life when I wasn't looking for you, and before I knew it, you had become someone incredibly important to me.\n\nSometimes I think about how much my days have changed since you’ve been by my side. There are moments when I’m just going about my day, and out of nowhere, you pop into my mind. A song, a conversation, a memory of us... anything can make me think of you again and leave me smiling like a fool.\n\nI like to think that even as the days go by and things change, we’ll always have our memories. Those little things that might not mean much to others mean the world to me because I experienced them with you.\n\nAnd if everything changes someday, I still want to choose you. I want to be with you on the good days and the hard days—when things are calm and when they get complicated. I can’t promise that everything will be perfect, but I do want to keep being here.\n\nBecause out of everything that could have happened, and all the people I could have met, I ended up finding you.\n\nAnd honestly, I wouldn't change a thing.\n\nI love you, my Nini. ❤️\n\nForever yours 🍂`;

let textIndex = 0;
function playLetterTypewriter() {
    if (textIndex < letterContent.length) {
        typewriterText.innerHTML += letterContent.charAt(textIndex);
        textIndex++;
        setTimeout(playLetterTypewriter, 45); 
    } else {
        if (finishLetterBtn) {
            finishLetterBtn.classList.remove('hidden-stage');
            finishLetterBtn.classList.add('active-phase');
        }
    }
}

// Apertura del sobre
if (interactiveEnvelope) {
    interactiveEnvelope.addEventListener('click', () => {
        interactiveEnvelope.classList.add('envelope-open-state');
        setTimeout(() => {
            interactiveEnvelope.classList.add('hidden-stage');
            if (parchmentLetter) {
                parchmentLetter.classList.remove('hidden-stage');
                playLetterTypewriter(); 
            }
        }, 1000);
    });
}

// 4. CAMBIO A LA FASE DEL JUEGO
function transitionToGameStage() {
    const stageEnvelope = document.getElementById('stage-envelope');
    const stageGame = document.getElementById('stage-game');
    
    if (stageEnvelope && stageGame) {
        stageEnvelope.classList.remove('active-phase');
        stageEnvelope.classList.add('hidden-stage');
        
        stageGame.classList.remove('hidden-stage');
        stageGame.classList.add('active-phase');
    }
}

// 5. CÁLCULO VECTORIAL DEL BOTÓN NO TÁCTIL
function teleportNoButton(e) {
    if(e) e.preventDefault();
    const boundaryX = Math.random() * (window.innerWidth - btnChoiceNo.offsetWidth - 50);
    const boundaryY = Math.random() * (window.innerHeight - btnChoiceNo.offsetHeight - 50);
    
    btnChoiceNo.style.position = 'fixed';
    btnChoiceNo.style.left = `${boundaryX}px`;
    btnChoiceNo.style.top = `${boundaryY}px`;
}
if (btnChoiceNo) {
    btnChoiceNo.addEventListener('mouseover', teleportNoButton);
    btnChoiceNo.addEventListener('touchstart', teleportNoButton, { passive: false });
}

// 6. RESOLUCIÓN FINAL (POLAROID LOOP INFINITO SUAVE)
let polaroidInterval;
if (btnChoiceYes) {
    btnChoiceYes.addEventListener('click', () => {
        const stageGame = document.getElementById('stage-game');
        const stagePolaroid = document.getElementById('stage-polaroid');
        
        if (stageGame && stagePolaroid) {
            stageGame.classList.remove('active-phase');
            stageGame.classList.add('hidden-stage');
            
            stagePolaroid.classList.remove('hidden-stage');
            stagePolaroid.classList.add('active-phase');
        }
        
        if (btnChoiceNo) btnChoiceNo.style.display = 'none';

        const pImgs = document.querySelectorAll('.polaroid-img');
        let currentPImg = 0;

        polaroidInterval = setInterval(() => {
            if(pImgs.length > 0) {
                pImgs[currentPImg].classList.remove('active-p-img');
                currentPImg = (currentPImg + 1) % pImgs.length;
                pImgs[currentPImg].classList.add('active-p-img');
            }
        }, 3500); 
    });
}
