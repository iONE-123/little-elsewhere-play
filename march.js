/* The countdowns are preserved as March snapshots, never shown as live timers. */
let marchVoice = 0, marchPhase = 0, marchStep = 0, marchViewedPhoto = 0;

function marchPhotoButton(i) {
  const p = marchPhotos[i];
  return '<button class="march-photo" data-mar-photo="' + i + '" aria-label="放大照片：' + p.caption + '"><img src="' + p.src + '" alt="' + p.alt + '" loading="lazy"><span>↗ 放大</span></button>';
}
function marchReading() {
  return '<section class="march-reading" aria-label="三月月度小结"><p class="eyebrow">2026.03 · 月度小结</p><h4>日子有了刻度</h4><div class="march-voice-switch" role="group" aria-label="三月叙述视角">' + marchNarratives.map(function(v,i) {
    return '<button data-mar-voice="' + i + '" aria-pressed="' + (marchVoice === i) + '">' + v.name + '</button>';
  }).join('') + '</div><div id="march-prose"></div></section>';
}
function drawMarchVoice() {
  const host = stage.querySelector('#march-prose'); if(!host) return;
  const v = marchNarratives[marchVoice];
  host.innerHTML = '<p class="march-byline">' + v.subtitle + '</p><div class="diary-prose">' + v.paragraphs.map(function(p) {return '<p>' + p + '</p>';}).join('') + '</div>';
  stage.querySelectorAll('[data-mar-voice]').forEach(function(b) {b.setAttribute('aria-pressed', String(Number(b.dataset.marVoice) === marchVoice));});
}
function marchChatCard() {
  return '<div class="march-phase-card march-phase-chat" aria-label="二月底到三月一日的行程决定"><p class="march-card-kicker">日历翻了一页</p><div class="march-chat-line"><small>02.28</small><span>“我五一哪也不去。”</span></div><div class="march-chat-line"><small>03.01</small><span>“这个你觉得怎么样”</span></div><div class="march-chat-line march-chat-result"><small>约一小时后</small><span>机票 · 住处 · 见面会票</span></div><p class="march-card-foot">从一句话，到三件定下来的事。</p></div>';
}
function drawMarchAtlas() {
  const canvas = stage.querySelector('.scene-canvas'); if(!canvas) return;
  const phase = marchPhases[marchPhase];
  canvas.className = 'scene-canvas march-atlas';
  canvas.dataset.phase = marchPhase;
  canvas.setAttribute('aria-label', '三月的四段回忆');
  canvas.innerHTML = '<div class="march-atlas-heading"><p class="eyebrow">MARCH · DAYS WITH MARKS</p><h4>' + phase.heading + '</h4><p>' + phase.date + '</p></div>' +
    '<div class="march-phase-tabs" role="group" aria-label="选择三月的回忆段落">' + marchPhases.map(function(s,i) {
      return '<button data-mar-phase="' + i + '" aria-pressed="' + (i === marchPhase) + '"><small>0' + (i+1) + '</small>' + s.title + '<span>' + s.items.filter(function(n) {return discovered(4,n);}).length + ' / ' + s.items.length + '</span></button>';
    }).join('') + '</div><div class="march-phase-layout">' +
    (phase.photos.length ? '<div class="march-photo-grid" aria-label="三月照片">' + phase.photos.map(function(i) {return '<figure>' + marchPhotoButton(i) + '<figcaption>' + marchPhotos[i].caption + '</figcaption></figure>';}).join('') + '</div>' : marchChatCard()) +
    '<div class="march-object-list">' + phase.items.map(function(i) {
      const o = lifeScenes[4].objects[i];
      return '<button class="march-object-card' + (discovered(4,i) ? ' found' : '') + '" data-game="object" data-index="4" data-item="' + i + '">' + lifeIcon(o.icon) + '<span><strong>' + o.name + '</strong><small>' + (discovered(4,i) ? '✓ 已收好 · 再翻开' : '打开回忆 ↗') + '</small></span></button>';
    }).join('') + '</div></div><p class="march-phase-note">' + phase.note + '</p>';
}

const marchBaseRender = renderGameChapter;
renderGameChapter = function(index,scroll) {
  marchBaseRender(index,scroll); if(index !== 4) return;
  stage.querySelector('.life-chapter').classList.add('march-chapter');
  drawMarchAtlas();
  const reflection = stage.querySelector('.reflection-section');
  const diary = reflection.querySelector('.memory-diary');
  if(diary) diary.outerHTML = marchReading();
  else {
    const locked = reflection.querySelector('.locked-diary');
    locked.insertAdjacentHTML('beforebegin',marchReading());
    locked.textContent = '六件回忆收齐后，再为这一月留下一种看法。';
  }
  reflection.querySelector('.reflection-heading').innerHTML = '<span>这一月的手记</span><span>客观叙述 / 王孜视角</span>';
  drawMarchVoice();
};

