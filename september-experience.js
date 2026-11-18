// Approved September mist valley scene. Story, six photos and four chat-only notes live in september-data.js.
let septemberAlbumOpen = false;
let septemberJournalOpen = false;

function septemberToolIcon(kind) {
  const path = kind === 'journal'
    ? '<path d="M5 5h21v22H5zM15.5 5v22M9 10h3m-3 5h3m7-5h3m-3 5h3"/>'
    : '<path d="M16 27V16m0 0c-6 0-10-3-11-8 6 0 10 3 11 8Zm0 0c0-6 4-9 11-9-1 6-5 9-11 9Z"/>';
  return '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + '</svg>';
}

function septemberStageMarkup() {
  const part = septemberStages[septemberStage];
  const number = String(septemberStage + 1).padStart(2, '0');
  return '<div class="september-scene-tools">' +
    '<button type="button" data-game="profile" aria-label="切换角色，当前为' + novemberDisplayName(life.role) + '">' + septemberToolIcon('player') + '<span>切换角色</span></button>' +
    '<button type="button" data-september-journal aria-label="打开九月月度手记及四则无照片小记">' + septemberToolIcon('journal') + '<span>月度手记</span></button></div>' +
    '<section class="september-panel-shell" aria-label="九月章节：' + escapeGame(part.name) + '"><div class="september-panel-inner">' +
    '<small class="september-panel-kicker">SEPTEMBER / 01 — 05</small><h3>STILL IN TOUCH</h3>' +
    '<p class="september-panel-title">' + escapeGame(chapters[septemberChapterIndex].title) + '</p>' +
    '<div class="september-panel-detail"><small>' + escapeGame(part.date) + ' / PART ' + number + '</small>' +
    '<h4>' + escapeGame(part.name) + '</h4><button type="button" data-september-album aria-label="翻开' + escapeGame(part.name) + '的照片">翻开这一程 ↗</button>' +
    '<span class="september-panel-range">' + escapeGame(part.range) + ' / 06 FRAMES</span></div></div></section>' +
    '<nav class="september-route" aria-label="九月五段回忆"><svg class="september-route-line" viewBox="0 0 1440 736" preserveAspectRatio="none" aria-hidden="true"><polyline points="118,498 315,533 825,562 1095,521 1328,467"/></svg>' +
    septemberStages.map(function (item, index) {
      return '<button type="button" class="september-route-node september-node-' + index + (index === septemberStage ? ' is-active' : '') +
        '" data-september-stage="' + index + '" aria-pressed="' + (index === septemberStage) + '" aria-label="第' + (index + 1) + '段：' + escapeGame(item.name) + '">' +
        '<span class="september-route-name">' + escapeGame(item.name) + '</span><span class="september-route-dot" aria-hidden="true"></span><small>' + String(index + 1).padStart(2, '0') + '</small></button>';
    }).join('') + '</nav>';
}

function septemberAlbumMarkup() {
  const part = septemberStages[septemberStage];
  const photo = septemberPhotos[septemberPhoto];
  const group = septemberPhotos.map(function (item, index) { return { item, index }; }).filter(function (entry) { return entry.item.stage === septemberStage; });
  return '<section class="september-album-shell" aria-label="' + escapeGame(part.name) + '的照片相册">' +
    '<div class="september-album-head"><div><small>PART ' + String(septemberStage + 1).padStart(2, '0') + ' / 05 · ' + group.length + ' FRAME' + (group.length > 1 ? 'S' : '') + '</small>' +
    '<h3>' + escapeGame(part.name) + '</h3></div><button type="button" class="september-album-close" data-september-album-close>返回雾谷 ↗</button></div>' +
    '<div class="september-album-main"><figure class="september-album-photo"><img src="./assets/september/' + photo.file + '" alt="' + escapeGame(photo.alt) + '"><figcaption>' + escapeGame(photo.caption) + '</figcaption></figure>' +
    '<div class="september-album-copy"><small>' + escapeGame(photo.date) + ' · ' + String(septemberPhoto + 1).padStart(2, '0') + ' / 06</small>' +
    '<h4>' + escapeGame(photo.title) + '</h4><span class="september-album-side">' + (septemberTurned ? '照片背面' : '照片正面') + '</span>' +
    '<p>' + escapeGame(septemberTurned ? photo.back : photo.front) + '</p><button type="button" data-september-turn class="september-album-turn">' +
    (septemberTurned ? '翻回正面 ↶' : '翻到背面 →') + '</button><button type="button" class="september-album-collect" data-game="object" data-index="' + septemberChapterIndex + '" data-item="' + septemberStage + '">' +
    septemberToolIcon('journal') + '<span>' + (discovered(septemberChapterIndex, septemberStage) ? '这一程已收好 · 再打开' : '收好这一程') + '</span></button></div></div>' +
    '<div class="september-album-strip" role="group" aria-label="选择这一程的照片">' + group.map(function (entry) {
      return '<button type="button" data-september-photo="' + entry.index + '" aria-pressed="' + (entry.index === septemberPhoto) + '" aria-label="第' + (entry.index + 1) + '张：' + escapeGame(entry.item.title) + '">' +
        '<img src="./assets/september/' + entry.item.file + '" alt="" loading="lazy" decoding="async"><small>' + String(entry.index + 1).padStart(2, '0') + '</small></button>';
    }).join('') + '</div></section>';
}

