// ================== CHỈNH SỬA LỜI CHÚC Ở ĐÂY ==================
const CONFIG = {
  name: 'Nguyễn Hà Kiều Anh',
  surprise: 'nhớ ăn cơm uống nước đầy đủ dùm tôi',
  musicFile: 'audio/nhac-nen.mp3'
};
// ==============================================================

const $ = (selector) => document.querySelector(selector);
$('#recipientName').textContent = CONFIG.name;
$('.footer-name').textContent = `Dành cho ${CONFIG.name}, bằng tất cả sự dịu dàng.`;
$('#backgroundMusic').src = CONFIG.musicFile;

const pages = [...document.querySelectorAll('.page')];
const initialPageId = decodeURIComponent(window.location.hash.slice(1));
const initialPageIndex = pages.findIndex((page) => page.id === initialPageId);
let activePageIndex = initialPageIndex >= 0 ? initialPageIndex : 0;

function showPage(index, { updateHistory = true, behavior = 'smooth' } = {}) {
  if (index < 0 || index >= pages.length) return;
  activePageIndex = index;
  const targetPage = pages[index];
  targetPage.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : behavior,
    block: 'start'
  });
  document.body.dataset.page = targetPage.id;
  if (updateHistory && location.hash !== `#${targetPage.id}`) {
    history.pushState(null, '', `#${targetPage.id}`);
  }
}

pages.forEach((page, index) => {
  page.setAttribute('aria-hidden', 'false');
});
document.body.dataset.page = pages[activePageIndex].id;

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;
  const pageIndex = pages.findIndex((page) => `#${page.id}` === link.hash);
  if (pageIndex === -1) return;
  event.preventDefault();
  showPage(pageIndex);
});
function syncPageFromLocation() {
  const pageIndex = pages.findIndex((page) => `#${page.id}` === location.hash);
  if (pageIndex === -1) return;
  showPage(pageIndex, { updateHistory: false });
}
window.addEventListener('popstate', syncPageFromLocation);
window.addEventListener('hashchange', syncPageFromLocation);
window.addEventListener('scroll', () => {
  const marker = window.scrollY + window.innerHeight * .35;
  const visiblePage = pages.find((page) => {
    const top = page.offsetTop;
    return top <= marker && top + page.offsetHeight > marker;
  });
  if (visiblePage) {
    activePageIndex = pages.indexOf(visiblePage);
    document.body.dataset.page = visiblePage.id;
  }
}, { passive: true });
const envelope = $('#envelope');
function toggleLetter() {
  const isOpen = envelope.classList.toggle('open');
  $('#openLetter').textContent = isOpen ? 'Gấp thư lại' : 'Bấm để mở / gấp thư';
}
$('#openLetter').addEventListener('click', toggleLetter);
const audio = $('#backgroundMusic');
const musicToggle = $('#musicToggle');
const musicLabel = $('#musicLabel');
let musicOn = false;
async function startMusic() {
  try {
    await audio.play();
    musicOn = true;
    musicLabel.textContent = 'Tắt nhạc';
    return true;
  } catch (error) {
    musicOn = false;
    if (error.name === 'NotAllowedError') {
      musicLabel.textContent = 'Chạm để bật nhạc';
      return false;
    }
    musicLabel.textContent = 'Lỗi phát nhạc';
    showToast(`Không phát được nhạc (${error.name || 'lỗi không xác định'}). Hãy thử file MP3 khác.`);
    return false;
  }
}
musicToggle.addEventListener('click', async () => {
  if (musicOn) {
    audio.pause();
    musicOn = false;
    musicLabel.textContent = 'Bật nhạc';
  } else if (!await startMusic()) {
    if (musicLabel.textContent === 'Chạm để bật nhạc') {
      showToast('Trình duyệt đang chặn phát âm thanh. Thử bấm nút lại sau khi trang đã tải xong nhé.');
    }
  }
});
audio.addEventListener('error', () => {
  musicOn = false;
  musicLabel.textContent = 'Lỗi tải nhạc';
  showToast('Không tải được audio/nhac-nen.mp3. Kiểm tra file nhạc và thử mở lại trang nhé.');
});
audio.addEventListener('ended', () => {
  musicOn = false;
  musicLabel.textContent = 'Bật nhạc';
});
audio.addEventListener('play', () => {
  musicOn = true;
  musicLabel.textContent = 'Tắt nhạc';
});
audio.addEventListener('pause', () => {
  if (!audio.ended) {
    musicOn = false;
    musicLabel.textContent = 'Bật nhạc';
  }
});
startMusic().then((started) => {
  if (!started && audio.error === null) musicLabel.textContent = 'Chạm để bật nhạc';
});