const marchPages = {
  'mar-booking': [
    {date:'02.28 · 还在商量', title:'先说，哪也不去', text:'二月底，两个人还在说五一不出门。首尔场的消息来了，查票、看日子、摇骰子，几句话把门留了一条缝。', photos:[]},
    {date:'03.01 · 消息接着消息', title:'“这个你觉得怎么样”', text:'问题很短，后面却跟着一个个可以落实的选择。机票、住处和陈秋露的 SMTR25 首尔见面会票，接连定了下来。', photos:[]},
    {date:'03.01 · 约一个小时', title:'首尔有了地址', text:'她们还没有出发，航班和房间已先替她们在首尔占了一个位置。于是三月的其他日子，都有了可以等的方向。', photos:[]}
  ],
  'mar-two-ends': [
    {date:'三月初 · 已经过 29 天', title:'上一次，仍有日期', text:'倒计时从一月三十一日那次相见往后数。二十九天，不是把那天留住，而是承认她一直记得。', photos:[0]},
    {date:'三月初 · 还有 62 天', title:'下一次，也有日期', text:'同一只手机又向五月二日数去。两张截图摆在一起，三月正好落在“见过”和“还会见”之间。', photos:[1]}
  ],
  'mar-nearer': [
    {date:'后来 · 还有 52 天', title:'数字少了十', text:'下一次见宋河，已经只剩五十二天。日子照常过去，倒计时却替她把变化一天天写清楚。', photos:[2]},
    {date:'后来 · 首尔还有 49 天', title:'城市也有了倒计时', text:'四月二十九日的首尔，离王孜也近了。一个人先到，另一人随后来；她们各自朝着同一个四月末出发。', photos:[3]}
  ],
  'mar-chiangmai': [
    {date:'四月初之前 · 还有 23 天', title:'清迈排在前面', text:'首尔不是她这一季唯一要去的地方。清迈的倒计时亮着二十三，她先为自己的旅程留出位置。', photos:[4]},
    {date:'三月里的日历', title:'各自的路线可以并排', text:'先去清迈，再去首尔；王孜也有自己先走的几天。她们把不同的日期告诉彼此，等相见时再把路接起来。', photos:[4]}
  ],
  'mar-design': [
    {date:'三月 · 一张设计稿', title:'小厨师举起面包', text:'粉色和蓝色的心形图案里，宋河的照片、小厨师和面包都有自己的位置。她把喜欢做成一页可以看见的安排。', photos:[5]},
    {date:'做出来之前', title:'纸上已经热闹起来', text:'每一处图案都很小，排布却花了心思。见面的日子还远，她已开始为那天准备一些能递到手里的东西。', photos:[5]}
  ],
  'mar-made': [
    {date:'三月 · 钥匙扣', title:'画里的小厨师出来了', text:'透明的小挂件上，他仍穿着厨师服，仍举着面包。它们被一枚枚摆开，像在等待出门。', photos:[6]},
    {date:'三月 · 徽章和小物', title:'还没见面，已有了纪念', text:'心形徽章、带翅膀的图案和面包主题的圆章放在一起。未来还没有发生，手里却已有一点它的重量。', photos:[7]}
  ]
};
function drawMarchEvent() {
  if(eventFocus?.c !== 4) return;
  const o = lifeScenes[4].objects[eventFocus.i], pages = marchPages[o.kind], page = pages?.[marchStep], host = lifeContent.querySelector('#march-event');
  if(!host || !page) return;
  host.innerHTML = '<p class="march-event-count">' + String(marchStep+1).padStart(2,'0') + ' / ' + String(pages.length).padStart(2,'0') + ' · ' + page.date + '</p><h3>' + page.title + '</h3><p class="march-event-text">' + page.text + '</p>' +
    (page.photos.length ? '<div class="march-event-photos">' + page.photos.map(marchPhotoButton).join('') + '</div>' : '<div class="march-event-mark" aria-hidden="true">✧　03.01　✧</div>') +
    '<div class="march-page-controls"><button data-mar-step="' + (marchStep-1) + '" ' + (marchStep===0?'disabled':'') + '>← 上一页</button>' +
    (marchStep < pages.length-1 ? '<button data-mar-step="' + (marchStep+1) + '">继续翻页 →</button>' : '<span>这一页，可以收好了。</span>') + '</div>';
  const ready = marchStep === pages.length-1;
  eventSelection = ready ? o.kind + '-read' : null;
  lifeContent.querySelector('#collect-object').disabled = !ready;
  lifeContent.querySelector('#event-feedback').textContent = ready ? '可以收进回忆背包了。' : '再翻一页，看看这一段怎样走下去。';
}
const marchBaseOpen = openMemoryObject;
openMemoryObject = function(c,i,fromBag) {
  if(!chapterCanEnter(c) || !lifeScenes[c]?.objects[i]) return;
  marchBaseOpen(c,i,fromBag); if(c !== 4 || !lifeModal.open) return;
  marchStep = 0;
  lifeContent.querySelector('.event-story').insertAdjacentHTML('afterend','<section id="march-event" aria-label="三月回忆探索"></section>');
  drawMarchEvent();
};
const marchBaseBag = showMemories;
showMemories = function(filter) {
  marchBaseBag(filter);
  lifeContent.querySelectorAll('.bag-item[data-index="4"]').forEach(function(b) {
    const o = lifeScenes[4].objects[Number(b.dataset.item)];
    if(o.photos?.length) {
      const p = marchPhotos[o.photos[0]], icon = b.querySelector('svg');
      if(icon) icon.outerHTML = '<img class="march-bag-photo" src="' + p.src + '" alt="' + p.alt + '">';
    }
  });
};

