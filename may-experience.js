// May uses the supplied sunset painting and the approved upright bilingual type system.
let maySceneOpen = true;
let mayJournalOpen = false;

const mayAtmosphereTitles = [
  'THE LONG WAY HOME',
  'BEFORE THE SHOW',
  'PAPER STARS'
];

function mayBusIcon() {
  return '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="7" width="24" height="18" rx="3"/><path d="M4 18h24M9 11h14M8 25v3m16-3v3"/><circle cx="9" cy="22" r="1"/><circle cx="23" cy="22" r="1"/></svg>';
}

function mayMemoryIcon(index) {
  if (index === 0) return mayBusIcon();
  const paths = index === 1
    ? '<rect x="9" y="3" width="14" height="26" rx="3"/><path d="M14 7h4M13 24h6"/>'
    : '<path d="M16 15v14m0-9c-5-1-8-5-7-9 4 0 7 3 7 7m0 3c5-1 8-5 7-9-4 0-7 3-7 7"/><path d="M16 16c-6-5-4-11 0-11 4 0 6 6 0 11Z"/>';
  return '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + '</svg>';
}

function maySceneMarkup() {
  const phase = mayPhases[mayPhase];
  const found = discovered(mayChapterIndex, mayPhase);
  return '<div class="may-sunset-frame" aria-hidden="true"></div>' +
    '<div class="may-board-top"><div class="may-logo" aria-label="OUR LITTLE SIMS">OUR LITTLE SIMS</div><div class="may-tools">' +
    novemberTopAction('PLAYER', 'data-game="profile"', '切换角色', novemberPlayerIcon(), ' aria-label="切换角色，当前为' + novemberDisplayName(life.role) + '"') +
    novemberTopAction('JOURNAL', 'data-may-journal', '月度手记', '<img src="./assets/november-journal-icon.png" alt="">', ' aria-label="打开五月月度手记"') +
    '</div></div><nav class="may-scene-nav" aria-label="五月的三段回忆">' +
    mayPhases.map(function (entry, index) {
      return '<button type="button" class="may-scene-node may-node-' + index + (index === mayPhase && maySceneOpen ? ' is-active' : '') + '" data-may-phase="' + index + '" aria-pressed="' + (index === mayPhase && maySceneOpen) + '" aria-label="打开' + escapeGame(entry.title) + '"><span class="may-node-dot" aria-hidden="true"></span><span>' + ['南山', '首尔', '澳门'][index] + '</span></button>';
    }).join('') + '</nav>' +
    (maySceneOpen ? '<section class="may-scene-panel" aria-label="' + escapeGame(phase.title) + '的回忆"><div class="may-panel-top"><small>MAY / 0' + (mayPhase + 1) + ' — 03</small><button type="button" data-may-back>返回场景 ↗</button></div>' +
      '<h3>' + mayAtmosphereTitles[mayPhase] + '</h3><p class="may-panel-phase">' + escapeGame(phase.title) + '</p><p class="may-panel-date">' + escapeGame(phase.date) + '</p>' +
      '<button type="button" class="may-memory-object" data-game="object" data-index="' + mayChapterIndex + '" data-item="' + mayPhase + '" aria-label="探索：' + escapeGame(phase.object.name) + '"><span class="may-memory-icon">' + mayMemoryIcon(mayPhase) + '</span><span>' + escapeGame(phase.object.name) + '</span><span aria-hidden="true">↗</span></button>' +
      '<p class="may-panel-progress">' + mayPhases.filter(function (_, index) { return discovered(mayChapterIndex, index); }).length + ' / 03 MEMORIES KEPT' + (found ? ' · 已收藏' : '') + '</p></section>' :
      '<p class="may-scene-hint">FOLLOW THE VIOLETS <span aria-hidden="true">↗</span></p>');
}

function drawMayExperience() {
  const board = stage.querySelector('.may-board');
  if (!board) return;
  board.classList.toggle('has-scene', maySceneOpen);
  board.innerHTML = maySceneMarkup();
  const journal = stage.querySelector('.may-chapter .reflection-section');
  if (journal) journal.hidden = !mayJournalOpen;
}

const mayExperienceBaseRender = renderGameChapter;
renderGameChapter = function (index, scroll) {
  mayExperienceBaseRender(index, scroll);
  document.body.classList.toggle('may-experience-active', index === mayChapterIndex);
  if (index !== mayChapterIndex) return;
  const chapter = stage.querySelector('.may-chapter');
  chapter.querySelector('.chapter-portal')?.remove();
  chapter.querySelector('.scene-header')?.remove();
  const board = chapter.querySelector('.scene-canvas');
  board.className = 'scene-canvas may-board';
  board.setAttribute('aria-label', '五月夕照山坡，选择三处路标进入回忆');
  const months = chapter.querySelector('.portal-months');
  if (months) {
    const drawer = document.createElement('details');
    drawer.className = 'may-month-drawer';
    drawer.innerHTML = '<summary>MONTHS</summary>';
    drawer.append(months);
    board.after(drawer);
  }
  const journal = chapter.querySelector('.reflection-section');
  journal.setAttribute('aria-label', '五月的手记和章节进度');
  journal.insertAdjacentHTML('afterbegin', '<button type="button" class="may-journal-close" data-may-journal-close>返回场景 ↗</button>');
  drawMayExperience();
};

document.addEventListener('click', function (event) {
  if (event.target.closest('[data-may-back]')) {
    const previous = mayPhase;
    maySceneOpen = false;
    drawMayExperience();
    stage.querySelector('[data-may-phase="' + previous + '"]')?.focus({ preventScroll: true });
  } else if (event.target.closest('[data-may-journal]')) {
    mayJournalOpen = true;
    drawMayExperience();
    stage.querySelector('[data-may-journal-close]')?.focus({ preventScroll: true });
  } else if (event.target.closest('[data-may-journal-close]')) {
    mayJournalOpen = false;
    drawMayExperience();
    stage.querySelector('[data-may-journal]')?.focus({ preventScroll: true });
  } else if (event.target.closest('[data-nov-name-mode]') && stage.querySelector('.may-board')) {
    drawMayExperience();
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key !== 'Escape' || !document.body.classList.contains('may-experience-active') || lifeModal.open) return;
  if (mayJournalOpen) {
    mayJournalOpen = false;
    drawMayExperience();
    stage.querySelector('[data-may-journal]')?.focus({ preventScroll: true });
  } else if (maySceneOpen) {
    maySceneOpen = false;
    drawMayExperience();
    stage.querySelector('[data-may-phase="' + mayPhase + '"]')?.focus({ preventScroll: true });
  }
});

const mayExperienceBaseShelf = showShelf;
showShelf = function (message) {
  document.body.classList.remove('may-experience-active', 'may-preview-active');
  return mayExperienceBaseShelf(message);
};
