// A visual layer for the existing chapters. These are seasonal art directions,
// not claims that a particular object or flower appeared in a real photograph.
const yearArt = [
  { season: 'autumn', light: '黄昏', motif: '' },       // 2025.11
  { season: 'winter', light: '夜灯', motif: '' },       // 2025.12
  { season: 'winter', light: '雪后的光', motif: '' },   // 2026.01
  { season: 'winter', light: '冬末', motif: '' },       // 2026.02
  { season: 'spring', light: '清晨', motif: '' },       // 2026.03
  { season: 'spring', light: '春日', motif: 'near' },   // 2026.04: 会合
  { season: 'spring', light: '晴光', motif: 'trace' },  // 2026.05: 旅途留下的物件
  { season: 'summer', light: '初夏午后', motif: '' },   // 2026.06
  { season: 'summer', light: '盛夏', motif: 'near' },   // 2026.07: 相聚
  { season: 'summer', light: '夏末夕光', motif: '' },   // 2026.08: 独自远行
  { season: 'autumn', light: '初秋', motif: 'trace' },  // 2026.09: 扇子与消息
  { season: 'autumn', light: '暖灯', motif: '' }        // 2026.10
];
const seasonNames = {spring:'春日', summer:'夏日', autumn:'秋日', winter:'冬日'};
const monthNames = ['十一月', '十二月', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月'];
const monthTabs = ['11', '12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];

function updateYearShelf() {
  const heading = document.querySelector('.library-heading');
  if (!heading) return;
  let line = heading.querySelector('.season-yearline');
  if (!line) {
    line = document.createElement('div');
    line.className = 'season-yearline';
    heading.append(line);
  }
  line.setAttribute('aria-label', '这一年的十二个月，已完成 ' + state.completed.length + ' 章');
  line.innerHTML = yearArt.map((art, index) =>
    '<i class="' + art.season + (state.completed.includes(index) ? ' is-kept' : '') + '" title="' + chapters[index].month + '" aria-hidden="true"></i>'
  ).join('');
}

function drawSeasonalChapter(index) {
  const chapter = stage.querySelector('.life-chapter');
  if (!chapter) return;
  const art = yearArt[index];
  const scene = lifeScenes[index];
  chapter.dataset.season = art.season;
  document.body.dataset.portalSeason = art.season;
  const found = scene.objects.filter((_, item) => discovered(index, item)).length;
  const portal = document.createElement('section');
  portal.className = 'chapter-portal';
  if (art.season === 'autumn') portal.classList.add('chapter-portal-autumn');
  portal.style.setProperty('--chapter-art', 'url("./assets/' + (art.season === 'autumn' ? 'autumn-portal-a' : 'season-' + art.season) + '.png")');
  portal.setAttribute('aria-label', (art.season === 'autumn' ? 'OUR LITTLE SIMS，' : '') + monthNames[index] + '章节封面：' + chapters[index].title);
  portal.innerHTML = '<div class="portal-wash" aria-hidden="true"></div>' +
    '<div class="portal-cards"><div class="portal-card"><a class="portal-card-link" href="#chapter-reflection"><strong>本章故事</strong><span aria-hidden="true">›</span></a><p>' + escapeGame(chapters[index].prose[0]) + '</p><div class="portal-rule"></div><strong>本月任务</strong><ul>' + scene.objects.map((object, item) => '<li><button data-game="object" data-index="' + index + '" data-item="' + item + '"><span class="portal-check" aria-hidden="true">' + (discovered(index, item) ? '✓' : '') + '</span>' + escapeGame(object.name) + '</button></li>').join('') + '</ul><div class="portal-rule"></div><div class="portal-progress"><span>回忆物件</span><span>' + found + ' / ' + scene.objects.length + '</span></div><div class="portal-meter"><i style="width:' + Math.round(found / scene.objects.length * 100) + '%"></i></div></div>' +
    '<div class="portal-card portal-card-small"><a href="#chapter-exploration"><span>◇</span><strong>记忆碎片</strong><small>' + found + ' / ' + scene.objects.length + '</small><span aria-hidden="true">›</span></a><a href="#chapter-reflection"><span>▧</span><strong>私人手记</strong><small>' + (found === scene.objects.length || isComplete(index) ? '翻阅这一月' : '收集物件后解锁') + '</small><span aria-hidden="true">›</span></a></div></div>' +
    '<div class="portal-title"><span class="portal-index">— &nbsp; ' + String(index + 1).padStart(2, '0') + ' / 12 &nbsp; —</span><h2>' + monthNames[index] + '</h2><p>' + escapeGame(chapters[index].title) + '</p><small>' + seasonNames[art.season] + ' · ' + art.light + ' · ' + escapeGame(chapters[index].coordinate) + '</small></div>' +
    '<button class="portal-enter" type="button" data-portal-explore>探索本章 <span aria-hidden="true">→</span></button>' +
    '<button class="portal-role" type="button" data-game="profile">当前身份：' + (life.role === 'wangzi' ? '王孜' : '秋露') + ' · ' + (life.role === 'wangzi' ? '王孜视角' : '记录仪视角') + ' ↗</button>';
  if (art.season === 'autumn') {
    const enter = portal.querySelector('.portal-enter');
    enter.innerHTML = '进入 <span aria-hidden="true">↗</span>';
    enter.setAttribute('aria-label', '进入' + monthNames[index] + '章节，探索本月回忆');
    portal.querySelector('.portal-role').textContent = '切换身份 · ' + (life.role === 'wangzi' ? '王孜' : '秋露');
  }
  const rail = document.createElement('nav');
  rail.className = 'portal-months';
  rail.setAttribute('aria-label', '十二个月章节');
  rail.innerHTML = '<span class="portal-month-arrow" aria-hidden="true">‹</span>' + monthNames.map((name, month) => {
    const allowed = month <= state.unlocked && volumeStartFor(month) === activeVolumeStart;
    return '<button type="button" data-chapter="' + month + '" ' + (allowed ? '' : 'disabled ') + (month === index ? 'aria-current="page" ' : '') + 'aria-label="' + name + (allowed ? '' : '，尚未开放') + '">' + monthTabs[month] + '</button>';
  }).join('') + '<span class="portal-month-arrow" aria-hidden="true">›</span>';
  chapter.querySelector('.scene-header').before(portal);
  if (art.season === 'autumn') {
    const drawer = document.createElement('details');
    drawer.className = 'portal-month-drawer';
    drawer.innerHTML = '<summary>选择月份</summary>';
    drawer.append(rail);
    chapter.querySelector('.scene-header').after(drawer);
  } else {
    chapter.querySelector('.scene-header').after(rail);
  }
  chapter.querySelector('.play-layout').id = 'chapter-exploration';
  chapter.querySelector('.reflection-section').id = 'chapter-reflection';
  const progress = document.querySelector('.topnav .portal-top-progress') || document.createElement('span');
  progress.className = 'portal-top-progress';
  progress.textContent = String(index + 1).padStart(2, '0') + ' / 12';
  progress.style.setProperty('--chapter-progress', Math.round((index + 1) / 12 * 100) + '%');
  if (!progress.isConnected) document.querySelector('.topnav').append(progress);
  updateYearShelf();
}

document.addEventListener('click', event => {
  if (!event.target.closest('[data-portal-explore]')) return;
  document.querySelector('#chapter-exploration')?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    block: 'start'
  });
});

const seasonBaseRender = renderGameChapter;
renderGameChapter = function (index, scroll) {
  seasonBaseRender(index, scroll);
  drawSeasonalChapter(index);
};

const seasonBaseShowShelf = showShelf;
showShelf = function (message) {
  updateYearShelf();
  return seasonBaseShowShelf(message);
};

updateYearShelf();
if (currentChapter !== null && document.body.classList.contains('in-game')) {
  renderGameChapter(currentChapter, false);
}
