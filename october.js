let octoberStage = 0;
let octoberPhoto = 0;
let octoberTurned = false;
let octoberVoice = 0;

function octoberImage(item, className, lazy = false) {
  return '<figure class="' + className + '"><img src="./assets/october/' + item.file + '" alt="' +
    escapeGame(item.alt) + '" decoding="async"' + (lazy ? ' loading="lazy"' : '') +
    '><figcaption>' + escapeGame(item.caption) + '</figcaption></figure>';
}

function drawOctoberBoard() {
  const canvas = stage.querySelector('.scene-canvas');
  if (!canvas) return;
  const active = octoberPhotos[octoberPhoto];
  const photos = octoberPhotos.map((item, index) => ({ item, index })).filter(({ item }) => item.stage === octoberStage);
  const chapterTabs = octoberStages.map((part, index) => '<button type="button" data-october-stage="' + index +
    '" aria-pressed="' + (index === octoberStage) + '"><small>' + String(index + 1).padStart(2, '0') +
    ' · ' + escapeGame(part.date) + '</small><strong>' + escapeGame(part.name) + '</strong></button>').join('');
  const thumbnails = photos.map(({ item, index }) => '<button type="button" data-october-photo="' + index +
    '" aria-pressed="' + (index === octoberPhoto) + '" aria-label="查看第' + (index + 1) +
    '张：' + escapeGame(item.title) + '"><img src="./assets/october/' + item.file +
    '" alt="" loading="lazy" decoding="async"><span>' + String(index + 1).padStart(2, '0') +
    ' · ' + escapeGame(item.title) + '</span></button>').join('');
  const part = octoberStages[octoberStage];
  canvas.className = 'scene-canvas october-board';
  canvas.setAttribute('aria-label', '十月三十一张照片');
  canvas.innerHTML = '<div class="october-stage-tabs" role="group" aria-label="十月章节阶段">' + chapterTabs +
    '</div><div class="october-board-intro"><span>' + escapeGame(part.range) + ' / 31 张照片</span><p>' +
    escapeGame(part.note) + '</p></div><div class="october-photo-grid" role="group" aria-label="选择照片">' +
    thumbnails + '</div><div class="october-feature">' + octoberImage(active, 'october-cover') +
    '<div class="october-feature-copy"><span class="october-date">' + escapeGame(active.date) +
    ' · ' + String(octoberPhoto + 1).padStart(2, '0') + ' / 31</span><h4>' + escapeGame(active.title) +
    '</h4><p class="october-note-label">' + (octoberTurned ? '照片背面' : '照片正面') +
    '</p><p class="october-note-text">' + escapeGame(octoberTurned ? active.back : active.front) +
    '</p><button type="button" class="october-turn" data-october-turn>' +
    (octoberTurned ? '翻回正面 ↶' : '翻到背面 →') +
    '</button><button type="button" class="october-collect" data-game="object" data-index="' +
    octoberChapterIndex + '" data-item="' + octoberStage + '">' + lifeIcon(octoberObjects[octoberStage].icon) +
    '<span><strong>' + escapeGame(part.name) + '</strong><small>' +
    (discovered(octoberChapterIndex, octoberStage) ? '✓ 这一程已收好 · 可再次打开' : '探索并收好这一程') +
    '</small></span></button></div></div>';
}

function octoberReading() {
  const buttons = octoberNarratives.map((voice, index) => '<button type="button" data-october-voice="' + index +
    '" aria-pressed="false" aria-controls="october-prose">' + voice.name + '</button>').join('');
  return '<section class="october-reading" aria-labelledby="october-reading-title"><h4 id="october-reading-title">十月视角记录仪</h4>' +
    '<div class="october-voice-switch" role="group" aria-label="叙述视角">' + buttons +
    '</div><p class="october-byline" id="october-byline"></p><div class="diary-prose" id="october-prose" aria-live="polite"></div></section>';
}

