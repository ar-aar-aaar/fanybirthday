const page = document.body.dataset.page;
const tracks = {
  surprise: { title: 'Birthday', artist: 'Una sorpresa para Fany', src: '/music/mananitas.mp3', cover: 'images/skull.png' },
  owl: { title: 'Midnight City', artist: 'La música nos encontró', src: '/music/tremorcut.mp3', cover: 'images/owl.png' },
  skull: { title: 'Blessings', artist: 'Con cariño para Fany', src: '/music/stirb.mp3', cover: 'images/skull.png' }
};

const track = tracks[page];
const audio = document.querySelector('#audio');
const playButton = document.querySelector('#play-button');
const progress = document.querySelector('#progress');
const elapsed = document.querySelector('#elapsed');
const duration = document.querySelector('#duration');

document.querySelector('#track-title').textContent = track.title;
document.querySelector('#track-artist').textContent = track.artist;
document.querySelector('#cover').src = track.cover;
audio.src = track.src;

const formatTime = seconds => {
  if (!Number.isFinite(seconds)) return '0:00';
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
};

const syncPlayer = () => {
  progress.style.width = audio.duration ? `${audio.currentTime / audio.duration * 100}%` : '0%';
  elapsed.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
  playButton.textContent = audio.paused ? '▶' : 'Ⅱ';
};

playButton.addEventListener('click', () => audio.paused ? audio.play() : audio.pause());
audio.addEventListener('timeupdate', syncPlayer);
audio.addEventListener('loadedmetadata', syncPlayer);
audio.addEventListener('play', syncPlayer);
audio.addEventListener('pause', syncPlayer);

const surpriseButton = document.querySelector('#reveal');
if (surpriseButton) {
  surpriseButton.addEventListener('click', () => {
    document.body.classList.add('revealed');
    audio.play().catch(() => {});
  });
} else {
  audio.play().catch(() => {});
}