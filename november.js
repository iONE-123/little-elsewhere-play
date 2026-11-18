let novemberPhase = 0;
let novemberVoice = 0;
let viewedPhoto = 0;
const baseLifeIcon = lifeIcon;
lifeIcon = function(name) {
  const paths = {
    sim: '<path d="M28 10h29l15 16v59H24V10Z"/><rect x="34" y="37" width="28" height="32" rx="4"/><path d="M43 37v32m10-32v32M34 48h28m-28 10h28"/>',
    castle: '<path d="M14 80V40h18v40m32 0V40h18v40M10 40l13-21 13 21m24 0 13-21 13 21M34 80V30h28v50M30 30 48 7l18 23M42 80V61a6 6 0 0 1 12 0v19M18 81h60M44 41h8"/>',
    award: '<path d="m48 8 8 18 20 2-15 14 4 20-17-10-17 10 4-20-15-14 20-2ZM48 54v22M34 78h28M28 85h40"/>'
  };
  return paths[name] ? '<svg viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths[name]+'</svg>' : baseLifeIcon(name);
};
function novemberPhotoButton(i, className) {
  const photo=novemberPhotos[i];
  return '<button class="nov-photo '+(className||'')+(photo.tall?' tall-photo':'')+'" data-nov-photo="'+i+'" aria-label="放大：'+photo.caption+'"><img src="'+photo.src+'" alt="'+photo.alt+'" loading="lazy"><span>'+photo.caption+' <b aria-hidden="true">↗</b></span></button>';
}
function novemberReading() {
  return '<section class="nov-reading" aria-label="十一月月度小结"><p class="eyebrow">2025.11 · 月度小结</p><h4>十一月的两种天气</h4><div class="nov-voice-switch" role="group" aria-label="选择叙述视角">'+novemberNarratives.map(function(voice,i){return '<button data-nov-voice="'+i+'" aria-pressed="'+(novemberVoice===i)+'">'+(i===0?'◌':'✎')+' '+voice.name+'</button>';}).join('')+'</div><div id="nov-prose"></div></section>';
}
function drawNovemberVoice() {
  const panel=stage.querySelector('#nov-prose');if(!panel)return;
  const voice=novemberNarratives[novemberVoice];
  panel.innerHTML='<p class="nov-byline">'+voice.subtitle+'</p><div class="diary-prose">'+voice.paragraphs.map(function(p,i){return '<p>'+p+'</p>'+(novemberVoice===1&&i===1?'<figure class="nov-inline-photo">'+novemberPhotoButton(3)+'<figcaption>一张反复查看的机票，夹在消息与消息之间。</figcaption></figure>':'');}).join('')+'</div>';
  stage.querySelectorAll('[data-nov-voice]').forEach(function(b){b.setAttribute('aria-pressed',String(Number(b.dataset.novVoice)===novemberVoice));});
}
function drawNovemberScene() {
  const canvas=stage.querySelector('.scene-canvas');if(!canvas)return;
  const phase=novemberPhases[novemberPhase];
  canvas.className='scene-canvas nov-memory-table nov-'+phase.theme;
  canvas.setAttribute('aria-label','十一月记忆桌：'+phase.label);
  canvas.innerHTML='<div class="nov-scene-top"><span class="eyebrow">A MONTH IN THREE SCENES</span><span class="nov-page-mark">11 / 2025</span></div><nav class="nov-phase-nav" aria-label="十一月的三个场景">'+novemberPhases.map(function(p,i){const n=p.objects.filter(function(j){return discovered(0,j);}).length;return '<button data-nov-phase="'+i+'" aria-pressed="'+(i===novemberPhase)+'"><span>0'+(i+1)+'</span>'+p.label+'<small>'+n+' / '+p.objects.length+'</small></button>';}).join('')+'</nav><div class="nov-phase-heading"><p>'+phase.title+'</p><span>'+phase.note+'</span></div><div class="nov-scene-cards">'+phase.objects.map(function(i){const o=lifeScenes[0].objects[i];const photo=o.photos&&novemberPhotos[o.photos[0]];let art=photo?'<img src="'+photo.src+'" alt="'+photo.alt+'">':lifeIcon(o.icon);if(i===1)art='<span class="nov-plan-letter"><small>来年一月</small><strong>云南<br>日本</strong><em>待出发的日子</em></span>';if(i===6)art='<span class="nov-mama-ticket"><small>HONG KONG · NOV 2025</small><strong>MAMA</strong><em>AWARDS</em><span>✧</span></span>';return '<button class="nov-memory-card nov-card-'+i+'" data-game="object" data-index="0" data-item="'+i+'" aria-label="探索：'+o.name+'"><span class="nov-card-art">'+art+'</span><span class="nov-card-foot"><strong>'+o.name+'</strong><small>'+(discovered(0,i)?'✓ 已收藏':'点开这份回忆 ↗')+'</small></span></button>';}).join('')+'</div><div class="nov-scene-bottom"><span>这一月，有期待，也有后来。</span><button class="text-button" data-nov-phase="'+((novemberPhase+1)%3)+'">'+(novemberPhase===2?'回到月初 ↶':'走到'+novemberPhases[novemberPhase+1].label+' →')+'</button></div>';
}
const baseRenderGameChapter=renderGameChapter;
renderGameChapter=function(index,scroll){
  baseRenderGameChapter(index,scroll);
  if(index!==0)return;
  stage.querySelector('.life-chapter').classList.add('november-chapter');
  drawNovemberScene();
  const reflection=stage.querySelector('.reflection-section');
  const diary=reflection.querySelector('.memory-diary');
  // The confirmed summary is readable while the seven collectible objects still gate new completion.
  if(diary)diary.outerHTML=novemberReading();
  else {
    const locked=reflection.querySelector('.locked-diary');
    locked.insertAdjacentHTML('beforebegin',novemberReading());
    locked.textContent='收齐七件回忆后，可以为这一月留下选择，领取纪念章。';
  }
  reflection.querySelector('.reflection-heading').innerHTML='<span>这一月的手记</span><span>两个视角 · 同一个十一月</span>';
  drawNovemberVoice();
};
const baseOpenMemoryObject=openMemoryObject;
openMemoryObject=function(c,i,fromBag){
  baseOpenMemoryObject(c,i,fromBag);
  if(c!==0||!lifeModal.open)return;
  const obj=lifeScenes[0].objects[i];
  if(obj.photos)lifeContent.querySelector('.event-story').insertAdjacentHTML('afterend','<div class="nov-event-photos '+(obj.photos.length===1?'single':'')+'">'+obj.photos.map(function(p){return novemberPhotoButton(p);}).join('')+'</div>');
  if(obj.kind==='stage'){
    lifeContent.querySelector('.event-story').insertAdjacentHTML('afterend','<div class="nov-awards-stage"><span class="nov-stage-light"></span><small>HONG KONG · NOVEMBER 2025</small><strong>MAMA</strong><em>AWARDS</em><button class="secondary-button" data-nov-light>点亮舞台 ✧</button></div>');
  }
};
const baseShowMemories=showMemories;
showMemories=function(filter){
  baseShowMemories(filter);
  lifeContent.querySelectorAll('.bag-item[data-index="0"]').forEach(function(button){const obj=lifeScenes[0].objects[Number(button.dataset.item)];if(obj.photos){const p=novemberPhotos[obj.photos[0]];button.querySelector('svg').outerHTML='<img class="nov-bag-photo" src="'+p.src+'" alt="'+p.alt+'">';}});
};
document.body.insertAdjacentHTML('beforeend','<dialog id="nov-photo-viewer" aria-labelledby="nov-photo-caption"><header><span>十一月 · 回忆相册</span><button data-nov-close-photo aria-label="关闭大图">×</button></header><figure><img id="nov-full-photo" alt=""><figcaption id="nov-photo-caption"></figcaption></figure><nav aria-label="照片翻页"><button data-nov-photo-step="-1">← 上一张</button><span id="nov-photo-index"></span><button data-nov-photo-step="1">下一张 →</button></nav></dialog>');
const novemberViewer=document.querySelector('#nov-photo-viewer');
function viewNovemberPhoto(i){
  viewedPhoto=(i+novemberPhotos.length)%novemberPhotos.length;const p=novemberPhotos[viewedPhoto];
  const img=document.querySelector('#nov-full-photo');img.src=p.src;img.alt=p.alt;
  document.querySelector('#nov-photo-caption').textContent=p.caption;
  document.querySelector('#nov-photo-index').textContent=(viewedPhoto+1)+' / '+novemberPhotos.length;
  if(!novemberViewer.open)novemberViewer.showModal();
  novemberViewer.scrollTop=0;
}
document.addEventListener('click',function(event){
  const phase=event.target.closest('[data-nov-phase]');if(phase){novemberPhase=Number(phase.dataset.novPhase);drawNovemberScene();stage.querySelector('[data-nov-phase="'+novemberPhase+'"]').focus({preventScroll:true});}
  const voice=event.target.closest('[data-nov-voice]');if(voice){novemberVoice=Number(voice.dataset.novVoice);drawNovemberVoice();}
  const photo=event.target.closest('[data-nov-photo]');if(photo)viewNovemberPhoto(Number(photo.dataset.novPhoto));
  const step=event.target.closest('[data-nov-photo-step]');if(step)viewNovemberPhoto(viewedPhoto+Number(step.dataset.novPhotoStep));
  if(event.target.closest('[data-nov-close-photo]'))novemberViewer.close();
  const light=event.target.closest('[data-nov-light]');if(light){light.closest('.nov-awards-stage').classList.add('lit');light.textContent='舞台已经亮起 ✧';light.disabled=true;eventSelection='stage-lit';document.querySelector('#collect-object').disabled=false;document.querySelector('#event-feedback').textContent='把这一束光留在回忆里。';}
});
novemberViewer.addEventListener('click',function(e){if(e.target===novemberViewer)novemberViewer.close();});
novemberViewer.addEventListener('keydown',function(e){if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();viewNovemberPhoto(viewedPhoto+(e.key==='ArrowLeft'?-1:1));}});
updateGameHUD();
