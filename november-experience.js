// November's scene stays in place while its three moon phases reveal the original memories.
let novemberScene = null;
let novemberJournalOpen = false;
const novemberNamesKey = 'happy-result-display-names-v1';
let novemberUseNicknames = false;
try { novemberUseNicknames = localStorage.getItem(novemberNamesKey) === 'nicknames'; } catch (_) {}

function novemberDisplayName(role) {
  return novemberUseNicknames ? (role === 'wangzi' ? 'Ione' : 'Lulu') : (role === 'wangzi' ? '王孜' : '秋露');
}

function novemberPlayerIcon() {
  return '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 31V18M20 26l-4-3M20 24l4-4M20 31l-3 3m3-3 3 3"/><path fill="currentColor" stroke="none" d="M19 21C11 20 6 15 5 8c7 1 13 5 14 13ZM21 21c1-8 7-13 15-14-1 8-6 13-15 14Z"/><path d="M11 32l-3 2m21-2 3 2"/></svg>';
}

function novemberTopAction(kind, action, title, icon, extra) {
  return '<button type="button" class="november-top-action" ' + action + (extra || '') + '><span class="november-action-icon">' + icon + '</span><span class="november-action-copy"><small>' + kind + '</small><strong>' + title + '</strong></span></button>';
}

const novemberSceneCopy = [
  { status: 'ANTICIPATION', heading: 'PLANS IN MOTION', line: '日本签证、云南行程，都写进了期待。', objects: ['THE PLAN'] },
  { status: 'IN FLUX', heading: 'BETWEEN REFRESHES', line: '机票、电话卡，还有一盏小灯。', objects: ['FLIGHT', 'SIM CARD', 'THE LAMP'] },
  { status: 'HONG KONG', heading: 'SHE ARRIVED', line: '香港的食物、城堡与舞台。', objects: ['FOOD', 'CASTLE', 'THE STAGE'] }
];

function novemberMoon(phase) {
  const shared = 'viewBox="0 0 32 32" aria-hidden="true" focusable="false"';
  if (phase === 0) return '<svg ' + shared + '><path d="M22.7 4.8A12.5 12.5 0 1 0 22.7 27a10.7 10.7 0 0 1 0-22.2Z" fill="currentColor"/></svg>';
  if (phase === 1) return '<svg ' + shared + '><circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M16 4a12 12 0 0 1 0 24Z" fill="currentColor"/></svg>';
  return '<svg ' + shared + '><circle cx="16" cy="16" r="12" fill="currentColor"/></svg>';
}

function novemberObjectIcon(index) {
  const paths = {
    0: '<path d="M4 19h24M7 14l17-6 3 2-8 7-3 6-3-1 1-6-7 1Z"/>',
    1: '<path d="M7 5h18v22H7zM10 10h12M10 15h7M10 20h10"/>',
    2: '<path d="M11 11h10l3 12H8l3-12ZM16 11V5M12 26h8"/>',
    3: '<path d="M9 4h11l4 5v19H9zM12 15h9M12 19h9M12 23h9"/>',
    4: '<path d="M5 17h22c0 6-4 10-11 10S5 23 5 17ZM8 12h16M11 7v4M17 5v6"/>',
    5: '<path d="M5 27V13l5-6 5 6 5-6 7 6v14ZM3 27h26M13 27v-9h6v9M9 11v5M23 11v5"/>',
    6: '<path d="m16 3 3.2 8.3L28 12l-6.8 5.7 2.2 9L16 22l-7.4 4.7 2.2-9L4 12l8.8-.7Z"/>'
  };
  return '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths[index] + '</svg>';
}

