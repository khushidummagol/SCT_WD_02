let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;

function updateDisplay() {
  const display = document.getElementById('display');
  const time = new Date(elapsedTime);
  const minutes = String(time.getUTCMinutes()).padStart(2, '0');
  const seconds = String(time.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(Math.floor(time.getUTCMilliseconds() / 10)).padStart(2, '0');
  display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function startStop() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    isRunning = true;
    event.target.textContent = 'Pause';
  } else {
    clearInterval(timer);
    isRunning = false;
    event.target.textContent = 'Start';
  }
}

function reset() {
  clearInterval(timer);
  elapsedTime = 0;
  isRunning = false;
  updateDisplay();
  document.querySelector('.buttons button').textContent = 'Start';
  document.getElementById('laps').innerHTML = '';
}

function lap() {
  if (!isRunning) return;
  const lapTime = document.getElementById('display').textContent;
  const li = document.createElement('li');
  li.textContent = `Lap: ${lapTime}`;
  document.getElementById('laps').appendChild(li);
}
