// TIMER
let timerInterval;
let timerStartTime;
let timerElapsed = 0;
let isRunning = false;

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const hrs = String(Math.floor(totalSec / 3600)).padStart(2, '0');
  const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
  const secs = String(totalSec % 60).padStart(2, '0');
  const millis = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return { time: `${hrs}:${mins}:${secs}`, ms: `.${millis}` };
}

function updateTimerDisplay() {
  const formatted = formatTime(timerElapsed);
  document.getElementById('timer-display').childNodes[0].textContent = formatted.time;
  document.getElementById('milliseconds').textContent = formatted.ms;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timerStartTime = performance.now() - timerElapsed;
  timerInterval = setInterval(() => {
    timerElapsed = performance.now() - timerStartTime;
    updateTimerDisplay();
  }, 10);
}

function stopTimer() {
  isRunning = false;
  clearInterval(timerInterval);
}

function resetTimer() {
  stopTimer();
  timerElapsed = 0;
  updateTimerDisplay();
}

function startPresetTimer(minutes) {
  resetTimer();
  timerElapsed = minutes * 60 * 1000;
  timerStartTime = performance.now();
  isRunning = true;
  timerInterval = setInterval(() => {
    const current = performance.now();
    timerElapsed = (minutes * 60 * 1000) - (current - timerStartTime);
    if (timerElapsed <= 0) {
      timerElapsed = 0;
      updateTimerDisplay();
      stopTimer();
      alert("Timer finished!");
    } else {
      updateTimerDisplay();
    }
  }, 10);
}

// DATE + TIME
function updateDateTime() {
  const now = new Date();
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  document.getElementById('date').textContent = now.toLocaleDateString(undefined, options);
  document.getElementById('time').textContent = now.toLocaleTimeString();
}
setInterval(updateDateTime, 1000);
updateDateTime();
updateTimerDisplay();

// THEME TOGGLE
function toggleTheme() {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

// Load stored theme
(function () {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }
})();
