
// Pick Your Poison Game Logic

const playBtn = document.getElementById('play-btn');
const howToBtn = document.getElementById('how-to-btn');
const backBtn = document.getElementById('back-btn');
const refreshBtn = document.getElementById('refresh-btn');
const newPackBtn = document.getElementById('new-pack-btn');
const ratingSelect = document.getElementById('rating-select');

const introSection = document.getElementById('intro');
const gameSection = document.getElementById('game');
const howToSection = document.getElementById('how-to');

const promptA = document.getElementById('prompt-a');
const promptB = document.getElementById('prompt-b');

let prompts = [];
let currentRating = 'pg13';

// Load prompts dynamically
async function loadPrompts(rating = 'pg13') {
  let fileName = 'prompts.json';
  if (rating === 'mature') fileName = 'prompts_mature.json';
  if (rating === 'r') fileName = 'prompts_r.json';

  try {
    const res = await fetch(fileName);
    const data = await res.json();
    prompts = data.prompts || [];
    pickPrompts();
  } catch (error) {
    console.error('Error loading prompts:', error);
  }
}

// Pick two random, different prompts to display
function pickPrompts() {
  if (prompts.length < 2) {
    promptA.textContent = 'Error loading prompts.';
    promptB.textContent = '';
    return;
  }

  let indexA = Math.floor(Math.random() * prompts.length);
  let indexB;
  do {
    indexB = Math.floor(Math.random() * prompts.length);
  } while (indexB === indexA);

  promptA.textContent = prompts[indexA];
  promptB.textContent = prompts[indexB];
}

// Event Listeners
playBtn.addEventListener('click', () => {
  introSection.classList.add('hidden');
  gameSection.classList.remove('hidden');
  howToSection.classList.add('hidden');
  loadPrompts(currentRating);
});

howToBtn.addEventListener('click', () => {
  introSection.classList.add('hidden');
  howToSection.classList.remove('hidden');
  gameSection.classList.add('hidden');
});

backBtn.addEventListener('click', () => {
  introSection.classList.remove('hidden');
  howToSection.classList.add('hidden');
  gameSection.classList.add('hidden');
});

refreshBtn.addEventListener('click', pickPrompts);

newPackBtn.addEventListener('click', () => {
  loadPrompts(currentRating);
});

ratingSelect.addEventListener('change', (e) => {
  currentRating = e.target.value;
  loadPrompts(currentRating);
});

// Initialize default rating
loadPrompts(currentRating);