document.body.insertAdjacentHTML('beforeend','<dialog id="march-photo-viewer" aria-labelledby="march-photo-caption"><header><span>三月 · 倒计时与小物</span><button data-mar-photo-close aria-label="关闭三月大图">×</button></header><figure><img id="march-full-photo" alt=""><figcaption id="march-photo-caption"></figcaption></figure><nav aria-label="三月照片翻页"><button data-mar-photo-step="-1">← 上一张</button><span id="march-photo-count"></span><button data-mar-photo-step="1">下一张 →</button></nav></dialog>');
const marchViewer = document.querySelector('#march-photo-viewer');
function viewMarchPhoto(i) {
  if(!marchPhotos[i]) return;
  marchViewedPhoto = i;
  const p = marchPhotos[i], img = document.querySelector('#march-full-photo');
  img.src = p.src; img.alt = p.alt;
  document.querySelector('#march-photo-caption').textContent = p.caption;
  document.querySelector('#march-photo-count').textContent = (i+1) + ' / ' + marchPhotos.length;
  marchViewer.querySelector('[data-mar-photo-step="-1"]').disabled = i === 0;
  marchViewer.querySelector('[data-mar-photo-step="1"]').disabled = i === marchPhotos.length-1;
  if(!marchViewer.open) marchViewer.showModal();
  marchViewer.scrollTop = 0;
}
function stepMarchPhoto(delta) {viewMarchPhoto(Math.max(0, Math.min(marchPhotos.length-1, marchViewedPhoto + delta)));}
document.addEventListener('click',function(e) {
  const phase = e.target.closest('[data-mar-phase]');
  if(phase) {marchPhase = Number(phase.dataset.marPhase); drawMarchAtlas(); stage.querySelector('[data-mar-phase="' + marchPhase + '"]').focus({preventScroll:true});}
  const voice = e.target.closest('[data-mar-voice]');
  if(voice) {marchVoice = Number(voice.dataset.marVoice); drawMarchVoice();}
  const step = e.target.closest('[data-mar-step]');
  if(step && !step.disabled && eventFocus?.c === 4) {
    const o = lifeScenes[4].objects[eventFocus.i], max = marchPages[o.kind].length-1;
    marchStep = Math.max(0, Math.min(max, Number(step.dataset.marStep)));
    drawMarchEvent();
    const host = lifeContent.querySelector('#march-event'); host.tabIndex = -1; host.focus({preventScroll:true}); host.scrollIntoView({behavior:'auto',block:'start'});
  }
  const photo = e.target.closest('[data-mar-photo]');
  if(photo) viewMarchPhoto(Number(photo.dataset.marPhoto));
  const photoStep = e.target.closest('[data-mar-photo-step]');
  if(photoStep && !photoStep.disabled) stepMarchPhoto(Number(photoStep.dataset.marPhotoStep));
  if(e.target.closest('[data-mar-photo-close]')) marchViewer.close();
});
marchViewer.addEventListener('click',function(e) {if(e.target === marchViewer) marchViewer.close();});
marchViewer.addEventListener('keydown',function(e) {if(e.key === 'ArrowLeft' || e.key === 'ArrowRight') {e.preventDefault(); stepMarchPhoto(e.key === 'ArrowLeft' ? -1 : 1);}});
updateGameHUD();
