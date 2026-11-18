// Four landmarks on the supplied terrace lead to all eight existing April phases.
let aprilLandmark = null;
let aprilObjectPosition = 0;
let aprilJournalOpen = false;
const aprilLandmarks = [
  { label: '清迈', phases: [0, 1] },
  { label: '倒数', phases: [2] },
  { label: '首尔', phases: [3, 4, 5] },
  { label: '釜山', phases: [6, 7] }
];
const aprilPhaseHeadings = [
  'A PLACE OF HER OWN', 'DAYS AT THE TABLE', 'THE COUNTDOWN',
  'SAME CITY', 'SEOUL AT DUSK', 'A TABLE IN SEOUL',
  'SMALL THINGS', 'AFTER THE RAIN'
];

function aprilExperienceMarkup() {
  const landmark = aprilLandmark === null ? null : aprilLandmarks[aprilLandmark];
  const phase = landmark && aprilPhases[aprilPhase];
  const objectIndex = phase?.items[aprilObjectPosition];
  const object = objectIndex === undefined ? null : lifeScenes[5].objects[objectIndex];
  return '<div class="april-landscape-frame" aria-hidden="true"></div>' +
    '<div class="april-board-top"><div class="april-logo" aria-label="OUR LITTLE SIMS">OUR LITTLE SIMS</div><div class="april-tools">' +
    novemberTopAction('PLAYER · ' + novemberDisplayName(life.role), 'data-game="profile"', '切换角色', novemberPlayerIcon(), ' aria-label="切换角色，当前为' + novemberDisplayName(life.role) + '"') +
    novemberTopAction('JOURNAL', 'data-april-journal', '月度手记', '<img src="./assets/november-journal-icon.png" alt="">', ' aria-label="打开四月月度手记"') +
    '</div></div><nav class="april-landmarks" aria-label="四月的四处路标">' +
    aprilLandmarks.map(function (entry, index) {
      return '<button type="button" class="april-landmark april-landmark-' + index + (index === aprilLandmark ? ' is-active' : '') + '" data-april-landmark="' + index + '" aria-pressed="' + (index === aprilLandmark) + '" aria-label="打开' + entry.label + '的回忆"><span class="april-landmark-dot" aria-hidden="true"></span><span class="april-landmark-label"><small>0' + (index + 1) + '</small>' + entry.label + '</span></button>';
    }).join('') + '</nav>' +
    (object ? '<section class="april-scene-panel" aria-label="' + escapeGame(phase.title) + '的回忆"><div class="april-panel-top"><small>APRIL / ' + String(aprilPhase + 1).padStart(2, '0') + ' — 08</small><button type="button" data-april-back>返回场景 ↗</button></div>' +
      '<h3>' + aprilPhaseHeadings[aprilPhase] + '</h3><p class="april-panel-phase">' + escapeGame(phase.title) + '</p>' +
      '<div class="april-phase-switch" role="group" aria-label="' + landmark.label + '的回忆段落">' + landmark.phases.map(function (index) {
        return '<button type="button" data-april-phase="' + index + '" aria-pressed="' + (index === aprilPhase) + '" aria-label="第' + (index + 1) + '段：' + escapeGame(aprilPhases[index].title) + '">' + String(index + 1).padStart(2, '0') + '</button>';
      }).join('') + '</div>' +
      '<p class="april-panel-date">' + escapeGame(phase.date) + '</p><div class="april-memory-stage"><span class="april-memory-icon" aria-hidden="true">' + lifeIcon(object.icon) + '</span><button type="button" class="april-memory-object" data-game="object" data-index="5" data-item="' + objectIndex + '" aria-label="探索：' + escapeGame(object.name) + '"><strong>' + escapeGame(object.name) + '</strong><span aria-hidden="true">↗</span></button></div>' +
      (phase.items.length > 1 ? '<div class="april-object-switch"><button type="button" data-april-object="-1" aria-label="上一件回忆" ' + (aprilObjectPosition === 0 ? 'disabled' : '') + '>←</button><span>' + String(aprilObjectPosition + 1).padStart(2, '0') + ' / ' + String(phase.items.length).padStart(2, '0') + '</span><button type="button" data-april-object="1" aria-label="下一件回忆" ' + (aprilObjectPosition === phase.items.length - 1 ? 'disabled' : '') + '>→</button></div>' : '') +
      '<p class="april-panel-progress">' + lifeScenes[5].objects.filter(function (_, index) { return discovered(5, index); }).length + ' / 09 MEMORIES KEPT</p></section>' :
      '<p class="april-scene-hint">FOLLOW THE PATH <span aria-hidden="true">↗</span></p>');
}

function drawAprilExperience() {
  const board = stage.querySelector('.april-board');
  if (!board) return;
  board.classList.toggle('has-scene', aprilLandmark !== null);
  board.innerHTML = aprilExperienceMarkup();
  const journal = stage.querySelector('.april-chapter .reflection-section');
  if (journal) journal.hidden = !aprilJournalOpen;
}

