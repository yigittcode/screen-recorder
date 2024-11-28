const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const recordedVideo = document.getElementById('recordedVideo');
let mediaRecorder;
let recordedChunks = [];

startBtn.addEventListener('click', async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
    });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        recordedVideo.src = url;
        recordedChunks = [];
    };

    mediaRecorder.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
    mediaRecorder.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    darkModeBtn.innerText = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
};

const darkModeBtn = document.createElement('button');
darkModeBtn.id = 'darkModeBtn';
darkModeBtn.innerText = '🌙';
darkModeBtn.addEventListener('click', toggleDarkMode);
document.body.appendChild(darkModeBtn);