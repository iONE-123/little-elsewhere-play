let januaryVoice=0, januaryPhase=0, januaryStep=0, januarySnow=[false,false], januaryViewedPhoto=0;
let januaryStageLook='then', januaryStageSeen=false;
function januaryPhotoButton(i){const p=januaryPhotos[i];return '<button class="jan-photo" data-jan-photo="'+i+'" aria-label="放大：'+p.caption+'"><img src="'+p.src+'" alt="'+p.alt+'" loading="lazy"></button>';}
function januaryQuote(label,text){return '<div class="jan-quote"><small>'+label+'</small><p>'+text+'</p></div>';}
function januaryReading(){return '<section class="jan-reading" aria-label="一月月度小结"><p class="eyebrow">2026.01 · 月度小结</p><h4>终于，可以慢慢逛了</h4><div class="jan-voice-switch" role="group" aria-label="一月叙述视角">'+januaryNarratives.map(function(v,i){return '<button data-jan-voice="'+i+'" aria-pressed="'+(januaryVoice===i)+'">'+(i===0?'◌ ':'✎ ')+v.name+'</button>';}).join('')+'</div><div id="jan-prose"></div></section>';}
function drawJanuaryVoice(){const host=stage.querySelector('#jan-prose');if(!host)return;const v=januaryNarratives[januaryVoice];host.innerHTML='<p class="jan-byline">'+v.subtitle+'</p><div class="diary-prose">'+v.paragraphs.map(function(p){return '<p>'+p+'</p>';}).join('')+'</div>';stage.querySelectorAll('[data-jan-voice]').forEach(function(b){b.setAttribute('aria-pressed',String(Number(b.dataset.janVoice)===januaryVoice));});}
function drawJanuaryAtlas(){
  const canvas=stage.querySelector('.scene-canvas');if(!canvas)return;
  const phase=januaryPhases[januaryPhase],p=januaryPhotos[phase.photo];
  canvas.className='scene-canvas jan-atlas';canvas.dataset.phase=januaryPhase;canvas.setAttribute('aria-label','一月的四段回忆');
  canvas.innerHTML='<div class="jan-atlas-heading"><p class="eyebrow">JANUARY · A MONTH IN SMALL THINGS</p><h4>'+phase.heading+'</h4><p>'+phase.date+'</p></div><div class="jan-phase-tabs" role="group" aria-label="选择一月的回忆段落">'+januaryPhases.map(function(s,i){return '<button data-jan-phase="'+i+'" aria-pressed="'+(i===januaryPhase)+'"><small>0'+(i+1)+'</small>'+s.title+'<span>'+s.items.filter(function(n){return discovered(2,n);}).length+' / '+s.items.length+'</span></button>';}).join('')+'</div><div class="jan-phase-layout"><figure class="jan-phase-art">'+januaryPhotoButton(phase.photo)+'<figcaption>'+p.caption+'</figcaption></figure><div class="jan-object-list">'+phase.items.map(function(i){const o=lifeScenes[2].objects[i];return '<button class="jan-object-card'+(discovered(2,i)?' found':'')+'" data-game="object" data-index="2" data-item="'+i+'">'+lifeIcon(o.icon)+'<span><strong>'+o.name+'</strong><small>'+(discovered(2,i)?'✓ 已收好 · 再打开':'打开回忆 ↗')+'</small></span></button>';}).join('')+'</div></div><p class="jan-phase-note">'+phase.note+'</p>';
}
const januaryBaseRender=renderGameChapter;
renderGameChapter=function(index,scroll){
  januaryBaseRender(index,scroll);if(index!==2)return;
  stage.querySelector('.life-chapter').classList.add('january-chapter');drawJanuaryAtlas();
  const reflection=stage.querySelector('.reflection-section'),diary=reflection.querySelector('.memory-diary');
  if(diary)diary.outerHTML=januaryReading();else{const locked=reflection.querySelector('.locked-diary');locked.insertAdjacentHTML('beforebegin',januaryReading());locked.textContent='收好四段日子里的十件回忆，再为一月留下一种看法。';}
  reflection.querySelector('.reflection-heading').innerHTML='<span>这一月的手记</span><span>客观叙述 / 王孜视角</span>';
  reflection.querySelector('.next-button span').textContent='把这一页翻到二月';drawJanuaryVoice();
};
function januaryEcho(final){return '<aside class="jan-echo" aria-label="一月愿望与答案之书的呼应">'+januaryPhotoButton(16)+'<div><p class="eyebrow">01.30 · 那句登机之前</p><p>'+(final?'还记得这一句吗？一月，她们把年末的愿望说给彼此；二月，又把它问给一本书。走到这一页，愿望仍可以向前。':'在问这本书之前，这个愿望已经在一月的登机口，被两个人各说了一遍。')+'</p><small>点开原图，再读一遍那时的话。</small></div></aside>';}
function syncJanuaryEnding(){const page=document.querySelector('#answer-modal .answer-page');if(!page)return;const old=page.querySelector('.jan-echo');if(discovered(2,1)&&!old)page.querySelector('.answer-afterword').insertAdjacentHTML('afterend',januaryEcho(true));else if(!discovered(2,1)&&old)old.remove();}
const januaryBaseHUD=updateGameHUD;
updateGameHUD=function(){januaryBaseHUD();syncJanuaryEnding();};

