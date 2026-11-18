// The approved snow scene remains the chapter's room; existing objects keep their save keys.
let decemberScene = null;
let decemberJournalOpen = false;

const decemberSceneCopy = [
  { label: '月初 · 计划', cue: 'FIRST THOUGHT', title: '先有一个想法', lines: ['12.04 · 放假后，想去云南', '日历里还有空着的位置'], objects: [3, 0] },
  { label: '月中 · 落定', cue: 'THE DATE IS SET', title: '终于落定的日期', lines: ['12.04 · 先有一个想法', '12.14—15 · 等时间与票价', '12.16 · 买了 · 云南我来了'], objects: [3, 1] },
  { label: '月末 · 跨年', cue: 'TURNING THE PAGE', title: '跨年前一页', lines: ['12.30—31 · 图书馆与考试', '12.31 · 黑发的最后一天'], objects: [4, 5, 2] }
];

function decemberMarkerIcon(index) {
  const paths = [
    '<path d="M7 10h18M9 6v8M23 6v8M7 10v17h18V10M11 18h10M11 22h6"/>',
    '<path d="m7 18 6 6L26 9"/>',
    '<path d="M16 5v4M16 23v4M5 16h4M23 16h4M8 8l3 3M21 21l3 3M24 8l-3 3M11 21l-3 3"/><circle cx="16" cy="16" r="5"/>'
  ];
  return '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths[index] + '</svg>';
}

function decemberObjectButton(index) {
  const object = lifeScenes[1].objects[index];
  return '<button type="button" data-game="object" data-index="1" data-item="' + index + '" aria-label="探索：' + escapeGame(object.name) + '"><span class="december-object-symbol">' + lifeIcon(object.icon) + '</span><span class="december-object-text"><strong>' + escapeGame(object.name) + '</strong><small>' + (discovered(1, index) ? '已收藏 · 再次查看' : '打开这段回忆') + '</small></span><span aria-hidden="true">↗</span></button>';
}

function decemberExperienceMarkup() {
  const selected = decemberScene === null ? null : decemberSceneCopy[decemberScene];
  return '<div class="december-snow-frame" aria-hidden="true"></div>' +
    '<div class="december-board-top"><div class="december-logo" aria-label="OUR LITTLE SIMS"><small>OUR LITTLE</small><strong>SIMS</strong></div><div class="december-tools">' +
    novemberTopAction('PLAYER · ' + novemberDisplayName(life.role), 'data-game="profile"', '切换角色', novemberPlayerIcon(), ' aria-label="切换角色，当前为' + novemberDisplayName(life.role) + '"') +
    novemberTopAction('JOURNAL', 'data-dec-journal', '月度手记', '<img src="./assets/november-journal-icon.png" alt="">', ' aria-label="打开十二月月度手记"') +
    '</div></div><nav class="december-scene-nav" aria-label="十二月的三段回忆">' + decemberSceneCopy.map(function (phase, index) {
      return '<button type="button" class="december-scene-node december-node-' + index + (index === decemberScene ? ' is-active' : '') + '" data-dec-scene="' + index + '" aria-pressed="' + (index === decemberScene) + '" aria-label="打开' + phase.label + '"><span class="december-node-icon">' + decemberMarkerIcon(index) + '</span><span>' + phase.label + '</span></button>';
    }).join('') + '</nav>' +
    (selected ? '<section class="december-scene-panel" aria-label="' + selected.label + '的回忆"><div class="december-panel-head"><small>DECEMBER / 0' + (decemberScene + 1) + ' · ' + selected.cue + '</small><button type="button" data-dec-back>返回雪景 ↗</button></div><h3>' + selected.title + '</h3><div class="december-panel-lines">' + selected.lines.map(function (line) { return '<p>' + line + '</p>'; }).join('') + '</div><div class="december-panel-objects">' + selected.objects.map(decemberObjectButton).join('') + '</div><p class="december-panel-progress">' + selected.objects.filter(function (index) { return discovered(1, index); }).length + ' / ' + selected.objects.length + ' MEMORIES KEPT</p></section>' : '<p class="december-scene-hint">FOLLOW THE SHADOW <span aria-hidden="true">↗</span></p>');
}

