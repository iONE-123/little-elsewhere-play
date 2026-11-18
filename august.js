let augustStage = 0;
let augustPhoto = 0;
let augustTurned = false;
let augustVoice = 0;

function augustImage(item, className, lazy = false) {
  return '<figure class="' + className + '"><img src="./assets/august/' + item.file + '" alt="' +
    escapeGame(item.alt) + '" decoding="async"' + (lazy ? ' loading="lazy"' : '') +
    '><figcaption>' + escapeGame(item.caption) + '</figcaption></figure>';
}

function drawAugustBoard() {
  const canvas = stage.querySelector('.scene-canvas');
  if (!canvas) return;
  const active = augustPhotos[augustPhoto];
  const photos = augustPhotos.map((item, index) => ({ item, index })).filter(({ item }) => item.stage === augustStage);
  const chapterTabs = augustStages.map((part, index) => '<button type="button" data-august-stage="' + index +
    '" aria-pressed="' + (index === augustStage) + '"><small>' + String(index + 1).padStart(2, '0') +
    ' · ' + escapeGame(part.date) + '</small><strong>' + escapeGame(part.name) + '</strong></button>').join('');
  const thumbnails = photos.map(({ item, index }) => '<button type="button" data-august-photo="' + index +
    '" aria-pressed="' + (index === augustPhoto) + '" aria-label="查看第' + (index + 1) +
    '张：' + escapeGame(item.title) + '"><img src="./assets/august/' + item.file +
    '" alt="" loading="lazy" decoding="async"><span>' + String(index + 1).padStart(2, '0') +
    ' · ' + escapeGame(item.title) + '</span></button>').join('');
  const part = augustStages[augustStage];
  canvas.className = 'scene-canvas august-board';
  canvas.setAttribute('aria-label', '八月六十四张照片');
  canvas.innerHTML = '<div class="august-stage-tabs" role="group" aria-label="八月旅程阶段">' + chapterTabs +
    '</div><div class="august-board-intro"><span>' + escapeGame(part.range) + ' / 64 张照片</span><p>' +
    escapeGame(part.note) + '</p></div><div class="august-photo-grid" role="group" aria-label="选择照片">' +
    thumbnails + '</div><div class="august-feature">' + augustImage(active, 'august-cover') +
    '<div class="august-feature-copy"><span class="august-date">' + escapeGame(active.date) +
    ' · ' + String(augustPhoto + 1).padStart(2, '0') + ' / 64</span><h4>' + escapeGame(active.title) +
    '</h4><p class="august-note-label">' + (augustTurned ? '照片背面' : '照片正面') +
    '</p><p class="august-note-text">' + escapeGame(augustTurned ? active.back : active.front) +
    '</p><button type="button" class="august-turn" data-august-turn>' +
    (augustTurned ? '翻回正面 ↶' : '翻到背面 →') +
    '</button><button type="button" class="august-collect" data-game="object" data-index="' +
    augustChapterIndex + '" data-item="' + augustStage + '">' + lifeIcon(augustObjects[augustStage].icon) +
    '<span><strong>' + escapeGame(part.name) + '</strong><small>' +
    (discovered(augustChapterIndex, augustStage) ? '✓ 这一程已收好 · 可再次打开' : '探索并收好这一程') +
    '</small></span></button></div></div>';
}

function augustReading() {
  const buttons = augustNarratives.map((voice, index) => '<button type="button" data-august-voice="' + index +
    '" aria-pressed="false" aria-controls="august-prose">' + voice.name + '</button>').join('');
  return '<section class="august-reading" aria-labelledby="august-reading-title"><h4 id="august-reading-title">八月手记</h4>' +
    '<div class="august-voice-switch" role="group" aria-label="叙述视角">' + buttons +
    '</div><p class="august-byline" id="august-byline"></p><div class="diary-prose" id="august-prose" aria-live="polite"></div></section>';
}

function drawAugustVoice() {
  const host = stage.querySelector('#august-prose');
  if (!host) return;
  host.innerHTML = augustNarratives[augustVoice].paragraphs.map(p => '<p>' + escapeGame(p) + '</p>').join('');
  stage.querySelector('#august-byline').textContent = augustNarratives[augustVoice].subtitle;
  stage.querySelectorAll('[data-august-voice]').forEach(button => {
    button.setAttribute('aria-pressed', String(Number(button.dataset.augustVoice) === augustVoice));
  });
}

const augustBaseRender = renderGameChapter;
renderGameChapter = function (index, scroll) {
  augustBaseRender(index, scroll);
  if (index !== augustChapterIndex) return;
  stage.querySelector('.life-chapter').classList.add('august-chapter');
  drawAugustBoard();
  const reflection = stage.querySelector('.reflection-section');
  const oldDiary = reflection.querySelector('.memory-diary, .locked-diary');
  if (oldDiary.classList.contains('locked-diary')) {
    oldDiary.insertAdjacentHTML('beforebegin', augustReading());
    oldDiary.textContent = '收好六段旅程，再为八月留下一种看法。';
  } else {
    oldDiary.outerHTML = augustReading();
  }
  reflection.querySelector('.reflection-heading').remove();
  reflection.insertAdjacentHTML('afterbegin',
    '<div class="august-ledger" aria-label="八月小记"><div><strong>64</strong><small>被保存的照片</small></div>' +
    '<div><strong>6</strong><small>旅程的段落</small></div><div><strong>1</strong><small>回家后的生日歌</small></div></div>');
  drawAugustVoice();
};

document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button || button.disabled) return;
  if (button.hasAttribute('data-august-stage')) {
    augustStage = Number(button.dataset.augustStage);
    augustPhoto = augustPhotos.findIndex(item => item.stage === augustStage);
    augustTurned = false;
    drawAugustBoard();
    stage.querySelector('[data-august-stage="' + augustStage + '"]').focus({ preventScroll:true });
  } else if (button.hasAttribute('data-august-photo')) {
    augustPhoto = Number(button.dataset.augustPhoto);
    augustTurned = false;
    drawAugustBoard();
    stage.querySelector('[data-august-photo="' + augustPhoto + '"]').focus({ preventScroll:true });
  } else if (button.hasAttribute('data-august-turn')) {
    augustTurned = !augustTurned;
    drawAugustBoard();
    stage.querySelector('[data-august-turn]').focus({ preventScroll:true });
  } else if (button.hasAttribute('data-august-voice')) {
    augustVoice = Number(button.dataset.augustVoice);
    drawAugustVoice();
  }
});

// Preview unlocks earlier chapters only in memory after all scene scripts have loaded.
window.addEventListener('DOMContentLoaded', function () {
  if (new URLSearchParams(window.location.search).get('preview') === 'august') {
    previewMode = true;
    state = {
      unlocked: Math.max(state.unlocked, augustChapterIndex),
      completed: Array.from(new Set([...state.completed, 0, 1, 2, 3, 4, 5, 6, 7, 8])),
      choices: { ...state.choices }
    };
    activeVolumeStart = volumeStartFor(augustChapterIndex);
    closeOpening();
    renderChapter(augustChapterIndex, false);
    positionCurrentChapter();
    showToast('八月预览模式：不会改动正常存档');
  }
});
