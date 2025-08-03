// Select elements
const minuteInput = document.getElementById('minutes');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const countdownDisplay = document.getElementById('Countdown').querySelector('p');
const fullscreenTimer = document.getElementById('fullscreenTimer');
const fullscreenContainer = document.getElementById('fullscreenContainer');
const exitFullscreenBtn = document.getElementById('exitFullscreenBtn');
const fullScreenBtn = document.getElementById('fullScreenBtn');
const zoomControls = document.querySelector('.zoom-controls');
const inputControls = document.querySelector('.input-section');

let countdownInterval;
let currentTimeLeft = 0;

// Start countdown
startButton.addEventListener('click', () => {
  const minutes = parseInt(minuteInput.value, 10);

  if (isNaN(minutes) || minutes <= 0) {
    alert('Please enter a valid number greater than 0');
    return;
  }

  currentTimeLeft = minutes * 60;
  updateDisplay(currentTimeLeft);

  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    currentTimeLeft--;

    if (currentTimeLeft < 0) {
      clearInterval(countdownInterval);
      countdownDisplay.textContent = 'Time is up!';
      fullscreenTimer.textContent = 'Time is up!';
      if (typeof triggerCelebration === 'function') {
        triggerCelebration();
      }
    } else {
      updateDisplay(currentTimeLeft);
    }
  }, 1000);
});

// Reset countdown
resetButton.addEventListener('click', () => {
  clearInterval(countdownInterval);
  countdownDisplay.textContent = '00:00';
  fullscreenTimer.textContent = '00:00';
});

function updateDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  countdownDisplay.textContent = formatted;
  fullscreenTimer.textContent = formatted;
}

// Zoom Controls
let scale = 1;
const zoomStep = 0.1;
const TRANSFORM_ORIGIN = 'top right';

document.getElementById('zoomIn').addEventListener('click', () => {
  scale += zoomStep;
  document.body.style.transform = `scale(${scale})`;
  document.body.style.transformOrigin = TRANSFORM_ORIGIN;
});

document.getElementById('zoomOut').addEventListener('click', () => {
  const MIN_SCALE = 0.8;
  if (scale > MIN_SCALE) {
    scale -= zoomStep;
    if (scale < MIN_SCALE) scale = MIN_SCALE;
    document.body.style.transform = `scale(${scale})`;
    document.body.style.transformOrigin = TRANSFORM_ORIGIN;
  }
});

document.getElementById('zoomReset').addEventListener('click', () => {
  scale = 1;
  document.body.style.transform = `scale(${scale})`;
  document.body.style.transformOrigin = TRANSFORM_ORIGIN;
});

// Fullscreen Button
fullScreenBtn.addEventListener('click', () => {
  fullscreenContainer.style.display = 'flex';
  zoomControls.style.display = 'none';
  inputControls.style.display = 'none';
  document.querySelector('.button').style.display = 'none';
  document.querySelector('h1').style.display = 'none';
  document.querySelector('.container').style.display = 'none';
});

// Exit Fullscreen
exitFullscreenBtn.addEventListener('click', () => {
  fullscreenContainer.style.display = 'none';
  zoomControls.style.display = 'flex';
  inputControls.style.display = 'block';
  document.querySelector('.button').style.display = 'flex';
  document.querySelector('h1').style.display = 'block';
  document.querySelector('.container').style.display = 'block';
});
