let juneScene = 0;
let juneVoice = 0;
let juneTurned = false;

function juneImage(index, className) {
  const item = junePhotos[index];
  return '<figure class="' + className + '"><img src="./assets/june/' + item.file + '" alt="' +
    escapeGame(item.alt) + '" decoding="async"><figcaption>' + escapeGame(item.caption) + '</figcaption></figure>';
}

function drawJuneBoard() {
  const canvas = stage.querySelector('.scene-canvas');
  if (!canvas) return;
  const tabs = junePhotos.map((item, index) => '<button type="button" data-june-scene="' + index +
    '" aria-pressed="' + (index === juneScene) + '"><small>0' + (index + 1) + ' / 04</small>' +
    escapeGame(item.title) + '</button>').join('');
  const item = junePhotos[juneScene];
  const found = discovered(juneChapterIndex, juneScene);
  canvas.className = 'scene-canvas june-board';
  canvas.setAttribute('aria-label', '六月的四张照片');
  canvas.innerHTML = '<div class="june-tabs" role="group" aria-label="选择六月照片">' + tabs + '</div>' +
    '<div class="june-board-layout">' + juneImage(juneScene, 'june-cover') +
    '<div class="june-board-copy"><span class="june-date">' + escapeGame(item.date) + '</span><h4>' +
    escapeGame(item.title) + '</h4><p>' + escapeGame(item.front) + '</p><button type="button" class="june-object-card' +
    (found ? ' found' : '') + '" data-game="object" data-index="' + juneChapterIndex +
    '" data-item="' + juneScene + '">' + lifeIcon(juneObjects[juneScene].icon) + '<span><strong>' +
    escapeGame(juneObjects[juneScene].name) + '</strong><small>' + (found ? '✓ 已收好 · 再翻开' : '翻到照片背面 →') +
    '</small></span></button></div></div>';
}

function juneReading() {
  const buttons = juneNarratives.map((voice, index) => '<button type="button" data-june-voice="' + index +
    '" aria-pressed="false" aria-controls="june-prose">' + voice.name + '</button>').join('');
  return '<section class="june-reading" aria-labelledby="june-reading-title"><h4 id="june-reading-title">六月手记</h4>' +
    '<div class="june-voice-switch" role="group" aria-label="叙述视角">' + buttons +
    '</div><p class="june-byline" id="june-byline"></p><div class="diary-prose" id="june-prose" aria-live="polite"></div></section>';
}

function drawJuneVoice() {
  const host = stage.querySelector('#june-prose');
  if (!host) return;
  host.innerHTML = juneNarratives[juneVoice].paragraphs.map(p => '<p>' + escapeGame(p) + '</p>').join('');
  stage.querySelector('#june-byline').textContent = juneNarratives[juneVoice].subtitle;
  stage.querySelectorAll('[data-june-voice]').forEach(button => {
    button.setAttribute('aria-pressed', String(Number(button.dataset.juneVoice) === juneVoice));
  });
}

const juneBaseRender = renderGameChapter;
renderGameChapter = function (index, scroll) {
  juneBaseRender(index, scroll);
  if (index !== juneChapterIndex) return;
  stage.querySelector('.life-chapter').classList.add('june-chapter');
  drawJuneBoard();
  const reflection = stage.querySelector('.reflection-section');
  const oldDiary = reflection.querySelector('.memory-diary, .locked-diary');
  if (oldDiary.classList.contains('locked-diary')) {
    oldDiary.insertAdjacentHTML('beforebegin', juneReading());
    oldDiary.textContent = '收好四件物品，就可以为六月留下一种看法。';
  } else {
    oldDiary.outerHTML = juneReading();
  }
  reflection.querySelector('.reflection-heading').remove();
  reflection.insertAdjacentHTML('afterbegin',
    '<div class="june-ledger" aria-label="六月小记"><div><strong>426</strong><small>截图上的喜欢天数</small></div>' +
    '<div><strong>4</strong><small>下次菜单的前四样</small></div><div><strong>2</strong><small>月底谈起的云南地名</small></div></div>');
  drawJuneVoice();
};

function drawJuneMemory() {
  if (eventFocus?.c !== juneChapterIndex) return;
  const item = junePhotos[eventFocus.i];
  const note = juneTurned ? item.back : item.front;
  const host = lifeContent.querySelector('#june-memory');
  host.innerHTML = '<p class="june-memory-date">' + escapeGame(item.date) +
    '<span>' + String(eventFocus.i + 1).padStart(2, '0') + ' / 04</span></p>' +
    juneImage(eventFocus.i, 'june-memory-photo') +
    '<div class="june-note" data-side="' + (juneTurned ? 'back' : 'front') + '"><small>' +
    (juneTurned ? '照片背面' : '照片正面') + '</small><p>' + escapeGame(note) + '</p></div>' +
    '<button type="button" class="june-turn" data-june-turn>' +
    (juneTurned ? '再看看照片正面 ↶' : '翻到照片背面 →') + '</button>';
  if (juneTurned) {
    eventSelection = 'june-read';
    lifeContent.querySelector('#collect-object').disabled = false;
    lifeContent.querySelector('#event-feedback').textContent = '这张照片的两面，都可以带走了。';
  }
}

const juneBaseOpen = openMemoryObject;
openMemoryObject = function (chapter, item, fromBag) {
  if (!chapterCanEnter(chapter) || !lifeScenes[chapter]?.objects[item]) return;
  juneBaseOpen(chapter, item, fromBag);
  if (chapter !== juneChapterIndex || !lifeModal.open) return;
  juneTurned = false;
  lifeModal.dataset.kind = 'june';
  lifeContent.querySelector('.event-story').insertAdjacentHTML('afterend',
    '<section id="june-memory" aria-label="翻看六月照片"></section>');
  drawJuneMemory();
};

document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button || button.disabled) return;
  if (button.hasAttribute('data-june-scene')) {
    juneScene = Number(button.dataset.juneScene);
    drawJuneBoard();
    stage.querySelector('[data-june-scene="' + juneScene + '"]').focus({ preventScroll: true });
  } else if (button.hasAttribute('data-june-voice')) {
    juneVoice = Number(button.dataset.juneVoice);
    drawJuneVoice();
  } else if (button.hasAttribute('data-june-turn') && lifeModal.open && eventFocus?.c === juneChapterIndex) {
    juneTurned = !juneTurned;
    drawJuneMemory();
    lifeContent.querySelector('[data-june-turn]').focus({ preventScroll: true });
  }
});

// Local inspection only: the saved chapter progress is never changed in preview mode.
window.addEventListener('DOMContentLoaded', function () {
if (new URLSearchParams(window.location.search).get('preview') === 'june') {
  previewMode = true;
  state = {
    unlocked: Math.max(state.unlocked, juneChapterIndex),
    completed: Array.from(new Set([...state.completed, 0, 1, 2, 3])),
    choices: { ...state.choices }
  };
  activeVolumeStart = volumeStartFor(juneChapterIndex);
  closeOpening();
  renderChapter(juneChapterIndex, false);
  positionCurrentChapter();
  showToast('六月预览模式：不会改动正常存档');
}
});
