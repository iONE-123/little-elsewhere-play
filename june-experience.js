// June's approved airy two-column scene. Story, photos and saves remain in june.js.
let juneSceneOpen = true;
let juneJournalOpen = false;

const juneNodeNames = ['日历', '耳饰', '入镜', '专辑'];

function juneMemoryIcon(index) {
  const paths = [
    '<rect x="5" y="6" width="22" height="21" rx="1"/><path d="M5 12h22M11 3v6m10-6v6M10 17h5m-5 5h11"/>',
    '<path d="M16 5c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7Z"/><path d="M16 19v8m-4-3 4 3 4-3"/>',
    '<rect x="4" y="9" width="24" height="17" rx="2"/><path d="m10 9 2-3h8l2 3"/><circle cx="16" cy="17.5" r="4"/>',
    '<circle cx="16" cy="16" r="12"/><circle cx="16" cy="16" r="3"/><path d="M16 4v5m12 7h-5"/>'
  ];
  return '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths[index] + '</svg>';
}

function juneSceneMarkup() {
  const item = junePhotos[juneScene];
  const found = discovered(juneChapterIndex, juneScene);
  const dates = item.date.match(/06\.\d\d/g);
  const dateLabel = dates?.length ? dates.join(' — ') : '日期待核实';
  const kept = junePhotos.filter(function (_, index) { return discovered(juneChapterIndex, index); }).length;
  return '<div class="june-art-plane" aria-hidden="true"></div>' +
    '<div class="june-board-top"><div class="june-logo">OUR LITTLE SIMS</div><div class="june-tools">' +
    novemberTopAction('PLAYER', 'data-game="profile"', '切换角色', novemberPlayerIcon(), ' aria-label="切换角色，当前为' + novemberDisplayName(life.role) + '"') +
    novemberTopAction('JOURNAL', 'data-june-journal', '月度手记', '<img src="./assets/november-journal-icon.png" alt="">', ' aria-label="打开六月月度手记"') +
    '</div></div>' +
    '<nav class="june-node-plane" aria-label="六月的四张回忆照片">' +
    junePhotos.map(function (photo, index) {
      return '<button type="button" class="june-scene-node june-node-' + index + (index === juneScene && juneSceneOpen ? ' is-active' : '') +
        '" data-june-scene="' + index + '" aria-pressed="' + (index === juneScene && juneSceneOpen) +
        '" aria-label="打开' + escapeGame(photo.title) + '"><span class="june-node-name">' + juneNodeNames[index] +
        '</span><span class="june-node-dot" aria-hidden="true"></span></button>';
    }).join('') + '</nav>' +
    (juneSceneOpen ? '<section class="june-panel-shell" aria-label="六月回忆：' + escapeGame(item.title) + '"><div class="june-panel-content">' +
      '<div class="june-panel-head"><span>JUNE / 0' + (juneScene + 1) + ' — 04</span><button type="button" data-june-back>返回场景 ↗</button></div>' +
      '<div class="june-panel-columns"><div class="june-panel-primary"><span class="june-panel-rule" aria-hidden="true"></span><h3>AFTER MAY</h3><p>' + escapeGame(juneTitle) + '</p></div>' +
      '<div class="june-panel-detail"><small>' + dateLabel + ' / MEMORY 0' + (juneScene + 1) + '</small><h4>' + escapeGame(item.title) + '</h4>' +
      '<button type="button" class="june-memory-link" data-game="object" data-index="' + juneChapterIndex + '" data-item="' + juneScene +
      '" aria-label="翻开回忆：' + escapeGame(item.title) + '"><span class="june-memory-icon">' + juneMemoryIcon(juneScene) +
      '</span><span class="june-memory-name">' + escapeGame(juneObjects[juneScene].name) +
      '</span><span class="june-memory-action">翻开回忆' + (found ? ' · 已收藏' : '') +
      '</span><span class="june-memory-arrow" aria-hidden="true">↗</span></button></div></div></div></section>' :
      '<p class="june-scene-hint">FOLLOW THE TRACE <span aria-hidden="true">↗</span></p>') +
    '<div class="june-board-foot"><span>THE ROAD CONTINUES · JUNE</span><span>' + kept + ' / 04 MEMORIES KEPT</span></div>';
}

function drawJuneExperience() {
  const board = stage.querySelector('.june-board');
  if (!board) return;
  board.innerHTML = juneSceneMarkup();
  const journal = stage.querySelector('.june-chapter .reflection-section');
  if (journal) journal.hidden = !juneJournalOpen;
}

// The original June click and save handlers call drawJuneBoard, so replace only its view.
drawJuneBoard = drawJuneExperience;

const juneExperienceBaseRender = renderGameChapter;
renderGameChapter = function (index, scroll) {
  juneExperienceBaseRender(index, scroll);
  document.body.classList.toggle('june-experience-active', index === juneChapterIndex);
  if (index !== juneChapterIndex) return;
  const chapter = stage.querySelector('.june-chapter');
  chapter.querySelector('.chapter-portal')?.remove();
  chapter.querySelector('.scene-header')?.remove();
  const board = chapter.querySelector('.scene-canvas');
  board.className = 'scene-canvas june-board';
  board.setAttribute('aria-label', '六月海岬，沿紫罗兰石缝选择四段回忆');
  const months = chapter.querySelector('.portal-months');
  if (months) {
    const drawer = document.createElement('details');
    drawer.className = 'june-month-drawer';
    drawer.innerHTML = '<summary>MONTHS</summary>';
    drawer.append(months);
    board.after(drawer);
  }
  const journal = chapter.querySelector('.reflection-section');
  journal.setAttribute('aria-label', '六月的手记和章节进度');
  journal.insertAdjacentHTML('afterbegin', '<button type="button" class="june-journal-close" data-june-journal-close>返回场景 ↗</button>');
  drawJuneExperience();
};

document.addEventListener('click', function (event) {
  if (event.target.closest('[data-june-scene]') && document.body.classList.contains('june-experience-active')) {
    juneSceneOpen = true;
    drawJuneExperience();
    stage.querySelector('[data-june-scene="' + juneScene + '"]')?.focus({ preventScroll: true });
  } else if (event.target.closest('[data-june-back]')) {
    juneSceneOpen = false;
    drawJuneExperience();
    stage.querySelector('[data-june-scene="' + juneScene + '"]')?.focus({ preventScroll: true });
  } else if (event.target.closest('[data-june-journal]')) {
    juneJournalOpen = true;
    drawJuneExperience();
    stage.querySelector('[data-june-journal-close]')?.focus({ preventScroll: true });
  } else if (event.target.closest('[data-june-journal-close]')) {
    juneJournalOpen = false;
    drawJuneExperience();
    stage.querySelector('[data-june-journal]')?.focus({ preventScroll: true });
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key !== 'Escape' || !document.body.classList.contains('june-experience-active') || lifeModal.open) return;
  if (juneJournalOpen) {
    juneJournalOpen = false;
    drawJuneExperience();
    stage.querySelector('[data-june-journal]')?.focus({ preventScroll: true });
  } else if (juneSceneOpen) {
    juneSceneOpen = false;
    drawJuneExperience();
    stage.querySelector('[data-june-scene="' + juneScene + '"]')?.focus({ preventScroll: true });
  }
});

const juneExperienceBaseShelf = showShelf;
showShelf = function (message) {
  document.body.classList.remove('june-experience-active');
  return juneExperienceBaseShelf(message);
};