function novemberExperienceMarkup() {
  const selected = novemberScene === null ? null : novemberPhases[novemberScene];
  const copy = novemberScene === null ? null : novemberSceneCopy[novemberScene];
  return '<div class="november-board-shade" aria-hidden="true"></div>' +
    '<div class="november-board-top"><span class="november-board-edition">NOVEMBER · 2025</span><div class="november-board-tools">' + novemberTopAction('PLAYER · ' + novemberDisplayName(life.role), 'data-game="profile"', '切换角色', novemberPlayerIcon(), ' aria-label="切换角色，当前为' + novemberDisplayName(life.role) + '"') + novemberTopAction('JOURNAL', 'data-nov-journal', '月度手记', '<img src="./assets/november-journal-icon.png" alt="">', ' aria-label="打开十一月月度手记"') + '</div></div>' +
    '<div class="november-landscape-frame"><nav class="november-moon-nav" aria-label="十一月的三段回忆">' + novemberPhases.map(function (phase, i) {
      return '<button type="button" class="november-moon-node november-node-' + i + (i === novemberScene ? ' is-active' : '') + '" data-nov-scene="' + i + '" aria-pressed="' + (i === novemberScene) + '" aria-label="打开' + phase.label + '"><span class="november-node-orbit">' + novemberMoon(i) + '</span><span class="november-node-label">' + phase.label + '</span></button>';
    }).join('') + '</nav></div>' +
    (selected ? '<section class="november-scene-plane" aria-label="' + selected.label + '的回忆"><div class="november-plane-inner"><div class="november-plane-top"><span>NOVEMBER / 0' + (novemberScene + 1) + ' <span class="november-plane-moon">' + novemberMoon(novemberScene) + '</span> ' + copy.status + '</span><button type="button" data-nov-back>BACK TO SCENE ↗</button></div><h3>' + copy.heading + '</h3><p class="november-plane-line">' + copy.line + '</p><div class="november-plane-objects">' + selected.objects.map(function (objectIndex, i) {
      const obj = lifeScenes[0].objects[objectIndex];
      return '<button type="button" data-game="object" data-index="0" data-item="' + objectIndex + '" aria-label="探索：' + obj.name + '"><span class="november-plane-icon">' + novemberObjectIcon(objectIndex) + '</span><span class="november-object-copy"><small>0' + (i + 1) + ' / ' + (discovered(0, objectIndex) ? 'KEPT' : 'EXPLORE') + '</small><strong>' + copy.objects[i] + '</strong></span><span class="november-object-arrow" aria-hidden="true">↗</span></button>';
    }).join('') + '</div><p class="november-plane-count">' + selected.objects.filter(function (i) { return discovered(0, i); }).length + ' / ' + selected.objects.length + ' MEMORIES KEPT</p></div></section>' : '<p class="november-follow-hint">FOLLOW THE PATH <span aria-hidden="true">↗</span></p>');
}

function drawNovemberExperience() {
  const board = stage.querySelector('.november-board');
  if (!board) return;
  board.classList.toggle('has-scene', novemberScene !== null);
  board.innerHTML = novemberExperienceMarkup();
  const journal = stage.querySelector('.reflection-section');
  journal.hidden = !novemberJournalOpen;
  stage.querySelector('.november-chapter').classList.toggle('journal-open', novemberJournalOpen);
}

const novemberExperienceBaseRender = renderGameChapter;
renderGameChapter = function (index, scroll) {
  novemberExperienceBaseRender(index, scroll);
  document.body.classList.toggle('november-experience-active', index === 0);
  if (index !== 0) return;
  const chapter = stage.querySelector('.november-chapter');
  chapter.querySelector('.chapter-portal')?.remove();
  chapter.querySelector('.scene-header')?.remove();
  const board = chapter.querySelector('.scene-canvas');
  board.className = 'scene-canvas november-board';
  board.setAttribute('aria-label', '十一月的背景场景，选择月相进入回忆');
  const drawer = chapter.querySelector('.portal-month-drawer');
  if (drawer) {
    drawer.querySelector('summary').textContent = 'MONTHS';
    board.after(drawer);
  }
  const journal = chapter.querySelector('.reflection-section');
  journal.setAttribute('aria-label', '十一月的手记和章节进度');
  journal.insertAdjacentHTML('afterbegin', '<button type="button" class="november-journal-close" data-nov-journal-close aria-label="关闭手记">BACK TO SCENE ↗</button>');
  drawNovemberExperience();
};

