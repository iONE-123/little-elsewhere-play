const mayChapterIndex = 6;
let mayVoice = 0;
let mayPhase = 0;
let mayPage = 0;
let mayPhotoIndex = 0;
let mayBusStep = 0;

function mayPhotoSource(number) {
  return './assets/may/' + mayPhotos[number][0];
}

function mayPhotoFigure(number, className) {
  const [, caption, alt] = mayPhotos[number];
  return '<figure class="' + className + '"><img src="' + mayPhotoSource(number) +
    '" alt="' + escapeGame(alt) + '" decoding="async"><figcaption>' + escapeGame(caption) + '</figcaption></figure>';
}

function drawMayVoice() {
  const host = stage.querySelector('#may-prose');
  if (!host) return;
  host.innerHTML = mayNarratives[mayVoice].paragraphs.map(paragraph => '<p>' + escapeGame(paragraph) + '</p>').join('');
  stage.querySelector('#may-byline').textContent = mayNarratives[mayVoice].subtitle;
  stage.querySelectorAll('[data-may-voice]').forEach(button => {
    button.setAttribute('aria-pressed', String(Number(button.dataset.mayVoice) === mayVoice));
  });
}

function mayReading() {
  const controls = mayNarratives.map((voice, index) =>
    '<button type="button" data-may-voice="' + index + '" aria-pressed="false" aria-controls="may-prose">' +
    voice.name + '</button>').join('');
  return '<section class="may-reading" aria-labelledby="may-reading-title"><h4 id="may-reading-title">五月手记</h4>' +
    '<div class="may-voice-switch" role="group" aria-label="叙述视角">' + controls +
    '</div><p class="may-byline" id="may-byline"></p><div class="diary-prose" id="may-prose" aria-live="polite"></div></section>';
}

function drawMayAtlas() {
  const canvas = stage.querySelector('.scene-canvas');
  if (!canvas) return;
  const phase = mayPhases[mayPhase];
  const tabs = mayPhases.map((entry, index) =>
    '<button type="button" data-may-phase="' + index + '" aria-pressed="' + (index === mayPhase) +
    '"><small>' + entry.date + '</small>' + entry.title + '</button>').join('');
  const found = discovered(mayChapterIndex, mayPhase);
  canvas.className = 'scene-canvas may-atlas';
  canvas.dataset.phase = String(mayPhase);
  canvas.setAttribute('aria-label', '五月的三段回忆');
  canvas.innerHTML = '<div class="may-phase-tabs" role="group" aria-label="选择回忆">' + tabs + '</div>' +
    '<div class="may-phase-layout">' + mayPhotoFigure(phase.cover, 'may-cover') +
    '<div class="may-phase-aside"><h4>' + phase.heading + '</h4><button class="may-object-card' +
    (found ? ' found' : '') + '" data-game="object" data-index="' + mayChapterIndex + '" data-item="' + mayPhase +
    '">' + lifeIcon(phase.object.icon) + '<span><strong>' + phase.object.name + '</strong><small>' +
    (found ? '✓ 已收好 · 再翻开' : '翻开回忆 →') + '</small></span></button></div></div>';
}

const mayBaseRender = renderGameChapter;
renderGameChapter = function (index, scroll) {
  mayBaseRender(index, scroll);
  if (index !== mayChapterIndex) return;
  stage.querySelector('.life-chapter').classList.add('may-chapter');
  drawMayAtlas();
  const reflection = stage.querySelector('.reflection-section');
  const oldDiary = reflection.querySelector('.memory-diary, .locked-diary');
  if (oldDiary.classList.contains('locked-diary')) {
    oldDiary.insertAdjacentHTML('beforebegin', mayReading());
    oldDiary.textContent = '收好三件物品，就可以给五月留一句话。';
  } else {
    oldDiary.outerHTML = mayReading();
  }
  reflection.querySelector('.reflection-heading').remove();
  drawMayVoice();
};

function drawMayPhotos(page) {
  const host = lifeContent.querySelector('.may-gallery');
  if (!host) return;
  const photo = page.photos[mayPhotoIndex];
  const thumbnails = page.photos.length > 1
    ? '<div class="may-thumbnails" role="group" aria-label="浏览这一页的照片">' + page.photos.map((number, index) =>
        '<button type="button" data-may-photo="' + index + '" aria-pressed="' + (mayPhotoIndex === index) +
        '" aria-label="' + escapeGame(mayPhotos[number][1]) + '"><img src="' + mayPhotoSource(number) +
        '" alt="" loading="lazy"></button>').join('') + '</div>'
    : '';
  host.innerHTML = mayPhotoFigure(photo, 'may-gallery-photo') + thumbnails;
}

function mayBus() {
  const busScenes = [
    { text: '王孜看见旁边的站台没人，拉着秋露走了过去。', person: '王孜', action: '拉她上车' },
    { text: '车停了。王孜想在这一站下，秋露说还可以再坐一会儿。', person: '秋露', action: '再等一等' },
    { text: '窗外是上山时出发的地方。两个人恰好各做对了一半。' }
  ];
  const scene = busScenes[mayBusStep];
  const action = scene.action
    ? '<button type="button" data-may-bus><small>' + scene.person + '</small>' + scene.action + ' →</button>'
    : '<strong>到站了</strong>';
  return '<div class="may-bus" data-stop="' + mayBusStep + '"><div class="may-bus-stops" aria-hidden="true">' +
    '<span>空站台</span><span>半路</span><span>该下车的地方</span></div><p>' + scene.text + '</p>' + action + '</div>';
}

