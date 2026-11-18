let decemberVoice = 0;
let decemberStep = 0;
let decemberViewedPhoto = 0;
function decemberPhotoButton(i) {
  const p = decemberPhotos[i];
  return '<button class="dec-photo" data-dec-photo="'+i+'" aria-label="放大：'+p.caption+'"><img src="'+p.src+'" alt="'+p.alt+'" loading="lazy"></button>';
}
function decemberReading() {
  return '<section class="dec-reading" aria-label="十二月月度小结"><p class="eyebrow">2025.12 · 月度小结</p><h4>日子在这一页转弯</h4><div class="dec-voice-switch" role="group" aria-label="十二月叙述视角">'+decemberNarratives.map(function(v,i){return '<button data-dec-voice="'+i+'" aria-pressed="'+(decemberVoice===i)+'">'+(i===0?'◌ ':'✎ ')+v.name+'</button>';}).join('')+'</div><div id="dec-prose"></div></section>';
}
function drawDecemberVoice() {
  const prose = stage.querySelector('#dec-prose'); if (!prose) return;
  const voice = decemberNarratives[decemberVoice];
  prose.innerHTML = '<p class="dec-byline">'+voice.subtitle+'</p><div class="diary-prose">'+voice.paragraphs.map(function(p){return '<p>'+p+'</p>';}).join('')+'</div>';
  stage.querySelectorAll('[data-dec-voice]').forEach(function(b){b.setAttribute('aria-pressed',String(Number(b.dataset.decVoice)===decemberVoice));});
}
function drawDecemberDesk() {
  const canvas = stage.querySelector('.scene-canvas');
  canvas.className = 'scene-canvas dec-memory-desk';
  canvas.setAttribute('aria-label','十二月书桌，三段回忆与三件页边小物');
  const artwork = [
    '<span class="dec-ticket-art"><small>一张出发便签</small><strong>去云南</strong><em>12.16 · 买了</em></span>',
    '<span class="dec-study-art"><span></span><small>DECEMBER</small><strong>31</strong><em>考完，就出发</em></span>',
    '<span class="dec-hair-art"><span>୨୧</span><small>黑发的最后一天</small><strong>明年见。</strong><em>2025 → 2026</em></span>'
  ];
  canvas.innerHTML = '<div class="dec-desk-top"><span class="eyebrow">ON THE LAST PAGE OF THE YEAR</span><span>12 / 2025</span></div><div class="dec-desk-heading"><h4>这一页，还有一点没背完。</h4><p>下一页，已经有了想去的地方。</p></div><div class="dec-main-cards">'+[3,4,5].map(function(i,j){const o=lifeScenes[1].objects[i];return '<button class="dec-memory-card" data-game="object" data-index="1" data-item="'+i+'" aria-label="探索：'+o.name+'"><span class="dec-card-art">'+artwork[j]+'</span><span class="dec-card-foot"><strong>'+o.name+'</strong><small>'+(discovered(1,i)?'✓ 已收藏 · 可以重看':'打开这段回忆 ↗')+'</small></span></button>';}).join('')+'</div><p class="dec-margin-note">页边小物 · 给日常留一点余地</p><div class="dec-margin-items">'+[0,1,2].map(function(i){const o=lifeScenes[1].objects[i];return '<button data-game="object" data-index="1" data-item="'+i+'" aria-label="探索：'+o.name+'">'+lifeIcon(o.icon)+'<span>'+o.name+'</span><small>'+(discovered(1,i)?'✓ 已收藏':'意象 · 点此收藏')+'</small></button>';}).join('')+'</div>';
}
const decemberBaseRender = renderGameChapter;
renderGameChapter = function(index,scroll) {
  decemberBaseRender(index,scroll);
  if (index!==1) return;
  stage.querySelector('.life-chapter').classList.add('december-chapter');
  drawDecemberDesk();
  const reflection=stage.querySelector('.reflection-section'), diary=reflection.querySelector('.memory-diary');
  if (diary) diary.outerHTML=decemberReading();
  else {
    const locked=reflection.querySelector('.locked-diary');
    locked.insertAdjacentHTML('beforebegin',decemberReading());
    locked.textContent='收好六件回忆，就可以留下本月的选择，翻向一月。';
  }
  reflection.querySelector('.reflection-heading').innerHTML='<span>这一月的手记</span><span>两个视角 · 同一个十二月</span>';
  const next = reflection.querySelector('.next-button');
  next.querySelector('span').textContent='翻向一月 · 新的一页，新的一种颜色';
  next.parentElement.classList.add('dec-bridge');
  drawDecemberVoice();
};
function drawDecemberEvent() {
  if (!eventFocus || eventFocus.c!==1) return;
  const obj=lifeScenes[1].objects[eventFocus.i], host=lifeContent.querySelector('#dec-event');
  if (!host) return;
  const collect=lifeContent.querySelector('#collect-object');
  let body='';
  if (obj.kind==='dec-ticket') {
    const entry=decemberTicketSteps[decemberStep];
    body='<div class="dec-sequence-header"><span>从一个想法，到一个日期</span><span>'+(decemberStep+1)+' / 3</span></div><article class="dec-ticket-slip"><small>'+entry.date+'</small><strong>'+entry.title+'</strong><p>'+entry.body+'</p><p>'+entry.note+'</p>'+(decemberStep===2?'<span class="dec-stamp">出发日期，已收好</span>':'')+'</article>';
  }
  if (obj.kind==='dec-study') {
    body='<div class="dec-sequence-header"><span>12.30 — 12.31 · 备考小剧场</span><span>'+(decemberStep+1)+' / 3</span></div>';
    if (decemberStep===0) body+='<div class="dec-photo-stack">'+decemberPhotoButton(0)+'</div><p class="dec-photo-caption">12.30 · 图书馆。点照片可以放大。</p><div class="dec-transcript"><span>王孜当时回</span><blockquote>加油加油小姐姐</blockquote></div>';
    if (decemberStep>=1) body+='<div class="dec-continuation" aria-label="连续三张：明天考试、记不住、手臂笔记">'+[1,2,3].map(decemberPhotoButton).join('')+'</div><p class="dec-photo-caption">从“明天考试”翻到临考前，紧接着是这张笔记。三张按原来的顺序放在一起；点任一张可放大。</p>';
    if (decemberStep===2) body+='<div class="dec-transcript dec-afterword"><span>12.31 · 15:35 以后 / 聊天原句</span><p><b>王孜</b>「小炒刺青」</p><p><b>秋露</b>「记了四个考到一个」</p><hr><p>后来，话题转到了天津的相声、大麻花和晚饭。这个下午总算往下走了。</p></div>';
  }
  if (obj.kind==='dec-hair') {
    body='<div class="dec-photo-stack">'+decemberPhotoButton(4)+'</div><p class="dec-photo-caption">这条消息发在 12 月 31 日中午，比“记不住”稍早。把它留在这里，作一月的书签。</p><div class="dec-hair-note'+(decemberStep?' turned':'')+'"><small>翻面，看看消息另一端</small>'+(decemberStep?'<p>王孜回：「期待！！！」</p><span>来年一月 · 新头发，云南，尚待出发的福冈。</span>':'<button class="secondary-button" data-dec-step="1">翻过跨年便签 ↗</button>')+'</div>';
  }
  const finalStep=obj.kind==='dec-hair'?1:2;
  if(obj.kind!=='dec-hair') body+='<div class="dec-sequence-controls"><button class="text-button" data-dec-step="'+(decemberStep-1)+'" '+(decemberStep===0?'disabled':'')+'>← 上一页</button>'+(decemberStep<finalStep?'<button class="secondary-button" data-dec-step="'+(decemberStep+1)+'">'+(obj.kind==='dec-study'?(decemberStep===0?'接着看 · 连续三张 →':'翻到考后 · 看她怎么说 →'):'翻下一张便签 →')+'</button>':'<span>这一段，收好了。</span>')+'</div>';
  host.innerHTML=body;
  eventSelection=decemberStep===finalStep ? obj.kind+'-read' : null;
  collect.disabled=eventSelection===null;
  lifeContent.querySelector('#event-feedback').textContent=eventSelection!==null?'可以把这段回忆收进背包了。':'';
}
const decemberBaseOpen = openMemoryObject;
openMemoryObject = function(c,i,fromBag) {
  decemberBaseOpen(c,i,fromBag);
  if(c!==1 || !lifeModal.open || !lifeScenes[c]?.objects[i]?.kind?.startsWith('dec-')) return;
  decemberStep=0;
  lifeContent.querySelector('.event-story').insertAdjacentHTML('afterend','<section id="dec-event" aria-label="十二月回忆翻页"></section>');
  drawDecemberEvent();
};
const decemberBaseBag = showMemories;
showMemories = function(filter) {
  decemberBaseBag(filter);
  lifeContent.querySelectorAll('.bag-item[data-index="1"]').forEach(function(button){
    const obj=lifeScenes[1].objects[Number(button.dataset.item)];
    if(obj.photos){const p=decemberPhotos[obj.photos[0]],icon=button.querySelector('svg');if(icon)icon.outerHTML='<img class="dec-bag-photo" src="'+p.src+'" alt="'+p.alt+'">';}
  });
};
document.body.insertAdjacentHTML('beforeend','<dialog id="dec-photo-viewer" aria-labelledby="dec-photo-caption"><header><span>十二月 · 回忆连页</span><button data-dec-photo-close aria-label="关闭十二月大图">×</button></header><figure><img id="dec-full-photo" alt=""><figcaption id="dec-photo-caption"></figcaption></figure><nav aria-label="十二月照片翻页"><button data-dec-photo-step="-1">← 上一张</button><span id="dec-photo-count"></span><button data-dec-photo-step="1">下一张 →</button></nav></dialog>');
const decemberViewer=document.querySelector('#dec-photo-viewer');
function viewDecemberPhoto(i) {
  decemberViewedPhoto=Math.max(0,Math.min(decemberPhotos.length-1,i));
  const p=decemberPhotos[decemberViewedPhoto], img=document.querySelector('#dec-full-photo');img.src=p.src;img.alt=p.alt;
  document.querySelector('#dec-photo-caption').textContent=p.caption;
  document.querySelector('#dec-photo-count').textContent=(decemberViewedPhoto+1)+' / '+decemberPhotos.length;
  decemberViewer.querySelector('[data-dec-photo-step="-1"]').disabled=decemberViewedPhoto===0;
  decemberViewer.querySelector('[data-dec-photo-step="1"]').disabled=decemberViewedPhoto===decemberPhotos.length-1;
  if(!decemberViewer.open)decemberViewer.showModal();
  decemberViewer.scrollTop=0;
}
document.addEventListener('click',function(event){
  const voice=event.target.closest('[data-dec-voice]');if(voice){decemberVoice=Number(voice.dataset.decVoice);drawDecemberVoice();}
  const step=event.target.closest('[data-dec-step]');
  if(step&&!step.disabled&&eventFocus?.c===1){
    const kind=lifeScenes[1].objects[eventFocus.i].kind, max=kind==='dec-hair'?1:2;
    decemberStep=Math.max(0,Math.min(max,Number(step.dataset.decStep)));
    drawDecemberEvent();
    const destination=lifeContent.querySelector(kind==='dec-study'&&decemberStep===2?'.dec-afterword':kind==='dec-hair'?'.dec-hair-note':'#dec-event');
    destination.tabIndex=-1;
    destination.focus({preventScroll:true});
    destination.scrollIntoView({behavior:'auto',block:'start'});
  }
  const photo=event.target.closest('[data-dec-photo]');if(photo)viewDecemberPhoto(Number(photo.dataset.decPhoto));
  const photoStep=event.target.closest('[data-dec-photo-step]');if(photoStep&&!photoStep.disabled)viewDecemberPhoto(decemberViewedPhoto+Number(photoStep.dataset.decPhotoStep));
  if(event.target.closest('[data-dec-photo-close]'))decemberViewer.close();
});
decemberViewer.addEventListener('click',function(e){if(e.target===decemberViewer)decemberViewer.close();});
decemberViewer.addEventListener('keydown',function(e){if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();viewDecemberPhoto(decemberViewedPhoto+(e.key==='ArrowLeft'?-1:1));}});
updateGameHUD();
