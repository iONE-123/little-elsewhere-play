// February places the existing stories on the approved oval path painting.
let februaryGate = null;
let februaryMemory = 0;
let februaryJournalOpen = false;
const februarySceneTitles = ['THE WAY BACK', 'THE SAME TABLE', 'A NAME FOR THE SONG', 'ONE MORE TURN'];

function februaryExperienceMarkup() {
  const phase = februaryGate === null ? null : februaryPhases[februaryGate];
  const objectIndex = phase?.items[februaryMemory];
  const object = objectIndex === undefined ? null : lifeScenes[3].objects[objectIndex];
  return '<div class="february-art-frame" aria-hidden="true"></div>' +
    '<div class="february-board-top"><div class="february-logo" aria-label="OUR LITTLE SIMS"><small>OUR LITTLE</small><strong>SIMS</strong></div><div class="february-tools">' +
    novemberTopAction('PLAYER · ' + novemberDisplayName(life.role), 'data-game="profile"', '切换角色', novemberPlayerIcon(), ' aria-label="切换角色，当前为' + novemberDisplayName(life.role) + '"') +
    novemberTopAction('JOURNAL', 'data-feb-journal', '月度手记', '<img src="./assets/november-journal-icon.png" alt="">', ' aria-label="打开二月月度手记"') +
    '</div></div><nav class="february-gates" aria-label="二月的四段回忆">' + februaryPhases.map(function (entry, index) {
      return '<button type="button" class="february-gate february-gate-' + index + (index === februaryGate ? ' is-active' : '') + '" data-feb-gate="' + index + '" aria-pressed="' + (index === februaryGate) + '" aria-label="打开' + escapeGame(entry.title) + '"><span class="february-gate-dot" aria-hidden="true"></span><span class="february-gate-label"><small>0' + (index + 1) + '</small>' + escapeGame(entry.title) + '</span></button>';
    }).join('') + '</nav>' +
    (object ? '<section class="february-scene-panel" aria-label="' + escapeGame(phase.title) + '的回忆"><div class="february-panel-top"><small>FEBRUARY / 0' + (februaryGate + 1) + '</small><button type="button" data-feb-back>返回场景 ↗</button></div><h3>' + februarySceneTitles[februaryGate] + '</h3><div class="february-memory-stage"><span class="february-memory-index">' + String(februaryMemory + 1).padStart(2, '0') + ' / ' + String(phase.items.length).padStart(2, '0') + '</span><button type="button" class="february-memory-object" data-game="object" data-index="3" data-item="' + objectIndex + '" aria-label="探索：' + escapeGame(object.name) + '"><span class="february-memory-name">' + escapeGame(object.name) + '</span><span class="february-memory-arrow" aria-hidden="true">↗</span></button></div><div class="february-panel-foot"><button type="button" data-feb-memory="-1" aria-label="上一件回忆" ' + (februaryMemory === 0 ? 'disabled' : '') + '>←</button><div class="february-page-dots" aria-label="第' + (februaryMemory + 1) + '件，共' + phase.items.length + '件">' + phase.items.map(function (_, index) { return '<button type="button" data-feb-memory-go="' + index + '" aria-label="查看第' + (index + 1) + '件回忆" aria-current="' + (index === februaryMemory) + '"></button>'; }).join('') + '</div><button type="button" data-feb-memory="1" aria-label="下一件回忆" ' + (februaryMemory === phase.items.length - 1 ? 'disabled' : '') + '>→</button></div></section>' : '<p class="february-scene-hint">CHOOSE A MOMENT <span aria-hidden="true">↗</span></p>');
}

function drawFebruaryExperience() {
  const board = stage.querySelector('.february-board');
  if (!board) return;
  board.classList.toggle('has-scene', februaryGate !== null);
  board.innerHTML = februaryExperienceMarkup();
  const journal = stage.querySelector('.february-chapter .reflection-section');
  if (journal) journal.hidden = !februaryJournalOpen;
}