document.addEventListener('click', function (event) {
  const node = event.target.closest('[data-nov-scene]');
  if (node) {
    novemberScene = Number(node.dataset.novScene);
    novemberJournalOpen = false;
    drawNovemberExperience();
    stage.querySelector('[data-nov-scene="' + novemberScene + '"]')?.focus({ preventScroll: true });
    return;
  }
  if (event.target.closest('[data-nov-back]')) {
    novemberScene = null;
    drawNovemberExperience();
    stage.querySelector('[data-nov-scene="1"]')?.focus({ preventScroll: true });
    return;
  }
  if (event.target.closest('[data-nov-journal]')) {
    novemberJournalOpen = true;
    drawNovemberExperience();
    stage.querySelector('[data-nov-journal-close]')?.focus({ preventScroll: true });
    return;
  }
  if (event.target.closest('[data-nov-journal-close]')) {
    novemberJournalOpen = false;
    drawNovemberExperience();
    stage.querySelector('[data-nov-journal]')?.focus({ preventScroll: true });
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key !== 'Escape' || !document.body.classList.contains('november-experience-active')) return;
  if (lifeModal.open || novemberViewer.open) return;
  if (novemberJournalOpen) {
    novemberJournalOpen = false;
    drawNovemberExperience();
    stage.querySelector('[data-nov-journal]')?.focus({ preventScroll: true });
  } else if (novemberScene !== null) {
    novemberScene = null;
    drawNovemberExperience();
  }
});

const novemberExperienceBaseShelf = showShelf;
showShelf = function (message) {
  document.body.classList.remove('november-experience-active');
  return novemberExperienceBaseShelf(message);
};

// Nicknames affect interface labels only. The saved character key and confirmed prose stay intact.
function novemberRouteArt(role) {
  if (role === 'qiulu') return '<svg viewBox="0 0 130 90" aria-hidden="true" focusable="false"><path class="november-route-ground" d="M0 71c29-14 53-12 80-6 18 4 35 3 50-5v30H0Z"/><path class="november-route-deer" d="M47 50c5-3 13-4 20-2l8 4 7-2 5-14 5-5 3-7 3 3-1 8 4 4-4 3-5-2-5 17-9 4-8-2-4 19-3 1-1-21-7 1-4 20-3 1-1-23-5-3 2-4Z"/></svg>';
  return '<svg viewBox="0 0 130 90" aria-hidden="true" focusable="false"><path class="november-route-ground" d="M0 71c29-14 53-12 80-6 18 4 35 3 50-5v30H0Z"/><path class="november-violet-stem" d="M55 75c1-15 0-27-5-36m5 24c9-13 14-24 16-35m-16 30c-8-10-15-13-21-14"/><g class="november-violet-bloom" transform="translate(49 38)"><circle cx="0" cy="-6" r="5"/><circle cx="-6" cy="-1" r="5"/><circle cx="-4" cy="6" r="5"/><circle cx="4" cy="6" r="5"/><circle cx="6" cy="-1" r="5"/></g><g class="november-violet-bloom" transform="translate(72 27) scale(.75)"><circle cx="0" cy="-6" r="5"/><circle cx="-6" cy="-1" r="5"/><circle cx="-4" cy="6" r="5"/><circle cx="4" cy="6" r="5"/><circle cx="6" cy="-1" r="5"/></g><circle class="november-violet-heart" cx="49" cy="38" r="2"/><circle class="november-violet-heart" cx="72" cy="27" r="1.5"/></svg>';
}

function novemberRoleCard(role, action, description) {
  const real = role === 'qiulu' ? '秋露' : '王孜';
  return '<button type="button" class="character-file november-route-card november-route-' + role + '" data-game="' + action + '" aria-pressed="false"><span class="november-route-scene" aria-hidden="true">' + novemberRouteArt(role) + '</span><span class="november-route-copy"><span class="character-label" data-nov-real-name>' + real + '</span><strong data-nov-display-name>' + real + '</strong><small class="november-route-mood">' + description + '</small></span><span class="november-route-check" aria-hidden="true"></span></button>';
}