function drawMayEvent() {
  if (eventFocus?.c !== mayChapterIndex) return;
  const pages = mayPhases[eventFocus.i].pages;
  const page = pages[mayPage];
  const host = lifeContent.querySelector('#may-event');
  const ready = mayPage === pages.length - 1;
  const waiting = page.bus && mayBusStep < 2;
  const gallery = page.photos ? '<div class="may-gallery"></div>' : '';
  host.innerHTML = '<p class="may-event-count">' + page.date + '<span>' + (mayPage + 1) + ' / ' + pages.length +
    '</span></p><h3 tabindex="-1">' + page.title + '</h3><p class="may-event-text">' + page.text + '</p>' +
    (page.bus ? mayBus() : gallery) + '<div class="may-page-controls"><button type="button" data-may-page="' +
    (mayPage - 1) + '" ' + (mayPage === 0 ? 'disabled' : '') + '>← 上一页</button>' +
    (ready ? '' : '<button type="button" data-may-page="' + (mayPage + 1) + '" ' +
    (waiting ? 'disabled' : '') + '>下一页 →</button>') + '</div>';
  drawMayPhotos(page);
  eventSelection = ready ? 'may-read' : null;
  lifeContent.querySelector('#collect-object').disabled = !ready;
  lifeContent.querySelector('#event-feedback').textContent = ready ? '可以收进回忆背包了。' : '';
}

const mayBaseOpen = openMemoryObject;
openMemoryObject = function (chapter, item, fromBag) {
  if (!chapterCanEnter(chapter) || !lifeScenes[chapter]?.objects[item]) return;
  mayBaseOpen(chapter, item, fromBag);
  if (chapter !== mayChapterIndex || !lifeModal.open) return;
  mayPhase = item;
  mayPage = 0;
  mayPhotoIndex = 0;
  mayBusStep = 0;
  lifeModal.dataset.kind = 'may';
  lifeContent.querySelector('.event-story').insertAdjacentHTML('afterend',
    '<section id="may-event" aria-label="翻阅五月相册"></section>');
  drawMayEvent();
};

document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button || button.disabled) return;
  if (button.hasAttribute('data-may-phase')) {
    mayPhase = Number(button.dataset.mayPhase);
    if (typeof maySceneOpen !== 'undefined') maySceneOpen = true;
    if (typeof drawMayExperience === 'function') drawMayExperience();
    else drawMayAtlas();
    stage.querySelector('[data-may-phase="' + mayPhase + '"]').focus({ preventScroll: true });
  } else if (button.hasAttribute('data-may-voice')) {
    mayVoice = Number(button.dataset.mayVoice);
    drawMayVoice();
  } else if (lifeModal.open && eventFocus?.c === mayChapterIndex) {
    if (button.hasAttribute('data-may-page')) {
      mayPage = Number(button.dataset.mayPage);
      mayPhotoIndex = 0;
      drawMayEvent();
      const heading = lifeContent.querySelector('#may-event h3');
      heading.focus({ preventScroll: true });
      heading.scrollIntoView({ block: 'start' });
    } else if (button.hasAttribute('data-may-photo')) {
      mayPhotoIndex = Number(button.dataset.mayPhoto);
      drawMayPhotos(mayPhases[eventFocus.i].pages[mayPage]);
      lifeContent.querySelector('[data-may-photo="' + mayPhotoIndex + '"]').focus({ preventScroll: true });
    } else if (button.hasAttribute('data-may-bus')) {
      mayBusStep += 1;
      drawMayEvent();
      lifeContent.querySelector(mayBusStep < 2 ? '[data-may-bus]' : '.may-page-controls button:last-child')
        .focus({ preventScroll: true });
    }
  }
});

updateGameHUD();

// A temporary inspection link skips the chapter gates without changing saved progress.
// Open index.html?preview=may; reopening index.html normally restores the real save.
window.addEventListener('DOMContentLoaded', function () {
if (new URLSearchParams(window.location.search).get('preview') === 'may') {
  previewMode = true;
  state = {
    unlocked: Math.max(state.unlocked, mayChapterIndex),
    completed: Array.from(new Set([...state.completed, 0, 1, 2, 3])),
    choices: { ...state.choices }
  };
  activeVolumeStart = volumeStartFor(mayChapterIndex);
  closeOpening();
  renderChapter(mayChapterIndex, false);
  document.body.classList.add('may-preview-active');
  const previewGallery = document.createElement('section');
  previewGallery.className = 'may-preview-gallery';
  previewGallery.setAttribute('aria-label', '五月照片核对');
  previewGallery.innerHTML = '<h4>五月照片核对 · 20 张</h4><p>这里按编号列出五月全部照片，仅在预览模式显示。</p>' +
    '<div class="may-preview-grid">' + Object.entries(mayPhotos).map(([number, photo]) =>
      '<figure><img src="' + mayPhotoSource(Number(number)) + '" alt="' + escapeGame(photo[2]) +
      '" loading="lazy"><figcaption><strong>' + String(number).padStart(2, '0') + '</strong> ' +
      escapeGame(photo[1]) + '</figcaption></figure>').join('') + '</div>';
  (stage.querySelector('.play-layout') || stage.querySelector('.scene-header')).insertAdjacentElement('afterend', previewGallery);
  positionCurrentChapter();
  showToast('五月预览模式：不会改动正常存档');
}
});
