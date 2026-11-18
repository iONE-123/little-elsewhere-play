const frontNextScreen = { cover: 'intro', intro: 'perspective', perspective: 'library' };
let frontRequest = 0;

function loadOpeningArt(phase) {
  const images = Array.from(opening.querySelectorAll('[data-le-screen="' + phase + '"] img'));
  images.forEach(function (image) {
    if (!image.dataset.src) return;
    image.src = image.dataset.src;
    delete image.dataset.src;
  });
  return images;
}

async function showFrontScreen(phase, onOpen) {
  const request = ++frontRequest;
  const previousPhase = opening.dataset.phase;
  const wasClosed = opening.classList.contains('is-closed');
  const images = loadOpeningArt(phase);
  try {
    await Promise.all(images.map(function (image) { return image.decode(); }));
  } catch (_) {
    if (request === frontRequest) showToast('画面暂时无法加载，请重新打开此页。');
    return;
  }
  if (request !== frontRequest || opening.dataset.phase !== previousPhase ||
      opening.classList.contains('is-closed') !== wasClosed) return;
  if (onOpen) onOpen();
  setOpeningPhase(phase);
  if (frontNextScreen[phase]) loadOpeningArt(frontNextScreen[phase]);
}

const frontIntroPanels = {
  intro: ['INTRO · 序章', document.querySelector('.le-intro-copy').textContent],
  world: ['WORLD · 世界', '十一月，先从一张改了又改的行程单开始。\n往后还有旅行、饭桌、消息，和各自忙碌的日子。\n2025.11 — 2026.11'],
  play: ['PLAY · 玩法', document.querySelector('#atlas .section-heading p:last-child').textContent]
};

document.addEventListener('click', function (event) {
  const button = event.target.closest('#opening-sequence button');
  if (!button || button.closest('[inert]')) return;
  if (button.dataset.action === 'play-opening') {
    playGameMusic(journeyMusic);
    showFrontScreen('intro');
  }
  if (button.dataset.lePhase) showFrontScreen(button.dataset.lePhase);
  if (button.dataset.leRole) {
    showFrontScreen('library', function () { chooseLifeRole(button.dataset.leRole); });
  }
  const panel = frontIntroPanels[button.dataset.leIntro];
  if (panel) {
    showLifeModal('<h2 id="life-modal-title">' + escapeGame(panel[0]) + '</h2>' +
      '<p class="modal-lead">' + escapeGame(panel[1]).replace(/\n/g, '<br>') + '</p>', 'intro');
  }
});

window.addEventListener('keydown', function (event) {
  if (event.key !== 'Escape' || opening.inert || document.querySelector('dialog[open]')) return;
  const previous = { intro: 'cover', perspective: 'intro', library: 'cover' }[opening.dataset.phase];
  if (previous) {
    event.preventDefault();
    showFrontScreen(previous);
  }
});

function syncFrontMotion() {
  opening.classList.toggle('le-paused', document.hidden);
}

document.addEventListener('visibilitychange', syncFrontMotion);
syncFrontMotion();
if (!opening.classList.contains('is-closed')) {
  setOpeningActive(true);
  loadOpeningArt('intro');
}
