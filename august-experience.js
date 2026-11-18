// Approved August mountain scene. Six stages and all 64 original photos remain in august-data.js.
let augustAlbumOpen = false;
let augustJournalOpen = false;

function augustToolIcon(kind) {
  const path = kind === 'journal'
    ? '<path d="M5 5h21v22H5zM15.5 5v22M9 10h3m-3 5h3m7-5h3m-3 5h3"/>'
    : '<path d="M16 27V16m0 0c-6 0-10-3-11-8 6 0 10 3 11 8Zm0 0c0-6 4-9 11-9-1 6-5 9-11 9Z"/>';
  return '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + '</svg>';
}

function augustStageMarkup() {
  const part = augustStages[augustStage];
  const number = String(augustStage + 1).padStart(2, '0');
  return '<div class="august-scene-tools">' +
    '<button type="button" data-game="profile" aria-label="切换角色，当前为' + novemberDisplayName(life.role) + '">' + augustToolIcon('player') + '<span>切换角色</span></button>' +
    '<button type="button" data-august-journal aria-label="打开八月月度手记">' + augustToolIcon('journal') + '<span>月度手记</span></button></div>' +
    '<section class="august-panel-shell" aria-label="八月旅程：' + escapeGame(part.name) + '"><div class="august-panel-inner">' +
    '<div class="august-panel-primary"><small>AUGUST / 01 — 06</small><h3>ELSEWHERE</h3><p>' + escapeGame(chapters[augustChapterIndex].title) + '</p></div>' +
    '<div class="august-panel-detail"><small>' + escapeGame(part.date) + ' / PART ' + number + '</small><h4>' + escapeGame(part.name) + '</h4>' +
    '<button type="button" data-august-album class="august-open-album" aria-label="翻开' + escapeGame(part.name) + '的照片">' +
    '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 23h26M7 18h18M11 13h10M15 8h2"/></svg>' +
    '<span>翻开这一程 ↗</span></button><span class="august-panel-range">' + escapeGame(part.range) + ' / 64 FRAMES</span></div></div></section>' +
    '<nav class="august-route" aria-label="八月六段旅程"><svg class="august-route-line" viewBox="0 0 1440 736" preserveAspectRatio="none" aria-hidden="true"><polyline points="575,540 735,557 895,572 1055,579 1215,566 1360,542"/></svg>' +
    augustStages.map(function (stageItem, index) {
      return '<button type="button" class="august-route-node august-node-' + index + (index === augustStage ? ' is-active' : '') +
        '" data-august-stage="' + index + '" aria-pressed="' + (index === augustStage) + '" aria-label="第' + (index + 1) + '段：' + escapeGame(stageItem.name) + '">' +
        '<span class="august-route-name">' + escapeGame(stageItem.name) + '</span><span class="august-route-dot" aria-hidden="true"></span><small>' + String(index + 1).padStart(2, '0') + '</small></button>';
    }).join('') + '</nav><p class="august-scene-foot">SIX PARTS · SIXTY-FOUR FRAMES</p>';
}

function augustAlbumMarkup() {
  const part = augustStages[augustStage];
  const photo = augustPhotos[augustPhoto];
  const selected = augustPhoto;
  const group = augustPhotos.map(function (item, index) { return { item, index }; }).filter(function (entry) { return entry.item.stage === augustStage; });
  return '<section class="august-album-shell" aria-label="' + escapeGame(part.name) + '的照片相册">' +
    '<div class="august-album-head"><div><small>PART ' + String(augustStage + 1).padStart(2, '0') + ' / 06 · ' + group.length + ' FRAMES</small><h3>' + escapeGame(part.name) + '</h3></div>' +
    '<button type="button" data-august-album-close class="august-album-close">返回山谷 ↗</button></div>' +
    '<div class="august-album-main"><figure class="august-album-photo"><img src="./assets/august/' + photo.file + '" alt="' + escapeGame(photo.alt) + '"><figcaption>' + escapeGame(photo.caption) + '</figcaption></figure>' +
    '<div class="august-album-copy"><small>' + escapeGame(photo.date) + ' · ' + String(selected + 1).padStart(2, '0') + ' / 64</small><h4>' + escapeGame(photo.title) + '</h4>' +
    '<span class="august-album-side">' + (augustTurned ? '照片背面' : '照片正面') + '</span><p>' + escapeGame(augustTurned ? photo.back : photo.front) + '</p>' +
    '<button type="button" class="august-album-turn" data-august-turn>' + (augustTurned ? '翻回正面 ↶' : '翻到背面 →') + '</button>' +
    '<button type="button" class="august-album-collect" data-game="object" data-index="' + augustChapterIndex + '" data-item="' + augustStage + '">' +
    augustToolIcon('journal') + '<span>' + (discovered(augustChapterIndex, augustStage) ? '这一程已收好 · 再打开' : '收好这一程') + '</span></button></div></div>' +
    '<div class="august-album-strip" role="group" aria-label="选择这一程的照片">' + group.map(function (entry) {
      return '<button type="button" data-august-photo="' + entry.index + '" aria-pressed="' + (entry.index === selected) + '" aria-label="第' + (entry.index + 1) + '张：' + escapeGame(entry.item.title) + '">' +
        '<img src="./assets/august/' + entry.item.file + '" alt="" loading="lazy" decoding="async"><small>' + String(entry.index + 1).padStart(2, '0') + '</small></button>';
    }).join('') + '</div></section>';
}

