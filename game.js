// ===========================
//  TYPERUSH — Game Engine v2
//  Ultra-Rich Animation Edition
// ===========================

// ── Word Banks ──
const EASY_WORDS = [
  'the','and','for','are','but','not','you','all','can','had','her','was','one','our','out',
  'day','get','has','him','his','how','its','may','new','now','old','see','way','who','boy',
  'did','let','say','she','too','use','car','run','big','end','red','top','sun','set','win',
  'hot','lot','put','cut','dog','cat','cup','box','key','map','pen','sit','six','ten','try',
  'art','ask','eye','far','few','fly','got','hit','job','low','oil','pay','ran','sea','war'
];

const MED_WORDS = [
  'about','their','which','would','there','could','other','after','first','think','where',
  'those','being','right','might','still','found','place','every','point','never','world',
  'start','power','light','story','young','great','water','house','group','large','small',
  'under','along','money','night','state','human','space','drive','force','press','speed',
  'quest','block','dream','flame','ghost','judge','knock','lunch','music','ocean','plant',
  'queen','river','sharp','stone','train','ultra','vital','watch','yield','crash','blaze',
  'cloud','dance','eagle','frost','grace','hover','ivory','joker','karma','laser','magic',
  'nexus','orbit','pixel','radar','solar','titan','unity','venus','whirl','xenon','zesty'
];

const HARD_WORDS = [
  'through','between','another','because','against','thought','without','general','program',
  'company','problem','product','country','example','nothing','project','million','already',
  'control','special','digital','machine','network','crystal','element','chapter','freedom',
  'gravity','harmony','imagine','justice','kingdom','mystery','neither','observe','pattern',
  'quantum','reality','science','thunder','upgrade','victory','weather','balance','capable',
  'defense','elastic','factory','glacier','hostile','insight','journey','kinetic','library',
  'natural','organic','passage','radical','shelter','texture','uniform','voltage','warrior',
  'abstract','bacteria','calendar','database','electron','fraction','generate','hypothes',
  'illusion','juvenile','keyboard','landmark','magnetic','navigate','optimize','paradigm'
];

const INTRO_PHRASES = [
  'speed','power','rush','type','fast','win','blaze','turbo','nitro','combo',
  'strike','clash','race','fury','bolt','blitz','storm','rapid','quick','flash',
  'champion','victory','dominate','keyboard','warrior','master','legend','unstoppable'
];

// ── Sentence Banks (Guinness World Records, Cyber Racing, Martial Arts) ──
const GUINNESS_SENTENCES = [
  "The official Guinness World Record for speed typing requires hitting three hundred words per minute in pure focus.",
  "Barbara Blackburn reached an astonishing peak typing speed of two hundred and twelve words per minute on a Dvorak keyboard.",
  "Sean Wrona broke online records on TypeRacer by typing continuously at speeds exceeding two hundred and fifty words per minute.",
  "At three hundred words per minute, your fingers strike twenty five characters every single second with zero hesitation.",
  "Only a true keyboard god can surpass the legendary barrier of three hundred words per minute.",
  "The quick brown fox jumps gracefully over the lazy sleeping dog as the countdown clock ticks to zero.",
  "Pack my box with five dozen liquor jugs before the speed demons arrive at midnight.",
  "Sphinx of black quartz, judge my sacred vow as I unleash maximum typing speed upon this keyboard.",
  "Lightning fast typists do not read individual letters, but perceive whole phrases in a continuous rhythm.",
  "To shatter the world record, every breath, keystroke, and neuron must move at the speed of light.",
  "Adrenaline surges through your veins as the cyber titan types at three hundred words per minute right beside you.",
  "Redline the engine, activate the nitro boost, and prove that human reflexes can surpass artificial intelligence.",
  "In this high stakes arena, only the swiftest keystrokes shall claim absolute victory and eternal glory.",
  "Precision without velocity is too slow, but velocity without precision leads to catastrophic errors.",
  "Can you match twenty five keystrokes per second and engrave your name into the Guinness Hall of Fame?"
];

const RACING_SENTENCES = [
  "Tires screech as the nitro kicks in, launching the cyber racer past the speed of sound.",
  "Never lift off the accelerator when the finish line is glowing bright on the neon horizon.",
  "Redline your tachometer and draft behind the leader before executing a fearless overtake.",
  "Downshift into the hairpin turn, clip the apex cleanly, and unleash full horsepower down the straightaway.",
  "Engines roar with raw fury as two high speed rivals push their machines beyond all safe limits."
];

const FIGHTER_SENTENCES = [
  "Channel your inner focus and unleash a devastating flurry of lightning strikes upon your opponent.",
  "A true master never hesitates, striking with precision before the enemy can raise a defense.",
  "Counter every aggressive attack with calm discipline, then deliver an unstoppable combo blow.",
  "The digital arena trembles as legendary fighters clash with superhuman typing speed and skill.",
  "Victory belongs solely to the warrior whose fingers strike with unwavering courage and flawless technique."
];

function getRandomSentence(category = 'guinness') {
  let pool = GUINNESS_SENTENCES;
  if (category === 'racing') pool = RACING_SENTENCES;
  if (category === 'fighter') pool = FIGHTER_SENTENCES;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── Global Type Mode & Bot Speed Settings ──
let contentType = 'sentences'; // 'sentences' | 'words'
let botDifficulty = 'pro';     // 'rookie', 'pro', 'master', 'guinness'

function setContentType(type) {
  contentType = type;
  const btnW = document.getElementById('btnModeWords');
  const btnS = document.getElementById('btnModeSentences');
  if (btnW) btnW.classList.toggle('active', type === 'words');
  if (btnS) btnS.classList.toggle('active', type === 'sentences');
  playSound('keypress');
}

function setBotDifficulty(diff) {
  botDifficulty = diff;
  ['Rookie', 'Pro', 'Master', 'Guinness'].forEach(d => {
    const btn = document.getElementById('btnBot' + d);
    if (btn) btn.classList.toggle('active', d.toLowerCase() === diff);
  });
  playSound(diff === 'guinness' ? 'combo' : 'keypress');
  if (diff === 'guinness') {
    triggerScreenFlash('rgba(255, 215, 0, 0.25)');
    triggerScreenShake(3, 150);
  }
}

// ── Sentence Display Helper ──
function renderSentenceDisplay(container, sentence, typed) {
  container.innerHTML = '';
  for (let i = 0; i < sentence.length; i++) {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = sentence[i];

    if (i < typed.length) {
      if (typed[i] === sentence[i]) {
        span.classList.add('char-correct');
      } else {
        span.classList.add('char-wrong');
      }
    } else if (i === typed.length) {
      span.classList.add('char-current');
    } else {
      span.classList.add('char-pending');
    }

    container.appendChild(span);
  }
}

// ── Utility Functions ──
function getRandomWord(difficulty = 'mixed') {
  if (difficulty === 'easy') return EASY_WORDS[Math.floor(Math.random() * EASY_WORDS.length)];
  if (difficulty === 'hard') return HARD_WORDS[Math.floor(Math.random() * HARD_WORDS.length)];
  if (difficulty === 'medium') return MED_WORDS[Math.floor(Math.random() * MED_WORDS.length)];
  const pools = [EASY_WORDS, MED_WORDS, HARD_WORDS];
  const pool = pools[Math.floor(Math.random() * pools.length)];
  return pool[Math.floor(Math.random() * pool.length)];
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function lerp(a, b, t) { return a + (b - a) * t; }
function rand(min, max) { return Math.random() * (max - min) + min; }
function randInt(min, max) { return Math.floor(rand(min, max)); }

// ── Sound Effects (Web Audio API) ──
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function initAudio() {
  if (!audioCtx) audioCtx = new AudioCtx();
}

function playSound(type) {
  initAudio();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  const now = audioCtx.currentTime;
  gain.gain.setValueAtTime(0.08, now);

  switch (type) {
    case 'correct':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.linearRampToValueAtTime(1320, now + 0.08);
      gain.gain.linearRampToValueAtTime(0, now + 0.15);
      osc.start(now); osc.stop(now + 0.15);
      break;
    case 'error':
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.linearRampToValueAtTime(100, now + 0.2);
      gain.gain.linearRampToValueAtTime(0, now + 0.25);
      osc.start(now); osc.stop(now + 0.25);
      break;
    case 'combo':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, now);
      osc.frequency.linearRampToValueAtTime(1100, now + 0.1);
      osc.frequency.linearRampToValueAtTime(1650, now + 0.2);
      gain.gain.linearRampToValueAtTime(0, now + 0.3);
      osc.start(now); osc.stop(now + 0.3);
      break;
    case 'hit':
      osc.type = 'square';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.15);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.2);
      osc.start(now); osc.stop(now + 0.2);
      break;
    case 'countdown':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.3);
      osc.start(now); osc.stop(now + 0.3);
      break;
    case 'go':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.linearRampToValueAtTime(1760, now + 0.15);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.4);
      osc.start(now); osc.stop(now + 0.4);
      break;
    case 'gameover':
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.8);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0, now + 1);
      osc.start(now); osc.stop(now + 1);
      break;
    case 'win':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523, now);
      osc.frequency.setValueAtTime(659, now + 0.15);
      osc.frequency.setValueAtTime(784, now + 0.3);
      osc.frequency.setValueAtTime(1047, now + 0.45);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.8);
      osc.start(now); osc.stop(now + 0.8);
      break;
    case 'keypress':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600 + Math.random() * 400, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.05);
      osc.start(now); osc.stop(now + 0.05);
      break;
    case 'whoosh':
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.linearRampToValueAtTime(2000, now + 0.3);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.4);
      osc.start(now); osc.stop(now + 0.4);
      break;
  }
}

// ── Screen Effects ──
function triggerScreenFlash(color = 'white') {
  const flash = document.getElementById('screenFlash');
  flash.style.background = color;
  flash.classList.add('active');
  setTimeout(() => flash.classList.remove('active'), 300);
}

function triggerScreenShake(intensity = 5, duration = 200) {
  const app = document.getElementById('app');
  const start = Date.now();
  function shakeFrame() {
    const elapsed = Date.now() - start;
    if (elapsed > duration) {
      app.style.transform = '';
      return;
    }
    const factor = 1 - elapsed / duration;
    const x = (Math.random() - 0.5) * intensity * factor;
    const y = (Math.random() - 0.5) * intensity * factor;
    app.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(shakeFrame);
  }
  shakeFrame();
}

// ── Particle Background (Enhanced) ──
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let introActive = true;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor(burst = false) {
    this.burst = burst;
    this.reset();
  }
  reset() {
    if (this.burst) {
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
      const angle = Math.random() * Math.PI * 2;
      const speed = rand(2, 8);
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.life = 1;
      this.decay = rand(0.01, 0.03);
      this.size = rand(1, 4);
    } else {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.size = Math.random() * 2.5 + 0.5;
      this.life = 1;
      this.decay = 0;
    }
    this.alpha = Math.random() * 0.4 + 0.05;
    const colors = ['0, 240, 255', '180, 74, 255', '255, 46, 139', '57, 255, 20'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.burst) {
      this.life -= this.decay;
      this.vx *= 0.98;
      this.vy *= 0.98;
    }
    if (!this.burst) {
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
  }
  draw() {
    if (this.burst && this.life <= 0) return;
    const radius = Math.max(0.1, this.size * (this.burst ? Math.max(0, this.life) : 1));
    const a = Math.max(0, this.burst ? this.alpha * this.life : this.alpha);
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${a})`;
    ctx.fill();
    if (this.size > 1.5 && !this.burst) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${a * 0.15})`;
      ctx.fill();
    }
  }
}

