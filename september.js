let septemberStage = 0;
let septemberPhoto = 0;
let septemberTurned = false;
let septemberVoice = 0;

function septemberImage(item, className, lazy = false) {
  return '<figure class="' + className + '"><img src="./assets/september/' + item.file + '" alt="' +
    escapeGame(item.alt) + '" decoding="async"' + (lazy ? ' loading="lazy"' : '') +
    '><figcaption>' + escapeGame(item.caption) + '</figcaption></figure>';
}

function drawSeptemberBoard() {
  const canvas = stage.querySelector('.scene-canvas');
  if (!canvas) return;
  const active = septemberPhotos[septemberPhoto];
  const photos = septemberPhotos.map((item, index) => ({ item, index })).filter(({ item }) => item.stage === septemberStage);
  const chapterTabs = septemberStages.map((part, index) => '<button type="button" data-september-stage="' + index +
    '" aria-pressed="' + (index === septemberStage) + '"><small>' + String(index + 1).padStart(2, '0') +
    ' · ' + escapeGame(part.date) + '</small><strong>' + escapeGame(part.name) + '</strong></button>').join('');
  const thumbnails = photos.map(({ item, index }) => '<button type="button" data-september-photo="' + index +
    '" aria-pressed="' + (index === septemberPhoto) + '" aria-label="查看第' + (index + 1) +
    '张：' + escapeGame(item.title) + '"><img src="./assets/september/' + item.file +
    '" alt="" loading="lazy" decoding="async"><span>' + String(index + 1).padStart(2, '0') +
    ' · ' + escapeGame(item.title) + '</span></button>').join('');
  const part = septemberStages[septemberStage];
  canvas.className = 'scene-canvas september-board';
  canvas.setAttribute('aria-label', '九月六张照片');
  canvas.innerHTML = '<div class="september-stage-tabs" role="group" aria-label="九月章节阶段">' + chapterTabs +
    '</div><div class="september-board-intro"><span>' + escapeGame(part.range) + ' / 6 张照片</span><p>' +
    escapeGame(part.note) + '</p></div><div class="september-photo-grid" role="group" aria-label="选择照片">' +
    thumbnails + '</div><div class="september-feature">' + septemberImage(active, 'september-cover') +
    '<div class="september-feature-copy"><span class="september-date">' + escapeGame(active.date) +
    ' · ' + String(septemberPhoto + 1).padStart(2, '0') + ' / 6</span><h4>' + escapeGame(active.title) +
    '</h4><p class="september-note-label">' + (septemberTurned ? '照片背面' : '照片正面') +
    '</p><p class="september-note-text">' + escapeGame(septemberTurned ? active.back : active.front) +
    '</p><button type="button" class="september-turn" data-september-turn>' +
    (septemberTurned ? '翻回正面 ↶' : '翻到背面 →') +
    '</button><button type="button" class="september-collect" data-game="object" data-index="' +
    septemberChapterIndex + '" data-item="' + septemberStage + '">' + lifeIcon(septemberObjects[septemberStage].icon) +
    '<span><strong>' + escapeGame(part.name) + '</strong><small>' +
    (discovered(septemberChapterIndex, septemberStage) ? '✓ 这一程已收好 · 可再次打开' : '探索并收好这一程') +
    '</small></span></button></div></div>';
}

function septemberReading() {
  const buttons = septemberNarratives.map((voice, index) => '<button type="button" data-september-voice="' + index +
    '" aria-pressed="false" aria-controls="september-prose">' + voice.name + '</button>').join('');
  return '<section class="september-reading" aria-labelledby="september-reading-title"><h4 id="september-reading-title">九月视角记录仪</h4>' +
    '<div class="september-voice-switch" role="group" aria-label="叙述视角">' + buttons +
    '</div><p class="september-byline" id="september-byline"></p><div class="diary-prose" id="september-prose" aria-live="polite"></div></section>';
}

