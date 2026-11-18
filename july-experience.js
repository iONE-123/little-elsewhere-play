// Approved July water terrace. Existing photo, diary and save behavior stays in july.js.
let julyJournalOpen = false;

function julyLineIcon(kind) {
  const path = kind === 'journal'
    ? '<path d="M5 5h21v22H5zM15.5 5v22M9 10h3m-3 5h3m7-5h3m-3 5h3"/>'
    : '<path d="M16 27V16m0 0c-6 0-10-3-11-8 6 0 10 3 11 8Zm0 0c0-6 4-9 11-9-1 6-5 9-11 9Z"/>';
  return '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + '</svg>';
}

function julyExperienceMarkup() {
  const photo = julyPhotos[julyScene];
  const number = String(julyScene + 1).padStart(2, '0');
  const dateParts = photo.date.split(' · ');
  const date = dateParts[0];
  const detail = dateParts[1] || photo.title;
  const found = discovered(julyChapterIndex, julyScene);
  const marks = julyPhotos.map(function (_, index) {
    return '<span' + (index === julyScene ? ' class="is-current"' : '') + '></span>';
  }).join('');
  const choices = julyPhotos.map(function (item, index) {
    return '<button type="button" data-july-scene="' + index + '" aria-current="' + (index === julyScene ? 'true' : 'false') + '"><small>' +
      String(index + 1).padStart(2, '0') + '</small><span>' + escapeGame(item.title) + '</span></button>';
  }).join('');
  return '<div class="july-art-plane" aria-hidden="true"></div>' +
    '<div class="july-scene-tools">' +
      '<button type="button" data-game="profile" aria-label="切换角色，当前为' + novemberDisplayName(life.role) + '">' +
      julyLineIcon('player') + '<span><small>PLAYER</small><strong>切换角色</strong></span></button>' +
      '<button type="button" data-july-journal aria-label="打开七月月度手记">' +
      julyLineIcon('journal') + '<span><small>JOURNAL</small><strong>月度手记</strong></span></button></div>' +
    '<div class="july-edition">JULY / 01 — 13</div>' +
    '<section class="july-panel-shell" aria-label="七月回忆：' + escapeGame(photo.title) + '"><div class="july-panel-inner">' +
      '<div class="july-panel-primary"><h3>IN MOTION</h3><p>' + escapeGame(julyTitle) + '</p></div>' +
      '<div class="july-panel-detail"><small>' + escapeGame(date) + ' / MEMORY ' + number + '</small><h4>' + escapeGame(photo.title) + '</h4>' +
      '<button type="button" class="july-memory-link" data-game="object" data-index="' + julyChapterIndex + '" data-item="' + julyScene +
      '" aria-label="翻开回忆：' + escapeGame(photo.title) + '">' +
      '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="26" height="24"/><path d="m7 23 7-7 5 5 5-6"/></svg>' +
      '<span class="july-memory-name">' + escapeGame(detail) + '</span><span class="july-memory-action">翻开回忆' + (found ? ' · 已收好' : '') + ' ↗</span></button></div></div></section>' +
    '<nav class="july-photo-nav" aria-label="七月十三张照片导航">' +
      '<button type="button" class="july-step" data-july-step="-1"' + (julyScene === 0 ? ' disabled' : '') + '>↖ 上一张</button>' +
      '<details class="july-index"><summary data-july-index aria-label="第' + (julyScene + 1) + '张，共13张；选择照片"><span>' + number + ' / 13</span><span class="july-ticks" aria-hidden="true">' + marks + '</span></summary>' +
      '<div class="july-index-list" role="group" aria-label="选择七月照片">' + choices + '</div></details>' +
      '<button type="button" class="july-step" data-july-step="1"' + (julyScene === julyPhotos.length - 1 ? ' disabled' : '') + '>下一张 ↗</button></nav>';
}

function drawJulyExperience() {
  const board = stage.querySelector('.july-chapter .scene-canvas');
  if (!board) return;
  board.className = 'scene-canvas july-board';
  board.setAttribute('aria-label', '七月水台，选择十三张照片并翻看两面');
  board.innerHTML = julyExperienceMarkup();
  const journal = stage.querySelector('.july-chapter .reflection-section');
  if (journal) journal.hidden = !julyJournalOpen;
}

drawJulyBoard = drawJulyExperience;

const julyExperienceBaseRender = renderGameChapter;
renderGameChapter = function (index, scroll) {
  julyExperienceBaseRender(index, scroll);
  document.body.classList.toggle('july-experience-active', index === julyChapterIndex);
  if (index !== julyChapterIndex) return;
  const chapter = stage.querySelector('.july-chapter');
  if (!chapter) return;
  chapter.querySelector('.chapter-portal')?.remove();
  chapter.querySelector('.scene-header')?.remove();
  chapter.querySelector('.july-preview-gallery')?.remove();
  const board = chapter.querySelector('.scene-canvas');
  const months = chapter.querySelector('.portal-months');
  if (months) {
    const drawer = document.createElement('details');
    drawer.className = 'july-month-drawer';
    drawer.innerHTML = '<summary>MONTHS</summary>';
    drawer.append(months);
    board.after(drawer);
  }
  const journal = chapter.querySelector('.reflection-section');
  journal.setAttribute('aria-label', '七月的手记与章节进度');
  journal.insertAdjacentHTML('afterbegin', '<button type="button" class="july-journal-close" data-july-journal-close>返回场景 ↗</button>');
  drawJulyExperience();
};

document.addEventListener('click', function (event) {
  if (!document.body.classList.contains('july-experience-active')) return;
  const step = event.target.closest('[data-july-step]');
  if (step && !step.disabled) {
    julyScene = Math.max(0, Math.min(julyPhotos.length - 1, julyScene + Number(step.dataset.julyStep)));
    drawJulyExperience();
    stage.querySelector('[data-july-step="' + step.dataset.julyStep + '"]')?.focus({ preventScroll: true });
  } else if (event.target.closest('[data-july-journal]')) {
    julyJournalOpen = true;
    drawJulyExperience();
    stage.querySelector('[data-july-journal-close]')?.focus({ preventScroll: true });
  } else if (event.target.closest('[data-july-journal-close]')) {
    julyJournalOpen = false;
    drawJulyExperience();
    stage.querySelector('[data-july-journal]')?.focus({ preventScroll: true });
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key !== 'Escape' || !document.body.classList.contains('july-experience-active') || lifeModal.open || !julyJournalOpen) return;
  julyJournalOpen = false;
  drawJulyExperience();
  stage.querySelector('[data-july-journal]')?.focus({ preventScroll: true });
});

const julyExperienceBaseShelf = showShelf;
showShelf = function (message) {
  document.body.classList.remove('july-experience-active');
  return julyExperienceBaseShelf(message);
};