function octoberJournalCards() {
  return '<section class="october-journal" aria-labelledby="october-journal-title"><p class="eyebrow">CHAT-ONLY MEMORIES</p>' +
    '<h4 id="october-journal-title">没有照片的五则小记</h4><div class="october-journal-grid">' +
    octoberJournal.map(item => '<article><small>' + escapeGame(item.date) + '</small><h5>' +
      escapeGame(item.title) + '</h5><p>' + escapeGame(item.text) + '</p></article>').join('') +
    '</div></section>';
}

function drawOctoberVoice() {
  const host = stage.querySelector('#october-prose');
  if (!host) return;
  host.innerHTML = octoberNarratives[octoberVoice].paragraphs.map(p => '<p>' + escapeGame(p) + '</p>').join('');
  stage.querySelector('#october-byline').textContent = octoberNarratives[octoberVoice].subtitle;
  stage.querySelectorAll('[data-october-voice]').forEach(button => {
    button.setAttribute('aria-pressed', String(Number(button.dataset.octoberVoice) === octoberVoice));
  });
}

const octoberBaseRender = renderGameChapter;
renderGameChapter = function (index, scroll) {
  octoberBaseRender(index, scroll);
  if (index !== octoberChapterIndex) return;
  stage.querySelector('.life-chapter').classList.add('october-chapter');
  drawOctoberBoard();
  const reflection = stage.querySelector('.reflection-section');
  const oldDiary = reflection.querySelector('.memory-diary, .locked-diary');
  if (oldDiary.classList.contains('locked-diary')) {
    oldDiary.insertAdjacentHTML('beforebegin', octoberReading());
    oldDiary.textContent = '收好六段十月，再为这一页留下一种看法。';
  } else {
    oldDiary.outerHTML = octoberReading();
  }
  reflection.querySelector('.reflection-heading').remove();
  reflection.insertAdjacentHTML('afterbegin',
    '<div class="october-ledger" aria-label="十月小记"><div><strong>31</strong><small>被保存的照片</small></div>' +
    '<div><strong>6</strong><small>照片章节</small></div><div><strong>5</strong><small>无照片手记</small></div></div>' + octoberJournalCards());
  drawOctoberVoice();
};

document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button || button.disabled) return;
  if (button.hasAttribute('data-october-stage')) {
    octoberStage = Number(button.dataset.octoberStage);
    octoberPhoto = octoberPhotos.findIndex(item => item.stage === octoberStage);
    octoberTurned = false;
    drawOctoberBoard();
    stage.querySelector('[data-october-stage="' + octoberStage + '"]').focus({ preventScroll:true });
  } else if (button.hasAttribute('data-october-photo')) {
    octoberPhoto = Number(button.dataset.octoberPhoto);
    octoberTurned = false;
    drawOctoberBoard();
    stage.querySelector('[data-october-photo="' + octoberPhoto + '"]').focus({ preventScroll:true });
  } else if (button.hasAttribute('data-october-turn')) {
    octoberTurned = !octoberTurned;
    drawOctoberBoard();
    stage.querySelector('[data-october-turn]').focus({ preventScroll:true });
  } else if (button.hasAttribute('data-october-voice')) {
    octoberVoice = Number(button.dataset.octoberVoice);
    drawOctoberVoice();
  }
});

// Preview unlocks earlier chapters only in memory after all scene scripts have loaded.
window.addEventListener('DOMContentLoaded', function () {
  if (new URLSearchParams(window.location.search).get('preview') === 'october') {
    previewMode = true;
    state = {
      unlocked: Math.max(state.unlocked, octoberChapterIndex),
      completed: Array.from(new Set([...state.completed, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])),
      choices: { ...state.choices }
    };
    activeVolumeStart = volumeStartFor(octoberChapterIndex);
    closeOpening();
    renderChapter(octoberChapterIndex, false);
    positionCurrentChapter();
    showToast('十月预览模式：不会改动正常存档');
  }
});
