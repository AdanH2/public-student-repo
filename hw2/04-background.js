const body = document.body;

const intervalInput = document.getElementById("intervalInput");
const toggleButton = document.getElementById("toggleButton");

let timerId = null;
let isRunning = false;

const randomDimHSLA = function generateRandomDimmedHSLAColor() {

  const h = Math.floor(Math.random() * 360);
  const s = 60 + Math.floor(Math.random() * 20);
  const l = 50 + Math.floor(Math.random() * 10);
  const a = 0.6;
  return `hsla(${h}, ${s}%, ${l}%, ${a})`;
};

const applyBackgroundColor = function applyRandomBackgroundColorToBody() {
  body.style.background = randomDimHSLA();
};

const setBackgroundColor = function setBackgroundColorWithInterval(interval) {
  let sec = Number(interval);
  if (!isFinite(sec) || sec <= 0) sec = 3;

  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }

  applyBackgroundColor();
  timerId = setInterval(applyBackgroundColor, sec * 1000);
  isRunning = true;
  updateButton();
};

const stopBackgroundColor = function stopBackgroundColorChanges() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  isRunning = false;
  updateButton();
};

const updateButton = function updateToggleButtonState() {
  if (!toggleButton) return;
  if (isRunning) {
    toggleButton.value = "Stop";
    toggleButton.classList.remove("btn-success");
    toggleButton.classList.add("btn-danger");
  } else {
    toggleButton.value = "Start";
    toggleButton.classList.remove("btn-danger");
    toggleButton.classList.add("btn-primary");
  }
};

if (toggleButton) {
  toggleButton.addEventListener("click", () => {
    if (isRunning) {
      stopBackgroundColor();
    } else {
      const parsed = parseFloat(intervalInput && intervalInput.value);
      const sec = isFinite(parsed) && parsed > 0.1 ? parsed : 3;
      setBackgroundColor(sec);
    }
  });
}

if (intervalInput) {
  intervalInput.addEventListener("change", () => {
    const parsed = parseFloat(intervalInput.value);
    if (!isFinite(parsed) || parsed <= 0) {
      intervalInput.value = 3;
      return;
    }
    if (isRunning) {
      setBackgroundColor(parsed);
    }
  });
}

setBackgroundColor(3);
