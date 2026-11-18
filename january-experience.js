// January keeps its existing story, photo order and save keys inside the approved blue painting.
let januaryScene = null;
let januaryJournalOpen = false;

function januarySceneObject(index) {
  const object = lifeScenes[2].objects[index];
  return '<button type="button" class="january-memory-link" data-game="object" data-index="2" data-item="' + index + '" aria-label="探索：' + escapeGame(object.name) + '">' +
    '<span class="january-memory-icon">' + lifeIcon(object.icon) + '</span><span class="january-memory-copy"><strong>' + escapeGame(object.name) + '</strong><small>' + (discovered(2, index) ? '已收藏 · 再次查看' : '打开这段回忆') + '</small></span><span aria-hidden="true">↗</span></button>';
}

function januaryExperienceMarkup() {
  const selected = januaryScene === null ? null : januaryPhases[januaryScene];
  return '<div class="january-art-frame" aria-hidden="true"></div>' +
    '<div class="january-board-top"><div class="january-logo" aria-label="OUR LITTLE SIMS"><small>OUR LITTLE</small><strong>SIMS</strong></div><div class="january-tools">' +
    novemberTopAction('PLAYER · ' + novemberDisplayName(life.role), 'data-game="profile"', '切换角色', novemberPlayerIcon(), ' aria-label="切换角色，当前为' + novemberDisplayName(life.role) + '"') +
    novemberTopAction('JOURNAL', 'data-jan-journal', '月度手记', '<img src="./assets/november-journal-icon.png" alt="">', ' aria-label="打开一月月度手记"') +
    '</div></div><nav class="january-gate-nav" aria-label="一月的四段回忆">' + januaryPhases.map(function (phase, index) {
      return '<button type="button" class="january-gate january-gate-' + index + (index === januaryScene ? ' is-active' : '') + '" data-jan-gate="' + index + '" aria-pressed="' + (index === januaryScene) + '" aria-label="打开' + escapeGame(phase.title) + '"><span class="january-gate-dot" aria-hidden="true"></span><span class="january-gate-label"><small>0' + (index + 1) + '</small>' + escapeGame(phase.title) + '</span></button>';
    }).join('') + '</nav>' +
    (selected ? '<section class="january-scene-panel" aria-label="' + escapeGame(selected.title) + '的回忆"><div class="january-panel-head"><small>JANUARY / 0' + (januaryScene + 1) + '</small><button type="button" data-jan-back>返回场景 ↗</button></div><h3>' + escapeGame(selected.title) + '</h3><p class="january-panel-date">' + escapeGame(selected.date) + '</p><p class="january-panel-heading">' + escapeGame(selected.heading) + '</p><div class="january-panel-objects">' + selected.items.map(januarySceneObject).join('') + '</div><p class="january-panel-progress">' + selected.items.filter(function (item) { return discovered(2, item); }).length + ' / ' + selected.items.length + ' MEMORIES KEPT</p></section>' : '<p class="january-scene-hint">FOLLOW THE LIGHT <span aria-hidden="true">↗</span></p>');
}

function drawJanuaryExperience() {
  const board = stage.querySelector('.january-board');
  if (!board) return;
  board.classList.toggle('has-scene', januaryScene !== null);
  board.innerHTML = januaryExperienceMarkup();
  const journal = stage.querySelector('.january-chapter .reflection-section');
  journal.hidden = !januaryJournalOpen;
}

const januaryExperienceBaseRender = renderGameChapter;
renderGameChapter = function (index, scroll) {
  januaryExperienceBaseRender(index, scroll);
  document.body.classList.toggle('january-experience-active', index === 2);
  if (index !== 2) return;
  const chapter = stage.querySelector('.january-chapter');
  chapter.querySelector('.chapter-portal')?.remove();
  chapter.querySelector('.scene-header')?.remove();
  const board = chapter.querySelector('.scene-canvas');
  board.className = 'scene-canvas january-board';
  board.setAttribute('aria-label', '一月蓝色立面，选择四处入口进入回忆');
  const months = chapter.querySelector('.portal-months');
  if (months) {
    const drawer = document.createElement('details');
    drawer.className = 'january-month-drawer';
    drawer.innerHTML = '<summary>MONTHS</summary>';
    drawer.append(months);
    board.after(drawer);
  }
  const journal = chapter.querySelector('.reflection-section');
  journal.setAttribute('aria-label', '一月的手记和章节进度');
  journal.insertAdjacentHTML('afterbegin', '<button type="button" class="january-journal-close" data-jan-journal-close>返回场景 ↗</button>');
  drawJanuaryExperience();
};

document.addEventListener('click', function (event) {
  const gate = event.target.closest('[data-jan-gate]');
  if (gate) {
    januaryScene = Number(gate.dataset.janGate);
    januaryPhase = januaryScene;
    januaryJournalOpen = false;
    drawJanuaryExperience();
    stage.querySelector('[data-jan-gate="' + januaryScene + '"]')?.focus({ preventScroll: true });
    return;
  }
  if (event.target.closest('[data-jan-back]')) {
    const previous = januaryScene;
    januaryScene = null;
    drawJanuaryExperience();
    stage.querySelector('[data-jan-gate="' + previous + '"]')?.focus({ preventScroll: true });
    return;
  }
  if (event.target.closest('[data-jan-journal]')) {
    januaryJournalOpen = true;
    drawJanuaryExperience();
    stage.querySelector('[data-jan-journal-close]')?.focus({ preventScroll: true });
    return;
  }
  if (event.target.closest('[data-jan-journal-close]')) {
    januaryJournalOpen = false;
    drawJanuaryExperience();
    stage.querySelector('[data-jan-journal]')?.focus({ preventScroll: true });
    return;
  }
  if (event.target.closest('[data-nov-name-mode]') && stage.querySelector('.january-board')) drawJanuaryExperience();
});

document.addEventListener('keydown', function (event) {
  if (event.key !== 'Escape' || !document.body.classList.contains('january-experience-active')) return;
  if (lifeModal.open || januaryViewer.open) return;
  if (januaryJournalOpen) {
    januaryJournalOpen = false;
    drawJanuaryExperience();
    stage.querySelector('[data-jan-journal]')?.focus({ preventScroll: true });
  } else if (januaryScene !== null) {
    const previous = januaryScene;
    januaryScene = null;
    drawJanuaryExperience();
    stage.querySelector('[data-jan-gate="' + previous + '"]')?.focus({ preventScroll: true });
  }
});

const januaryExperienceBaseShelf = showShelf;
showShelf = function (message) {
  document.body.classList.remove('january-experience-active');
  return januaryExperienceBaseShelf(message);
};

const januaryExperienceBaseOpen = openMemoryObject;
openMemoryObject = function (chapter, item, fromBag) {
  januaryExperienceBaseOpen(chapter, item, fromBag);
  if (lifeModal.open) lifeModal.dataset.januaryObject = String(chapter === 2);
};

// Review mode changes only the in-memory unlock state.
if (new URLSearchParams(window.location.search).get('preview') === 'january') {
  previewMode = true;
  state = {
    unlocked: Math.max(state.unlocked, 2),
    completed: Array.from(new Set([...state.completed, 0, 1])),
    choices: { ...state.choices }
  };
  activeVolumeStart = volumeStartFor(2);
  closeOpening();
  renderChapter(2, false);
  positionCurrentChapter();
  showToast('一月预览模式：不会改动正常存档');
}