function drawSeptemberExperience() {
  const board = stage.querySelector('.september-chapter .scene-canvas');
  if (!board) return;
  board.className = 'scene-canvas september-board' + (septemberAlbumOpen ? ' is-album-open' : '');
  board.setAttribute('aria-label', '九月蓝紫雾谷，沿五段回忆翻看六张照片');
  board.innerHTML = '<div class="september-art-plane" aria-hidden="true"></div>' + (septemberAlbumOpen ? septemberAlbumMarkup() : septemberStageMarkup());
  const journal = stage.querySelector('.september-chapter .reflection-section');
  if (journal) journal.hidden = !septemberJournalOpen;
}

drawSeptemberBoard = drawSeptemberExperience;

const septemberExperienceBaseRender = renderGameChapter;
renderGameChapter = function (index, scroll) {
  septemberExperienceBaseRender(index, scroll);
  document.body.classList.toggle('september-experience-active', index === septemberChapterIndex);
  if (index !== septemberChapterIndex) {
    septemberAlbumOpen = false;
    septemberJournalOpen = false;
    return;
  }
  const chapter = stage.querySelector('.september-chapter');
  if (!chapter) return;
  chapter.querySelector('.chapter-portal')?.remove();
  chapter.querySelector('.scene-header')?.remove();
  chapter.querySelector('.september-preview-gallery')?.remove();
  const board = chapter.querySelector('.scene-canvas');
  const months = chapter.querySelector('.portal-months');
  if (months) {
    const drawer = document.createElement('details');
    drawer.className = 'september-month-drawer';
    drawer.innerHTML = '<summary>MONTHS</summary>';
    drawer.append(months);
    board.after(drawer);
  }
  const journal = chapter.querySelector('.reflection-section');
  journal.setAttribute('aria-label', '九月手记、四则无照片小记与章节进度');
  journal.insertAdjacentHTML('afterbegin', '<button type="button" class="september-journal-close" data-september-journal-close>返回雾谷 ↗</button>');
  drawSeptemberExperience();
};

document.addEventListener('click', function (event) {
  if (!document.body.classList.contains('september-experience-active')) return;
  if (event.target.closest('[data-september-album]')) {
    septemberAlbumOpen = true;
    drawSeptemberExperience();
    stage.querySelector('[data-september-album-close]')?.focus({ preventScroll: true });
  } else if (event.target.closest('[data-september-album-close]')) {
    septemberAlbumOpen = false;
    drawSeptemberExperience();
    stage.querySelector('[data-september-album]')?.focus({ preventScroll: true });
  } else if (event.target.closest('[data-september-journal]')) {
    septemberJournalOpen = true;
    drawSeptemberExperience();
    stage.querySelector('[data-september-journal-close]')?.focus({ preventScroll: true });
  } else if (event.target.closest('[data-september-journal-close]')) {
    septemberJournalOpen = false;
    drawSeptemberExperience();
    stage.querySelector('[data-september-journal]')?.focus({ preventScroll: true });
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key !== 'Escape' || !document.body.classList.contains('september-experience-active') || lifeModal.open) return;
  if (septemberJournalOpen) {
    septemberJournalOpen = false;
    drawSeptemberExperience();
    stage.querySelector('[data-september-journal]')?.focus({ preventScroll: true });
  } else if (septemberAlbumOpen) {
    septemberAlbumOpen = false;
    drawSeptemberExperience();
    stage.querySelector('[data-september-album]')?.focus({ preventScroll: true });
  }
});

const septemberExperienceBaseShelf = showShelf;
showShelf = function (message) {
  document.body.classList.remove('september-experience-active');
  septemberAlbumOpen = false;
  septemberJournalOpen = false;
  return septemberExperienceBaseShelf(message);
};