function drawDecemberExperience() {
  const board = stage.querySelector('.december-board');
  if (!board) return;
  board.classList.toggle('has-scene', decemberScene !== null);
  board.innerHTML = decemberExperienceMarkup();
  const journal = stage.querySelector('.december-chapter .reflection-section');
  journal.hidden = !decemberJournalOpen;
}

const decemberExperienceBaseRender = renderGameChapter;
renderGameChapter = function (index, scroll) {
  decemberExperienceBaseRender(index, scroll);
  document.body.classList.toggle('december-experience-active', index === 1);
  if (index !== 1) return;
  const chapter = stage.querySelector('.december-chapter');
  chapter.querySelector('.chapter-portal')?.remove();
  chapter.querySelector('.scene-header')?.remove();
  const board = chapter.querySelector('.scene-canvas');
  board.className = 'scene-canvas december-board';
  board.setAttribute('aria-label', '十二月雪景，选择雪地上的节点进入回忆');
  const months = chapter.querySelector('.portal-months');
  if (months) {
    const drawer = document.createElement('details');
    drawer.className = 'december-month-drawer';
    drawer.innerHTML = '<summary>MONTHS</summary>';
    drawer.append(months);
    board.after(drawer);
  }
  const journal = chapter.querySelector('.reflection-section');
  journal.setAttribute('aria-label', '十二月的手记和章节进度');
  journal.insertAdjacentHTML('afterbegin', '<button type="button" class="december-journal-close" data-dec-journal-close>返回雪景 ↗</button>');
  drawDecemberExperience();
};

document.addEventListener('click', function (event) {
  const node = event.target.closest('[data-dec-scene]');
  if (node) {
    decemberScene = Number(node.dataset.decScene);
    decemberJournalOpen = false;
    drawDecemberExperience();
    stage.querySelector('[data-dec-scene="' + decemberScene + '"]')?.focus({ preventScroll: true });
    return;
  }
  if (event.target.closest('[data-dec-back]')) {
    const previous = decemberScene;
    decemberScene = null;
    drawDecemberExperience();
    stage.querySelector('[data-dec-scene="' + previous + '"]')?.focus({ preventScroll: true });
    return;
  }
  if (event.target.closest('[data-dec-journal]')) {
    decemberJournalOpen = true;
    drawDecemberExperience();
    stage.querySelector('[data-dec-journal-close]')?.focus({ preventScroll: true });
    return;
  }
  if (event.target.closest('[data-dec-journal-close]')) {
    decemberJournalOpen = false;
    drawDecemberExperience();
    stage.querySelector('[data-dec-journal]')?.focus({ preventScroll: true });
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key !== 'Escape' || !document.body.classList.contains('december-experience-active')) return;
  if (lifeModal.open || decemberViewer.open) return;
  if (decemberJournalOpen) {
    decemberJournalOpen = false;
    drawDecemberExperience();
    stage.querySelector('[data-dec-journal]')?.focus({ preventScroll: true });
  } else if (decemberScene !== null) {
    const previous = decemberScene;
    decemberScene = null;
    drawDecemberExperience();
    stage.querySelector('[data-dec-scene="' + previous + '"]')?.focus({ preventScroll: true });
  }
});

const decemberExperienceBaseShelf = showShelf;
showShelf = function (message) {
  document.body.classList.remove('december-experience-active');
  return decemberExperienceBaseShelf(message);
};

const decemberExperienceBaseOpen = openMemoryObject;
openMemoryObject = function (chapter, item, fromBag) {
  decemberExperienceBaseOpen(chapter, item, fromBag);
  if (!lifeModal.open) return;
  lifeModal.dataset.decemberObject = String(chapter === 1);
};

// Local review mode unlocks this chapter in memory only; the regular save is untouched.
if (new URLSearchParams(window.location.search).get('preview') === 'december') {
  previewMode = true;
  state = {
    unlocked: Math.max(state.unlocked, 1),
    completed: Array.from(new Set([...state.completed, 0])),
    choices: { ...state.choices }
  };
  activeVolumeStart = volumeStartFor(1);
  closeOpening();
  renderChapter(1, false);
  positionCurrentChapter();
  showToast('十二月预览模式：不会改动正常存档');
}