function decorateNovemberRoleChoice() {
  if (lifeModal.dataset.kind !== 'characters') return;
  lifeModal.classList.add('november-role-choice');
  lifeModal.dataset.nameMode = novemberUseNicknames ? 'nicknames' : 'real';
  if (!lifeContent.querySelector('.november-role-layout')) {
    lifeContent.innerHTML = '<div class="november-role-layout"><h2 id="life-modal-title" class="november-role-title">CHOOSE A LIFE</h2><div class="november-name-switch" role="group" aria-label="姓名显示方式"><button type="button" data-nov-name-mode="real" aria-pressed="false">本名</button><button type="button" data-nov-name-mode="nicknames" aria-pressed="false">隐藏称呼</button></div><div class="character-files" role="group" aria-label="选择阅读角色">' + novemberRoleCard('qiulu', 'player', '日常 · 记录 · 冒险') + novemberRoleCard('wangzi', 'friend', '灵感 · 收藏 · 特别视角') + '</div><p id="character-note" class="character-note november-role-note"></p><button type="button" class="primary-button game-primary november-role-enter" data-game="enter-library"></button></div>';
  }
  lifeContent.querySelectorAll('[data-nov-name-mode]').forEach(function (button) {
    button.setAttribute('aria-pressed', String((button.dataset.novNameMode === 'nicknames') === novemberUseNicknames));
  });
  [['player', 'qiulu', '秋露'], ['friend', 'wangzi', '王孜']].forEach(function ([action, role, real]) {
    const card = lifeContent.querySelector('[data-game="' + action + '"]');
    const selected = pendingRole === role;
    card.classList.toggle('selected', selected);
    card.setAttribute('aria-pressed', String(selected));
    card.setAttribute('aria-label', '选择' + real + (novemberUseNicknames ? '，隐藏称呼 ' + novemberDisplayName(role) : '') + '的阅读路线');
    card.querySelector('[data-nov-real-name]').textContent = novemberUseNicknames ? real : (role === 'qiulu' ? '生日主角' : '同行的朋友');
    card.querySelector('[data-nov-display-name]').textContent = novemberDisplayName(role);
  });
  const entry = lifeContent.querySelector('[data-game="enter-library"]');
  if (entry) entry.textContent = '以 ' + novemberDisplayName(pendingRole) + ' 的身份进入 →';
  const note = lifeContent.querySelector('#character-note');
  if (note) note.textContent = pendingRole === 'wangzi' ? '当前选择王孜路线，阅读她这一端的手记。' : '当前选择秋露路线，阅读月度叙述。';
}

const novemberBaseStartLifeGame = startLifeGame;
startLifeGame = function () {
  novemberBaseStartLifeGame();
  decorateNovemberRoleChoice();
};
const novemberBaseUpdateCharacterChoice = updateCharacterChoice;
updateCharacterChoice = function () {
  novemberBaseUpdateCharacterChoice();
  decorateNovemberRoleChoice();
};

const novemberBaseUpdateGameHUD = updateGameHUD;
updateGameHUD = function () {
  novemberBaseUpdateGameHUD();
  const player = document.querySelector('#game-hud .hud-player');
  if (!player) return;
  const name = novemberDisplayName(life.role);
  player.setAttribute('aria-label', '当前角色：' + name + '，点击切换角色');
  const small = player.querySelector('small');
  if (small) small.textContent = 'PLAYER · ' + name;
};

const novemberBaseOpenMemoryObject = openMemoryObject;
openMemoryObject = function (chapter, item, fromBag) {
  novemberBaseOpenMemoryObject(chapter, item, fromBag);
  if (!lifeModal.open) return;
  lifeModal.dataset.novemberObject = String(chapter === 0);
  if (chapter !== 0) return;
  const photo = lifeContent.querySelector('.nov-event-photos');
  if (photo) photo.setAttribute('aria-label', '这件回忆的原始照片');
};

document.addEventListener('click', function (event) {
  const choice = event.target.closest('[data-nov-name-mode]');
  if (!choice) return;
  novemberUseNicknames = choice.dataset.novNameMode === 'nicknames';
  try { localStorage.setItem(novemberNamesKey, novemberUseNicknames ? 'nicknames' : 'real'); } catch (_) {}
  if (lifeModal.dataset.kind === 'chapter-role') {
    updateChapterRoleOptions();
    updateGameHUD();
    refreshChapterRole();
    return;
  }
  decorateNovemberRoleChoice();
  updateGameHUD();
  if (stage.querySelector('.november-board')) drawNovemberExperience();
});

if (currentChapter === 0 && document.body.classList.contains('in-game')) {
  renderGameChapter(0, false);
}

// A shareable local review URL leaves the normal chapter save untouched.
if (new URLSearchParams(window.location.search).get('preview') === 'november') {
  previewMode = true;
  activeVolumeStart = volumeStartFor(0);
  closeOpening();
  renderChapter(0, false);
}