const februaryExperienceBaseRender = renderGameChapter;
renderGameChapter = function (index, scroll) {
  februaryExperienceBaseRender(index, scroll);
  document.body.classList.toggle('february-experience-active', index === 3);
  if (index !== 3) return;
  const chapter = stage.querySelector('.february-chapter');
  chapter.querySelector('.chapter-portal')?.remove();
  chapter.querySelector('.scene-header')?.remove();
  const board = chapter.querySelector('.scene-canvas');
  board.className = 'scene-canvas february-board';
  board.setAttribute('aria-label', '二月环形路径，选择四段回忆');
  const months = chapter.querySelector('.portal-months');
  if (months) {
    const drawer = document.createElement('details');
    drawer.className = 'february-month-drawer';
    drawer.innerHTML = '<summary>MONTHS</summary>';
    drawer.append(months);
    board.after(drawer);
  }
  const journal = chapter.querySelector('.reflection-section');
  journal.setAttribute('aria-label', '二月的手记和章节进度');
  journal.insertAdjacentHTML('afterbegin', '<button type="button" class="february-journal-close" data-feb-journal-close>返回场景 ↗</button>');
  drawFebruaryExperience();
};

document.addEventListener('click', function (event) {
  const gate = event.target.closest('[data-feb-gate]');
  if (gate) {
    februaryGate = Number(gate.dataset.febGate);
    februaryPhase = februaryGate;
    februaryMemory = 0;
    februaryJournalOpen = false;
    drawFebruaryExperience();
    stage.querySelector('[data-feb-gate="' + februaryGate + '"]')?.focus({ preventScroll: true });
    return;
  }
  const step = event.target.closest('[data-feb-memory]');
  const go = event.target.closest('[data-feb-memory-go]');
  if ((step || go) && februaryGate !== null) {
    const length = februaryPhases[februaryGate].items.length;
    februaryMemory = Math.max(0, Math.min(length - 1, go ? Number(go.dataset.febMemoryGo) : februaryMemory + Number(step.dataset.febMemory)));
    drawFebruaryExperience();
    stage.querySelector('[data-feb-memory-go="' + februaryMemory + '"]')?.focus({ preventScroll: true });
    return;
  }
  if (event.target.closest('[data-feb-back]')) {
    const previous = februaryGate;
    februaryGate = null;
    drawFebruaryExperience();
    stage.querySelector('[data-feb-gate="' + previous + '"]')?.focus({ preventScroll: true });
    return;
  }
  if (event.target.closest('[data-feb-journal]')) {
    februaryJournalOpen = true;
    drawFebruaryExperience();
    stage.querySelector('[data-feb-journal-close]')?.focus({ preventScroll: true });
    return;
  }
  if (event.target.closest('[data-feb-journal-close]')) {
    februaryJournalOpen = false;
    drawFebruaryExperience();
    stage.querySelector('[data-feb-journal]')?.focus({ preventScroll: true });
    return;
  }
  if (event.target.closest('[data-nov-name-mode]') && stage.querySelector('.february-board')) drawFebruaryExperience();
});

document.addEventListener('keydown', function (event) {
  if (event.key !== 'Escape' || !document.body.classList.contains('february-experience-active')) return;
  if (lifeModal.open || februaryViewer.open) return;
  if (februaryJournalOpen) {
    februaryJournalOpen = false;
    drawFebruaryExperience();
    stage.querySelector('[data-feb-journal]')?.focus({ preventScroll: true });
  } else if (februaryGate !== null) {
    const previous = februaryGate;
    februaryGate = null;
    drawFebruaryExperience();
    stage.querySelector('[data-feb-gate="' + previous + '"]')?.focus({ preventScroll: true });
  }
});

const februaryExperienceBaseShelf = showShelf;
showShelf = function (message) {
  document.body.classList.remove('february-experience-active');
  return februaryExperienceBaseShelf(message);
};

const februaryExperienceBaseOpen = openMemoryObject;
openMemoryObject = function (chapter, item, fromBag) {
  februaryExperienceBaseOpen(chapter, item, fromBag);
  if (lifeModal.open) lifeModal.dataset.februaryObject = String(chapter === 3);
};

// Review mode unlocks February only in memory; the normal save stays untouched.
if (new URLSearchParams(window.location.search).get('preview') === 'february') {
  previewMode = true;
  state = {
    unlocked: Math.max(state.unlocked, 3),
    completed: Array.from(new Set([...state.completed, 0, 1, 2])),
    choices: { ...state.choices }
  };
  activeVolumeStart = volumeStartFor(3);
  closeOpening();
  renderChapter(3, false);
  positionCurrentChapter();
  showToast('二月预览模式：不会改动正常存档');
}
