// March turns the original sloped road into four entrances to existing memories.
let marchGate = null;
let marchMemory = 0;
let marchJournalOpen = false;
const marchSceneTitles = ['THE HOUR', 'THE DAYS BETWEEN', 'THREE DIRECTIONS', 'MADE BY HAND'];

function marchExperienceMarkup() {
  const phase = marchGate === null ? null : marchPhases[marchGate];
  const objectIndex = phase?.items[marchMemory];
  const object = objectIndex === undefined ? null : lifeScenes[4].objects[objectIndex];
  return '<div class="march-landscape-frame" aria-hidden="true"></div>' +
    '<div class="march-board-top"><div class="march-logo" aria-label="OUR LITTLE SIMS">OUR LITTLE SIMS</div><div class="march-tools">' +
    novemberTopAction('PLAYER · ' + novemberDisplayName(life.role), 'data-game="profile"', '切换角色', novemberPlayerIcon(), ' aria-label="切换角色，当前为' + novemberDisplayName(life.role) + '"') +
    novemberTopAction('JOURNAL', 'data-march-journal', '月度手记', '<img src="./assets/november-journal-icon.png" alt="">', ' aria-label="打开三月月度手记"') +
    '</div></div><nav class="march-gates" aria-label="三月的四段回忆">' + marchPhases.map(function (entry, index) {
      return '<button type="button" class="march-gate march-gate-' + index + (index === marchGate ? ' is-active' : '') + '" data-march-gate="' + index + '" aria-pressed="' + (index === marchGate) + '" aria-label="打开' + escapeGame(entry.title) + '"><span class="march-gate-dot" aria-hidden="true"></span><span class="march-gate-label"><small>0' + (index + 1) + '</small>' + escapeGame(entry.title) + '</span></button>';
    }).join('') + '</nav>' +
    (object ? '<section class="march-scene-panel" aria-label="' + escapeGame(phase.title) + '的回忆"><div class="march-panel-top"><small>MARCH / 0' + (marchGate + 1) + '</small><button type="button" data-march-back>返回场景 ↗</button></div><h3>' + marchSceneTitles[marchGate] + '</h3><p class="march-panel-phase">' + escapeGame(phase.title) + '</p>' +
      '<div class="march-memory-stage"><span class="march-memory-index">' + String(marchMemory + 1).padStart(2, '0') + ' / ' + String(phase.items.length).padStart(2, '0') + '</span><button type="button" class="march-memory-object" data-game="object" data-index="4" data-item="' + objectIndex + '" aria-label="探索：' + escapeGame(object.name) + '"><span class="march-memory-icon" aria-hidden="true">' + lifeIcon(object.icon) + '</span><strong>' + escapeGame(object.name) + '</strong><span aria-hidden="true">↗</span></button></div>' +
      (phase.items.length > 1 ? '<div class="march-panel-foot"><button type="button" data-march-memory="-1" aria-label="上一件回忆" ' + (marchMemory === 0 ? 'disabled' : '') + '>←</button><span>' + String(marchMemory + 1).padStart(2, '0') + ' / ' + String(phase.items.length).padStart(2, '0') + '</span><button type="button" data-march-memory="1" aria-label="下一件回忆" ' + (marchMemory === phase.items.length - 1 ? 'disabled' : '') + '>→</button></div>' : '') + '</section>' : '<p class="march-scene-hint">FOLLOW THE DAYS <span aria-hidden="true">↗</span></p>');
}

function drawMarchExperience() {
  const board = stage.querySelector('.march-board');
  if (!board) return;
  board.classList.toggle('has-scene', marchGate !== null);
  board.innerHTML = marchExperienceMarkup();
  const journal = stage.querySelector('.march-chapter .reflection-section');
  if (journal) journal.hidden = !marchJournalOpen;
}