function drawJanuaryEvent(){
  if(eventFocus?.c!==2)return;
  const o=lifeScenes[2].objects[eventFocus.i],host=lifeContent.querySelector('#jan-event');if(!host)return;
  let body='',ready=false;
  if(o.kind==='palette'){
    body='<div class="jan-album-hero">'+januaryPhotoButton(2)+'</div><p class="jan-caption">王孜想多看一会儿的那张。光从头顶落下来，发丝细细亮着，身后的石壁愈发安静。</p><div class="jan-photo-grid">'+[0,1,3].map(januaryPhotoButton).join('')+'</div>'+januaryQuote('01.01 · 聊天里的新发色','“冷棕。” “还是拍不出来。” “现实中比拍出来好看。”');
    host.innerHTML=body;lifeContent.querySelector('.challenge-instruction').textContent='给云南相册选一枚衬纸颜色。她的新发色是冷棕，下面选的是相册的颜色。';return;
  }
  if(o.kind==='jan-erkuai'){
    body='<div class="jan-pair">'+[4,5].map(januaryPhotoButton).join('')+'</div>'+januaryQuote('01.05 → 01.06 · 早餐还想继续','“我决定明天早上还吃烧饵块。”<br>“今天吃的紫米皮的烧饵块。”')+'<div class="jan-reveal">'+(januaryStep?'<p>后来她又说，家里的卷馍更好吃。如果卷馍的皮能换成饵块那种“qq糯糯的口感”，“就无敌了”。</p><small>旅行回来之前，已经想好一种新的吃法了。</small>':'<p>被她说得有点馋了。但她还有一句补充——</p><button class="secondary-button" data-jan-step="1">听完这份认真食评 →</button>')+'</div>';ready=januaryStep===1;
  }
  if(o.kind==='jan-emoji'){
    body='<div class="jan-continuation">'+januaryPhotoButton(6)+(januaryStep?januaryPhotoButton(7):'')+'</div><div class="jan-reveal">'+(januaryStep?'<p>话暂时用完了，表情还够。<br>这一页的快乐，读到这里就懂了。</p>':'<button class="secondary-button" data-jan-step="1">接着往下看 ↓</button>')+'</div>';ready=januaryStep===1;
  }
  if(o.kind==='jan-snow'){
    body='<div class="jan-snow-windows">'+[8,9].map(function(n,i){return '<section class="jan-snow-window"><p class="jan-kicker">'+(i===0?'01.19 · 她在家里':'01.20 · 王孜在上海')+'</p>'+(januarySnow[i]?januaryPhotoButton(n):'<button class="secondary-button" data-jan-snow="'+i+'">打开这扇窗 ↗</button>')+'<p>'+(januarySnow[i]?(i===0?'“今天下雪。”':'“我靠上海下雪了。”'):'这一边的冬天，等你打开。')+'</p></section>';}).join('')+'</div>';
    ready=januarySnow.every(Boolean);if(ready)body+='<div class="jan-reveal"><p>一边的雪已经落稳，一边还在灯下慢慢飘。两张照片之间隔着路程，也隔着一夜；说给对方听的时候，冬天就有了另一扇窗。</p></div>';
  }
  if(o.kind==='jan-pouch'){
    body=januaryPhotoButton(10)+'<div class="jan-reveal">'+(januaryStep?januaryQuote('01.28 · 秋露','“要带的很少。”<br>“带回来的多不多就不知道了。”')+'<p>封口拉好了。留一点地方，给还没遇见的小东西。</p>':'<p>小熊、甜点和粉色封口。东西收好了，行李里还有一点余地。</p><button class="secondary-button" data-jan-step="1">拉好封口，听她补一句 →</button>')+'</div>';ready=januaryStep===1;
  }
  if(o.kind==='jan-flight'){
    const p=januaryFlightPages[januaryStep];body='<article class="jan-ticket"><p class="jan-kicker">'+p.date+'</p><h4>'+p.title+'</h4>'+p.paragraphs.map(function(s){return '<p>'+s+'</p>';}).join('')+'</article>'+(januaryStep===1?januaryPhotoButton(16):'');ready=januaryStep===2;
  }
  if(o.kind==='jan-evening'){
    if(januaryStep===0)body=januaryPhotoButton(13)+januaryQuote('01.30 · 18:14 / 18:19','“明太子好难吃。”<br>“但是这个牛肉品质真不错。”<br>“牛肉真香。”')+'<p class="jan-caption">一顿饭里，喜欢与不喜欢各自分得清楚。下一站，去便利店。</p>';
    if(januaryStep===1)body=januaryPhotoButton(14)+januaryQuote('01.30 · 19:14','“一个特别好吃一个特别好喝。”')+'<p class="jan-caption">桌上多了一杯布丁和一罐饮品。今晚又找到两样喜欢的东西。</p>';
    if(januaryStep===2)body='<article class="jan-night-card"><div class="jan-steam" aria-hidden="true"><i></i><i></i><i></i></div><p class="jan-kicker">01.30 · 21:29 以后</p><h4>泡完汤泉，有一点困了。</h4>'+januaryQuote('秋露 · 聊天原句','“好舒服。”<br>“等下在自动贩卖机买个冰饮料。”<br>“泡的好困。”')+'<p>先前一直悬着的那趟旅程，此刻只剩下一个很小的打算：再买一瓶冰饮料。明天的事，明天再说。</p><small>晚些时候，王孜也从澡堂回来，说自己好想泡温泉。</small></article>';
    ready=januaryStep===2;
  }
  if(o.kind==='jan-portrait'){
    if(!januaryStep)body=januaryPhotoButton(12)+januaryQuote('01.31 · 上午','她到了灶门神社，买了一枚御守。')+'<p class="jan-caption">纸袋上是红色的花与字。接下来，还有一张她想分享的照片。</p><button class="secondary-button" data-jan-step="1">看看她喜欢的睫毛 →</button>';
    else body=januaryPhotoButton(15)+januaryQuote('她说 / 王孜回','“好喜欢这个睫毛。”<br>“你好灵动。”')+'<div class="jan-reveal"><p>她把喜欢说得很具体，只指那一小排睫毛。我却忍不住看了整张脸：眼睛里的亮，嘴角很轻的一点笑，连举在旁边的小玩偶都像有了表情。</p><small>王孜 · 回望这一张</small></div>';
    ready=januaryStep===1;
  }
  if(o.kind==='jan-stage'){
    if(januaryStep===0)body='<p class="jan-kicker">01.31 · 福冈 SMTOWN</p><div class="jan-stage-photos">'+[17,20].map(januaryPhotoButton).join('')+'</div><div class="jan-stage-note"><p>蓝天底下，人群慢慢走向场馆。那些在屏幕上确认过许多次的日期、航班和行程，终于到了眼前。</p><p>今天，她可以把心思放在喜欢的舞台上了。</p></div>';
    if(januaryStep===1)body='<p class="jan-kicker">同一张照片 · 两次看见</p>'+januaryPhotoButton(18)+'<div class="jan-stage-perspectives" role="group" aria-label="切换王孜看这张照片的时点"><button data-jan-stage-look="then" aria-pressed="'+(januaryStageLook==='then')+'"><small>2026.01</small>当时的我</button><button data-jan-stage-look="now" aria-pressed="'+(januaryStageLook==='now')+'"><small>2026.11.06 · 23:50</small>正在做游戏的我</button></div><div class="jan-stage-note" aria-live="polite">'+(januaryStageLook==='then'?'<small>王孜 · 回想一月</small><p>那时的我还不认识这些名字。看她发来的照片，只知道她玩得好开心。甜点上有小星星，旁边有一杯饮料，是演出日里很可爱的一顿。</p><p>我哪里想得到，过不了多久，再看这张照片，会有这么多话。</p>':'<small>2026.11.06 · 23:50，制作这份游戏时的旁注</small><p>等等，甜点盒上的是 RIIZE？！</p><p>OMG……这就是开智的感觉吗。原本在整理她的照片，结果自己先激动起来了。等一下翻到二月的聊天记录，恐怕还要再感叹一遍。哈哈哈哈哈。</p><p>小星星还是那几颗，照片也没变。只是这一次，我终于认得了。</p>')+'</div>';
    if(januaryStep===2)body='<article class="jan-stage-finale">'+januaryPhotoButton(19)+'<div class="jan-bridge-note"><p class="jan-kicker">一月的最后一晚</p><h4>这一晚，先留给她尽兴。</h4><p>粉紫色的光铺满了舞台。她盼了这么久，终于坐在这里，听见了喜欢的歌。那些出发前的不安，此刻可以放在一边。</p>'+januaryQuote('01.31 · 她发来的消息','EXO 唱了《初雪》和《蝴蝶少女》。')+'<p>二月，在 KTV，她会把《Love 119》和《Hug》的 MV 放给我看。后来，我也会有自己反复想听的歌，想多看几眼的人。Shotaro 的名字，就这样慢慢熟悉起来。</p><small>先收好这一晚。翻到二月的 KTV 时，这张旧照片还会再出现。</small></div></article>';
    ready=januaryStep===2&&januaryStageSeen;
    body+='<div class="jan-sequence-controls"><button data-jan-step="'+(januaryStep-1)+'" '+(!januaryStep?'disabled':'')+'>← 上一页</button>'+(januaryStep<2?'<button data-jan-step="'+(januaryStep+1)+'" '+(januaryStep===1&&!januaryStageSeen?'disabled':'')+'>'+(januaryStep===0?'看看那份演出日甜点 →':januaryStageSeen?'把这一晚留给舞台 →':'切换到现在的我，再往下读')+'</button>':'<span>这一束光，可以收好了。</span>')+'</div>';
  }
  if(o.kind==='jan-donki'){
    body='<p class="jan-kicker">月末夹页 · 01.31 夜 → 02.01</p>'+januaryPhotoButton(11)+'<div class="jan-reveal">'+(januaryStep?januaryQuote('02.01 · 聊天原句','“感觉等我到天神donki的时候你应该醒了。”<br>……<br>“好吧你还没醒。”')+'<p>货架已经这么热闹，朋友那边还在睡。伴手礼的事，接着往二月说。</p>':januaryQuote('01.31 · 先约一下明天','她说，明天逛街想让王孜帮着挑；王孜说尽量起来。')+'<button class="secondary-button" data-jan-step="1">翻到第二天，朋友醒了吗 →</button>')+'</div>';ready=januaryStep===1;
  }
  if(o.kind==='jan-flight'||o.kind==='jan-evening')body+='<div class="jan-sequence-controls"><button class="text-button" data-jan-step="'+(januaryStep-1)+'" '+(!januaryStep?'disabled':'')+'>← 上一页</button>'+(januaryStep<2?'<button class="secondary-button" data-jan-step="'+(januaryStep+1)+'">'+(o.kind==='jan-flight'?(januaryStep===0?'翻到登机前 →':'读到抵达的消息 →'):(januaryStep===0?'去便利店 →':'然后，去泡汤泉 →'))+'</button>':'<span>这一段，可以收好了。</span>')+'</div>';
  host.innerHTML=body;eventSelection=ready?o.kind+'-read':null;
  lifeContent.querySelector('#collect-object').disabled=!ready;
  lifeContent.querySelector('#event-feedback').textContent=ready?'可以收进回忆背包了。':'';
}
const januaryBaseOpen=openMemoryObject;
openMemoryObject=function(c,i,fromBag){
  if(!chapterCanEnter(c)||!lifeScenes[c]?.objects[i])return;
  januaryBaseOpen(c,i,fromBag);
  if(c===3&&i===1&&discovered(2,1)){lifeContent.querySelector('.event-story').insertAdjacentHTML('afterend',januaryEcho(false));return;}
  if(c===3&&i===2&&discovered(2,2)){lifeContent.querySelector('.event-story').insertAdjacentHTML('afterend','<aside class="jan-stage-echo" aria-label="一月舞台与二月KTV的呼应">'+januaryPhotoButton(18)+'<div><p class="eyebrow">回看 01.31 · 原来已经见过</p><p>一月，RIIZE 还只是甜点盒上一个没留意的小标。到了这间 KTV，歌声和画面终于有了名字。后来，Shotaro 也成了王孜自己的喜欢。</p><small>点开那张照片，再看一眼。原来当时，它就在这里。</small></div></aside>');return;}
  if(c!==2||!lifeModal.open)return;
  januaryStep=0;januarySnow=[false,false];januaryStageLook='then';januaryStageSeen=false;
  const o=lifeScenes[c].objects[i];
  if(o.kind==='palette'||o.kind?.startsWith('jan-')){lifeContent.querySelector('.event-story').insertAdjacentHTML('afterend','<section id="jan-event" aria-label="一月回忆探索"></section>');drawJanuaryEvent();}
};
const januaryBaseBag=showMemories;
showMemories=function(filter){januaryBaseBag(filter);lifeContent.querySelectorAll('.bag-item[data-index="2"]').forEach(function(b){const o=lifeScenes[2].objects[Number(b.dataset.item)];if(o.photos){const p=januaryPhotos[o.photos[0]],icon=b.querySelector('svg');if(icon)icon.outerHTML='<img class="jan-bag-photo" src="'+p.src+'" alt="'+p.alt+'">';}});};
document.body.insertAdjacentHTML('beforeend','<dialog id="jan-photo-viewer" aria-labelledby="jan-photo-caption"><header><span>一月 · 随身相册</span><button data-jan-photo-close aria-label="关闭一月大图">×</button></header><figure><img id="jan-full-photo" alt=""><figcaption id="jan-photo-caption"></figcaption></figure><nav aria-label="一月照片翻页"><button data-jan-photo-step="-1">← 上一张</button><span id="jan-photo-count"></span><button data-jan-photo-step="1">下一张 →</button></nav></dialog>');
const januaryViewer=document.querySelector('#jan-photo-viewer');
// The album follows the trip, while the event scenes retain their own connected sequences.
const januaryAlbumOrder=[0,1,2,3,4,5,6,7,8,9,10,16,13,14,12,15,17,20,18,19,11];
function viewJanuaryPhoto(i){
  if(!januaryPhotos[i])return;januaryViewedPhoto=i;const p=januaryPhotos[i],n=januaryAlbumOrder.indexOf(i),img=document.querySelector('#jan-full-photo');img.src=p.src;img.alt=p.alt;
  document.querySelector('#jan-photo-caption').textContent=p.caption;document.querySelector('#jan-photo-count').textContent=(n+1)+' / '+januaryPhotos.length;
  januaryViewer.querySelector('[data-jan-photo-step="-1"]').disabled=n===0;januaryViewer.querySelector('[data-jan-photo-step="1"]').disabled=n===januaryAlbumOrder.length-1;
  if(!januaryViewer.open)januaryViewer.showModal();januaryViewer.scrollTop=0;
}
function stepJanuaryPhoto(delta){const n=januaryAlbumOrder.indexOf(januaryViewedPhoto);viewJanuaryPhoto(januaryAlbumOrder[Math.max(0,Math.min(januaryAlbumOrder.length-1,n+delta))]);}
document.addEventListener('click',function(e){
  const phase=e.target.closest('[data-jan-phase]');if(phase){januaryPhase=Number(phase.dataset.janPhase);drawJanuaryAtlas();stage.querySelector('[data-jan-phase="'+januaryPhase+'"]').focus({preventScroll:true});}
  const voice=e.target.closest('[data-jan-voice]');if(voice){januaryVoice=Number(voice.dataset.janVoice);drawJanuaryVoice();}
  const stageLook=e.target.closest('[data-jan-stage-look]');if(stageLook&&eventFocus?.c===2&&eventFocus.i===2&&januaryStep===1){januaryStageLook=stageLook.dataset.janStageLook==='now'?'now':'then';if(januaryStageLook==='now')januaryStageSeen=true;drawJanuaryEvent();lifeContent.querySelector('[data-jan-stage-look="'+januaryStageLook+'"]').focus({preventScroll:true});}
  const step=e.target.closest('[data-jan-step]');if(step&&!step.disabled&&eventFocus?.c===2){
    const kind=lifeScenes[2].objects[eventFocus.i].kind,max=['jan-flight','jan-evening','jan-stage'].includes(kind)?2:1;
    if(kind==='jan-stage'&&Number(step.dataset.janStep)===2&&!januaryStageSeen)return;
    januaryStep=Math.max(0,Math.min(max,Number(step.dataset.janStep)));drawJanuaryEvent();
    const destination=lifeContent.querySelector(kind==='jan-emoji'&&januaryStep?'[data-jan-photo="7"]':['jan-erkuai','jan-pouch','jan-donki'].includes(kind)?'.jan-reveal':'#jan-event');
    if(destination){destination.tabIndex=-1;destination.focus({preventScroll:true});destination.scrollIntoView({behavior:'auto',block:'start'});}
  }
  const snow=e.target.closest('[data-jan-snow]');if(snow&&eventFocus?.c===2&&eventFocus.i===5){const side=Number(snow.dataset.janSnow);januarySnow[side]=true;drawJanuaryEvent();lifeContent.querySelector('[data-jan-photo="'+(8+side)+'"]').focus({preventScroll:true});}
  const photo=e.target.closest('[data-jan-photo]');if(photo)viewJanuaryPhoto(Number(photo.dataset.janPhoto));
  const photoStep=e.target.closest('[data-jan-photo-step]');if(photoStep&&!photoStep.disabled)stepJanuaryPhoto(Number(photoStep.dataset.janPhotoStep));
  if(e.target.closest('[data-jan-photo-close]'))januaryViewer.close();
  if(e.target.closest('[data-game="palette"]')&&eventFocus?.c===2){const hero=lifeContent.querySelector('.jan-album-hero');if(hero)hero.style.backgroundColor=['#ead4da','#d4e0e8','#e0e4d5'][Number(e.target.closest('[data-game="palette"]').dataset.value)];}
});
januaryViewer.addEventListener('click',function(e){if(e.target===januaryViewer)januaryViewer.close();});
januaryViewer.addEventListener('keydown',function(e){if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();stepJanuaryPhoto(e.key==='ArrowLeft'?-1:1);}});
updateGameHUD();
