/* April's map and ride cards are drawings based on supplied screenshots. */
let aprilPhase = 0;
let aprilVoice = 0;
let aprilStep = 0;
let aprilViewedPhoto = 0;
let aprilMapAligned = false;

function aprilPhotoButton(index) {
  const photo = aprilPhotos[index];
  if (!photo) return '';
  const screenshot = index === 0 || index === 10;
  return '<button class="april-photo' + (screenshot ? ' is-screenshot' : '') + '" data-apr-photo="' + index + '" aria-label="放大照片：' + photo.caption + '"><img src="' + photo.src + '" alt="' + photo.alt + '" loading="lazy"><span>↗ 放大</span></button>';
}

function aprilGallery(indices) {
  return '<div class="april-gallery" aria-label="四月照片">' + indices.map(function (index) {
    return '<figure>' + aprilPhotoButton(index) + '<figcaption>' + aprilPhotos[index].caption + '</figcaption></figure>';
  }).join('') + '</div>';
}

function aprilRideArt() {
  return '<div class="april-ride-card" role="img" aria-label="四月五日傍晚，摩的还需两分钟抵达的示意画面"><div class="april-ride-top"><span>04.05 · 17:35</span><span>清迈</span></div><div class="april-ride-road" aria-hidden="true"><i></i><b>○</b><em>⌁</em><strong>●</strong></div><div class="april-ride-bottom"><small>司机正在途中</small><strong>2 分钟</strong></div></div>';
}

function aprilMapArt(interactive, aligned, showControl) {
  const control = showControl === false ? '' : (interactive ? '<button data-apr-align-event aria-pressed="' + aligned + '">' + (aligned ? '时钟已对齐 ✓' : '让两只钟对齐 →') + '</button>' : '<button data-apr-align-scene aria-pressed="' + aligned + '">' + (aligned ? '同一个早晨 ✓' : '对齐两只钟 →') + '</button>');
  return '<div class="april-clock-map' + (aligned ? ' is-aligned' : '') + '" aria-label="中国和韩国相差一小时的同一个早晨"><div class="april-clock-pair"><div class="april-clock"><small>中国时间</small><strong>08:48</strong><span>大连一侧</span></div><span class="april-clock-divider">＋ 1h</span><div class="april-clock"><small>韩国时间</small><strong>09:48</strong><span>韩国一侧</span></div></div><div class="april-map-line" aria-hidden="true"><span class="april-map-point"><i></i>大连</span><div class="april-map-sea"><span>海</span></div><span class="april-map-point"><i></i>韩国</span></div><p class="april-map-caption">' + (aligned ? '相差一小时，指向同一个早晨。' : '两端仍隔着海，时间先在同一刻相遇。') + '</p>' + control + '</div>';
}

function aprilMeetingArt() {
  return '<div class="april-meeting-map" role="img" aria-label="四月二十九日，两个位置从隔海的两端来到首尔同一座城的示意图"><div class="april-meeting-top"><span>04.29 · 首尔</span><strong>从两端，到同城</strong></div><div class="april-meeting-route" aria-hidden="true"><span>王孜</span><i></i><b>✦</b><i></i><span>秋露</span></div><p>位置共享只留下靠近的方向；真正的坐标留在私人的截图里。</p></div>';
}

function aprilReading() {
  return '<section class="april-reading" aria-label="四月月度小结"><p class="eyebrow">2026.04 · 月度小结</p><h4>从两只钟到同一条路</h4><div class="april-voice-switch" role="group" aria-label="四月叙述视角">' + aprilNarratives.map(function (voice, index) {
    return '<button data-apr-voice="' + index + '" aria-pressed="' + (aprilVoice === index) + '">' + voice.name + '</button>';
  }).join('') + '</div><div id="april-prose"></div></section>';
}