const revealItems = document.querySelectorAll(
  '.hero-copy, .hero-photo-wrap, .letter-art, .wish-copy, .section-heading, .memory-card, .surprise-card'
);
revealItems.forEach((item) => item.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

let surpriseOpened = false;
function openSurprise() {
  if (surpriseOpened) return;
  surpriseOpened = true;

  const heartButton = $('#surpriseHeart');
  const message = $('#surpriseMessage');
  const rain = $('#heartRain');
  heartButton.disabled = true;
  heartButton.setAttribute('aria-label', 'Đang mở lời nhắn');
  message.classList.remove('is-revealed');
  message.textContent = '';
  rain.replaceChildren();
  rain.classList.remove('is-playing');
  void rain.offsetWidth;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    message.textContent = CONFIG.surprise;
    message.classList.add('is-revealed');
    heartButton.setAttribute('aria-label', 'Lời nhắn đã mở');
    return;
  }

  fillScreenWithHearts(rain);
  rain.classList.add('is-playing');
  window.setTimeout(() => {
    message.textContent = CONFIG.surprise;
    message.classList.add('is-revealed');
    heartButton.setAttribute('aria-label', 'Lời nhắn đã mở');
  }, 2800);
  window.setTimeout(() => {
    rain.classList.remove('is-playing');
    rain.replaceChildren();
    heartButton.disabled = false;
  }, 3300);
}
$('#surpriseHeart').addEventListener('click', openSurprise);

const petalLayer = $('#petalLayer');
function createPetal() {
  const petal = document.createElement('span');
  petal.className = 'petal';
  petal.textContent = Math.random() > .55 ? '♥' : '✿';
  petal.style.left = `${Math.random() * 100}vw`;
  petal.style.fontSize = `${12 + Math.random() * 17}px`;
  petal.style.setProperty('--drift', `${Math.random() * 180 - 90}px`);
  petal.style.animationDuration = `${7 + Math.random() * 8}s`;
  petalLayer.appendChild(petal);
  setTimeout(() => petal.remove(), 16000);
}
for (let i = 0; i < 12; i++) setTimeout(createPetal, i * 450);
setInterval(createPetal, 900);

function fillScreenWithHearts(container) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const spacing = Math.max(30, Math.sqrt((width * height) / 650));
  const symbols = ['♥', '♥', '♥', '♡', '♥', '✿', '♥', '♡'];
  let index = 0;

  for (let y = -spacing; y < height + spacing; y += spacing) {
    for (let x = -spacing; x < width + spacing; x += spacing) {
      const heart = document.createElement('span');
      heart.className = 'rain-heart';
      heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      heart.style.left = `${x + Math.random() * spacing * .65}px`;
      heart.style.top = `${y + Math.random() * spacing * .65}px`;
      heart.style.fontSize = `${22 + Math.random() * 28}px`;
      heart.style.setProperty('--rain-delay', `${Math.random() * .16}s`);
      heart.style.setProperty('--rain-rotation', `${Math.random() * 50 - 25}deg`);
      container.appendChild(heart);
      index++;
    }
  }

  for (let i = 0; i < Math.min(55, Math.ceil(index / 5)); i++) {
    const sparkle = document.createElement('span');
    sparkle.className = 'rain-heart rain-sparkle';
    sparkle.textContent = Math.random() > .5 ? '✦' : '✧';
    sparkle.style.left = `${Math.random() * width}px`;
    sparkle.style.top = `${Math.random() * height}px`;
    sparkle.style.setProperty('--rain-delay', `${Math.random() * .2}s`);
    container.appendChild(sparkle);
  }
}

let toastTimer;
function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}
