let timerDisplay = document.getElementById("timer");
let startButton = document.getElementById("start");
let lapButton = document.getElementById("lap");
let laps = document.getElementById("laps");

let timer;
let isRunning = false;
let time = 0;
let lapCount = 0;

function formatTime(ms) {
    let milliseconds = Math.floor((ms % 1000) / 10);
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / 60000) % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    let startTime = Date.now() - time;
    timer = setInterval(() => {
        time = Date.now() - startTime;
        timerDisplay.textContent = formatTime(time);
    }, 10);
    isRunning = true;
    startButton.textContent = "Stop";
    startButton.classList.add("stop");
    lapButton.textContent = "Lap";
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
    startButton.textContent = "Start";
    startButton.classList.remove("stop");
    lapButton.textContent = "Reset";
}

function resetTimer() {
    time = 0;
    lapCount = 0;
    timerDisplay.textContent = "00:00:00";
    laps.innerHTML = "";
    lapButton.textContent = "Lap";
}

startButton.addEventListener("click", () => {
    if (isRunning) {
        stopTimer();
    } else {
        startTimer();
    }
});

lapButton.addEventListener("click", () => {
    if (isRunning) {
        lapCount++;
        let li = document.createElement("li");
        li.textContent = `Lap ${lapCount}: ${formatTime(time)}`;
        laps.prepend(li);
    } else {
        resetTimer();
    }
});