function septemberJournalCards() {
  return '<section class="september-journal" aria-labelledby="september-journal-title"><p class="eyebrow">CHAT-ONLY MEMORIES</p>' +
    '<h4 id="september-journal-title">没有照片的四则小记</h4><div class="september-journal-grid">' +
    septemberJournal.map(item => '<article><small>' + escapeGame(item.date) + '</small><h5>' +
      escapeGame(item.title) + '</h5><p>' + escapeGame(item.text) + '</p></article>').join('') +
    '</div></section>';
}

function drawSeptemberVoice() {
  const host = stage.querySelector('#september-prose');
  if (!host) return;
  host.innerHTML = septemberNarratives[septemberVoice].paragraphs.map(p => '<p>' + escapeGame(p) + '</p>').join('');
  stage.querySelector('#september-byline').textContent = septemberNarratives[septemberVoice].subtitle;
  stage.querySelectorAll('[data-september-voice]').forEach(button => {
    button.setAttribute('aria-pressed', String(Number(button.dataset.septemberVoice) === septemberVoice));
  });
}

const septemberBaseRender = renderGameChapter;
renderGameChapter = function (index, scroll) {
  septemberBaseRender(index, scroll);
  if (index !== septemberChapterIndex) return;
  stage.querySelector('.life-chapter').classList.add('september-chapter');
  drawSeptemberBoard();
  const reflection = stage.querySelector('.reflection-section');
  const oldDiary = reflection.querySelector('.memory-diary, .locked-diary');
  if (oldDiary.classList.contains('locked-diary')) {
    oldDiary.insertAdjacentHTML('beforebegin', septemberReading());
    oldDiary.textContent = '收好五段九月，再为这一页留下一种看法。';
  } else {
    oldDiary.outerHTML = septemberReading();
  }
  reflection.querySelector('.reflection-heading').remove();
  reflection.insertAdjacentHTML('afterbegin',
    '<div class="september-ledger" aria-label="九月小记"><div><strong>6</strong><small>被保存的照片</small></div>' +
    '<div><strong>5</strong><small>照片章节</small></div><div><strong>4</strong><small>无照片手记</small></div></div>' + septemberJournalCards());
  drawSeptemberVoice();
};

document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button || button.disabled) return;
  if (button.hasAttribute('data-september-stage')) {
    septemberStage = Number(button.dataset.septemberStage);
    septemberPhoto = septemberPhotos.findIndex(item => item.stage === septemberStage);
    septemberTurned = false;
    drawSeptemberBoard();
    stage.querySelector('[data-september-stage="' + septemberStage + '"]').focus({ preventScroll:true });
  } else if (button.hasAttribute('data-september-photo')) {
    septemberPhoto = Number(button.dataset.septemberPhoto);
    septemberTurned = false;
    drawSeptemberBoard();
    stage.querySelector('[data-september-photo="' + septemberPhoto + '"]').focus({ preventScroll:true });
  } else if (button.hasAttribute('data-september-turn')) {
    septemberTurned = !septemberTurned;
    drawSeptemberBoard();
    stage.querySelector('[data-september-turn]').focus({ preventScroll:true });
  } else if (button.hasAttribute('data-september-voice')) {
    septemberVoice = Number(button.dataset.septemberVoice);
    drawSeptemberVoice();
  }
});

// Preview unlocks earlier chapters only in memory after all scene scripts have loaded.
window.addEventListener('DOMContentLoaded', function () {
  if (new URLSearchParams(window.location.search).get('preview') === 'september') {
    previewMode = true;
    state = {
      unlocked: Math.max(state.unlocked, septemberChapterIndex),
      completed: Array.from(new Set([...state.completed, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9])),
      choices: { ...state.choices }
    };
    activeVolumeStart = volumeStartFor(septemberChapterIndex);
    closeOpening();
    renderChapter(septemberChapterIndex, false);
    positionCurrentChapter();
    showToast('九月预览模式：不会改动正常存档');
  }
});