function drawAugustExperience() {
  const board = stage.querySelector('.august-chapter .scene-canvas');
  if (!board) return;
  board.className = 'scene-canvas august-board' + (augustAlbumOpen ? ' is-album-open' : '');
  board.setAttribute('aria-label', '八月双峰山谷，沿六段旅程翻看六十四张照片');
  board.innerHTML = '<div class="august-art-plane" aria-hidden="true"></div>' + (augustAlbumOpen ? augustAlbumMarkup() : augustStageMarkup());
  const journal = stage.querySelector('.august-chapter .reflection-section');
  if (journal) journal.hidden = !augustJournalOpen;
}

drawAugustBoard = drawAugustExperience;

const augustExperienceBaseRender = renderGameChapter;
renderGameChapter = function (index, scroll) {
  augustExperienceBaseRender(index, scroll);
  document.body.classList.toggle('august-experience-active', index === augustChapterIndex);
  if (index !== augustChapterIndex) return;
  const chapter = stage.querySelector('.august-chapter');
  if (!chapter) return;
  chapter.querySelector('.chapter-portal')?.remove();
  chapter.querySelector('.scene-header')?.remove();
  chapter.querySelector('.august-preview-gallery')?.remove();
  const board = chapter.querySelector('.scene-canvas');
  const months = chapter.querySelector('.portal-months');
  if (months) {
    const drawer = document.createElement('details');
    drawer.className = 'august-month-drawer';
    drawer.innerHTML = '<summary>MONTHS</summary>';
    drawer.append(months);
    board.after(drawer);
  }
  const journal = chapter.querySelector('.reflection-section');
  journal.setAttribute('aria-label', '八月的手记和章节进度');
  journal.insertAdjacentHTML('afterbegin', '<button type="button" class="august-journal-close" data-august-journal-close>返回山谷 ↗</button>');
  drawAugustExperience();
};

document.addEventListener('click', function (event) {
  if (!document.body.classList.contains('august-experience-active')) return;
  if (event.target.closest('[data-august-album]')) {
    augustAlbumOpen = true;
    drawAugustExperience();
    stage.querySelector('[data-august-album-close]')?.focus({ preventScroll: true });
  } else if (event.target.closest('[data-august-album-close]')) {
    augustAlbumOpen = false;
    drawAugustExperience();
    stage.querySelector('[data-august-album]')?.focus({ preventScroll: true });
  } else if (event.target.closest('[data-august-journal]')) {
    augustJournalOpen = true;
    drawAugustExperience();
    stage.querySelector('[data-august-journal-close]')?.focus({ preventScroll: true });
  } else if (event.target.closest('[data-august-journal-close]')) {
    augustJournalOpen = false;
    drawAugustExperience();
    stage.querySelector('[data-august-journal]')?.focus({ preventScroll: true });
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key !== 'Escape' || !document.body.classList.contains('august-experience-active') || lifeModal.open) return;
  if (augustJournalOpen) {
    augustJournalOpen = false;
    drawAugustExperience();
    stage.querySelector('[data-august-journal]')?.focus({ preventScroll: true });
  } else if (augustAlbumOpen) {
    augustAlbumOpen = false;
    drawAugustExperience();
    stage.querySelector('[data-august-album]')?.focus({ preventScroll: true });
  }
});

const augustExperienceBaseShelf = showShelf;
showShelf = function (message) {
  document.body.classList.remove('august-experience-active');
  return augustExperienceBaseShelf(message);
};
