/* February's selected photographs are local chapter assets. No chat export is bundled. */
let februaryVoice=0, februaryPhase=0, februaryStep=0, februaryViewedPhoto=0;
function februaryPhotoButton(i){const p=februaryPhotos[i];return '<button class="feb-photo" data-feb-photo="'+i+'" aria-label="放大照片：'+p.caption+'"><img src="'+p.src+'" alt="'+p.alt+'" loading="lazy"><span>↗ 查看原图</span></button>';}
function februaryReading(){return '<section class="feb-reading" aria-label="二月月度小结"><p class="eyebrow">2026.02 · 月度小结</p><h4>话还没有说完</h4><div class="feb-voice-switch" role="group" aria-label="二月叙述视角">'+februaryNarratives.map(function(v,i){return '<button data-feb-voice="'+i+'" aria-pressed="'+(februaryVoice===i)+'">'+v.name+'</button>';}).join('')+'</div><div id="feb-prose"></div></section>';}
function drawFebruaryVoice(){const host=stage.querySelector('#feb-prose');if(!host)return;const v=februaryNarratives[februaryVoice];host.innerHTML='<p class="feb-byline">'+v.subtitle+'</p><div class="diary-prose">'+v.paragraphs.map(function(p){return '<p>'+p+'</p>';}).join('')+'</div>';stage.querySelectorAll('[data-feb-voice]').forEach(function(b){b.setAttribute('aria-pressed',String(Number(b.dataset.febVoice)===februaryVoice));});}
function drawFebruaryAtlas(){const canvas=stage.querySelector('.scene-canvas');if(!canvas)return;const phase=februaryPhases[februaryPhase],p=februaryPhotos[phase.photo];canvas.className='scene-canvas feb-atlas';canvas.dataset.phase=februaryPhase;canvas.setAttribute('aria-label','二月的四段回忆');canvas.innerHTML='<div class="feb-atlas-heading"><p class="eyebrow">FEBRUARY · THE SENTENCE CONTINUES</p><h4>'+phase.heading+'</h4><p>'+phase.date+'</p></div><div class="feb-phase-tabs" role="group" aria-label="选择二月的回忆段落">'+februaryPhases.map(function(s,i){return '<button data-feb-phase="'+i+'" aria-pressed="'+(i===februaryPhase)+'"><small>0'+(i+1)+'</small>'+s.title+'<span>'+s.items.filter(function(n){return discovered(3,n);}).length+' / '+s.items.length+'</span></button>';}).join('')+'</div><div class="feb-phase-layout"><figure class="feb-phase-art">'+februaryPhotoButton(phase.photo)+'<figcaption>'+p.caption+'</figcaption></figure><div class="feb-object-list">'+phase.items.map(function(i){const o=lifeScenes[3].objects[i];return '<button class="feb-object-card'+(discovered(3,i)?' found':'')+'" data-game="object" data-index="3" data-item="'+i+'">'+lifeIcon(o.icon)+'<span><strong>'+o.name+'</strong><small>'+(discovered(3,i)?'✓ 已收好 · 再打开':'打开回忆 ↗')+'</small></span></button>';}).join('')+'</div></div><p class="feb-phase-note">'+phase.note+'</p>';}
const februaryBaseRender=renderGameChapter;
renderGameChapter=function(index,scroll){februaryBaseRender(index,scroll);if(index!==3)return;stage.querySelector('.life-chapter').classList.add('february-chapter');drawFebruaryAtlas();const reflection=stage.querySelector('.reflection-section'),diary=reflection.querySelector('.memory-diary');if(diary)diary.outerHTML=februaryReading();else{const locked=reflection.querySelector('.locked-diary');locked.insertAdjacentHTML('beforebegin',februaryReading());locked.textContent='十件回忆收齐后，再为这一月留下一种看法。';}reflection.querySelector('.reflection-heading').innerHTML='<span>这一月的手记</span><span>客观叙述 / 王孜视角</span>';drawFebruaryVoice();};

