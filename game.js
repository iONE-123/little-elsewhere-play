const lifeKey = "happy-result-exploration-v1";
const volumeNames = ["一冬小事", "春天的行李", "去往的地方"];
let life = readLife();
let eventSelection = null;
let routeStops = [];
let eventFocus = null;
const birthdayPhotos = [
  'november/flight-search.jpg', 'december/arm-notes.jpg', 'january/boarding-wish.jpg',
  'february/01.jpg', 'march/count-chiangmai-23.jpg', 'april/brunch.jpg',
  'may/busan-coast.jpg', 'june/kitty-earring.jpg', 'july/01-rabbit-rubbing.jpg',
  'august/01.jpg', 'september/01.jpg', 'october/01.jpg'
];
let pendingRole = life.role;
let roleChosenThisVisit = false;

function readLife() {
  try {
    const data = JSON.parse(localStorage.getItem(lifeKey)) || {};
    return { found: data.found && typeof data.found === "object" ? data.found : {},
      explored: data.explored && typeof data.explored === "object" && !Array.isArray(data.explored) ? data.explored : {},
      reduced: !!data.reduced, birthday: !!data.birthday, birthdayEndingCompleted: !!data.birthdayEndingCompleted,
      role: data.role === "wangzi" ? "wangzi" : "qiulu" };
  } catch (_) { return { found: {}, explored: {}, reduced: false, birthday: false, birthdayEndingCompleted: false, role: "qiulu" }; }
}
function saveLife() {
  if (previewMode) { updateGameHUD(); return; }
  try { localStorage.setItem(lifeKey, JSON.stringify(life)); } catch (_) { showToast("这次探索仍可继续；浏览器暂时无法保存进度。"); }
  updateGameHUD();
}
function discovered(chapter, item) { return !!life.found[chapter + ":" + item]; }
function chapterExplored(chapter) { return requiredChapterMemories(chapter).every(explorationCompleted); }
function totalMemoryObjects() { return lifeScenes.reduce(function(total, scene) { return total + scene.objects.length; }, 0); }
function objectCount() { return lifeScenes.reduce(function (total, scene, c) { return total + scene.objects.filter(function (_, i) { return discovered(c, i); }).length; }, 0); }
function escapeGame(value) { return String(value).replace(/[&<>"']/g, function (s) { return ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s]; }); }
function lifeIcon(name) {
  const paths = {
    ticket: '<path d="M14 24h68v13a11 11 0 0 0 0 22v13H14V59a11 11 0 0 0 0-22Z"/><path d="M62 27v5m0 7v5m0 7v5m0 7v6M29 39h20M29 49h14M29 59h20"/>',
    book: '<path d="M14 20q18-7 34 3 16-10 34-3v54q-18-7-34 3-16-10-34-3Z"/><path d="M48 23v54M23 32l15 2m-15 9 15 2m-15 9 15 2m20-22 15-2m-15 13 15-2"/>',
    lamp: '<path d="M37 18h22l13 34H24ZM48 52v23M32 78h32M29 61l-7 6m45-6 7 6"/><path d="M41 26h8"/>',
    calendar: '<rect x="18" y="23" width="60" height="56" rx="4"/><path d="M18 39h60M32 16v16m32-16v16M30 51h9m13 0h11M30 63h9m13 0h11"/>',
    cup: '<path d="M22 35h44v23a22 22 0 0 1-44 0ZM66 39h6a10 10 0 0 1 0 20h-6M16 82h59M33 14q-8 7 0 14m16-14q-8 7 0 14"/>',
    letter: '<rect x="13" y="25" width="70" height="50" rx="3"/><path d="m14 26 34 27 34-27M14 75l23-28m45 28L59 47"/><path d="m42 56 6 5 6-5"/>',
    flower: '<path d="M48 53v30m0-9q-23 0-21-18 20 0 21 18m0-9q19-1 21-16-20 0-21 16"/><path d="M48 45c-28 8-31-16-12-18-8-23 21-26 23-6 22-8 30 17 8 22 7 20-19 27-19 2Z"/><circle cx="51" cy="35" r="6"/>',
    music: '<rect x="13" y="24" width="70" height="53" rx="7"/><circle cx="37" cy="51" r="16"/><circle cx="37" cy="51" r="5"/><path d="M62 36h12m-12 9h12M27 15h39m-5 48h13"/>',
    phone: '<rect x="28" y="10" width="40" height="76" rx="7"/><path d="M41 18h14M35 66h26"/><circle cx="48" cy="76" r="2"/><path d="M37 37q11-14 22 0v15H37ZM43 31v-5m10 5v-5"/>',
    map: '<path d="m12 24 24-9 24 9 24-9v62l-24 9-24-9-24 9ZM36 15v62m24-53v62"/><path d="M25 42q16-9 23 8t26 7" stroke-dasharray="3 5"/><circle cx="24" cy="42" r="3"/><circle cx="74" cy="57" r="3"/>',
    clock: '<circle cx="48" cy="48" r="32"/><path d="M48 24v24l17 10M44 10h8M24 19l-6-6m54 6 6-6"/>',
    shell: '<path d="M45 80 15 44C2 21 31 4 43 22 54 0 88 15 82 36l-29 44Z"/><path d="m26 29 19 44m5-46-2 46m23-45L52 73M35 85h28"/>',
    mountain: '<path d="m8 80 30-59 20 37 11-26 21 48ZM27 42l11 9 9-12m13 16 9 6 7-14"/><circle cx="66" cy="15" r="6"/>',
    compass: '<circle cx="48" cy="49" r="31"/><path d="m59 30-5 25-21 14 7-27ZM48 11V5m0 88v-6M9 49H3m90 0h-6"/>',
    camera: '<rect x="12" y="29" width="72" height="49" rx="6"/><path d="M27 29l6-11h29l7 11M20 41h9"/><circle cx="49" cy="53" r="15"/><circle cx="49" cy="53" r="6"/>'
  };
  return '<svg viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || paths.book) + '</svg>';
}
function doll(who, small) {
  return '<span class="paper-person ' + who + (small ? ' small-person' : '') + '" aria-hidden="true"><i class="person-hair"></i><i class="person-face"></i><i class="person-neck"></i><i class="person-body"></i><i class="person-leg left"></i><i class="person-leg right"></i><i class="person-bow">୨୧</i><i class="person-star">✧</i></span>';
}

document.body.insertAdjacentHTML("beforeend", '<dialog class="life-modal" id="life-modal" aria-labelledby="life-modal-title"><button class="modal-close" data-game="close" aria-label="关闭弹窗">×</button><div id="life-modal-content"></div></dialog>');
const lifeModal = document.querySelector("#life-modal");
const lifeContent = document.querySelector("#life-modal-content");
function showLifeModal(content, kind) {
  lifeModal.dataset.kind = kind || "paper";
  lifeContent.innerHTML = content;
  if (!lifeModal.open) lifeModal.showModal();
  lifeModal.scrollTop = 0;
}
function startLifeGame() {
  pendingRole = life.role;
  showLifeModal('<p class="eyebrow">PLAYER FILE · 选择你的角色</p><h2 id="life-modal-title">这一年，从你开始。</h2><p class="modal-lead">同一年的两条阅读路线，选一个名字再翻开。</p><div class="character-files"><button class="character-file' + (pendingRole === 'qiulu' ? ' selected' : '') + '" data-game="player" aria-pressed="' + (pendingRole === 'qiulu') + '">' + doll("qiulu") + '<span class="character-label">生日主角</span><strong>秋露</strong><small>11月19日 · 生日存档</small><p>阅读记录仪手记<br>看见这一年留下的痕迹</p></button><button class="character-file' + (pendingRole === 'wangzi' ? ' selected' : '') + '" data-game="friend" aria-pressed="' + (pendingRole === 'wangzi') + '">' + doll("wangzi") + '<span class="character-label">同行的朋友</span><strong>王孜</strong><small>共享坐标 · 各有方向</small><p>阅读王孜的手记<br>从她的这一端回望</p></button></div><p id="character-note" class="character-note"></p><button class="primary-button game-primary" data-game="enter-library"></button>', "characters");
  updateCharacterChoice();
}
function updateCharacterChoice() {
  const wangzi = pendingRole === 'wangzi';
  document.querySelector('#character-note').textContent = wangzi ? '以王孜进入后，每月只读王孜视角的手记。' : '以秋露进入后，每月只读月度叙述（记录仪视角）。';
  document.querySelector('[data-game="enter-library"]').textContent = '以' + (wangzi ? '王孜' : '秋露') + '的身份进入 →';
}
function chooseLifeRole(role) {
  pendingRole = life.role = role;
  roleChosenThisVisit = true;
  saveLife();
}

function updateChapterRoleOptions() {
  lifeContent.querySelectorAll("[data-chapter-role]").forEach(function (button) {
    const role = button.dataset.chapterRole;
    button.textContent = novemberDisplayName(role);
    button.setAttribute("aria-pressed", String(role === life.role));
  });
  lifeContent.querySelectorAll("[data-nov-name-mode]").forEach(function (button) {
    button.setAttribute("aria-pressed", String((button.dataset.novNameMode === "nicknames") === novemberUseNicknames));
  });
}

function openChapterRoleChoice() {
  showLifeModal('<h2 id="life-modal-title">切换角色</h2>' +
    '<div class="chapter-role-options" role="group" aria-label="选择阅读视角">' +
    '<button type="button" data-chapter-role="qiulu"></button>' +
    '<button type="button" data-chapter-role="wangzi"></button></div>' +
    '<div class="chapter-role-names" role="group" aria-label="姓名显示方式">' +
    '<button type="button" data-nov-name-mode="real">本名</button>' +
    '<button type="button" data-nov-name-mode="nicknames">隐藏称呼</button></div>', "chapter-role");
  updateChapterRoleOptions();
  lifeContent.querySelector('[data-chapter-role][aria-pressed="true"]').focus();
}

function refreshChapterRole() {
  const scroll = window.scrollY;
  renderGameChapter(currentChapter, false);
  window.scrollTo({ top: scroll, behavior: "instant" });
}

function showShelf(message) {
  lifeModal.close();
  returnToLibrary();
  if (message) showToast(message);
  const nextStart = volumeStarts.find(function (s) { return volumeUnlocked(s) && !volumeComplete(s); });
  const book = opening.querySelector('[data-opening-chapter="' + (nextStart === undefined ? activeVolumeStart : nextStart) + '"]');
  if (book) book.focus();
}
function continueLifeGame() {
  const next = chapters.findIndex(function (_, index) {
    return chapterCanEnter(index) && !isComplete(index);
  });
  const index = chapterCanEnter(currentChapter) ? currentChapter : next === -1 ? state.unlocked : next;
  roleChosenThisVisit = true;
  enterFromOpening(volumeStartFor(index), index);
}
function updateGameHUD() {
  const hud = document.querySelector("#game-hud");
  if (!hud) return;
  hud.innerHTML = '<button class="hud-player" data-game="profile" aria-label="当前角色：' + (life.role === 'wangzi' ? '王孜' : '秋露') + '，点击切换角色">' + doll(life.role,true) + '<span><small>PLAYER · ' + (life.role === 'wangzi' ? '王孜' : '秋露') + '</small><strong>' + (life.role === 'wangzi' ? '王孜视角' : '记录仪视角') + ' · 可切换角色</strong></span></button><div class="hud-stat"><strong>' + state.completed.length + '<small> / 12</small></strong><span>章节纪念章</span></div><button class="hud-stat" data-game="memories"><strong>' + objectCount() + '<small> / ' + totalMemoryObjects() + '</small></strong><span>回忆物件 ↗</span></button><button class="hud-map" data-action="show-map">展开人生地图 <span>↗</span></button>';
}
function chapterCanEnter(index) {
  return Number.isInteger(index) && index >= 0 && index < 12 && volumeUnlocked(volumeStartFor(index)) && index <= state.unlocked;
}
function renderWorldMap() {
  document.querySelector("#map-modal h2").textContent = "十二处，生活曾经亮起。";
  document.querySelector("#year-map").innerHTML = volumeStarts.map(function (start, v) {
    return '<section class="map-volume"><div class="map-volume-heading"><span>VOL. 0' + (v+1) + '</span><h3>' + volumeNames[v] + '</h3><small>' + volumeCompletedCount(start) + ' / 4</small></div><div class="map-locations">' + lifeScenes.slice(start,start+4).map(function(scene,j) {
      const i = start+j; const ready = chapterCanEnter(i);
      return '<button class="map-location theme-' + scene.theme + (isComplete(i)?' complete':'') + '" data-game="map-chapter" data-index="' + i + '" ' + (ready?'':'disabled') + '><span class="map-drawing">' + lifeIcon(scene.objects[0].icon) + '</span><small>' + chapters[i].month + '</small><strong>' + scene.place + '</strong><em>' + (isComplete(i)?'已收藏 · 重返':ready?'可以探索 →':volumeUnlocked(start)?'完成前一章后开启':'完成上一卷后开启') + '</em></button>';
    }).join("") + '</div></section>';
  }).join("");
}
function renderGameChapter(index, scroll) {
  const chapter = chapters[index], scene = lifeScenes[index];
  const done = isComplete(index), explored = chapterExplored(index), chosen = state.choices[index];
  const count = scene.objects.filter(function(_,i){return discovered(index,i);}).length;
  document.body.classList.add("in-game");
  const choicesReady = explored || done;
  stage.innerHTML = '<div class="life-chapter theme-' + scene.theme + '"><header class="scene-header"><div><p class="eyebrow">VOL. 0' + (Math.floor(index/4)+1) + ' / CHAPTER ' + String(index+1).padStart(2,"0") + ' · ' + chapter.month + '</p><h3 class="chapter-title">' + scene.place + '</h3></div><button class="text-button" data-game="shelf">合上本卷 ↗</button></header><div class="play-layout"><div class="scene-canvas" aria-label="' + scene.place + '，点击回忆物件探索"><div class="scene-sky" aria-hidden="true"><span class="sky-orb"></span><span class="scene-hill hill-a"></span><span class="scene-hill hill-b"></span><div class="window-bars"></div></div><div class="scene-floor" aria-hidden="true"></div><div class="scene-curtain" aria-hidden="true"></div><div class="scene-shelf" aria-hidden="true"></div><span class="scene-flower" aria-hidden="true">✿</span><div class="scene-caption"><span>' + (scene.symbolic ? '日常留白 · 意象探索' : chapter.coordinate) + '</span><small>' + chapter.weather + '</small></div>' + scene.objects.map(function(obj,i){return '<button class="scene-object object-' + i + (discovered(index,i)?' found':'') + '" data-game="object" data-item="' + i + '" data-index="' + index + '" aria-label="探索：' + obj.name + '"><span class="object-spark">' + (discovered(index,i)?'✓':'✧') + '</span><span class="object-art">' + lifeIcon(obj.icon) + '</span><span class="object-label">' + obj.name + '</span></button>';}).join("") + '<div class="scene-people">' + doll("qiulu") + '</div><p class="scene-instruction">点击物件，听见这一月的回声</p></div><aside class="quest-panel"><p class="eyebrow">本月探索</p><h4>' + scene.quest + '</h4><div class="quest-meter"><i style="width:' + (count/scene.objects.length*100) + '%"></i></div><p class="quest-count">' + count + ' / ' + scene.objects.length + ' 件物件已收藏</p><ul>' + scene.objects.map(function(o,i){return '<li><button data-game="object" data-item="' + i + '" data-index="' + index + '"><span>' + (discovered(index,i)?'✓':'○') + '</span>' + o.name + '</button></li>';}).join("") + '</ul><div class="mood-label">此刻的天气 <small>故事心情</small></div><div class="mood-chips">' + scene.mood.map(function(m){return '<span>' + m + '</span>';}).join("") + '</div><div class="chapter-badge ' + (done?'earned':'') + '"><span>✧</span><div><small>' + (done?'已获得纪念章':'本章纪念章') + '</small><strong>' + scene.badge + '</strong></div></div></aside></div><section class="reflection-section"><div class="reflection-heading"><span>这一月的手记</span><span>' + (choicesReady?'可以翻阅':'探索本月全部物件后开启') + '</span></div>' + (choicesReady ? '<details class="memory-diary"><summary>' + chapter.title + '<span>翻开这一页 ＋</span></summary><div class="diary-prose">' + chapter.prose.map(function(p){return '<p>'+p+'</p>';}).join("") + '<blockquote>' + chapter.quote + '</blockquote></div></details><p class="choice-label">最后，为这一月留下一种看法。</p><div class="choices">' + chapter.choices.map(function(c,i){return '<button class="choice '+(Number(chosen)===i?'is-chosen':'')+'" data-choice="'+i+'" data-chapter-choice="'+index+'">'+c.label+'</button>';}).join("") + '</div><p class="choice-response" id="choice-response">' + (chosen!==undefined ? chapter.choices[chosen].response : '每一种看法都可以被保存，没有标准答案。') + '</p>' : '<p class="locked-diary">这一页还合着。场景里的回忆物件，会带你走到它面前。</p>') + '<div class="next-row"><small>' + (done?'纪念章已收入存档':'完成探索与回望，收下本章纪念章') + '</small><button class="primary-button next-button '+(done?'':'is-locked')+'" data-action="next" data-next-chapter="' + index + '" '+(done?'':'disabled')+'><span>'+(index===3?'完成第一卷 · 回书架':index===7?'完成第二卷 · 回书架':index===11?'前往答案之书':'去下一处记忆')+'</span><span>→</span></button></div></section></div>';
  updateGameHUD();
  // Page navigation belongs to renderChapter, after all monthly wrappers have finished.
}
function openMemoryObject(c, i, fromBag) {
  if (!chapterCanEnter(c) || !lifeScenes[c]?.objects[i]) return;
  eventFocus = { c:c, i:i, bag:!!fromBag }; eventSelection = null; routeStops = [];
  const obj = lifeScenes[c].objects[i], found = discovered(c,i);
  let challenge = '';
  if (obj.kind === "palette") challenge = '<p class="challenge-instruction">选一枚颜色，把它留在你的收藏里。</p><div class="palette-options">' + ['玫瑰粉','雾蓝','鼠尾草绿'].map(function(color,j){return '<button data-game="palette" data-value="'+j+'" style="--swatch:'+['#c78799','#8babbc','#9aa683'][j]+'" aria-label="选择'+color+'" aria-pressed="false"><i></i>'+color+'</button>';}).join('')+'</div>';
  if (obj.kind === "choice") challenge = '<div class="event-choices">' + obj.options.map(function(option,j){return '<button data-game="event-choice" data-value="'+j+'">'+option+'</button>';}).join('')+'</div>';
  if (obj.kind === "route") challenge = '<p class="challenge-instruction">依次点选目的地：首尔 → 釜山</p><div class="route-options"><button data-game="route" data-city="釜山">釜山</button><span>⇄</span><button data-game="route" data-city="首尔">首尔</button></div>';
  if (obj.kind === "tune") challenge = '<label class="tune-label" for="memory-frequency">回忆频率 <output id="frequency-value">100</output></label><input id="memory-frequency" type="range" min="100" max="130" value="100" step="1" aria-label="回忆频率，调至119"><div class="frequency-scale"><span>100</span><span>119 · Love</span><span>130</span></div>';
  showLifeModal('<p class="eyebrow">MEMORY OBJECT · '+chapters[c].month+'</p><div class="event-illustration">'+lifeIcon(obj.icon)+'</div><h2 id="life-modal-title">'+obj.title+'</h2><p class="event-story">'+obj.text+'</p>'+challenge+'<p id="event-feedback" class="event-feedback" aria-live="polite">'+(found?'已在回忆背包里，也可以再次探索。':'')+'</p><button class="primary-button game-primary" id="collect-object" data-game="collect" '+(obj.kind?'disabled':'')+'>'+(obj.kind==='choice'?'收好这份回忆':obj.action)+' ＋</button>', 'event');
}
function collectMemoryObject() {
  if (!eventFocus) return;
  const c = eventFocus.c, i = eventFocus.i, obj = lifeScenes[c].objects[i];
  if (obj.kind && eventSelection === null) return;
  life.found[c+':'+i] = { selection: eventSelection === null ? 'collected' : eventSelection };
  saveLife(); lifeModal.close();
  if (currentChapter === c) renderGameChapter(c,false);
  showToast('已收进背包：'+obj.souvenir+(chapterExplored(c)?' · 本月手记已开启':''));
  const itemButton = stage.querySelector('[data-game="object"][data-item="'+i+'"]');
  if (itemButton) itemButton.focus({preventScroll:true});
}
function finishGameChapter(index) {
  const badge = stage.querySelector('.chapter-badge');
  if (badge) { badge.classList.add('earned'); badge.querySelector('small').textContent='已获得纪念章'; }
  updateGameHUD();
}
function showMemories(filter) {
  const selected = filter === undefined ? 'all' : String(filter);
  let items = '';
  lifeScenes.forEach(function(scene,c){ scene.objects.forEach(function(obj,i){
    if (!discovered(c,i) || (selected!=='all' && Number(selected)!==c)) return;
    const selection = life.found[c+':'+i]?.selection;
    const paletteName = obj.kind==='palette' && Number.isInteger(selection) ? ['玫瑰粉','雾蓝','鼠尾草绿'][selection] : '';
    items += '<button class="bag-item" data-game="bag-object" data-index="'+c+'" data-item="'+i+'">'+lifeIcon(obj.icon)+'<strong>'+obj.souvenir+'</strong><small>'+chapters[c].month+(paletteName?' · '+paletteName:'')+'</small></button>';
  }); });
  showLifeModal('<p class="eyebrow">POCKET OF THE YEAR</p><h2 id="life-modal-title">这一年，随身携带。</h2><p class="modal-lead">'+objectCount()+' / '+totalMemoryObjects()+' 件物件 · '+state.completed.length+' / 12 枚纪念章</p><label class="bag-filter">按月份翻找 <select id="bag-filter"><option value="all">全部月份</option>'+chapters.map(function(c,i){return '<option value="'+i+'" '+(selected===String(i)?'selected':'')+'>'+c.month+'</option>';}).join('')+'</select></label><div class="bag-grid">'+(items || '<p class="bag-empty">背包还轻着。走进场景，收藏第一件回忆吧。</p>')+'</div><h3 class="badge-heading">你走过的路</h3><div class="achievement-grid">'+lifeScenes.map(function(s,i){return '<div class="achievement '+(isComplete(i)?'earned':'')+'"><span>'+ (isComplete(i)?'✧':'○')+'</span><strong>'+s.badge+'</strong><small>'+ (isComplete(i)?'已获得':'待探索')+'</small></div>';}).join('')+'</div>', 'bag');
}
function showSettings() {
  showLifeModal('<p class="eyebrow">AT YOUR OWN PACE</p><h2 id="life-modal-title">按舒服的节奏来。</h2><div class="setting-row"><span><strong>游戏伴奏</strong><small>进入游戏后循环播放</small></span><button data-game="sound"></button></div><div class="setting-row"><span><strong>减少动态</strong><small>让纸片、场景与切换安静下来</small></span><button data-game="motion" aria-pressed="'+life.reduced+'">'+(life.reduced?'已开启':'开启')+'</button></div><p class="settings-note">探索与选择会自动保存在当前浏览器。换设备或清除浏览器数据后，存档不会跟随。</p>', 'settings');
  syncGameMusicControls();
}
function showBirthday() {
  if (!allComplete()) return;
  document.querySelector('#answer-modal').close();
  showLifeModal('<p class="eyebrow">NOVEMBER 19 · A LITTLE SOMETHING</p><h2 id="life-modal-title">秋露，生日快乐。</h2><p class="modal-lead">这一年的小屋，已经慢慢住进了一些东西。</p><div class="birthday-room" aria-hidden="true"><div class="birthday-window"><i></i></div><div class="birthday-room-shelf">'+lifeScenes.slice(0,6).map(function(s,i){return '<span title="'+chapters[i].month+'">'+lifeIcon(s.objects[0].icon)+'</span>';}).join('')+'</div><div class="birthday-room-table"></div><img class="birthday-room-fawn" src="./assets/storybook-fawn.svg" alt=""><img class="birthday-room-violet" src="./assets/violet-sprig.svg" alt=""><div class="birthday-album-cover">这一年<br><small>2025.11 — 2026.10</small></div></div><div class="birthday-actions"><button class="primary-button game-primary" data-game="birthday-album">翻开相册 →</button><button class="secondary-button" data-game="shelf">返回书架</button></div>', 'birthday');
}
function showBirthdayAlbum() {
  life.birthday = true;
  saveLife();
  showLifeModal('<p class="eyebrow">THE YEAR IN TWELVE PAGES</p><h2 id="life-modal-title">翻到哪一页？</h2><p class="modal-lead">照片与章节都还在。可以从任何一个月重新看起。</p><div class="birthday-album-grid">'+chapters.map(function(chapter,i){return '<button class="birthday-album-card" data-game="birthday-page" data-index="'+i+'"><img src="./assets/'+birthdayPhotos[i]+'" alt="'+escapeGame(chapter.month)+'的回忆照片" loading="lazy"><span>'+escapeGame(chapter.month)+'</span><strong>'+escapeGame(chapter.title)+'</strong></button>';}).join('')+'</div><div class="birthday-actions"><button class="secondary-button" data-game="birthday">返回小屋</button><button class="secondary-button" data-game="shelf">返回书架</button></div>', 'birthday');
}
function showBirthdayPage(index) {
  if (!Number.isInteger(index) || index < 0 || index >= chapters.length) return;
  const chapter = chapters[index];
  showLifeModal('<p class="eyebrow">PAGE '+String(index+1).padStart(2,'0')+' / 12 · '+escapeGame(chapter.month)+'</p><h2 id="life-modal-title">'+escapeGame(chapter.title)+'</h2><figure class="birthday-page-photo"><img src="./assets/'+birthdayPhotos[index]+'" alt="'+escapeGame(chapter.month)+'的回忆照片"><figcaption>'+escapeGame(chapter.coordinate)+'</figcaption></figure><div class="birthday-actions"><button class="secondary-button" data-game="birthday-album">返回相册</button><button class="secondary-button" data-game="birthday">返回小屋</button></div>', 'birthday');
}

document.addEventListener('click',function(event){
  const button=event.target.closest('[data-game]'); if(!button || button.disabled) return;
  const action=button.dataset.game;
  if(action==='start') {
    playGameMusic();
    showFrontScreen('intro');
  }
  if(action==='continue') continueLifeGame();
  if(action==='profile') {
    if (currentChapter === null) startLifeGame();
    else openChapterRoleChoice();
  }
  if(action==='close') lifeModal.close();
  if(action==='friend' || action==='player') {
    pendingRole = action === 'friend' ? 'wangzi' : 'qiulu';
    document.querySelectorAll('.character-file').forEach(function(b){b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button));});
    updateCharacterChoice();
  }
  if(action==='enter-library') { chooseLifeRole(pendingRole); showShelf(); }
  if(action==='shelf') showShelf();
  if(action==='map-chapter') {
    const i=Number(button.dataset.index); if(!chapterCanEnter(i)) return;
    document.querySelector('#map-modal').close();
    if(volumeStartFor(i)!==activeVolumeStart){showShelf('请翻开「'+volumeNames[Math.floor(i/4)]+'」，再回到这一处记忆。');return;}
    closeOpening();renderChapter(i,true);
  }
  if(action==='object' || action==='bag-object') openMemoryObject(Number(button.dataset.index),Number(button.dataset.item),action==='bag-object');
  if(action==='collect') collectMemoryObject();
  if(action==='palette' || action==='event-choice') {
    eventSelection=Number(button.dataset.value);
    button.parentElement.querySelectorAll('button').forEach(function(b){b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button));});
    const obj=lifeScenes[eventFocus.c].objects[eventFocus.i];
    document.querySelector('#event-feedback').textContent=action==='palette'?'这枚颜色会和物件一起留在背包里。':obj.responses[eventSelection];
    document.querySelector('#collect-object').disabled=false;
  }
  if(action==='route') {
    const city=button.dataset.city, expected=['首尔','釜山'];
    if(city!==expected[routeStops.length]){document.querySelector('#event-feedback').textContent='先在首尔会合，再去釜山。试着从首尔开始。';routeStops=[];button.parentElement.querySelectorAll('button').forEach(function(b){b.disabled=false;b.classList.remove('selected');});return;}
    routeStops.push(city);button.classList.add('selected');button.disabled=true;
    document.querySelector('#event-feedback').textContent=routeStops.join(' → ');
    if(routeStops.length===2){eventSelection='首尔 → 釜山';document.querySelector('#collect-object').disabled=false;}
  }
  if(action==='memories') showMemories();
  if(action==='progress') {
    showMemories();
    lifeContent.querySelector('.badge-heading').scrollIntoView({block:'start',behavior:'instant'});
  }
  if(action==='settings') showSettings();
  if(action==='motion'){life.reduced=!life.reduced;document.body.classList.toggle('reduce-motion',life.reduced);saveLife();showSettings();}
  if(action==='sound') toggleGameMusic();
  if(action==='birthday') showBirthday();
  if(action==='birthday-album') showBirthdayAlbum();
  if(action==='birthday-page') showBirthdayPage(Number(button.dataset.index));
});
lifeContent.addEventListener("click", function (event) {
  const choice = event.target.closest("[data-chapter-role]");
  if (!choice || lifeModal.dataset.kind !== "chapter-role") return;
  const role = choice.dataset.chapterRole;
  const previousRole = life.role;
  lifeModal.close();
  if (role === previousRole) return;
  chooseLifeRole(role);
  refreshChapterRole();
  const trigger = Array.from(document.querySelectorAll('[data-game="profile"]')).find(function (button) {
    return button.getClientRects().length > 0;
  });
  trigger?.focus({ preventScroll: true });
});
document.addEventListener('input',function(event){
  if(event.target.id!=='memory-frequency') return;
  const value=Number(event.target.value);document.querySelector('#frequency-value').textContent=value;
  eventSelection=value===119?119:null;
  document.querySelector('#event-feedback').textContent=value===119?'119，记忆的频率接通了。':'再轻轻调一格，找一找119。';
  document.querySelector('#collect-object').disabled=value!==119;
});
document.addEventListener('change',function(event){if(event.target.id==='bag-filter')showMemories(event.target.value);});
lifeModal.addEventListener('click',function(event){if(event.target===lifeModal)lifeModal.close();});
document.body.classList.toggle('reduce-motion',life.reduced);
updateGameHUD();