function drawAprilVoice() {
  const host = stage.querySelector('#april-prose');
  if (!host) return;
  const voice = aprilNarratives[aprilVoice];
  host.innerHTML = '<p class="april-byline">' + voice.subtitle + '</p><div class="diary-prose">' + voice.paragraphs.map(function (paragraph) { return '<p>' + paragraph + '</p>'; }).join('') + '</div>';
  stage.querySelectorAll('[data-apr-voice]').forEach(function (button) {
    button.setAttribute('aria-pressed', String(Number(button.dataset.aprVoice) === aprilVoice));
  });
}

function drawAprilAtlas() {
  const canvas = stage.querySelector('.scene-canvas');
  if (!canvas) return;
  const phase = aprilPhases[aprilPhase];
  canvas.className = 'scene-canvas april-atlas';
  canvas.dataset.phase = aprilPhase;
  canvas.setAttribute('aria-label', '四月的八段回忆');
  canvas.innerHTML = '<div class="april-atlas-heading"><p class="eyebrow">APRIL · TWO CITIES, TWO DAYS</p><h4>' + phase.heading + '</h4><p>' + phase.date + '</p></div>' +
    '<div class="april-phase-tabs" role="group" aria-label="选择四月的回忆段落">' + aprilPhases.map(function (item, index) {
      const found = item.items.filter(function (objectIndex) { return discovered(5, objectIndex); }).length;
      return '<button data-apr-phase="' + index + '" aria-pressed="' + (index === aprilPhase) + '"><small>0' + (index + 1) + '</small>' + item.title + '<span>' + found + ' / ' + item.items.length + '</span></button>';
    }).join('') + '</div><div class="april-phase-layout">' +
    '<div class="april-phase-media">' + (phase.visual === 'meeting' ? aprilMeetingArt() : '') + (phase.photos.length ? aprilGallery(phase.photos) : aprilMapArt(false, false)) + '</div>' +
    '<div class="april-object-list">' + phase.items.map(function (objectIndex) {
      const object = lifeScenes[5].objects[objectIndex];
      return '<button class="april-object-card' + (discovered(5, objectIndex) ? ' found' : '') + '" data-game="object" data-index="5" data-item="' + objectIndex + '">' + lifeIcon(object.icon) + '<span><strong>' + object.name + '</strong><small>' + (discovered(5, objectIndex) ? '✓ 已收好 · 再翻开' : '打开回忆 ↗') + '</small></span></button>';
    }).join('') + '</div></div><p class="april-phase-note">' + phase.note + '</p>';
}

const aprilBaseRender = renderGameChapter;
renderGameChapter = function (index, scroll) {
  aprilBaseRender(index, scroll);
  if (index !== 5) return;
  stage.querySelector('.life-chapter').classList.add('april-chapter');
  drawAprilAtlas();
  const reflection = stage.querySelector('.reflection-section');
  const diary = reflection.querySelector('.memory-diary');
  if (diary) diary.outerHTML = aprilReading();
  else {
    const locked = reflection.querySelector('.locked-diary');
    locked.insertAdjacentHTML('beforebegin', aprilReading());
    locked.textContent = '九件回忆收齐后，再为这一月留下一种看法。';
  }
  reflection.querySelector('.reflection-heading').innerHTML = '<span>这一月的手记</span><span>客观叙述 / 王孜视角</span>';
  drawAprilVoice();
};