for (let i = 0; i < 100; i++) particles.push(new Particle());

function spawnBurstParticles(count = 30) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(true));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Remove dead burst particles
  particles = particles.filter(p => !p.burst || p.life > 0);

  particles.forEach(p => { p.update(); p.draw(); });

  // Draw connections (only for non-burst)
  const normalParticles = particles.filter(p => !p.burst);
  for (let i = 0; i < normalParticles.length; i++) {
    for (let j = i + 1; j < normalParticles.length; j++) {
      const dx = normalParticles[i].x - normalParticles[j].x;
      const dy = normalParticles[i].y - normalParticles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        ctx.beginPath();
        ctx.moveTo(normalParticles[i].x, normalParticles[i].y);
        ctx.lineTo(normalParticles[j].x, normalParticles[j].y);
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.04 * (1 - dist / 130)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();


// ══════════════════════════════════════
//  INTRO SPLASH ANIMATION
// ══════════════════════════════════════

let introAnimRunning = true;
let introTypingInterval = null;

function initIntro() {
  createSpeedLines();
  createFloatingWords();
  startTypingDemo();
  animateIntroStats();

  // Listen for any key or click
  const handler = (e) => {
    if (e.type === 'keydown' && (e.key === 'F5' || e.key === 'F12' || e.ctrlKey || e.altKey)) return;
    exitIntro();
    document.removeEventListener('keydown', handler);
    document.removeEventListener('click', handler);
  };
  document.addEventListener('keydown', handler);
  // Don't add immediate click listener — causes instant skip on page load clicks
  setTimeout(() => document.addEventListener('click', handler), 1000);
}

function createSpeedLines() {
  const container = document.getElementById('speedLines');
  for (let i = 0; i < 20; i++) {
    const line = document.createElement('div');
    line.className = 'speed-line';
    line.style.top = rand(5, 95) + '%';
    line.style.width = rand(100, 400) + 'px';
    line.style.setProperty('--duration', rand(1.5, 4) + 's');
    line.style.setProperty('--delay', rand(0, 3) + 's');
    line.style.setProperty('--opacity', rand(0.1, 0.4));
    // Alternate colors
    const colors = ['var(--neon-cyan)', 'var(--neon-purple)', 'var(--neon-pink)'];
    line.style.background = `linear-gradient(90deg, transparent, ${colors[i % 3]}, transparent)`;
    container.appendChild(line);
  }
}

function createFloatingWords() {
  const container = document.getElementById('floatingWords');
  const words = ['SPEED', 'POWER', 'RUSH', 'COMBO', 'FURY', 'BLITZ', 'WIN', 'TYPE', 'FAST',
    'TURBO', 'NITRO', 'CLASH', 'BOLT', 'STORM', 'RAPID', 'FLASH', 'ACE', 'HERO', 'EPIC',
    'ULTRA', 'MEGA', 'HYPER', 'TITAN', 'APEX'];

  for (let i = 0; i < 18; i++) {
    const el = document.createElement('span');
    el.className = 'float-word';
    el.textContent = words[i % words.length];
    const colors = ['rgba(0, 240, 255, 0.6)', 'rgba(180, 74, 255, 0.6)', 'rgba(255, 46, 139, 0.6)'];
    el.style.setProperty('--color', colors[i % 3]);
    el.style.setProperty('--size', rand(0.5, 1.2) + 'rem');
    el.style.setProperty('--duration', rand(8, 18) + 's');
    el.style.setProperty('--delay', rand(0, 8) + 's');
    el.style.setProperty('--startX', rand(-100, 100) + 'px');
    el.style.setProperty('--endX', rand(-100, 100) + 'px');
    el.style.setProperty('--rotate', rand(-15, 15) + 'deg');
    el.style.left = rand(5, 90) + '%';
    container.appendChild(el);
  }
}

function startTypingDemo() {
  const phrases = [
    'speed racer turbo',
    'type fast dominate',
    'combo strike fury',
    'ultimate champion',
    'keyboard warrior',
    'blitz rush victory',
    'power blast surge',
    'rapid fire legend',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let currentPhrase = phrases[0];
  const typedEl = document.getElementById('demoTyped');
  const wpmEl = document.getElementById('demoWpm');
  const burstEl = document.getElementById('demoBurst');
  let wpmVal = 120;
  let wordsCompleted = 0;

  function typeNextChar() {
    if (!introAnimRunning) return;

    if (charIndex < currentPhrase.length) {
      const char = currentPhrase[charIndex];
      typedEl.textContent += char;
      charIndex++;

      // Highlight keyboard key
      highlightKey(char);

      // WPM fluctuation
      wpmVal = 100 + Math.floor(Math.random() * 80);
      wpmEl.textContent = wpmVal + ' WPM';

      playSound('keypress');

      // Check if word completed (space or end)
      if (char === ' ' || charIndex === currentPhrase.length) {
        wordsCompleted++;
        // Burst effect
        spawnWordBurst(burstEl, currentPhrase.split(' ')[wordsCompleted - 1] || 'GO');
      }

      const delay = char === ' ' ? rand(60, 120) : rand(30, 80);
      introTypingInterval = setTimeout(typeNextChar, delay);
    } else {
      // Pause then clear and start next phrase
      introTypingInterval = setTimeout(() => {
        if (!introAnimRunning) return;
        typedEl.textContent = '';
        charIndex = 0;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        currentPhrase = phrases[phraseIndex];
        wordsCompleted = 0;
        typeNextChar();
      }, 800);
    }
  }

  // Start after a delay
  setTimeout(typeNextChar, 1200);
}

function highlightKey(char) {
  const c = char.toLowerCase();
  const keys = document.querySelectorAll('.demo-key');
  keys.forEach(key => {
    if (key.dataset.key === c) {
      key.classList.add('active');
      setTimeout(() => {
        key.classList.remove('active');
        key.classList.add('flash');
        setTimeout(() => key.classList.remove('flash'), 400);
      }, 80);
    }
  });
}

function spawnWordBurst(container, word) {
  const el = document.createElement('span');
  el.className = 'burst-word';
  el.textContent = word.toUpperCase();
  const angle = rand(0, Math.PI * 2);
  const dist = rand(60, 160);
  el.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
  el.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
  const colors = ['var(--neon-cyan)', 'var(--neon-green)', 'var(--neon-yellow)', 'var(--neon-pink)'];
  el.style.color = colors[Math.floor(Math.random() * colors.length)];
  el.style.left = '50%';
  el.style.top = '30%';
  container.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

function animateIntroStats() {
  const targets = [
    { el: document.getElementById('statPlayers'), target: 48293, speed: 800 },
    { el: document.getElementById('statGames'), target: 4, speed: 300 },
    { el: document.getElementById('statWPM'), target: 200, speed: 500 },
  ];

  targets.forEach(({ el, target, speed }) => {
    let current = 0;
    const increment = Math.ceil(target / (speed / 16));
    const interval = setInterval(() => {
      current = Math.min(current + increment, target);
      el.textContent = current.toLocaleString();
      if (current >= target) clearInterval(interval);
    }, 16);
  });
}

function exitIntro() {
  if (!introAnimRunning) return;
  introAnimRunning = false;
  clearTimeout(introTypingInterval);

  playSound('whoosh');
  triggerScreenFlash('rgba(0, 240, 255, 0.5)');
  spawnBurstParticles(50);

  const intro = document.getElementById('introScreen');
  intro.classList.add('exiting');

  setTimeout(() => {
    intro.classList.remove('active');
    intro.classList.remove('exiting');
    showScreen('mainMenu');
  }, 700);
}

// Initialize intro
initIntro();


// ══════════════════════════════════════
//  Global Game State
// ══════════════════════════════════════

let currentMode = null;
let playerName = '';
let gameActive = false;
let gameTimer = null;
let gameLoop = null;

let stats = {
  wordsTyped: 0,
  correctKeys: 0,
  totalKeys: 0,
  startTime: 0,
  score: 0,
  combo: 0,
  maxCombo: 0
};

// ── Screen Management ──
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

function showOverlay(id) {
  document.getElementById(id).classList.add('active');
}

function hideOverlay(id) {
  document.getElementById(id).classList.remove('active');
}

// ── Word completion effects ──
function spawnWordParticles(inputEl) {
  const rect = inputEl.getBoundingClientRect();
  const parent = inputEl.closest('.typing-area');
  if (!parent) return;

  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.className = 'word-particle';
    const angle = rand(0, Math.PI * 2);
    const dist = rand(30, 100);
    p.style.setProperty('--px', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--py', Math.sin(angle) * dist + 'px');
    const colors = ['#00f0ff', '#39ff14', '#ffe640', '#b44aff', '#ff2e8b'];
    p.style.background = colors[randInt(0, colors.length)];
    p.style.left = '50%';
    p.style.top = '50%';
    parent.appendChild(p);
    setTimeout(() => p.remove(), 800);
  }
}

function showComboFire(container, combo) {
  if (combo < 3) return;
  const fire = document.createElement('div');
  fire.className = 'combo-fire';
  const emojis = ['🔥', '⚡', '💥', '✨', '🌟'];
  const idx = Math.min(Math.floor(combo / 3) - 1, emojis.length - 1);
  fire.textContent = emojis[idx] + ' x' + combo;
  fire.style.color = 'var(--neon-yellow)';
  fire.style.fontFamily = 'var(--font-display)';
  fire.style.fontSize = '0.8rem';
  fire.style.fontWeight = '900';
  fire.style.letterSpacing = '2px';
  container.appendChild(fire);
  setTimeout(() => fire.remove(), 800);
}

function showScoreFloat(container, score, x, y) {
  const el = document.createElement('div');
  el.className = 'score-float';
  el.textContent = '+' + score;
  el.style.color = score > 100 ? 'var(--neon-yellow)' : 'var(--neon-green)';
  el.style.textShadow = `0 0 10px currentColor`;
  el.style.left = (x || 50) + '%';
  el.style.top = (y || 40) + '%';
  container.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

function animateWordChange(wordEl) {
  wordEl.classList.remove('word-enter');
  void wordEl.offsetWidth;
  wordEl.classList.add('word-enter');
}

function bumpHudValue(id) {
  const el = document.getElementById(id);
  el.classList.remove('bump');
  void el.offsetWidth;
  el.classList.add('bump');
}

// ── Mode Selection ──
function selectMode(mode) {
  const nameInput = document.getElementById('playerNameInput');
  playerName = nameInput.value.trim() || 'Player';
  currentMode = mode;

  const screenMap = {
    pvp: 'multiplayerScreen',
    guinness: 'guinnessScreen',
    racer: 'racerScreen',
    fighter: 'fighterScreen',
    blitz: 'blitzScreen',
    survival: 'survivalScreen'
  };

  showScreen(screenMap[mode]);
  startCountdown(mode);
}

// ── Countdown ──
function startCountdown(mode) {
  showOverlay('countdownOverlay');
  const numEl = document.getElementById('countdownNumber');
  let count = 3;
  numEl.textContent = count;
  numEl.style.animation = 'none';
  void numEl.offsetWidth;
  numEl.style.animation = '';
  numEl.style.color = '';
  playSound('countdown');

  const cdInterval = setInterval(() => {
    count--;
    if (count > 0) {
      numEl.textContent = count;
      numEl.style.animation = 'none';
      void numEl.offsetWidth;
      numEl.style.animation = '';
      playSound('countdown');
      triggerScreenFlash('rgba(0, 240, 255, 0.15)');
    } else if (count === 0) {
      numEl.textContent = 'GO!';
      numEl.style.color = 'var(--neon-green)';
      numEl.style.animation = 'none';
      void numEl.offsetWidth;
      numEl.style.animation = '';
      playSound('go');
      triggerScreenFlash('rgba(57, 255, 20, 0.3)');
      triggerScreenShake(3, 150);
    } else {
      clearInterval(cdInterval);
      hideOverlay('countdownOverlay');
      numEl.style.color = '';
      startGame(mode);
    }
  }, 800);
}

// ── Start Game ──
function startGame(mode) {
  gameActive = true;
  stats = { wordsTyped: 0, correctKeys: 0, totalKeys: 0, startTime: Date.now(), score: 0, combo: 0, maxCombo: 0 };

  switch (mode) {
    case 'pvp': initMultiplayer(); break;
    case 'guinness': initGuinness(); break;
    case 'racer': initRacer(); break;
    case 'fighter': initFighter(); break;
    case 'blitz': initBlitz(); break;
    case 'survival': initSurvival(); break;
  }
}

// ══════════════════════════════════
//  LIVE MULTIPLAYER & MATCHMAKING
// ══════════════════════════════════

const RANDOM_PLAYERS_POOL = [
  { name: 'CyberViper', avatar: '🥷', flag: '🇺🇸 US', wpm: 98, rank: 'Diamond' },
  { name: 'NitroPhantom', avatar: '🏎️', flag: '🇩🇪 DE', wpm: 114, rank: 'Master' },
  { name: 'ShadowStrike', avatar: '⚡', flag: '🇯🇵 JP', wpm: 128, rank: 'Grandmaster' },
  { name: 'PixelQueen', avatar: '👾', flag: '🇬🇧 UK', wpm: 88, rank: 'Platinum' },
  { name: 'HyperNova', avatar: '🔥', flag: '🇨🇦 CA', wpm: 104, rank: 'Diamond' },
  { name: 'CosmicRacer', avatar: '🚀', flag: '🇮🇳 IN', wpm: 92, rank: 'Diamond' },
  { name: 'TitanTypist', avatar: '🛡️', flag: '🇰🇷 KR', wpm: 122, rank: 'Master' },
  { name: 'NeonSpecter', avatar: '✨', flag: '🇫🇷 FR', wpm: 95, rank: 'Platinum' },
  { name: 'BlazeFox', avatar: '🦊', flag: '🇦🇺 AU', wpm: 106, rank: 'Diamond' },
  { name: 'VortexMaster', avatar: '🌀', flag: '🇧🇷 BR', wpm: 118, rank: 'Master' }
];

let liveChannel = null;
try {
  liveChannel = new BroadcastChannel('typerush_live_p2p');
} catch (e) {
  console.log('BroadcastChannel not supported');
}

let liveWs = null;
let wsConnected = false;

function initLiveWebSocket() {
  if (typeof window !== 'undefined' && window.location.protocol.startsWith('http')) {
    const wsProto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${wsProto}//${window.location.host}`;
    try {
      liveWs = new WebSocket(wsUrl);

      liveWs.onopen = () => {
        wsConnected = true;
        updateNetworkBadge(true);
        console.log('⚡ Connected to TypeRush Live WebSocket Hub');
      };

      liveWs.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          handleLiveServerMessage(data);
        } catch (err) {
          console.error('Error parsing live WS message:', err);
        }
      };

      liveWs.onclose = () => {
        wsConnected = false;
        updateNetworkBadge(false);
      };

      liveWs.onerror = () => {
        wsConnected = false;
        updateNetworkBadge(false);
      };
    } catch (err) {
      wsConnected = false;
      updateNetworkBadge(false);
    }
  } else {
    updateNetworkBadge(false);
  }
}

function updateNetworkBadge(isOnline) {
  const badge = document.getElementById('networkBadge');
  if (badge) {
    if (isOnline) {
      badge.textContent = '🟢 LIVE SERVER';
      badge.classList.remove('offline');
    } else {
      badge.textContent = '🌐 P2P NETWORK';
      badge.classList.add('offline');
    }
  }
}

function handleLiveServerMessage(data) {
  if (data.type === 'match_found') {
    isRealPeerConnected = true;
    if (matchmakingTimer) clearInterval(matchmakingTimer);
    if (data.sentence) {
      pvp.serverSentence = data.sentence;
    }
    const peerRival = {
      name: data.opponent ? data.opponent.name : 'Live Rival',
      avatar: data.opponent ? data.opponent.avatar : '🏎️',
      flag: data.opponent ? data.opponent.flag : '🌐 LIVE',
      wpm: data.opponent ? data.opponent.wpm : 96,
      rank: 'Online Challenger',
      isRealPeer: true
    };
    triggerMatchFound(peerRival);
  } else if (data.type === 'progress' && pvp.active) {
    pvp.rivalCharIndex = data.charIndex;
    pvp.rivalWpm = data.wpm;
    updateMultiplayerProgress();
  } else if (data.type === 'emote') {
    spawnFloatingEmote(data.emoji, 'rival');
  } else if (data.type === 'new_round_sentence') {
    pvp.serverSentence = data.sentence;
    startMultiplayerRound();
  } else if (data.type === 'opponent_disconnected') {
    showToast('⚠️ Opponent disconnected! Duel terminated.');
  } else if (data.type === 'online_count') {
    const el = document.getElementById('onlineCount');
    if (el) el.textContent = Number(data.count).toLocaleString();
  }
}

let matchmakingTimer = null;
let currentMatchOpponent = null;
let currentRoomCode = null;
let isRealPeerConnected = false;

// Dynamic Online Typist Counter Simulation
let onlineTypistsCount = 1482;
setInterval(() => {
  if (!wsConnected) {
    const diff = Math.floor((Math.random() - 0.48) * 8);
    onlineTypistsCount = Math.max(1200, onlineTypistsCount + diff);
    const el = document.getElementById('onlineCount');
    if (el) el.textContent = onlineTypistsCount.toLocaleString();
  }
}, 3500);

function startMatchmaking(roomCode = null) {
  const nameInput = document.getElementById('playerNameInput');
  playerName = nameInput.value.trim() || 'Player';
  currentRoomCode = roomCode;

  showScreen('matchmakingScreen');
  playSound('whoosh');

  const titleEl = document.getElementById('matchmakingTitle');
  const statusEl = document.getElementById('matchmakingStatus');
  const foundCard = document.getElementById('matchFoundCard');
  const roomSection = document.getElementById('roomCodeSection');

  foundCard.style.display = 'none';
  roomSection.style.display = 'flex';

  if (roomCode) {
    titleEl.textContent = `ROOM: ${roomCode.toUpperCase()}`;
    statusEl.textContent = 'Waiting for peer to connect via room code...';
  } else {
    titleEl.textContent = 'SEARCHING FOR RANDOM OPPONENT...';
    statusEl.textContent = 'Scanning global network (Ping: 18ms • Region: Auto)...';
  }

  isRealPeerConnected = false;

  // 1. Send to Live WebSocket Server if connected
  if (liveWs && wsConnected && liveWs.readyState === WebSocket.OPEN) {
    liveWs.send(JSON.stringify({
      type: roomCode ? 'join_room' : 'find_match',
      roomCode: roomCode,
      player: {
        name: playerName,
        avatar: '🏎️',
        wpm: 92,
        flag: '🌐 REAL LIVE'
      }
    }));
  }

  // 2. Broadcast search via P2P BroadcastChannel (multi-tab / local network)
  if (liveChannel) {
    liveChannel.postMessage({
      type: 'searching',
      name: playerName,
      roomCode: roomCode
    });
  }

  let searchDuration = 0;
  matchmakingTimer = setInterval(() => {
    searchDuration += 500;

    if (searchDuration === 1000) {
      statusEl.textContent = 'Opponent found in queue! Exchanging latency packet (18ms)...';
      playSound('keypress');
    }

    if (searchDuration >= 2200 && !isRealPeerConnected) {
      clearInterval(matchmakingTimer);
      // Pick random opponent from authentic global pool
      const rival = RANDOM_PLAYERS_POOL[Math.floor(Math.random() * RANDOM_PLAYERS_POOL.length)];
      triggerMatchFound(rival);
    }
  }, 500);
}

if (liveChannel) {
  liveChannel.onmessage = (e) => {
    const data = e.data;
    if (data.type === 'searching' && currentMode === 'matchmaking') {
      isRealPeerConnected = true;
      clearInterval(matchmakingTimer);
      const peerRival = {
        name: data.name || 'Live Rival',
        avatar: '🏎️',
        flag: '🌐 P2P LIVE',
        wpm: 95,
        rank: 'Challenger',
        isRealPeer: true
      };
      liveChannel.postMessage({
        type: 'match_accepted',
        name: playerName,
        opponent: data.name
      });
      triggerMatchFound(peerRival);
    } else if (data.type === 'match_accepted' && currentMode === 'matchmaking') {
      isRealPeerConnected = true;
      clearInterval(matchmakingTimer);
      const peerRival = {
        name: data.name || 'Live Rival',
        avatar: '🏎️',
        flag: '🌐 P2P LIVE',
        wpm: 95,
        rank: 'Challenger',
        isRealPeer: true
      };
      triggerMatchFound(peerRival);
    } else if (data.type === 'peer_progress' && pvp.active) {
      pvp.rivalCharIndex = data.charIndex;
      pvp.rivalWpm = data.wpm;
      updateMultiplayerProgress();
    } else if (data.type === 'peer_emote') {
      spawnFloatingEmote(data.emoji, 'rival');
    }
  };
}

function triggerMatchFound(opponent) {
  currentMatchOpponent = opponent;
  playSound('go');
  triggerScreenFlash('rgba(0, 240, 255, 0.4)');
  triggerScreenShake(3, 200);

  const foundCard = document.getElementById('matchFoundCard');
  document.getElementById('foundYouName').textContent = (playerName || 'YOU').toUpperCase();
  document.getElementById('foundRivalName').textContent = opponent.name;
  document.getElementById('foundRivalAvatar').textContent = opponent.avatar;
  document.getElementById('foundRivalStat').textContent = `${opponent.wpm} WPM • ${opponent.flag}`;
  document.getElementById('roomCodeSection').style.display = 'none';

  foundCard.style.display = 'block';

  let countdown = 3;
  const cdEl = document.getElementById('foundCountdown');
  cdEl.textContent = `DUEL BEGINS IN ${countdown}...`;

  const cdTimer = setInterval(() => {
    countdown--;
    if (countdown > 0) {
      cdEl.textContent = `DUEL BEGINS IN ${countdown}...`;
      playSound('countdown');
    } else {
      clearInterval(cdTimer);
      currentMode = 'pvp';
      showScreen('multiplayerScreen');
      startCountdown('pvp');
    }
  }, 900);
}

function cancelMatchmaking() {
  clearInterval(matchmakingTimer);
  if (liveWs && wsConnected && liveWs.readyState === WebSocket.OPEN) {
    liveWs.send(JSON.stringify({ type: 'cancel_search' }));
  }
  showScreen('mainMenu');
  playSound('keypress');
}

function joinRoomByCode() {
  const code = document.getElementById('roomCodeInput').value.trim();
  if (!code) {
    playSound('error');
    showToast('Please enter a room code!');
    return;
  }
  startMatchmaking(code);
}

function copyDuelInviteLink() {
  let code = document.getElementById('roomCodeInput').value.trim();
  if (!code) {
    code = 'RUSH-' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('roomCodeInput').value = code;
  }
  const shareUrl = `${window.location.origin}${window.location.pathname}?room=${code}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shareUrl).then(() => {
      showToast(`📋 Duel link copied: ${code}! Share with any friend.`);
    }).catch(() => {
      showToast(`Room Code: ${code}`);
    });
  } else {
    showToast(`Room Code: ${code}`);
  }
  playSound('keypress');
}

function showToast(msg) {
  const toast = document.getElementById('toastMessage');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ══════════════════════════════════
//  MULTIPLAYER ARENA ENGINE
// ══════════════════════════════════

let pvp = {
  active: false,
  round: 1,
  maxRounds: 3,
  playerWins: 0,
  rivalWins: 0,
  currentSentence: '',
  playerTyped: '',
  rivalCharIndex: 0,
  rivalInterval: null,
  rivalWpm: 90,
  sentenceStartTime: 0
};

function initMultiplayer() {
  pvp = {
    active: true,
    round: 1,
    maxRounds: 3,
    playerWins: 0,
    rivalWins: 0,
    currentSentence: '',
    playerTyped: '',
    rivalCharIndex: 0,
    rivalInterval: null,
    rivalWpm: currentMatchOpponent ? currentMatchOpponent.wpm : 95,
    sentenceStartTime: Date.now()
  };

  const opp = currentMatchOpponent || { name: 'Random Typist', avatar: '🥷', flag: 'LIVE', wpm: 90 };
  document.getElementById('pvpPlayerName').textContent = (playerName || 'YOU').toUpperCase();
  document.getElementById('pvpRivalName').textContent = opp.name.toUpperCase();
  document.getElementById('pvpRivalAvatar').textContent = opp.avatar;
  document.getElementById('pvpRivalSub').textContent = `LIVE RIVAL • ${opp.flag}`;
  document.getElementById('pvpRound').textContent = `${pvp.round}/${pvp.maxRounds}`;
  document.getElementById('pvpPlayerWPM').textContent = '0';
  document.getElementById('pvpAccuracy').textContent = '100%';
  document.getElementById('pvpGap').textContent = 'TIED';
  document.getElementById('pvpRivalScore').textContent = `Wins: 0`;
  document.getElementById('pvpPlayerScore').textContent = `Wins: 0`;

  startMultiplayerRound();

  const input = document.getElementById('pvpInput');
  input.value = '';
  input.disabled = false;
  input.focus();
  input.oninput = handleMultiplayerInput;
}

function startMultiplayerRound() {
  if (pvp.serverSentence) {
    pvp.currentSentence = pvp.serverSentence;
    pvp.serverSentence = null;
  } else {
    pvp.currentSentence = getRandomSentence('guinness');
  }
  pvp.playerTyped = '';
  pvp.rivalCharIndex = 0;
  pvp.sentenceStartTime = Date.now();

  const input = document.getElementById('pvpInput');
  input.value = '';
  input.disabled = false;
  input.focus();

  const display = document.getElementById('pvpSentenceDisplay');
  renderSentenceDisplay(display, pvp.currentSentence, '');

  updateMultiplayerProgress();

  if (pvp.rivalInterval) clearTimeout(pvp.rivalInterval);

  // If not real peer, simulate live rival with natural human speed & rhythm
  if (!isRealPeerConnected) {
    const targetWpm = pvp.rivalWpm;
    const baseInterval = Math.round(12000 / targetWpm);

    let nextTick = baseInterval;
    function rivalStep() {
      if (!gameActive || currentMode !== 'pvp') return;

      pvp.rivalCharIndex++;

      const jitter = Math.floor(Math.sin(Date.now() / 300) * 8);
      const currentReadout = Math.max(40, targetWpm + jitter);
      document.getElementById('pvpRivalWPM').textContent = `${currentReadout} WPM`;

      updateMultiplayerProgress();

      if (pvp.rivalCharIndex >= pvp.currentSentence.length) {
        multiplayerRoundFinished('rival');
      } else {
        const isSpace = pvp.currentSentence[pvp.rivalCharIndex] === ' ';
        nextTick = isSpace ? baseInterval * 1.5 : (baseInterval + (Math.random() - 0.5) * 30);
        pvp.rivalInterval = setTimeout(rivalStep, Math.max(25, nextTick));
      }
    }
    pvp.rivalInterval = setTimeout(rivalStep, baseInterval);
  }
}

function handleMultiplayerInput(e) {
  if (!gameActive || currentMode !== 'pvp') return;
  const val = e.target.value;
  pvp.playerTyped = val;
  const sentence = pvp.currentSentence;

  stats.totalKeys++;

  const lastIdx = val.length - 1;
  if (lastIdx >= 0) {
    if (val[lastIdx] === sentence[lastIdx]) {
      stats.correctKeys++;
      stats.combo++;
      if (stats.combo > stats.maxCombo) stats.maxCombo = stats.combo;
      playSound('keypress');
    } else {
      stats.combo = 0;
      playSound('error');
    }
  }

  const display = document.getElementById('pvpSentenceDisplay');
  renderSentenceDisplay(display, sentence, val);

  const elapsedSecs = (Date.now() - pvp.sentenceStartTime) / 1000;
  const playerWords = val.length / 5;
  const playerWpm = elapsedSecs > 0 ? Math.round((playerWords / elapsedSecs) * 60) : 0;
  document.getElementById('pvpPlayerWPM').textContent = playerWpm;

  const acc = stats.totalKeys > 0 ? Math.round((stats.correctKeys / stats.totalKeys) * 100) : 100;
  document.getElementById('pvpAccuracy').textContent = acc + '%';

  // Broadcast progress to real peers (WebSocket + BroadcastChannel)
  if (isRealPeerConnected) {
    if (liveWs && wsConnected && liveWs.readyState === WebSocket.OPEN) {
      liveWs.send(JSON.stringify({
        type: 'progress',
        charIndex: val.length,
        wpm: playerWpm
      }));
    }
    if (liveChannel) {
      liveChannel.postMessage({
        type: 'peer_progress',
        charIndex: val.length,
        wpm: playerWpm
      });
    }
  }

  updateMultiplayerProgress();

  if (val === sentence) {
    if (pvp.rivalInterval) clearTimeout(pvp.rivalInterval);
    stats.wordsTyped += sentence.split(' ').length;
    stats.score += 2500 + playerWpm * 20;
    playSound('win');
    triggerScreenFlash('rgba(0, 240, 255, 0.4)');
    triggerScreenShake(4, 200);
    spawnWordParticles(e.target);
    showComboFire(e.target.closest('.typing-area'), stats.combo);
    multiplayerRoundFinished('player');
  }
}

function updateMultiplayerProgress() {
  const totalChars = pvp.currentSentence.length;
  if (totalChars === 0) return;

  const rivalPct = Math.min((pvp.rivalCharIndex / totalChars) * 100, 100);
  const playerPct = Math.min((pvp.playerTyped.length / totalChars) * 100, 100);

  const rivalFill = document.getElementById('pvpRivalFill');
  const rivalRunner = document.getElementById('pvpRivalRunner');
  const rivalProgress = document.getElementById('pvpRivalProgress');

  if (rivalFill) rivalFill.style.width = rivalPct + '%';
  if (rivalRunner) rivalRunner.style.left = rivalPct + '%';
  if (rivalProgress) rivalProgress.textContent = Math.round(rivalPct) + '%';

  const playerFill = document.getElementById('pvpPlayerFill');
  const playerRunner = document.getElementById('pvpPlayerRunner');
  const playerProgress = document.getElementById('pvpPlayerProgress');

  if (playerFill) playerFill.style.width = playerPct + '%';
  if (playerRunner) playerRunner.style.left = playerPct + '%';
  if (playerProgress) playerProgress.textContent = Math.round(playerPct) + '%';

  const charDiff = pvp.playerTyped.length - pvp.rivalCharIndex;
  const needle = document.getElementById('pvpNeedle');
  const gapEl = document.getElementById('pvpGap');

  const needlePct = Math.max(0, Math.min(100, 50 + (charDiff / 25) * 50));
  if (needle) needle.style.left = needlePct + '%';

  if (gapEl) {
    if (charDiff > 0) {
      gapEl.textContent = `+${charDiff} CHARS AHEAD`;
      gapEl.style.color = 'var(--neon-green)';
    } else if (charDiff < 0) {
      gapEl.textContent = `${Math.abs(charDiff)} CHARS BEHIND`;
      gapEl.style.color = 'var(--neon-pink)';
    } else {
      gapEl.textContent = 'TIED';
      gapEl.style.color = '#fff';
    }
  }
}

function multiplayerRoundFinished(winner) {
  const input = document.getElementById('pvpInput');
  input.disabled = true;

  if (winner === 'player') {
    pvp.playerWins++;
    document.getElementById('pvpPlayerScore').textContent = `Wins: ${pvp.playerWins}`;
    triggerScreenFlash('rgba(57, 255, 20, 0.4)');
  } else {
    pvp.rivalWins++;
    document.getElementById('pvpRivalScore').textContent = `Wins: ${pvp.rivalWins}`;
    playSound('gameover');
    triggerScreenFlash('rgba(255, 46, 139, 0.3)');
  }

  // If playing real peer over live server and player won, notify server to sync round
  if (isRealPeerConnected && liveWs && wsConnected && liveWs.readyState === WebSocket.OPEN && winner === 'player') {
    liveWs.send(JSON.stringify({ type: 'next_round', round: pvp.round + 1 }));
  }

  setTimeout(() => {
    if (!gameActive || currentMode !== 'pvp') return;

    if (pvp.round >= pvp.maxRounds || pvp.playerWins >= 2 || pvp.rivalWins >= 2) {
      endGame('pvp');
    } else {
      pvp.round++;
      document.getElementById('pvpRound').textContent = `${pvp.round}/${pvp.maxRounds}`;
      startMultiplayerRound();
    }
  }, 1400);
}

// ── Live Emote Reactions ──
function sendLiveEmote(emoji) {
  spawnFloatingEmote(emoji, 'player');
  playSound('keypress');

  if (isRealPeerConnected) {
    if (liveWs && wsConnected && liveWs.readyState === WebSocket.OPEN) {
      liveWs.send(JSON.stringify({ type: 'emote', emoji: emoji }));
    }
    if (liveChannel) {
      liveChannel.postMessage({ type: 'peer_emote', emoji: emoji });
    }
  }

  // Simulated occasional opponent reaction
  if (!isRealPeerConnected && Math.random() < 0.6) {
    setTimeout(() => {
      const reactions = ['🔥', '⚡', '🏎️', '👑'];
      const pick = reactions[Math.floor(Math.random() * reactions.length)];
      spawnFloatingEmote(pick, 'rival');
    }, 700 + Math.random() * 800);
  }
}

function spawnFloatingEmote(emoji, sender = 'player') {
  const layer = document.getElementById('floatingEmotesLayer');
  if (!layer) return;

  const el = document.createElement('div');
  el.className = 'floating-emote';
  el.textContent = emoji;
  el.style.left = sender === 'player' ? `${35 + Math.random() * 20}%` : `${55 + Math.random() * 20}%`;
  el.style.bottom = '20px';
  layer.appendChild(el);
  setTimeout(() => el.remove(), 1600);
}

// ══════════════════════════════════
//  MODE 0: GUINNESS 300 WPM DUEL
// ══════════════════════════════════

let guinness = {};

function initGuinness() {
  guinness = {
    round: 1,
    maxRounds: 3,
    playerWins: 0,
    botWins: 0,
    currentSentence: '',
    playerTyped: '',
    botCharIndex: 0,
    botInterval: null,
    botWpm: 300,
    sentenceStartTime: Date.now(),
  };

  document.getElementById('guinnessPlayerName').textContent = (playerName || 'YOU').toUpperCase();
  document.getElementById('guinnessRound').textContent = `${guinness.round}/${guinness.maxRounds}`;
  document.getElementById('guinnessWPM').textContent = '0';
  document.getElementById('guinnessAccuracy').textContent = '100%';
  document.getElementById('guinnessGap').textContent = 'TIED';
  document.getElementById('guinnessBotScore').textContent = `Wins: 0`;
  document.getElementById('guinnessPlayerScore').textContent = `Wins: 0`;

  startGuinnessRound();

  const input = document.getElementById('guinnessInput');
  input.value = '';
  input.disabled = false;
  input.focus();
  input.oninput = handleGuinnessInput;
}

function startGuinnessRound() {
  guinness.currentSentence = getRandomSentence('guinness');
  guinness.playerTyped = '';
  guinness.botCharIndex = 0;
  guinness.sentenceStartTime = Date.now();

  const input = document.getElementById('guinnessInput');
  input.value = '';
  input.disabled = false;
  input.focus();

  const display = document.getElementById('guinnessSentenceDisplay');
  renderSentenceDisplay(display, guinness.currentSentence, '');

  updateGuinnessProgress();

  if (guinness.botInterval) clearInterval(guinness.botInterval);

  // 300 WPM = 5 words/sec = 25 characters/sec => 1 char every 40ms
  guinness.botInterval = setInterval(() => {
    if (!gameActive) return;

    guinness.botCharIndex++;

    // Realistic jitter around 300 WPM (294-308 WPM)
    const jitter = Math.floor((Math.sin(Date.now() / 150) + Math.cos(Date.now() / 280)) * 6);
    guinness.botWpm = 300 + jitter;
    document.getElementById('guinnessBotWPM').textContent = `${guinness.botWpm} WPM`;

    updateGuinnessProgress();

    // Check if bot finished sentence
    if (guinness.botCharIndex >= guinness.currentSentence.length) {
      clearInterval(guinness.botInterval);
      guinnessRoundFinished('bot');
    }
  }, 40);
}

function handleGuinnessInput(e) {
  if (!gameActive) return;
  const val = e.target.value;
  guinness.playerTyped = val;
  const sentence = guinness.currentSentence;

  stats.totalKeys++;

  const lastIdx = val.length - 1;
  if (lastIdx >= 0) {
    if (val[lastIdx] === sentence[lastIdx]) {
      stats.correctKeys++;
      stats.combo++;
      if (stats.combo > stats.maxCombo) stats.maxCombo = stats.combo;
      playSound('keypress');
    } else {
      stats.combo = 0;
      playSound('error');
    }
  }

  // Update sentence visual display
  const display = document.getElementById('guinnessSentenceDisplay');
  renderSentenceDisplay(display, sentence, val);

  // Player live WPM
  const elapsedSecs = (Date.now() - guinness.sentenceStartTime) / 1000;
  const playerWords = val.length / 5;
  const playerWpm = elapsedSecs > 0 ? Math.round((playerWords / elapsedSecs) * 60) : 0;
  document.getElementById('guinnessWPM').textContent = playerWpm;

  const acc = stats.totalKeys > 0 ? Math.round((stats.correctKeys / stats.totalKeys) * 100) : 100;
  document.getElementById('guinnessAccuracy').textContent = acc + '%';

  updateGuinnessProgress();

  // Check if player completed sentence correctly
  if (val === sentence) {
    clearInterval(guinness.botInterval);
    stats.wordsTyped += sentence.split(' ').length;
    stats.score += 2000 + playerWpm * 15;
    playSound('win');
    triggerScreenFlash('rgba(0, 240, 255, 0.4)');
    triggerScreenShake(4, 200);
    spawnWordParticles(e.target);
    showComboFire(e.target.closest('.typing-area'), stats.combo);
    guinnessRoundFinished('player');
  }
}

function updateGuinnessProgress() {
  const totalChars = guinness.currentSentence.length;
  if (totalChars === 0) return;

  const botPct = Math.min((guinness.botCharIndex / totalChars) * 100, 100);
  const playerPct = Math.min((guinness.playerTyped.length / totalChars) * 100, 100);

  document.getElementById('guinnessBotFill').style.width = botPct + '%';
  document.getElementById('guinnessBotRunner').style.left = botPct + '%';
  document.getElementById('guinnessBotProgress').textContent = Math.round(botPct) + '%';

  document.getElementById('guinnessPlayerFill').style.width = playerPct + '%';
  document.getElementById('guinnessPlayerRunner').style.left = playerPct + '%';
  document.getElementById('guinnessPlayerProgress').textContent = Math.round(playerPct) + '%';

  // Gap Needle & Gap Text
  const charDiff = guinness.playerTyped.length - guinness.botCharIndex;
  const needle = document.getElementById('guinnessNeedle');
  const gapEl = document.getElementById('guinnessGap');

  // Needle center is 50%, range -30 chars to +30 chars maps to 0% to 100%
  const needlePct = Math.max(0, Math.min(100, 50 + (charDiff / 30) * 50));
  if (needle) needle.style.left = needlePct + '%';

  if (charDiff > 0) {
    gapEl.textContent = `+${charDiff} CHARS AHEAD`;
    gapEl.style.color = 'var(--neon-green)';
  } else if (charDiff < 0) {
    gapEl.textContent = `${Math.abs(charDiff)} CHARS BEHIND`;
    gapEl.style.color = 'var(--neon-orange)';
  } else {
    gapEl.textContent = 'TIED';
    gapEl.style.color = '#fff';
  }
}

function guinnessRoundFinished(winner) {
  const input = document.getElementById('guinnessInput');
  input.disabled = true;

  if (winner === 'player') {
    guinness.playerWins++;
    document.getElementById('guinnessPlayerScore').textContent = `Wins: ${guinness.playerWins}`;
    triggerScreenFlash('rgba(57, 255, 20, 0.4)');
  } else {
    guinness.botWins++;
    document.getElementById('guinnessBotScore').textContent = `Wins: ${guinness.botWins}`;
    playSound('gameover');
    triggerScreenFlash('rgba(255, 58, 58, 0.3)');
  }

  setTimeout(() => {
    if (!gameActive) return;

    if (guinness.round >= guinness.maxRounds || guinness.playerWins >= 2 || guinness.botWins >= 2) {
      endGame('guinness');
    } else {
      guinness.round++;
      document.getElementById('guinnessRound').textContent = `${guinness.round}/${guinness.maxRounds}`;
      startGuinnessRound();
    }
  }, 1400);
}

// ══════════════════════════════════
//  MODE 1: SPEED RACER
// ══════════════════════════════════

let racer = {};

function initRacer() {
  racer = {
    timeLeft: 60,
    playerPos: 2,
    aiPos: 2,
    playerSpeed: 0,
    aiSpeed: 0,
    aiTargetSpeed: 30,
    currentWord: '',
    currentSentence: '',
    wordsPerMinute: 0,
  };

  const displayEl = document.getElementById('racerWordDisplay');

  if (contentType === 'sentences') {
    racer.currentSentence = getRandomSentence('racing');
    renderSentenceDisplay(displayEl, racer.currentSentence, '');
  } else {
    displayEl.innerHTML = '<span class="current-word" id="racerCurrentWord"></span>';
    racer.currentWord = getRandomWord('easy');
    document.getElementById('racerCurrentWord').textContent = racer.currentWord;
  }

  const input = document.getElementById('racerInput');
  input.value = '';
  input.placeholder = contentType === 'sentences' ? 'Type the sentence above to accelerate...' : 'Type the word above...';
  input.focus();
  document.getElementById('playerCar').style.left = '2%';
  document.getElementById('aiCar').style.left = '2%';
  document.getElementById('racerWPM').textContent = '0';
  document.getElementById('racerAccuracy').textContent = '100%';
  document.getElementById('racerScore').textContent = '0';
  document.getElementById('racerCombo').textContent = 'x1';
  document.getElementById('racerTime').textContent = formatTime(racer.timeLeft);

  input.oninput = handleRacerInput;

  gameTimer = setInterval(() => {
    racer.timeLeft--;
    const timeEl = document.getElementById('racerTime');
    timeEl.textContent = formatTime(racer.timeLeft);
    if (racer.timeLeft <= 10) timeEl.classList.add('urgent');
    if (racer.timeLeft <= 0) endGame('racer');
  }, 1000);

  gameLoop = setInterval(updateRacer, 50);
}

function handleRacerInput(e) {
  if (!gameActive) return;

  if (contentType === 'sentences') {
    const val = e.target.value;
    const sentence = racer.currentSentence;
    stats.totalKeys++;

    const lastIdx = val.length - 1;
    if (lastIdx >= 0) {
      if (val[lastIdx] === sentence[lastIdx]) {
        stats.correctKeys++;
        stats.combo++;
        if (stats.combo > stats.maxCombo) stats.maxCombo = stats.combo;
        racer.playerSpeed = Math.min(racer.playerSpeed + 4.5, 320);
        playSound('keypress');
      } else {
        stats.combo = 0;
        playSound('error');
      }
    }

    const displayEl = document.getElementById('racerWordDisplay');
    renderSentenceDisplay(displayEl, sentence, val);

    if (val === sentence) {
      stats.wordsTyped += sentence.split(' ').length;
      stats.score += 1500;
      racer.playerSpeed = Math.min(racer.playerSpeed + 60, 350);

      e.target.value = '';
      playSound('correct');
      spawnWordParticles(e.target);
      showComboFire(e.target.closest('.typing-area'), stats.combo);

      const car = document.getElementById('playerCar');
      car.classList.add('boosting');
      setTimeout(() => car.classList.remove('boosting'), 400);

      document.getElementById('playerFlame').classList.add('active');
      setTimeout(() => document.getElementById('playerFlame').classList.remove('active'), 600);

      racer.currentSentence = getRandomSentence('racing');
      renderSentenceDisplay(displayEl, racer.currentSentence, '');
    }

    updateRacerHUD();
    return;
  }

  // Words mode
  const val = e.target.value.trim().toLowerCase();
  const word = racer.currentWord.toLowerCase();

  stats.totalKeys++;

  if (word.startsWith(val)) {
    e.target.classList.remove('error');
    stats.correctKeys++;
  } else {
    e.target.classList.add('error');
    playSound('error');
    stats.combo = 0;
    triggerScreenShake(2, 100);
  }

  if (val === word) {
    stats.wordsTyped++;
    stats.combo++;
    if (stats.combo > stats.maxCombo) stats.maxCombo = stats.combo;

    const comboMultiplier = Math.min(stats.combo, 10);
    const wordScore = word.length * 10 * comboMultiplier;
    stats.score += wordScore;

    racer.playerSpeed = Math.min(racer.playerSpeed + 15 + comboMultiplier * 2, 300);

    e.target.value = '';
    e.target.classList.remove('error');
    e.target.classList.add('success');
    setTimeout(() => e.target.classList.remove('success'), 200);

    playSound('correct');
    if (stats.combo > 0 && stats.combo % 5 === 0) {
      playSound('combo');
      triggerScreenFlash('rgba(57, 255, 20, 0.2)');
    }

    // Visual effects
    spawnWordParticles(e.target);
    showComboFire(e.target.closest('.typing-area'), stats.combo);
    showScoreFloat(e.target.closest('.typing-area'), wordScore);

    // Car boost animation
    const car = document.getElementById('playerCar');
    car.classList.add('boosting');
    setTimeout(() => car.classList.remove('boosting'), 200);

    const diff = racer.timeLeft > 40 ? 'easy' : racer.timeLeft > 20 ? 'medium' : 'hard';
    racer.currentWord = getRandomWord(diff);
    const wordEl = document.getElementById('racerCurrentWord');
    if (wordEl) {
      wordEl.textContent = racer.currentWord;
      animateWordChange(wordEl);
    }

    updateRacerHUD();

    document.getElementById('playerFlame').classList.add('active');
    setTimeout(() => document.getElementById('playerFlame').classList.remove('active'), 500);
  }
}

function updateRacer() {
  if (!gameActive) return;

  const elapsed = 60 - racer.timeLeft;

  // Bot target speed according to botDifficulty
  if (botDifficulty === 'guinness') {
    racer.aiTargetSpeed = 300 + Math.sin(elapsed * 2) * 8; // 300 WPM / km/h Guinness pace!
  } else if (botDifficulty === 'master') {
    racer.aiTargetSpeed = 150 + Math.sin(elapsed) * 5;
  } else if (botDifficulty === 'rookie') {
    racer.aiTargetSpeed = 40 + Math.sin(elapsed * 0.5) * 4;
  } else {
    racer.aiTargetSpeed = 80 + Math.sin(elapsed * 0.5) * 6;
  }

  racer.aiSpeed = lerp(racer.aiSpeed, racer.aiTargetSpeed, 0.05);
  racer.playerSpeed = Math.max(racer.playerSpeed * 0.97, 0);

  const speedFactor = 0.003;
  racer.playerPos = Math.min(racer.playerPos + racer.playerSpeed * speedFactor, 88);
  racer.aiPos = Math.min(racer.aiPos + racer.aiSpeed * speedFactor, 88);

  document.getElementById('playerCar').style.left = racer.playerPos + '%';
  document.getElementById('aiCar').style.left = racer.aiPos + '%';
  document.getElementById('playerSpeed').textContent = Math.round(racer.playerSpeed) + ' km/h';
  document.getElementById('aiSpeed').textContent = Math.round(racer.aiSpeed) + ' km/h';

  // Speed color
  const pSpeedEl = document.getElementById('playerSpeed');
  if (racer.playerSpeed > 200) pSpeedEl.style.color = 'var(--neon-green)';
  else if (racer.playerSpeed > 100) pSpeedEl.style.color = 'var(--neon-yellow)';
  else pSpeedEl.style.color = 'var(--neon-orange)';

  if (racer.aiSpeed > 30) {
    document.getElementById('aiFlame').classList.add('active');
  } else {
    document.getElementById('aiFlame').classList.remove('active');
  }

  const mins = (Date.now() - stats.startTime) / 60000;
  if (mins > 0) racer.wordsPerMinute = Math.round(stats.wordsTyped / mins);
  document.getElementById('racerWPM').textContent = racer.wordsPerMinute;

  if (racer.playerPos >= 88 || racer.aiPos >= 88) endGame('racer');
}

function updateRacerHUD() {
  const acc = stats.totalKeys > 0 ? Math.round((stats.correctKeys / stats.totalKeys) * 100) : 100;
  document.getElementById('racerAccuracy').textContent = acc + '%';
  document.getElementById('racerScore').textContent = stats.score;
  document.getElementById('racerCombo').textContent = 'x' + Math.min(stats.combo, 10);
  bumpHudValue('racerScore');
}

// ══════════════════════════════════
//  MODE 2: WORD FIGHTER
// ══════════════════════════════════

let fighter = {};

function initFighter() {
  fighter = {
    playerHP: 100,
    enemyHP: 100,
    round: 1,
    maxRounds: 3,
    timeLeft: 45,
    currentWord: '',
    currentSentence: '',
    enemyAttackInterval: null,
    roundWins: 0,
    roundLosses: 0,
  };

  document.getElementById('playerFighterName').textContent = (playerName || 'YOU').toUpperCase();
  document.getElementById('playerSprite').classList.add('idle');
  document.getElementById('enemySprite').classList.add('idle');

  const displayEl = document.getElementById('fighterWordDisplay');
  if (contentType === 'sentences') {
    fighter.currentSentence = getRandomSentence('fighter');
    renderSentenceDisplay(displayEl, fighter.currentSentence, '');
  } else {
    displayEl.innerHTML = '<span class="current-word" id="fighterCurrentWord"></span>';
    fighter.currentWord = getRandomWord('easy');
    document.getElementById('fighterCurrentWord').textContent = fighter.currentWord;
  }

  const input = document.getElementById('fighterInput');
  input.value = '';
  input.placeholder = contentType === 'sentences' ? 'Type the sentence to unleash combos!' : 'Type to attack!';
  input.focus();
  document.getElementById('fighterRound').textContent = `${fighter.round}/${fighter.maxRounds}`;
  document.getElementById('fighterTime').textContent = formatTime(fighter.timeLeft);

  updateFighterHealth();
  input.oninput = handleFighterInput;

  gameTimer = setInterval(() => {
    fighter.timeLeft--;
    const timeEl = document.getElementById('fighterTime');
    timeEl.textContent = formatTime(fighter.timeLeft);
    if (fighter.timeLeft <= 10) timeEl.classList.add('urgent');
    if (fighter.timeLeft <= 0) checkRoundEnd();
  }, 1000);

  const attackInterval = botDifficulty === 'guinness' ? 1200 : botDifficulty === 'master' ? 1700 : (2500 - (fighter.round * 300));
  fighter.enemyAttackInterval = setInterval(() => {
    if (!gameActive) return;
    enemyAttack();
  }, attackInterval);
}

function handleFighterInput(e) {
  if (!gameActive) return;

  if (contentType === 'sentences') {
    const val = e.target.value;
    const sentence = fighter.currentSentence;
    stats.totalKeys++;

    const lastIdx = val.length - 1;
    if (lastIdx >= 0) {
      if (val[lastIdx] === sentence[lastIdx]) {
        stats.correctKeys++;
        stats.combo++;
        if (stats.combo > stats.maxCombo) stats.maxCombo = stats.combo;
        playSound('keypress');
        if (val[lastIdx] === ' ') {
          playerAttack(6);
        }
      } else {
        stats.combo = 0;
        playSound('error');
      }
    }

    const displayEl = document.getElementById('fighterWordDisplay');
    renderSentenceDisplay(displayEl, sentence, val);

    if (val === sentence) {
      stats.wordsTyped += sentence.split(' ').length;
      stats.score += 2000;
      // Massive super combo finisher move
      playerAttack(35 + Math.min(stats.combo, 15) * 2);

      e.target.value = '';
      playSound('hit');
      spawnWordParticles(e.target);
      showComboFire(e.target.closest('.typing-area'), stats.combo);

      fighter.currentSentence = getRandomSentence('fighter');
      renderSentenceDisplay(displayEl, fighter.currentSentence, '');
    }

    const mins = (Date.now() - stats.startTime) / 60000;
    if (mins > 0) {
      document.getElementById('fighterWPM').textContent = Math.round(stats.wordsTyped / mins);
    }
    return;
  }

  // Words mode
  const val = e.target.value.trim().toLowerCase();
  const word = fighter.currentWord.toLowerCase();

  stats.totalKeys++;

  if (word.startsWith(val)) {
    e.target.classList.remove('error');
    stats.correctKeys++;
  } else {
    e.target.classList.add('error');
    playSound('error');
    stats.combo = 0;
  }

  if (val === word) {
    stats.wordsTyped++;
    stats.combo++;
    if (stats.combo > stats.maxCombo) stats.maxCombo = stats.combo;

    const comboMult = Math.min(stats.combo, 10);
    const damage = word.length * 2 + comboMult * 3;
    stats.score += damage * 10;

    playerAttack(damage);

    e.target.value = '';
    e.target.classList.remove('error');
    playSound('hit');

    spawnWordParticles(e.target);
    showComboFire(e.target.closest('.typing-area'), stats.combo);

    const diff = fighter.round === 1 ? 'easy' : fighter.round === 2 ? 'medium' : 'hard';
    fighter.currentWord = getRandomWord(diff);
    const wordEl = document.getElementById('fighterCurrentWord');
    if (wordEl) {
      wordEl.textContent = fighter.currentWord;
      animateWordChange(wordEl);
    }

    document.getElementById('fighterScore').textContent = stats.score;
    document.getElementById('fighterCombo').textContent = 'x' + comboMult;
    bumpHudValue('fighterScore');

    const mins = (Date.now() - stats.startTime) / 60000;
    if (mins > 0) {
      document.getElementById('fighterWPM').textContent = Math.round(stats.wordsTyped / mins);
    }
  }
}

function playerAttack(damage) {
  fighter.enemyHP = Math.max(fighter.enemyHP - damage, 0);
  updateFighterHealth();

  const pSprite = document.getElementById('playerSprite');
  const eSprite = document.getElementById('enemySprite');

  pSprite.classList.remove('idle');
  pSprite.classList.add('attacking');
  setTimeout(() => {
    pSprite.classList.remove('attacking');
    eSprite.classList.remove('idle');
    eSprite.classList.add('hit');
    triggerScreenShake(3, 150);
    spawnImpactSparks('enemy');
    setTimeout(() => {
      eSprite.classList.remove('hit');
      eSprite.classList.add('idle');
      pSprite.classList.add('idle');
    }, 300);
  }, 150);

  showDamagePopup(damage, 'enemy');

  if (fighter.enemyHP <= 0) {
    triggerScreenFlash('rgba(57, 255, 20, 0.3)');
    checkRoundEnd();
  }
}

function enemyAttack() {
  const baseDamage = 5 + fighter.round * 3;
  const damage = baseDamage + Math.floor(Math.random() * 5);
  fighter.playerHP = Math.max(fighter.playerHP - damage, 0);
  updateFighterHealth();

  const eSprite = document.getElementById('enemySprite');
  const pSprite = document.getElementById('playerSprite');

  eSprite.classList.remove('idle');
  eSprite.classList.add('attacking');
  setTimeout(() => {
    eSprite.classList.remove('attacking');
    pSprite.classList.remove('idle');
    pSprite.classList.add('hit');
    triggerScreenShake(4, 200);
    triggerScreenFlash('rgba(255, 58, 58, 0.2)');
    spawnImpactSparks('player');
    setTimeout(() => {
      pSprite.classList.remove('hit');
      pSprite.classList.add('idle');
      eSprite.classList.add('idle');
    }, 300);
  }, 150);

  showDamagePopup(damage, 'player');
  playSound('error');

  if (fighter.playerHP <= 0) {
    triggerScreenFlash('rgba(255, 58, 58, 0.3)');
    checkRoundEnd();
  }
}

function spawnImpactSparks(target) {
  const arena = document.querySelector('.fight-arena');
  const fighter_el = target === 'enemy' ? document.querySelector('.enemy-fighter') : document.querySelector('.player-fighter');
  const rect = fighter_el.getBoundingClientRect();
  const arenaRect = arena.getBoundingClientRect();

  for (let i = 0; i < 8; i++) {
    const spark = document.createElement('div');
    spark.className = 'impact-spark';
    const angle = rand(0, Math.PI * 2);
    const dist = rand(30, 80);
    spark.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
    spark.style.setProperty('--sy', Math.sin(angle) * dist + 'px');
    const colors = ['#00f0ff', '#ffe640', '#ff2e8b', '#39ff14', '#fff'];
    spark.style.background = colors[randInt(0, colors.length)];
    spark.style.boxShadow = `0 0 6px ${spark.style.background}`;
    spark.style.left = (rect.left - arenaRect.left + rect.width / 2) + 'px';
    spark.style.top = (rect.top - arenaRect.top + rect.height / 2) + 'px';
    arena.appendChild(spark);
    setTimeout(() => spark.remove(), 500);
  }
}

function showDamagePopup(damage, target) {
  const arena = document.querySelector('.fight-arena');
  const popup = document.createElement('div');
  popup.className = 'damage-popup';
  popup.textContent = '-' + damage;

  if (target === 'enemy') {
    popup.style.right = '20%';
    popup.style.top = '30%';
    popup.style.color = 'var(--neon-green)';
  } else {
    popup.style.left = '20%';
    popup.style.top = '30%';
    popup.style.color = 'var(--neon-red)';
  }

  arena.appendChild(popup);
  setTimeout(() => popup.remove(), 1000);
}

function updateFighterHealth() {
  const pH = document.getElementById('playerHealth');
  const eH = document.getElementById('enemyHealth');
  pH.style.width = fighter.playerHP + '%';
  eH.style.width = fighter.enemyHP + '%';
  document.getElementById('playerHealthText').textContent = Math.round(fighter.playerHP);
  document.getElementById('enemyHealthText').textContent = Math.round(fighter.enemyHP);

  // Low health pulse
  if (fighter.playerHP < 25) pH.classList.add('low'); else pH.classList.remove('low');
  if (fighter.enemyHP < 25) eH.classList.add('low'); else eH.classList.remove('low');
}

function checkRoundEnd() {
  if (fighter.enemyHP <= 0) fighter.roundWins++;
  else fighter.roundLosses++;

  if (fighter.round >= fighter.maxRounds || fighter.roundWins >= 2 || fighter.roundLosses >= 2) {
    endGame('fighter');
  } else {
    fighter.round++;
    fighter.playerHP = 100;
    fighter.enemyHP = 100;
    fighter.timeLeft = 45;
    updateFighterHealth();
    document.getElementById('fighterRound').textContent = `${fighter.round}/${fighter.maxRounds}`;
    document.getElementById('fighterTime').classList.remove('urgent');

    clearInterval(fighter.enemyAttackInterval);
    fighter.enemyAttackInterval = setInterval(() => {
      if (!gameActive) return;
      enemyAttack();
    }, 2500 - (fighter.round * 300));
  }
}

// ══════════════════════════════════
//  MODE 3: WORD BLITZ
// ══════════════════════════════════

let blitz = {};

function initBlitz() {
  blitz = {
    timeLeft: 60,
    currentWord: '',
    streak: 0,
    maxStreak: 0,
    wordsCompleted: 0,
    upcomingWords: [],
  };

  for (let i = 0; i < 5; i++) blitz.upcomingWords.push(getRandomWord('mixed'));

  blitz.currentWord = getRandomWord('easy');
  const wordEl = document.getElementById('blitzCurrentWord');
  wordEl.textContent = blitz.currentWord;
  animateWordChange(wordEl);

  const input = document.getElementById('blitzInput');
  input.value = '';
  input.focus();
  document.getElementById('blitzScoreBig').textContent = '0';
  document.getElementById('blitzTime').textContent = formatTime(blitz.timeLeft);
  document.getElementById('blitzWords').textContent = '0';
  document.getElementById('blitzCombo').textContent = 'x1';
  document.getElementById('blitzStreakFill').style.width = '0%';

  renderBlitzQueue();

  input.oninput = handleBlitzInput;

  gameTimer = setInterval(() => {
    blitz.timeLeft--;
    const timeEl = document.getElementById('blitzTime');
    timeEl.textContent = formatTime(blitz.timeLeft);
    if (blitz.timeLeft <= 10) timeEl.classList.add('urgent');
    if (blitz.timeLeft <= 0) endGame('blitz');
  }, 1000);
}

function handleBlitzInput(e) {
  if (!gameActive) return;
  const val = e.target.value.trim().toLowerCase();
  const word = blitz.currentWord.toLowerCase();

  stats.totalKeys++;

  if (word.startsWith(val)) {
    e.target.classList.remove('error');
    stats.correctKeys++;
  } else {
    e.target.classList.add('error');
    playSound('error');
    blitz.streak = 0;
    stats.combo = 0;
    updateBlitzStreak();
  }

  if (val === word) {
    stats.wordsTyped++;
    blitz.wordsCompleted++;
    blitz.streak++;
    stats.combo++;
    if (blitz.streak > blitz.maxStreak) blitz.maxStreak = blitz.streak;
    if (stats.combo > stats.maxCombo) stats.maxCombo = stats.combo;

    const mult = Math.min(Math.floor(blitz.streak / 3) + 1, 8);
    const wordScore = word.length * 15 * mult;
    stats.score += wordScore;

    e.target.value = '';
    e.target.classList.remove('error');
    playSound('correct');

    if (blitz.streak > 0 && blitz.streak % 5 === 0) {
      playSound('combo');
      triggerScreenFlash('rgba(255, 230, 64, 0.2)');
    }

    // Score animation
    const scoreBig = document.getElementById('blitzScoreBig');
    scoreBig.textContent = stats.score;
    if (mult >= 4) {
      scoreBig.classList.add('mega-bump');
      setTimeout(() => scoreBig.classList.remove('mega-bump'), 500);
    } else {
      scoreBig.classList.add('bump');
      setTimeout(() => scoreBig.classList.remove('bump'), 300);
    }

    // Visual effects
    spawnWordParticles(e.target);
    showComboFire(e.target.closest('.typing-area'), stats.combo);
    showScoreFloat(document.querySelector('.blitz-area'), wordScore);

    if (mult >= 3) triggerScreenShake(2, 100);

    blitz.currentWord = blitz.upcomingWords.shift();
    blitz.upcomingWords.push(getRandomWord('mixed'));
    const wordEl = document.getElementById('blitzCurrentWord');
    wordEl.textContent = blitz.currentWord;
    animateWordChange(wordEl);

    updateBlitzHUD();
    updateBlitzStreak();
    renderBlitzQueue();
  }
}

function updateBlitzHUD() {
  const mins = (Date.now() - stats.startTime) / 60000;
  const wpm = mins > 0 ? Math.round(stats.wordsTyped / mins) : 0;
  const acc = stats.totalKeys > 0 ? Math.round((stats.correctKeys / stats.totalKeys) * 100) : 100;
  document.getElementById('blitzWPM').textContent = wpm;
  document.getElementById('blitzAccuracy').textContent = acc + '%';
  document.getElementById('blitzWords').textContent = blitz.wordsCompleted;

  const mult = Math.min(Math.floor(blitz.streak / 3) + 1, 8);
  document.getElementById('blitzCombo').textContent = 'x' + mult;

  const multEl = document.getElementById('blitzMultiplier');
  multEl.textContent = `SCORE  ×${mult}`;
  if (mult >= 3) multEl.classList.add('active'); else multEl.classList.remove('active');
}

function updateBlitzStreak() {
  const pct = Math.min((blitz.streak % 15) / 15 * 100, 100);
  const fill = document.getElementById('blitzStreakFill');
  fill.style.width = pct + '%';
  if (pct > 50) fill.classList.add('glowing'); else fill.classList.remove('glowing');
}

function renderBlitzQueue() {
  const container = document.getElementById('blitzWordQueue');
  container.innerHTML = '';
  blitz.upcomingWords.forEach(w => {
    const el = document.createElement('span');
    el.className = 'blitz-queue-word';
    el.textContent = w;
    container.appendChild(el);
  });
}

// ══════════════════════════════════
//  MODE 4: SURVIVAL
// ══════════════════════════════════

let survival = {};

function initSurvival() {
  survival = {
    lives: 3,
    wave: 1,
    fallingWords: [],
    spawnInterval: null,
    updateInterval: null,
    spawnRate: 2500,
    fallSpeed: 0.3,
    wordsDestroyed: 0,
    targetWord: null,
  };

  document.getElementById('survivalLives').textContent = '❤️'.repeat(survival.lives);
  document.getElementById('survivalWave').textContent = survival.wave;
  document.getElementById('survivalScore').textContent = '0';
  document.getElementById('survivalTyped').textContent = '0';

  const input = document.getElementById('survivalInput');
  input.value = '';
  input.focus();

  const area = document.getElementById('survivalArea');
  area.querySelectorAll('.falling-word').forEach(w => w.remove());

  input.oninput = handleSurvivalInput;

  survival.spawnInterval = setInterval(spawnSurvivalWord, survival.spawnRate);
  survival.updateInterval = setInterval(updateSurvival, 30);

  gameTimer = setInterval(() => {
    if (!gameActive) return;
    survival.wave++;
    survival.spawnRate = Math.max(800, survival.spawnRate - 150);
    survival.fallSpeed = Math.min(survival.fallSpeed + 0.05, 1.5);
    document.getElementById('survivalWave').textContent = survival.wave;
    bumpHudValue('survivalWave');

    clearInterval(survival.spawnInterval);
    survival.spawnInterval = setInterval(spawnSurvivalWord, survival.spawnRate);
  }, 10000);
}

function spawnSurvivalWord() {
  if (!gameActive) return;
  const area = document.getElementById('survivalArea');
  const word = getRandomWord(survival.wave <= 2 ? 'easy' : survival.wave <= 5 ? 'medium' : 'hard');

  const el = document.createElement('div');
  el.className = 'falling-word';
  el.textContent = word;
  el.dataset.word = word;
  el.dataset.y = 0;

  const maxLeft = area.clientWidth - 150;
  el.style.left = Math.max(10, Math.random() * maxLeft) + 'px';
  el.style.top = '0px';

  area.appendChild(el);
  survival.fallingWords.push({ el, word, y: 0 });
}

function handleSurvivalInput(e) {
  if (!gameActive) return;
  const val = e.target.value.trim().toLowerCase();

  stats.totalKeys++;
  stats.correctKeys++;

  let found = false;
  for (const fw of survival.fallingWords) {
    if (fw.word.toLowerCase() === val) {
      fw.el.classList.add('destroyed');
      triggerScreenFlash('rgba(57, 255, 20, 0.1)');
      setTimeout(() => fw.el.remove(), 500);
      survival.fallingWords = survival.fallingWords.filter(w => w !== fw);
      survival.wordsDestroyed++;
      stats.wordsTyped++;
      stats.combo++;
      if (stats.combo > stats.maxCombo) stats.maxCombo = stats.combo;

      const mult = Math.min(stats.combo, 10);
      const wordScore = fw.word.length * 20 * mult;
      stats.score += wordScore;

      e.target.value = '';
      playSound('correct');
      spawnWordParticles(e.target);
      if (stats.combo % 5 === 0) {
        playSound('combo');
        triggerScreenShake(2, 100);
      }

      found = true;
      break;
    }
  }

  // Highlight targeted word
  survival.fallingWords.forEach(fw => {
    if (fw.word.toLowerCase().startsWith(val) && val.length > 0) {
      fw.el.classList.add('targeted');
    } else {
      fw.el.classList.remove('targeted');
    }
  });

  if (found) {
    const mins = (Date.now() - stats.startTime) / 60000;
    const wpm = mins > 0 ? Math.round(stats.wordsTyped / mins) : 0;
    document.getElementById('survivalWPM').textContent = wpm;
    document.getElementById('survivalScore').textContent = stats.score;
    document.getElementById('survivalTyped').textContent = survival.wordsDestroyed;
    bumpHudValue('survivalScore');
  }
}

function updateSurvival() {
  if (!gameActive) return;
  const area = document.getElementById('survivalArea');
  const areaHeight = area.clientHeight - 40;

  const toRemove = [];
  for (const fw of survival.fallingWords) {
    fw.y += survival.fallSpeed;
    fw.el.style.top = fw.y + 'px';

    // Near danger zone visual
    if (fw.y > areaHeight - 60) {
      fw.el.classList.add('near-danger');
    }

    if (fw.y >= areaHeight) {
      toRemove.push(fw);
    }
  }

  for (const fw of toRemove) {
    fw.el.remove();
    survival.fallingWords = survival.fallingWords.filter(w => w !== fw);
    survival.lives--;
    stats.combo = 0;
    document.getElementById('survivalLives').textContent = '❤️'.repeat(Math.max(survival.lives, 0));
    playSound('error');
    triggerScreenShake(5, 250);
    triggerScreenFlash('rgba(255, 58, 58, 0.3)');

    if (survival.lives <= 0) endGame('survival');
  }
}

// ══════════════════════════════════
//  END GAME
// ══════════════════════════════════

function endGame(mode) {
  gameActive = false;
  clearInterval(gameTimer);
  clearInterval(gameLoop);

  if (mode === 'fighter' && fighter.enemyAttackInterval) clearInterval(fighter.enemyAttackInterval);
  if (mode === 'survival') {
    clearInterval(survival.spawnInterval);
    clearInterval(survival.updateInterval);
  }

  // Remove urgent time class
  document.querySelectorAll('.hud-time').forEach(el => el.classList.remove('urgent'));

  const mins = (Date.now() - stats.startTime) / 60000;
  const wpm = mins > 0 ? Math.round(stats.wordsTyped / mins) : 0;
  const acc = stats.totalKeys > 0 ? Math.round((stats.correctKeys / stats.totalKeys) * 100) : 100;

  let title = 'GAME OVER';
  let badge = '🎮';
  let isWin = false;

  switch (mode) {
    case 'pvp':
      isWin = pvp.playerWins > pvp.rivalWins;
      title = isWin ? 'PVP VICTORY!' : 'PVP DEFEATED';
      badge = isWin ? '🏆' : '💀';
      break;
    case 'guinness':
      isWin = guinness.playerWins > guinness.botWins;
      title = isWin ? 'GUINNESS RECORD BROKEN!' : '300 WPM BOT WINS';
      badge = isWin ? '👑' : '⚡';
      break;
    case 'racer':
      isWin = racer.playerPos >= racer.aiPos;
      title = isWin ? 'YOU WIN!' : 'CPU WINS';
      badge = isWin ? '🏆' : '💨';
      break;
    case 'fighter':
      isWin = fighter.roundWins > fighter.roundLosses;
      title = isWin ? 'VICTORY!' : 'DEFEATED';
      badge = isWin ? '⚔️' : '💀';
      break;
    case 'blitz':
      title = 'TIME UP!';
      badge = stats.score > 5000 ? '🔥' : stats.score > 2000 ? '⚡' : '💪';
      isWin = stats.score > 2000;
      break;
    case 'survival':
      title = survival.lives > 0 ? 'SURVIVED!' : 'GAME OVER';
      badge = survival.lives > 0 ? '🛡️' : '☠️';
      isWin = survival.lives > 0;
      break;
  }

  if (isWin) {
    playSound('win');
    triggerScreenFlash('rgba(57, 255, 20, 0.3)');
    spawnBurstParticles(40);
  } else {
    playSound('gameover');
    triggerScreenFlash('rgba(255, 58, 58, 0.3)');
  }

  const titleEl = document.getElementById('gameOverTitle');
  titleEl.textContent = title;
  titleEl.className = 'game-over-title ' + (isWin ? 'win' : 'lose');
  document.getElementById('resultBadge').textContent = badge;

  const statsHTML = `
    <div class="stat-row" style="animation-delay:0.1s"><span class="stat-label">SCORE</span><span class="stat-value">${stats.score.toLocaleString()}</span></div>
    <div class="stat-row" style="animation-delay:0.2s"><span class="stat-label">WPM</span><span class="stat-value">${wpm}</span></div>
    <div class="stat-row" style="animation-delay:0.3s"><span class="stat-label">ACCURACY</span><span class="stat-value">${acc}%</span></div>
    <div class="stat-row" style="animation-delay:0.4s"><span class="stat-label">WORDS TYPED</span><span class="stat-value">${stats.wordsTyped}</span></div>
    <div class="stat-row" style="animation-delay:0.5s"><span class="stat-label">MAX COMBO</span><span class="stat-value">x${stats.maxCombo}</span></div>
    ${mode === 'pvp' ? `<div class="stat-row" style="animation-delay:0.6s"><span class="stat-label">DUEL SCORE</span><span class="stat-value">${pvp.playerWins} - ${pvp.rivalWins}</span></div>` : ''}
    ${mode === 'guinness' ? `<div class="stat-row" style="animation-delay:0.6s"><span class="stat-label">DUEL SCORE</span><span class="stat-value">${guinness.playerWins} - ${guinness.botWins}</span></div>` : ''}
    ${mode === 'fighter' ? `<div class="stat-row" style="animation-delay:0.6s"><span class="stat-label">ROUNDS WON</span><span class="stat-value">${fighter.roundWins}/${fighter.maxRounds}</span></div>` : ''}
    ${mode === 'survival' ? `<div class="stat-row" style="animation-delay:0.6s"><span class="stat-label">WAVE REACHED</span><span class="stat-value">${survival.wave}</span></div>` : ''}
  `;
  document.getElementById('finalStats').innerHTML = statsHTML;

  showOverlay('gameOverOverlay');

  saveScore(mode, {
    name: playerName,
    score: stats.score,
    wpm: wpm,
    accuracy: acc,
    date: new Date().toLocaleDateString(),
    words: stats.wordsTyped,
  });
}

// ── Retry & Menu ──
function retryGame() {
  hideOverlay('gameOverOverlay');
  cleanupGame();
  if (currentMode === 'pvp') {
    startMatchmaking();
  } else {
    startCountdown(currentMode);
  }
}

function goToMenu() {
  hideOverlay('gameOverOverlay');
  cleanupGame();
  showScreen('mainMenu');
}

function cleanupGame() {
  gameActive = false;
  clearInterval(gameTimer);
  clearInterval(gameLoop);
  if (pvp.rivalInterval) clearTimeout(pvp.rivalInterval);
  if (matchmakingTimer) clearInterval(matchmakingTimer);
  if (guinness.botInterval) clearInterval(guinness.botInterval);
  if (fighter.enemyAttackInterval) clearInterval(fighter.enemyAttackInterval);
  if (survival.spawnInterval) clearInterval(survival.spawnInterval);
  if (survival.updateInterval) clearInterval(survival.updateInterval);

  const area = document.getElementById('survivalArea');
  if (area) area.querySelectorAll('.falling-word').forEach(w => w.remove());
  document.querySelectorAll('.damage-popup, .impact-spark, .word-particle, .combo-fire, .score-float, .floating-emote').forEach(p => p.remove());
  document.querySelectorAll('.hud-time').forEach(el => el.classList.remove('urgent'));
}

// ══════════════════════════════════
//  LEADERBOARD
// ══════════════════════════════════

function getLeaderboard(mode) {
  try {
    const data = localStorage.getItem('typerush_lb_' + mode);
    if (data) return JSON.parse(data);
    if (mode === 'pvp') {
      return [
        { name: 'CyberViper 🥷 (USA)', score: 92400, wpm: 128, accuracy: 99, date: 'RANK #1', words: 44 },
        { name: 'ShadowStrike ⚡ (JPN)', score: 86100, wpm: 122, accuracy: 98, date: 'RANK #2', words: 41 },
        { name: 'NitroPhantom 🏎️ (GER)', score: 79500, wpm: 114, accuracy: 98, date: 'RANK #3', words: 38 },
        { name: 'CosmicRacer 🚀 (IND)', score: 68000, wpm: 104, accuracy: 97, date: 'RANK #4', words: 35 }
      ];
    }
    if (mode === 'guinness') {
      return [
        { name: 'Guinness Titan 🤖⚡', score: 98500, wpm: 300, accuracy: 100, date: 'WORLD RECORD', words: 45 },
        { name: 'Sean Wrona 👑', score: 85200, wpm: 256, accuracy: 99, date: 'PRO RECORD', words: 42 },
        { name: 'Barbara Blackburn 📜', score: 71000, wpm: 212, accuracy: 99, date: 'DVORAK PEAK', words: 38 },
        { name: 'CyberDemon ⚡', score: 58000, wpm: 184, accuracy: 97, date: 'HALL OF FAME', words: 32 }
      ];
    }
    return [];
  } catch { return []; }
}

function saveScore(mode, entry) {
  const lb = getLeaderboard(mode);
  lb.push(entry);
  lb.sort((a, b) => b.score - a.score);
  localStorage.setItem('typerush_lb_' + mode, JSON.stringify(lb.slice(0, 50)));
}

function showLeaderboard() {
  showScreen('leaderboardScreen');
  switchLeaderboard('pvp');
}

function switchLeaderboard(mode) {
  document.querySelectorAll('.lb-tab').forEach(t => t.classList.remove('active'));
  const tabEl = document.getElementById('lbTab' + mode.charAt(0).toUpperCase() + mode.slice(1));
  if (tabEl) tabEl.classList.add('active');

  const lb = getLeaderboard(mode);
  const table = document.getElementById('leaderboardTable');

  if (lb.length === 0) {
    table.innerHTML = '<div class="lb-empty">No scores yet. Go play some games! 🎮</div>';
    return;
  }

  table.innerHTML = lb.map((entry, i) => {
    const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
    const rankIcon = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;
    return `
      <div class="lb-row ${rankClass}" style="animation: statSlideIn 0.4s ${i * 0.05}s both">
        <span class="lb-rank">${rankIcon}</span>
        <span class="lb-name">${escapeHTML(entry.name)}</span>
        <span class="lb-wpm">${entry.wpm} WPM</span>
        <span class="lb-score">${entry.score.toLocaleString()}</span>
      </div>
    `;
  }).join('');
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ── Enter Key to Start ──
document.getElementById('playerNameInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') document.getElementById('btnSpeedRacer').focus();
});

document.querySelectorAll('.typing-input').forEach(input => {
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') e.preventDefault(); });
});

// ── Startup Network & Room Invite Initialization ──
window.addEventListener('DOMContentLoaded', () => {
  initLiveWebSocket();

  // Handle direct ?room=ROOMCODE invite link
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const inviteRoom = urlParams.get('room');
    if (inviteRoom) {
      setTimeout(() => {
        exitIntro();
        const roomInput = document.getElementById('roomCodeInput');
        if (roomInput) roomInput.value = inviteRoom.toUpperCase();
        startMatchmaking(inviteRoom.toUpperCase());
        showToast(`⚔️ Joined Duel Room: ${inviteRoom.toUpperCase()}!`);
      }, 700);
    }
  } catch (err) {
    console.error('Error reading URL params:', err);
  }
});

