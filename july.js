let julyScene = 0;
let julyVoice = 0;
let julyTurned = false;

function julyImage(index, className) {
  const item = julyPhotos[index];
  return '<figure class="' + className + '"><img src="./assets/july/' + item.file + '" alt="' +
    escapeGame(item.alt) + '" decoding="async"><figcaption>' + escapeGame(item.caption) + '</figcaption></figure>';
}

function drawJulyBoard() {
  const canvas = stage.querySelector('.scene-canvas');
  if (!canvas) return;
  const tabs = julyPhotos.map((item, index) => '<button type="button" data-july-scene="' + index +
    '" aria-pressed="' + (index === julyScene) + '"><small>' + String(index + 1).padStart(2, '0') + ' / 13</small>' +
    escapeGame(item.title) + '</button>').join('');
  const item = julyPhotos[julyScene];
  const found = discovered(julyChapterIndex, julyScene);
  canvas.className = 'scene-canvas july-board';
  canvas.setAttribute('aria-label', '七月的十三张照片');
  canvas.innerHTML = '<div class="july-tabs" role="group" aria-label="选择七月照片">' + tabs + '</div>' +
    '<div class="july-board-layout">' + julyImage(julyScene, 'july-cover') +
    '<div class="july-board-copy"><span class="july-date">' + escapeGame(item.date) + '</span><h4>' +
    escapeGame(item.title) + '</h4><p>' + escapeGame(item.front) + '</p><button type="button" class="july-object-card' +
    (found ? ' found' : '') + '" data-game="object" data-index="' + julyChapterIndex +
    '" data-item="' + julyScene + '">' + lifeIcon(julyObjects[julyScene].icon) + '<span><strong>' +
    escapeGame(julyObjects[julyScene].name) + '</strong><small>' + (found ? '✓ 已收好 · 再翻开' : '翻到照片背面 →') +
    '</small></span></button></div></div>';
}

function julyReading() {
  const buttons = julyNarratives.map((voice, index) => '<button type="button" data-july-voice="' + index +
    '" aria-pressed="false" aria-controls="july-prose">' + voice.name + '</button>').join('');
  return '<section class="july-reading" aria-labelledby="july-reading-title"><h4 id="july-reading-title">七月手记</h4>' +
    '<div class="july-voice-switch" role="group" aria-label="叙述视角">' + buttons +
    '</div><p class="july-byline" id="july-byline"></p><div class="diary-prose" id="july-prose" aria-live="polite"></div></section>';
}

function drawJulyVoice() {
  const host = stage.querySelector('#july-prose');
  if (!host) return;
  host.innerHTML = julyNarratives[julyVoice].paragraphs.map(p => '<p>' + escapeGame(p) + '</p>').join('');
  stage.querySelector('#july-byline').textContent = julyNarratives[julyVoice].subtitle;
  stage.querySelectorAll('[data-july-voice]').forEach(button => {
    button.setAttribute('aria-pressed', String(Number(button.dataset.julyVoice) === julyVoice));
  });
}

const julyBaseRender = renderGameChapter;
renderGameChapter = function (index, scroll) {
  julyBaseRender(index, scroll);
  if (index !== julyChapterIndex) return;
  stage.querySelector('.life-chapter').classList.add('july-chapter');
  drawJulyBoard();
  const reflection = stage.querySelector('.reflection-section');
  const oldDiary = reflection.querySelector('.memory-diary, .locked-diary');
  if (oldDiary.classList.contains('locked-diary')) {
    oldDiary.insertAdjacentHTML('beforebegin', julyReading());
    oldDiary.textContent = '收好十三件物品，就可以为七月留下一种看法。';
  } else {
    oldDiary.outerHTML = julyReading();
  }
  reflection.querySelector('.reflection-heading').remove();
  reflection.insertAdjacentHTML('afterbegin',
    '<div class="july-ledger" aria-label="七月小记"><div><strong>13</strong><small>七月留下的照片</small></div>' +
    '<div><strong>10</strong><small>录下的指纹</small></div><div><strong>1</strong><small>再回去的酒吧</small></div></div>');
  drawJulyVoice();
};

function drawJulyMemory() {
  if (eventFocus?.c !== julyChapterIndex) return;
  const item = julyPhotos[eventFocus.i];
  const note = julyTurned ? item.back : item.front;
  const host = lifeContent.querySelector('#july-memory');
  host.innerHTML = '<p class="july-memory-date">' + escapeGame(item.date) +
    '<span>' + String(eventFocus.i + 1).padStart(2, '0') + ' / 13</span></p>' +
    julyImage(eventFocus.i, 'july-memory-photo') +
    '<div class="july-note" data-side="' + (julyTurned ? 'back' : 'front') + '"><small>' +
    (julyTurned ? '照片背面' : '照片正面') + '</small><p>' + escapeGame(note) + '</p></div>' +
    '<button type="button" class="july-turn" data-july-turn>' +
    (julyTurned ? '再看看照片正面 ↶' : '翻到照片背面 →') + '</button>';
  if (julyTurned) {
    eventSelection = 'july-read';
    lifeContent.querySelector('#collect-object').disabled = false;
    lifeContent.querySelector('#event-feedback').textContent = '这张照片的两面，都可以带走了。';
  }
}

const julyBaseOpen = openMemoryObject;
openMemoryObject = function (chapter, item, fromBag) {
  if (!chapterCanEnter(chapter) || !lifeScenes[chapter]?.objects[item]) return;
  julyBaseOpen(chapter, item, fromBag);
  if (chapter !== julyChapterIndex || !lifeModal.open) return;
  julyTurned = false;
  lifeModal.dataset.kind = 'july';
  lifeContent.querySelector('.event-story').insertAdjacentHTML('afterend',
    '<section id="july-memory" aria-label="翻看七月照片"></section>');
  drawJulyMemory();
};

document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button || button.disabled) return;
  if (button.hasAttribute('data-july-scene')) {
    julyScene = Number(button.dataset.julyScene);
    drawJulyBoard();
    stage.querySelector('[data-july-index], [data-july-scene="' + julyScene + '"]')?.focus({ preventScroll: true });
  } else if (button.hasAttribute('data-july-voice')) {
    julyVoice = Number(button.dataset.julyVoice);
    drawJulyVoice();
  } else if (button.hasAttribute('data-july-turn') && lifeModal.open && eventFocus?.c === julyChapterIndex) {
    julyTurned = !julyTurned;
    drawJulyMemory();
    lifeContent.querySelector('[data-july-turn]').focus({ preventScroll: true });
  }
});

// Local inspection only: wait until every scene wrapper is loaded; do not change the saved progress.
window.addEventListener('DOMContentLoaded', function () {
  if (new URLSearchParams(window.location.search).get('preview') === 'july') {
    previewMode = true;
    state = {
      unlocked: Math.max(state.unlocked, julyChapterIndex),
      completed: Array.from(new Set([...state.completed, 0, 1, 2, 3, 4, 5, 6, 7])),
      choices: { ...state.choices }
    };
    activeVolumeStart = volumeStartFor(julyChapterIndex);
    closeOpening();
    renderChapter(julyChapterIndex, false);
    positionCurrentChapter();
    showToast('七月预览模式：不会改动正常存档');
  }
});
