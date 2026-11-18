// Approved October mountain lake scene. Six stages, 31 photos and five notes remain in october-data.js.
let octoberAlbumOpen = false;
let octoberJournalOpen = false;

function octoberToolIcon(kind) {
  const path = kind === 'journal'
    ? '<path d="M5 5h21v22H5zM15.5 5v22M9 10h3m-3 5h3m7-5h3m-3 5h3"/>'
    : '<path d="M16 27V16m0 0c-6 0-10-3-11-8 6 0 10 3 11 8Zm0 0c0-6 4-9 11-9-1 6-5 9-11 9Z"/>';
  return '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + '</svg>';
}

function octoberStageMarkup() {
  const part = octoberStages[octoberStage];
  const number = String(octoberStage + 1).padStart(2, '0');
  return '<div class="october-scene-tools">' +
    '<button type="button" data-game="profile" aria-label="切换角色，当前为' + novemberDisplayName(life.role) + '">' + octoberToolIcon('player') + '<span>切换角色</span></button>' +
    '<button type="button" data-october-journal aria-label="打开十月月度手记及五则无照片小记">' + octoberToolIcon('journal') + '<span>月度手记</span></button></div>' +
    '<section class="october-panel-shell" aria-label="十月章节：' + escapeGame(part.name) + '"><div class="october-panel-inner">' +
    '<small class="october-panel-kicker">OCTOBER / 01 — 06</small><h3>FURTHER ON</h3>' +
    '<p class="october-panel-title">' + escapeGame(chapters[octoberChapterIndex].title) + '</p>' +
    '<div class="october-panel-detail"><small>' + escapeGame(part.date) + ' / PART ' + number + '</small>' +
    '<h4>' + escapeGame(part.name) + '</h4><button type="button" data-october-album aria-label="翻开' + escapeGame(part.name) + '的照片">翻开这一程 ↗</button>' +
    '<span class="october-panel-range">' + escapeGame(part.range) + ' / 31 FRAMES</span></div></div></section>' +
    '<nav class="october-route" aria-label="十月六段回忆"><svg class="october-route-line" viewBox="0 0 1440 736" preserveAspectRatio="none" aria-hidden="true"><polyline points="114,642 350,636 586,648 822,641 1058,631 1294,642"/></svg>' +
    octoberStages.map(function (item, index) {
      return '<button type="button" class="october-route-node october-node-' + index + (index === octoberStage ? ' is-active' : '') +
        '" data-october-stage="' + index + '" aria-pressed="' + (index === octoberStage) + '" aria-label="第' + (index + 1) + '段：' + escapeGame(item.name) + '">' +
        '<span class="october-route-name">' + escapeGame(item.name) + '</span><span class="october-route-dot" aria-hidden="true"></span><small>' + String(index + 1).padStart(2, '0') + '</small></button>';
    }).join('') + '</nav>';
}

function octoberAlbumMarkup() {
  const part = octoberStages[octoberStage];
  const photo = octoberPhotos[octoberPhoto];
  const group = octoberPhotos.map(function (item, index) { return { item, index }; }).filter(function (entry) { return entry.item.stage === octoberStage; });
  return '<section class="october-album-shell" aria-label="' + escapeGame(part.name) + '的照片相册">' +
    '<div class="october-album-head"><div><small>PART ' + String(octoberStage + 1).padStart(2, '0') + ' / 06 · ' + group.length + ' FRAME' + (group.length > 1 ? 'S' : '') + '</small>' +
    '<h3>' + escapeGame(part.name) + '</h3></div><button type="button" class="october-album-close" data-october-album-close>返回山湖 ↗</button></div>' +
    '<div class="october-album-main"><figure class="october-album-photo"><img src="./assets/october/' + photo.file + '" alt="' + escapeGame(photo.alt) + '"><figcaption>' + escapeGame(photo.caption) + '</figcaption></figure>' +
    '<div class="october-album-copy"><small>' + escapeGame(photo.date) + ' · ' + String(octoberPhoto + 1).padStart(2, '0') + ' / 31</small>' +
    '<h4>' + escapeGame(photo.title) + '</h4><span class="october-album-side">' + (octoberTurned ? '照片背面' : '照片正面') + '</span>' +
    '<p>' + escapeGame(octoberTurned ? photo.back : photo.front) + '</p><button type="button" data-october-turn class="october-album-turn">' +
    (octoberTurned ? '翻回正面 ↶' : '翻到背面 →') + '</button><button type="button" class="october-album-collect" data-game="object" data-index="' + octoberChapterIndex + '" data-item="' + octoberStage + '">' +
    octoberToolIcon('journal') + '<span>' + (discovered(octoberChapterIndex, octoberStage) ? '这一程已收好 · 再打开' : '收好这一程') + '</span></button></div></div>' +
    '<div class="october-album-strip" role="group" aria-label="选择这一程的照片">' + group.map(function (entry) {
      return '<button type="button" data-october-photo="' + entry.index + '" aria-pressed="' + (entry.index === octoberPhoto) + '" aria-label="第' + (entry.index + 1) + '张：' + escapeGame(entry.item.title) + '">' +
        '<img src="./assets/october/' + entry.item.file + '" alt="" loading="lazy" decoding="async"><small>' + String(entry.index + 1).padStart(2, '0') + '</small></button>';
    }).join('') + '</div></section>';
}