const aprilPages = {
  'apr-door': [
    { date: '清迈 · 门廊', title: '她在自己的路上', text: '清迈的木门和长椅留在相册里。那是她走过的一个地方，也是一段日子具体的背景。', photos: [1, 2] },
    { date: '清迈 · 手边的小物', title: '一枚小猫，缀着橘子', text: '钥匙扣放在掌心，和紫色卡片一起被拍下。远行中的纪念，有时不过这样小。', photos: [5] }
  ],
  'apr-table': [
    { date: '清迈 · 早餐', title: '先坐下来吃早饭', text: '水果吐司、红色饮料，后来还有煎蛋、面包和一桌热食。', photos: [3, 4] },
    { date: '清迈 · 午后与晚餐', title: '不止一顿饭', text: '茶、热锅、芒果糯米饭、蛋糕卷，都属于这些已真正过完的日子。', photos: [6, 7, 8] }
  ],
  'apr-ride': [
    { date: '04.05 · 17:35', title: '还有两分钟', text: '屏幕上，摩的司机正赶来接她。两分钟很短，短到这张截图能比等待本身留得更久。', visual: 'ride', photos: [] },
    { date: '清迈 · 路上', title: '出门也有这样细小的刻度', text: '一整趟旅行由许多短暂的停顿组成：在门口等，在车上走，到下一处再坐下来。', photos: [2, 6] }
  ],
  'apr-count': [
    { date: '四月初 · 26 天', title: '去首尔，还有二十六天', text: '四月二十九日被写进倒计时。它仍在远处，清迈的日子先一天天过着。', photos: [0] },
    { date: '四月下旬 · 10 天', title: '距五月二日，再见宋河还有十天', text: '宋河名字牌已经做好。三月画下的期待，在四月变成可以拿在手里的东西。', photos: [9, 10] }
  ],
  'apr-map': [
    { date: '04.29 · 两端', title: '王孜先到首尔', text: '一端仍在大连，一端已在韩国。共享位置把她们放进同一张图，也让中间那片海清清楚楚。', visual: 'map', photos: [] },
    { date: '04.29 · 08:48 / 09:48', title: '让两只钟对齐', text: '中国与韩国相差一个小时。把两张屏幕上的时钟并排看，它们指向同一个早晨。', visual: 'map-interactive', photos: [] },
    { date: '04.29 · 首尔', title: '从地图走进同一张照片', text: '后来，地图上的两点缩到同一座城。她们终于站在一起，留下这张合照。', visual: 'meeting', photos: [14] }
  ],
  'apr-seoul': [
    { date: '04.29 · 傍晚', title: '天色是粉紫色的', text: '会合后抬头，首尔的天空还亮着。照片把那一片颜色留下来。', photos: [11] },
    { date: '04.29 · 合照', title: '站在同一边', text: '两个人终于不用隔着地图找彼此。她们在街边拍下合照。', photos: [14] },
    { date: '04.29 · 入夜', title: '街上的灯慢慢亮了', text: '夜里还有行人、车灯和招牌。她们继续在首尔的街上走。', photos: [15] }
  ],
  'apr-seoul-table': [
    { date: '04.29 · 街上', title: '一份明朗热狗', text: '纸盒里的热狗撒着糖，淋着番茄酱和芥末。五月三十一日，她还会想起这一口。', photos: [12] },
    { date: '04.29 · 坐下来', title: '热汤和排骨', text: '排骨汤和炖排骨上桌，街上的时间暂时停在餐桌旁。', photos: [13] },
    { date: '04.29 · 便利店之后', title: '零食带回去慢慢吃', text: '便利店的零食和希腊酸奶，后来到了住处的木桌上。', photos: [16, 17] }
  ],
  'apr-busan': [
    { date: '04.30 · 两杯饮料', title: '一人一杯', text: '两只黄色杯套印着 RIIZE。她们拿着饮料的样子还在照片里。', photos: [18] },
    { date: '04.30 · 一个小意外', title: '巧克力化了形', text: '微波炉里的两块巧克力没能维持原来的样子。后来翻到照片，这个意外仍很好认。', photos: [19] },
    { date: '04.30 · 便利店', title: '镜子里的两个人', text: '凸面镜把整个便利店都收进去，她们只占了下面小小一角。', photos: [20] }
  ],
  'apr-haeundae': [
    { date: '04.30 · 吃饭时', title: '铁板还热着', text: '铁板鸡和面占满桌子。拍照的时候，这顿饭还没有吃完。', photos: [21] },
    { date: '04.30 · 餐桌边', title: '隔着屏幕再留一张', text: '平板屏幕里的两个人都举起手，留下餐桌边的合照。', photos: [22] },
    { date: '04.30 · 海云台傍晚', title: '雨中的街道亮起来', text: '天色渐暗，海云台有风也有雨。她们走过的地方，留成一张有些冷的傍晚照片。', photos: [23] }
  ]
};