const marchExperienceBaseRender = renderGameChapter;
renderGameChapter = function (index, scroll) {
  marchExperienceBaseRender(index, scroll);
  document.body.classList.toggle('march-experience-active', index === 4);
  if (index !== 4) return;
  const chapter = stage.querySelector('.march-chapter');
  chapter.querySelector('.chapter-portal')?.remove();
  chapter.querySelector('.scene-header')?.remove();
  const board = chapter.querySelector('.scene-canvas');
  board.className = 'scene-canvas march-board';
  board.setAttribute('aria-label', '三月斜坡路径，选择四段回忆');
  const months = chapter.querySelector('.portal-months');
  if (months) {
    const drawer = document.createElement('details');
    drawer.className = 'march-month-drawer';
    drawer.innerHTML = '<summary>MONTHS</summary>';
    drawer.append(months);
    board.after(drawer);
  }
  const journal = chapter.querySelector('.reflection-section');
  journal.setAttribute('aria-label', '三月的手记和章节进度');
  journal.insertAdjacentHTML('afterbegin', '<button type="button" class="march-journal-close" data-march-journal-close>返回场景 ↗</button>');
  drawMarchExperience();
};

document.addEventListener('click', function (event) {
  const gate = event.target.closest('[data-march-gate]');
  if (gate) {
    marchGate = Number(gate.dataset.marchGate);
    marchPhase = marchGate;
    marchMemory = 0;
    marchJournalOpen = false;
    drawMarchExperience();
    stage.querySelector('[data-march-gate="' + marchGate + '"]')?.focus({ preventScroll: true });
    return;
  }
  const step = event.target.closest('[data-march-memory]');
  if (step && marchGate !== null) {
    marchMemory = Math.max(0, Math.min(marchPhases[marchGate].items.length - 1, marchMemory + Number(step.dataset.marchMemory)));
    drawMarchExperience();
    stage.querySelector('.march-memory-object')?.focus({ preventScroll: true });
    return;
  }
  if (event.target.closest('[data-march-back]')) {
    const previous = marchGate;
    marchGate = null;
    drawMarchExperience();
    stage.querySelector('[data-march-gate="' + previous + '"]')?.focus({ preventScroll: true });
    return;
  }
  if (event.target.closest('[data-march-journal]')) {
    marchJournalOpen = true;
    drawMarchExperience();
    stage.querySelector('[data-march-journal-close]')?.focus({ preventScroll: true });
    return;
  }
  if (event.target.closest('[data-march-journal-close]')) {
    marchJournalOpen = false;
    drawMarchExperience();
    stage.querySelector('[data-march-journal]')?.focus({ preventScroll: true });
    return;
  }
  if (event.target.closest('[data-nov-name-mode]') && stage.querySelector('.march-board')) drawMarchExperience();
});

document.addEventListener('keydown', function (event) {
  if (event.key !== 'Escape' || !document.body.classList.contains('march-experience-active')) return;
  if (lifeModal.open || marchViewer.open) return;
  if (marchJournalOpen) {
    marchJournalOpen = false;
    drawMarchExperience();
    stage.querySelector('[data-march-journal]')?.focus({ preventScroll: true });
  } else if (marchGate !== null) {
    const previous = marchGate;
    marchGate = null;
    drawMarchExperience();
    stage.querySelector('[data-march-gate="' + previous + '"]')?.focus({ preventScroll: true });
  }
});

const marchExperienceBaseShelf = showShelf;
showShelf = function (message) {
  document.body.classList.remove('march-experience-active');
  return marchExperienceBaseShelf(message);
};

const marchExperienceBaseOpen = openMemoryObject;
openMemoryObject = function (chapter, item, fromBag) {
  marchExperienceBaseOpen(chapter, item, fromBag);
  if (lifeModal.open) lifeModal.dataset.marchObject = String(chapter === 4);
};

// Review mode unlocks March only in memory; it never writes the normal save.
if (new URLSearchParams(window.location.search).get('preview') === 'march') {
  previewMode = true;
  state = {
    unlocked: Math.max(state.unlocked, 4),
    completed: Array.from(new Set([...state.completed, 0, 1, 2, 3])),
    choices: { ...state.choices }
  };
  activeVolumeStart = volumeStartFor(4);
  closeOpening();
  renderChapter(4, false);
  positionCurrentChapter();
  showToast('三月预览模式：不会改动正常存档');
}