const aprilExperienceBaseRender = renderGameChapter;
renderGameChapter = function (index, scroll) {
  aprilExperienceBaseRender(index, scroll);
  document.body.classList.toggle('april-experience-active', index === 5);
  if (index !== 5) return;
  const chapter = stage.querySelector('.april-chapter');
  chapter.querySelector('.chapter-portal')?.remove();
  chapter.querySelector('.scene-header')?.remove();
  const board = chapter.querySelector('.scene-canvas');
  board.className = 'scene-canvas april-board';
  board.setAttribute('aria-label', '四月岩台路径，选择四处路标与八段回忆');
  const months = chapter.querySelector('.portal-months');
  if (months) {
    const drawer = document.createElement('details');
    drawer.className = 'april-month-drawer';
    drawer.innerHTML = '<summary>MONTHS</summary>';
    drawer.append(months);
    board.after(drawer);
  }
  const journal = chapter.querySelector('.reflection-section');
  journal.setAttribute('aria-label', '四月的手记和章节进度');
  journal.insertAdjacentHTML('afterbegin', '<button type="button" class="april-journal-close" data-april-journal-close>返回场景 ↗</button>');
  drawAprilExperience();
};

document.addEventListener('click', function (event) {
  const landmark = event.target.closest('[data-april-landmark]');
  if (landmark && stage.querySelector('.april-board')) {
    aprilLandmark = Number(landmark.dataset.aprilLandmark);
    aprilPhase = aprilLandmarks[aprilLandmark].phases[0];
    aprilObjectPosition = 0;
    aprilJournalOpen = false;
    drawAprilExperience();
    stage.querySelector('[data-april-landmark="' + aprilLandmark + '"]')?.focus({ preventScroll: true });
    return;
  }
  const phase = event.target.closest('[data-april-phase]');
  if (phase && aprilLandmark !== null) {
    aprilPhase = Number(phase.dataset.aprilPhase);
    aprilObjectPosition = 0;
    drawAprilExperience();
    stage.querySelector('[data-april-phase="' + aprilPhase + '"]')?.focus({ preventScroll: true });
    return;
  }
  const item = event.target.closest('[data-april-object]');
  if (item && aprilLandmark !== null) {
    aprilObjectPosition = Math.max(0, Math.min(aprilPhases[aprilPhase].items.length - 1, aprilObjectPosition + Number(item.dataset.aprilObject)));
    drawAprilExperience();
    stage.querySelector('.april-memory-object')?.focus({ preventScroll: true });
    return;
  }
  if (event.target.closest('[data-april-back]')) {
    const previous = aprilLandmark;
    aprilLandmark = null;
    drawAprilExperience();
    stage.querySelector('[data-april-landmark="' + previous + '"]')?.focus({ preventScroll: true });
    return;
  }
  if (event.target.closest('[data-april-journal]')) {
    aprilJournalOpen = true;
    drawAprilExperience();
    stage.querySelector('[data-april-journal-close]')?.focus({ preventScroll: true });
    return;
  }
  if (event.target.closest('[data-april-journal-close]')) {
    aprilJournalOpen = false;
    drawAprilExperience();
    stage.querySelector('[data-april-journal]')?.focus({ preventScroll: true });
    return;
  }
  if (event.target.closest('[data-nov-name-mode]') && stage.querySelector('.april-board')) drawAprilExperience();
});

document.addEventListener('keydown', function (event) {
  if (event.key !== 'Escape' || !document.body.classList.contains('april-experience-active')) return;
  if (lifeModal.open || aprilViewer.open) return;
  if (aprilJournalOpen) {
    aprilJournalOpen = false;
    drawAprilExperience();
    stage.querySelector('[data-april-journal]')?.focus({ preventScroll: true });
  } else if (aprilLandmark !== null) {
    const previous = aprilLandmark;
    aprilLandmark = null;
    drawAprilExperience();
    stage.querySelector('[data-april-landmark="' + previous + '"]')?.focus({ preventScroll: true });
  }
});

const aprilExperienceBaseShelf = showShelf;
showShelf = function (message) {
  document.body.classList.remove('april-experience-active');
  return aprilExperienceBaseShelf(message);
};

const aprilExperienceBaseOpen = openMemoryObject;
openMemoryObject = function (chapter, item, fromBag) {
  aprilExperienceBaseOpen(chapter, item, fromBag);
  if (lifeModal.open) lifeModal.dataset.aprilObject = String(chapter === 5);
};

// Review mode unlocks April only in memory; it does not alter the normal save.
if (new URLSearchParams(window.location.search).get('preview') === 'april') {
  previewMode = true;
  state = {
    unlocked: Math.max(state.unlocked, 5),
    completed: Array.from(new Set([...state.completed, 0, 1, 2, 3, 4])),
    choices: { ...state.choices }
  };
  activeVolumeStart = volumeStartFor(5);
  closeOpening();
  renderChapter(5, false);
  positionCurrentChapter();
  showToast('四月预览模式：不会改动正常存档');
}