lifeScenes[5].objects.forEach(function (object, index) {
  object.kind = ['apr-door', 'apr-table', 'apr-ride', 'apr-count', 'apr-map', 'apr-seoul', 'apr-seoul-table', 'apr-busan', 'apr-haeundae'][index];
});

function drawAprilEvent() {
  if (eventFocus?.c !== 5) return;
  const object = lifeScenes[5].objects[eventFocus.i];
  const pages = aprilPages[object.kind];
  const page = pages?.[aprilStep];
  const host = lifeContent.querySelector('#april-event');
  if (!host || !page) return;
  let visual = '';
  if (page.visual === 'ride') visual = aprilRideArt();
  if (page.visual === 'map' || page.visual === 'map-interactive') visual = aprilMapArt(page.visual === 'map-interactive', aprilMapAligned, page.visual === 'map-interactive');
  if (page.visual === 'meeting') visual = aprilMeetingArt();
  const waitingForClocks = object.kind === 'apr-map' && aprilStep === 1 && !aprilMapAligned;
  host.innerHTML = '<p class="april-event-count">' + String(aprilStep + 1).padStart(2, '0') + ' / ' + String(pages.length).padStart(2, '0') + ' · ' + page.date + '</p><h3>' + page.title + '</h3><p class="april-event-text">' + page.text + '</p>' + visual +
    (page.photos.length ? '<div class="april-event-photos">' + page.photos.map(aprilPhotoButton).join('') + '</div>' : '') +
    '<div class="april-page-controls"><button data-apr-step="' + (aprilStep - 1) + '" ' + (aprilStep === 0 ? 'disabled' : '') + '>← 上一页</button>' +
    (aprilStep < pages.length - 1 ? '<button data-apr-step="' + (aprilStep + 1) + '" ' + (waitingForClocks ? 'disabled' : '') + '>' + (waitingForClocks ? '先对齐时钟' : '继续翻页 →') + '</button>' : '<span>这一页，可以收好了。</span>') + '</div>';
  const ready = aprilStep === pages.length - 1 && (object.kind !== 'apr-map' || aprilMapAligned);
  eventSelection = ready ? object.kind + '-read' : null;
  lifeContent.querySelector('#collect-object').disabled = !ready;
  lifeContent.querySelector('#event-feedback').textContent = ready ? '可以收进回忆背包了。' : '再翻一页，看看这一段怎样走下去。';
}

const aprilBaseOpen = openMemoryObject;
openMemoryObject = function (chapterIndex, objectIndex, fromBag) {
  if (!chapterCanEnter(chapterIndex) || !lifeScenes[chapterIndex]?.objects[objectIndex]) return;
  aprilBaseOpen(chapterIndex, objectIndex, fromBag);
  lifeModal.classList.toggle('april-event-modal', chapterIndex === 5);
  if (chapterIndex !== 5 || !lifeModal.open) return;
  aprilStep = 0;
  aprilMapAligned = false;
  lifeContent.querySelector('.event-story').insertAdjacentHTML('afterend', '<section id="april-event" aria-label="四月回忆探索"></section>');
  drawAprilEvent();
};

const aprilBaseBag = showMemories;
showMemories = function (filter) {
  aprilBaseBag(filter);
  lifeContent.querySelectorAll('.bag-item[data-index="5"]').forEach(function (button) {
    const object = lifeScenes[5].objects[Number(button.dataset.item)];
    if (!object.photos?.length) return;
    const photo = aprilPhotos[object.photos[0]];
    const icon = button.querySelector('svg');
    if (icon) icon.outerHTML = '<img class="april-bag-photo" src="' + photo.src + '" alt="' + photo.alt + '">';
  });
};