function drawOctoberExperience() {
  const board = stage.querySelector('.october-chapter .scene-canvas');
  if (!board) return;
  board.className = 'scene-canvas october-board' + (octoberAlbumOpen ? ' is-album-open' : '');
  board.setAttribute('aria-label', '十月深蓝山湖，沿雪岸六段回忆翻看三十一张照片');
  board.innerHTML = '<div class="october-art-plane" aria-hidden="true"></div>' + (octoberAlbumOpen ? octoberAlbumMarkup() : octoberStageMarkup());
  const journal = stage.querySelector('.october-chapter .reflection-section');
  if (journal) journal.hidden = !octoberJournalOpen;
}

drawOctoberBoard = drawOctoberExperience;

const octoberExperienceBaseRender = renderGameChapter;
renderGameChapter = function (index, scroll) {
  octoberExperienceBaseRender(index, scroll);
  document.body.classList.toggle('october-experience-active', index === octoberChapterIndex);
  if (index !== octoberChapterIndex) {
    octoberAlbumOpen = false;
    octoberJournalOpen = false;
    return;
  }
  const chapter = stage.querySelector('.october-chapter');
  if (!chapter) return;
  chapter.querySelector('.chapter-portal')?.remove();
  chapter.querySelector('.scene-header')?.remove();
  chapter.querySelector('.october-preview-gallery')?.remove();
  const board = chapter.querySelector('.scene-canvas');
  const months = chapter.querySelector('.portal-months');
  if (months) {
    const drawer = document.createElement('details');
    drawer.className = 'october-month-drawer';
    drawer.innerHTML = '<summary>MONTHS</summary>';
    drawer.append(months);
    board.after(drawer);
  }
  const journal = chapter.querySelector('.reflection-section');
  journal.setAttribute('aria-label', '十月手记、五则无照片小记与章节进度');
  journal.insertAdjacentHTML('afterbegin', '<button type="button" class="october-journal-close" data-october-journal-close>返回山湖 ↗</button>');
  drawOctoberExperience();
};

document.addEventListener('click', function (event) {
  if (!document.body.classList.contains('october-experience-active')) return;
  if (event.target.closest('[data-october-album]')) {
    octoberAlbumOpen = true;
    drawOctoberExperience();
    stage.querySelector('[data-october-album-close]')?.focus({ preventScroll: true });
  } else if (event.target.closest('[data-october-album-close]')) {
    octoberAlbumOpen = false;
    drawOctoberExperience();
    stage.querySelector('[data-october-album]')?.focus({ preventScroll: true });
  } else if (event.target.closest('[data-october-journal]')) {
    octoberJournalOpen = true;
    drawOctoberExperience();
    stage.querySelector('[data-october-journal-close]')?.focus({ preventScroll: true });
  } else if (event.target.closest('[data-october-journal-close]')) {
    octoberJournalOpen = false;
    drawOctoberExperience();
    stage.querySelector('[data-october-journal]')?.focus({ preventScroll: true });
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key !== 'Escape' || !document.body.classList.contains('october-experience-active') || lifeModal.open) return;
  if (octoberJournalOpen) {
    octoberJournalOpen = false;
    drawOctoberExperience();
    stage.querySelector('[data-october-journal]')?.focus({ preventScroll: true });
  } else if (octoberAlbumOpen) {
    octoberAlbumOpen = false;
    drawOctoberExperience();
    stage.querySelector('[data-october-album]')?.focus({ preventScroll: true });
  }
});

const octoberExperienceBaseShelf = showShelf;
showShelf = function (message) {
  document.body.classList.remove('october-experience-active');
  octoberAlbumOpen = false;
  octoberJournalOpen = false;
  return octoberExperienceBaseShelf(message);
};