const februaryPages={
 'feb-call':[
  {date:'02.01 · 福冈',title:'朋友还没有醒',text:'她说，到了天神 Donki 的时候，王孜应该醒了。货架很长，消息先走在前面。',photos:[0]},
  {date:'02.01 · 54:50',title:'把货架带到屏幕这头',text:'视频接通后，两个人隔着屏幕挑了很久。等她回来，挑过的小东西就有了可以摆放的地方。',photos:[1]}
 ],
 'feb-answer':[
  {date:'二月 · 熟悉的酒吧',title:'先问一个还很远的问题',text:'年末到来年年初，能不能一起去日本？问题是她们一起问的，未来仍由各自的脚步去走。',photos:[6]},
  {date:'答案之书 · 夹页',title:'开心的结果',text:'书页给出四个字。它不替人安排明天，却让那晚的期待有了一张可以重新翻开的纸。',photos:[5]}
 ],
 'feb-ktv':[
  {date:'二月上旬 · KTV',title:'她先放了《Hug》',text:'秋露把自己喜欢的歌和画面放给王孜看。那时王孜还在门外，正认真地看。',photos:[]},
  {date:'下一支 MV · 《Love 119》',title:'看见的人，后来有了名字',text:'一首歌接着一首歌。后来王孜自己会找 RIIZE、会留意 Shotaro；喜欢从分享里开始，却长成了自己的。',photos:[]},
  {date:'回声',title:'旧照片也开始发亮',text:'到二月再翻去年九月的首尔照片，Mega Coffee 杯套上早有 RIIZE。她们当时经过了，却没有认出来。',photos:[27]}
 ],
 'feb-return':[
  {date:'福冈 · 临行前',title:'这碗饭不太合口味',text:'照片里是一碗牛肉饭。她在聊天里说，里面的生牛肉口感不喜欢；又约好回来要一起好好吃一顿。',photos:[2]},
  {date:'回家之后',title:'第一顿饭，还有小芝麻球',text:'伴手礼从行李里拿出来。秋露第一次见到王孜的蜜袋鼯，芝麻球躲在软软的窝里，和她们一起出现在饭桌旁。',photos:[4,1]}
 ],
 'feb-mega':[
  {date:'去年九月 · 首尔',title:'那时只是普通的杯套',text:'曾经从身边经过的东西，可能要等很久，才知道如何看它。',photos:[]},
  {date:'二月 · 重看',title:'原来早就在这里',text:'两个人再看那张照片，发现 Mega Coffee 杯套上是 RIIZE。她们笑着认出了当时全然不懂的自己。',photos:[27]}
 ],
 'feb-beads':[
  {date:'二月 · 一张桌子',title:'名字可以被拼出来',text:'Shotaro 和栗子扣被一点点拼成小颗粒，摆到饮品之间。',photos:[9]},
  {date:'这一刻',title:'喜欢又多了一种形状',text:'唱片和屏幕以外，还有手里这点耐心。',photos:[9]}
 ],
 'feb-bars':[
  {date:'第一间',title:'熟悉的地址，难喝的酒',text:'一间酒吧在王孜从前自习室旁边。地点很容易记住，酒的味道也是。',photos:[3]},
  {date:'后来常去的那间',title:'桌子认得她们',text:'两杯酒、一碟小食，后来又有虾、甜点和一次意外送来的 shot。她们不止一次坐回这里。',photos:[6,10,11,12]},
  {date:'回去，再换一家',title:'喜欢不必经过比较才算数',text:'试过别的地方，再回来时，仍然觉得这一间最合适。',photos:[14,15,17,18]}
 ],
 'feb-food':[
  {date:'久违的店',title:'记忆的味道偶尔会变',text:'管记米线好像不如以前。金茂商城的麻辣烫，则被阿姨加辣加得出乎意料。',photos:[7,8]},
  {date:'一张张菜单',title:'并非每餐都要惊艳',text:'蛋糕点过，五岳也去过；期待和实际之间，仍有一顿饭的时间。',photos:[13,16]},
  {date:'终于走进去',title:'路过变成了到过',text:'秋露之前常经过的那家店，两个人终于一起坐下。',photos:[19,20]}
 ],
 'feb-pierce':[
  {date:'二月 · 耳钉之后',title:'她陪我去了',text:'王孜去打耳骨钉和耳垂，秋露陪在身边。她是第一个陪王孜去做这件事的人。',photos:[]},
  {date:'走在路上',title:'两份豆皮',text:'从店里出来，两个人一人手里拿着一份豆皮。很小的画面，偏偏能把那天记得清楚。',photos:[21]}
 ],
 'feb-turn':[
  {date:'02.28 · 12:09',title:'“哪也不去。” “我也。”',text:'先把五一合上。她们说得干脆，像是这件事已经有了答案。',photos:[22]},
  {date:'02.28 · 13:19',title:'再看看机票呢？',text:'过了一个多小时，秋露开始翻四月底去首尔的机票。那句“不去”还在屏幕上，新的一页已经被打开。',photos:[23]},
  {date:'首尔 · 五月初',title:'一个日期，让路有了方向',text:'SMTR25 见面会的首尔场在五月二日至三日。这个消息此前就出现过，此刻和机票、五一假期接到了一起。',photos:[26]},
  {date:'同一天下午',title:'那就摇骰子',text:'“摇到什么都去。” 两个人把认真藏进玩笑，又把玩笑真的摇了一次。',photos:[24]},
  {date:'骰子停下',title:'“去。”',text:'那天还没有订票。先从“不去”走到“去”，剩下的行程，交给三月。',photos:[25]}
 ]
};
function drawFebruaryEvent(){if(eventFocus?.c!==3)return;const o=lifeScenes[3].objects[eventFocus.i],pages=februaryPages[o.kind],page=pages[februaryStep],host=lifeContent.querySelector('#feb-event');if(!host||!page)return;host.innerHTML='<p class="feb-event-count">'+String(februaryStep+1).padStart(2,'0')+' / '+String(pages.length).padStart(2,'0')+' · '+page.date+'</p><h3>'+page.title+'</h3><p class="feb-event-text">'+page.text+'</p>'+(page.photos.length?'<div class="feb-event-photos">'+page.photos.map(februaryPhotoButton).join('')+'</div>':'<div class="feb-song-mark" aria-hidden="true">♫　✦　♫</div>')+'<div class="feb-page-controls"><button data-feb-step="'+(februaryStep-1)+'" '+(februaryStep===0?'disabled':'')+'>← 上一页</button>'+(februaryStep<pages.length-1?'<button data-feb-step="'+(februaryStep+1)+'">继续翻页 →</button>':'<span>这一页，可以收好了。</span>')+'</div>';const ready=februaryStep===pages.length-1;eventSelection=ready?o.kind+'-read':null;lifeContent.querySelector('#collect-object').disabled=!ready;lifeContent.querySelector('#event-feedback').textContent=ready?'可以收进回忆背包了。':'再翻一页，看看这一段怎样走下去。';}
const februaryBaseOpen=openMemoryObject;
openMemoryObject=function(c,i,fromBag){if(!chapterCanEnter(c)||!lifeScenes[c]?.objects[i])return;februaryBaseOpen(c,i,fromBag);if(c!==3||!lifeModal.open)return;februaryStep=0;lifeContent.querySelector('.event-story').insertAdjacentHTML('afterend','<section id="feb-event" aria-label="二月回忆探索"></section>');drawFebruaryEvent();};
const februaryBaseBag=showMemories;
showMemories=function(filter){februaryBaseBag(filter);lifeContent.querySelectorAll('.bag-item[data-index="3"]').forEach(function(b){const o=lifeScenes[3].objects[Number(b.dataset.item)];if(o.photos?.length){const p=februaryPhotos[o.photos[0]],icon=b.querySelector('svg');if(icon)icon.outerHTML='<img class="feb-bag-photo" src="'+p.src+'" alt="'+p.alt+'">';}});};
document.body.insertAdjacentHTML('beforeend','<dialog id="feb-photo-viewer" aria-labelledby="feb-photo-caption"><header><span>二月 · 小小相册</span><button data-feb-photo-close aria-label="关闭二月大图">×</button></header><figure><img id="feb-full-photo" alt=""><figcaption id="feb-photo-caption"></figcaption></figure><nav aria-label="二月照片翻页"><button data-feb-photo-step="-1">← 上一张</button><span id="feb-photo-count"></span><button data-feb-photo-step="1">下一张 →</button></nav></dialog>');
const februaryViewer=document.querySelector('#feb-photo-viewer');
const februaryAlbumOrder=[0,1,2,4,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,26,24,25,27];
function viewFebruaryPhoto(i){if(!februaryPhotos[i])return;februaryViewedPhoto=i;const p=februaryPhotos[i],n=februaryAlbumOrder.indexOf(i),img=document.querySelector('#feb-full-photo');img.src=p.src;img.alt=p.alt;document.querySelector('#feb-photo-caption').textContent=p.caption;document.querySelector('#feb-photo-count').textContent=(n+1)+' / '+februaryPhotos.length;februaryViewer.querySelector('[data-feb-photo-step="-1"]').disabled=n===0;februaryViewer.querySelector('[data-feb-photo-step="1"]').disabled=n===februaryAlbumOrder.length-1;if(!februaryViewer.open)februaryViewer.showModal();februaryViewer.scrollTop=0;}
function stepFebruaryPhoto(delta){const n=februaryAlbumOrder.indexOf(februaryViewedPhoto);viewFebruaryPhoto(februaryAlbumOrder[Math.max(0,Math.min(februaryAlbumOrder.length-1,n+delta))]);}
document.addEventListener('click',function(e){const phase=e.target.closest('[data-feb-phase]');if(phase){februaryPhase=Number(phase.dataset.febPhase);drawFebruaryAtlas();stage.querySelector('[data-feb-phase="'+februaryPhase+'"]').focus({preventScroll:true});}const voice=e.target.closest('[data-feb-voice]');if(voice){februaryVoice=Number(voice.dataset.febVoice);drawFebruaryVoice();}const step=e.target.closest('[data-feb-step]');if(step&&!step.disabled&&eventFocus?.c===3){const o=lifeScenes[3].objects[eventFocus.i],max=februaryPages[o.kind].length-1;februaryStep=Math.max(0,Math.min(max,Number(step.dataset.febStep)));drawFebruaryEvent();const host=lifeContent.querySelector('#feb-event');host.tabIndex=-1;host.focus({preventScroll:true});host.scrollIntoView({behavior:'auto',block:'start'});}const photo=e.target.closest('[data-feb-photo]');if(photo)viewFebruaryPhoto(Number(photo.dataset.febPhoto));const photoStep=e.target.closest('[data-feb-photo-step]');if(photoStep&&!photoStep.disabled)stepFebruaryPhoto(Number(photoStep.dataset.febPhotoStep));if(e.target.closest('[data-feb-photo-close]'))februaryViewer.close();});
februaryViewer.addEventListener('click',function(e){if(e.target===februaryViewer)februaryViewer.close();});
februaryViewer.addEventListener('keydown',function(e){if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();stepFebruaryPhoto(e.key==='ArrowLeft'?-1:1);}});
updateGameHUD();