document.body.insertAdjacentHTML('beforeend', '<dialog id="april-photo-viewer" aria-labelledby="april-photo-caption"><header><span>四月 · 清迈、首尔与釜山</span><button data-apr-photo-close aria-label="关闭四月照片">×</button></header><figure><img id="april-full-photo" alt=""><figcaption id="april-photo-caption"></figcaption></figure><nav aria-label="四月照片翻页"><button data-apr-photo-step="-1">← 上一张</button><span id="april-photo-count"></span><button data-apr-photo-step="1">下一张 →</button></nav></dialog>');
const aprilViewer = document.querySelector('#april-photo-viewer');

function viewAprilPhoto(index) {
  if (!aprilPhotos[index]) return;
  aprilViewedPhoto = index;
  const photo = aprilPhotos[index];
  const image = document.querySelector('#april-full-photo');
  image.src = photo.src;
  image.alt = photo.alt;
  document.querySelector('#april-photo-caption').textContent = photo.caption;
  document.querySelector('#april-photo-count').textContent = (index + 1) + ' / ' + aprilPhotos.length;
  aprilViewer.querySelector('[data-apr-photo-step="-1"]').disabled = index === 0;
  aprilViewer.querySelector('[data-apr-photo-step="1"]').disabled = index === aprilPhotos.length - 1;
  if (!aprilViewer.open) aprilViewer.showModal();
  aprilViewer.scrollTop = 0;
}

document.addEventListener('click', function (event) {
  const phase = event.target.closest('[data-apr-phase]');
  if (phase) {
    aprilPhase = Number(phase.dataset.aprPhase);
    drawAprilAtlas();
    stage.querySelector('[data-apr-phase="' + aprilPhase + '"]').focus({ preventScroll: true });
  }
  const voice = event.target.closest('[data-apr-voice]');
  if (voice) { aprilVoice = Number(voice.dataset.aprVoice); drawAprilVoice(); }
  const step = event.target.closest('[data-apr-step]');
  if (step) {
    const object = lifeScenes[5].objects[eventFocus.i];
    aprilStep = Math.max(0, Math.min(aprilPages[object.kind].length - 1, Number(step.dataset.aprStep)));
    drawAprilEvent();
    const host = lifeContent.querySelector('#april-event');
    host.tabIndex = -1;
    host.focus({ preventScroll: true });
    host.scrollIntoView({ behavior: 'auto', block: 'start' });
  }
  if (event.target.closest('[data-apr-align-scene]')) {
    const map = stage.querySelector('.april-clock-map');
    if (map) {
      const aligned = !map.classList.contains('is-aligned');
      map.outerHTML = aprilMapArt(false, aligned);
      stage.querySelector('[data-apr-align-scene]').focus({ preventScroll: true });
    }
  }
  if (event.target.closest('[data-apr-align-event]')) {
    aprilMapAligned = true;
    drawAprilEvent();
    lifeContent.querySelector('[data-apr-align-event]').focus({ preventScroll: true });
  }
  const photo = event.target.closest('[data-apr-photo]');
  if (photo) viewAprilPhoto(Number(photo.dataset.aprPhoto));
  if (event.target.closest('[data-apr-photo-close]')) aprilViewer.close();
  const viewerStep = event.target.closest('[data-apr-photo-step]');
  if (viewerStep) viewAprilPhoto(Math.max(0, Math.min(aprilPhotos.length - 1, aprilViewedPhoto + Number(viewerStep.dataset.aprPhotoStep))));
});

aprilViewer.addEventListener('click', function (event) { if (event.target === aprilViewer) aprilViewer.close(); });
aprilViewer.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    viewAprilPhoto(Math.max(0, Math.min(aprilPhotos.length - 1, aprilViewedPhoto + (event.key === 'ArrowLeft' ? -1 : 1))));
  }
});
