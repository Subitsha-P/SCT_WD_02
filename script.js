let startTime, updatedTime, difference, timerInterval;
let running = false;
let laps = [];

function formatTime(ms) {
    let date = new Date(ms);
    let minutes = String(date.getUTCMinutes()).padStart(2, '0');
    let seconds = String(date.getUTCSeconds()).padStart(2, '0');
    let milliseconds = String(ms % 1000).padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
    difference = Date.now() - startTime;
    document.getElementById('display').textContent = formatTime(difference);
}

function startStopwatch() {
    if (!running) {
        startTime = Date.now() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 50);
        running = true;
    }
}

function pauseStopwatch() {
    if (running) {
        clearInterval(timerInterval);
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    running = false;
    difference = 0;
    document.getElementById('display').textContent = '00:00:00.000';
    laps = [];
    document.getElementById('laps').innerHTML = '';
}

function recordLap() {
    if (running) {
        const lapTime = formatTime(Date.now() - startTime);
        laps.push(lapTime);
        const li = document.createElement('li');
        li.textContent = `Lap ${laps.length}: ${lapTime}`;
        document.getElementById('laps').appendChild(li);
    }
}

function exportLaps() {
    if (laps.length === 0) return;
    const blob = new Blob([laps.join('\n')], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'lap_times.txt';
    link.click();
}
