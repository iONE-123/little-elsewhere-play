const chapters = [
  {
    month: "2025 · NOV",
    short: "铁锈",
    title: "十一月有铁锈的味道",
    prose: [
      "坏消息像一场没有预报的冷雨，落在机票、计划与日常的缝隙里。价格在十一月十三日之后突然上扬，原本指向福冈的路线开始反复闪烁：取消，等待，再看一眼。",
      "我先撤回了自己的计划。秋露已经握住演唱会的门票，只好在“还能出发”与“也许作废”之间站得更久。香港的行程也并不顺利。那个月，生活仿佛专挑人最疲惫的地方落脚。"
    ],
    quote: "我们不是在决定要不要远行，而是在风里练习：怎样不被一次取消定义。",
    choices: [
      { label: "把取消看作一种失去", response: "失去确实存在。承认它，十一月才不必假装晴朗。" },
      { label: "把取消看作保存力气", response: "有些后退不是投降，是把仍然完好的部分带去明天。" }
    ],
    object: "一张反复刷新的票价曲线",
    weather: "冷雨 / 逆风",
    coordinate: "计划之外",
    glyph: "↗",
    photo: "候补照片：十一月的聊天或行程截图"
  },
  {
    month: "2025 · DEC",
    short: "背面",
    title: "风停在十二月的背面",
    prose: [
      "十二月没有急着给出补偿。喧闹退下去以后，日子重新显出本来的纹理：消息照常抵达，饭照常吃，计划被轻轻放在一边。",
      "平淡并非空白。它像伤口上新长出的薄皮，不耀眼，却说明生活仍在完成自己的修复。"
    ],
    quote: "有时月份什么也没有发生，正是因为我们终于有余力，把自己还给自己。",
    choices: [
      { label: "给平静留下一个空格", response: "不是每一页都需要情节。空格也保存呼吸。" },
      { label: "替十一月收好余波", response: "过去没有消失，只是不再占据全部天气。" }
    ],
    object: "一页没有写满的日历",
    weather: "薄雾 / 微光",
    coordinate: "日常",
    glyph: "—",
    photo: "候补照片：十二月的一顿饭或普通街景"
  },
  {
    month: "2026 · JAN",
    short: "登机口",
    title: "一月，在取消键与登机口之间",
    prose: [
      "新年先换了一种颜色。云南的光落在新染的头发、热气腾腾的饭和一张张漂亮照片上；远方暂时不再是票价表里的数字，而是可以被身体真正抵达的风景。",
      "月底，福冈仍悬在取消键与登机口之间。看票、改票、等待，每一步都像在窄桥上试探。最后，她一个人抵达了。那些反复并没有夺走旅程，只让落地的瞬间更有重量。"
    ],
    quote: "勇敢不总是向前冲。有时它只是：害怕了很久，仍然按时出门。",
    choices: [
      { label: "记住一路的惊险", response: "抵达从不抹去颠簸；它只是让颠簸有了去处。" },
      { label: "记住落地后的风", response: "机场门打开时，所有犹疑都短暂地变成身后的天气。" }
    ],
    object: "一张终于没有取消的登机牌",
    weather: "高原晴光 / 海风",
    coordinate: "云南 → 福冈",
    glyph: "✦",
    photo: "候补照片：云南与福冈"
  },
  {
    month: "2026 · FEB",
    short: "一扇门",
    title: "歌声替命运推开一扇门",
    prose: [
      "福冈的大创里，一通一个多小时的视频把货架变成共同逛过的街。她挑伴手礼，我隔着屏幕参与那些细小的犹豫。回来以后，她第一次见到芝麻球；我们去熟悉的酒吧，从《答案之书》里抽到一句“开心的结果”。",
      "二月二十三日，KTV里的《Love 119》与一支支MV又推开另一扇门。RIIZE、那些名字和舞台最初来自她的分享，后来却在我的生活里长出了自己的坐标。回头才发现，去年九月首尔的杯套早已留下伏笔——当时的我们只是还读不懂。"
    ],
    quote: "朋友偶尔替你推开门；真正走进去以后，那也成为你的世界。",
    choices: [
      { label: "把它叫作偶然", response: "偶然只负责敲门，喜欢却会自己在房间里生长。" },
      { label: "把它叫作伏笔", response: "所谓伏笔，不过是后来的人终于看懂了从前的光。" }
    ],
    object: "一本停在答案页的书",
    weather: "酒杯的琥珀光 / KTV蓝光",
    coordinate: "大创 · 酒吧 · KTV",
    glyph: "♪",
    photo: "候补照片：芝麻球、答案之书、KTV"
  },
  {
    month: "2026 · MAR",
    short: "远方",
    title: "高铁开走，远方留下",
    prose: [
      "三月初，秋露在回西安的路上看见五月首尔粉丝见面会的消息。等车的间隙忽然被机票、场次、首尔和釜山填满；两个原本各自运行的日程，在极短的时间里拼出一条共同路线。",
      "计划长得太快，以至于高铁真的开走了。误车成为这段旅程最早的注脚：有些远方在尚未出发时，就先让时间改变了方向。"
    ],
    quote: "错过一班车，并不会自动通向命运；但那天，我们确实因此更认真地望向远方。",
    choices: [
      { label: "先笑那班开走的车", response: "后来能被笑着讲起的意外，已经把锋利的一面交还给时间。" },
      { label: "先保存计划成形的瞬间", response: "旅行最早的风景，往往出现在两个人同时说“可以”的那一秒。" }
    ],
    object: "一张没有赶上的高铁票",
    weather: "站台风 / 屏幕亮光",
    coordinate: "西安 ↔ 首尔",
    glyph: "⇢",
    photo: "候补照片：行程表、票务或站台"
  },
  {
    month: "2026 · APR",
    short: "倒数",
    title: "春天开始有了倒数的声音",
    prose: [
      "清迈先把四月染得明亮。与此同时，首尔与釜山已从地图上的字变成倒数中的日期。物料被一点点做好，航班被一次次确认，期待像一条看不见的线，穿过各自忙碌的日常。",
      "四月二十九日，我先抵达首尔。那一天我们终于会合；三十日，又一起走到了釜山。"
    ],
    quote: "幸福有时还没有发生，却已经提前改变了每天醒来的方式。",
    choices: [
      { label: "听倒数越来越近", response: "数字逐日减少，心里的空间却越来越大。" },
      { label: "先看一眼独自抵达的城", response: "相遇之前，每个人都先以自己的脚步进入故事。" }
    ],
    object: "一沓亲手做好的应援物料",
    weather: "热带日光 / 首尔晚风",
    coordinate: "清迈 · 首尔",
    glyph: "⌛",
    photo: "清迈、四月二十九日的首尔和三十日的釜山"
  },
  {
    month: "2026 · MAY",
    short: "余温",
    title: "五月，旅程还有回声",
    prose: [
      "四月二十九日在首尔相见，三十日一起到了釜山。五月翻开，照片里的一顿顿饭和街道已经成为可以回望的时间。",
      "五月三十一日，她说起日本的小城市，也说自己有点儿想明朗热狗。四月的一口食物，从照片回到普通的聊天。"
    ],
    quote: "有些旅程在日历上结束，又在一句‘有点儿想吃’里回来。",
    choices: [
      { label: "把时间留在海边", response: "潮水会退，海的声音却很适合替回忆保存呼吸。" },
      { label: "把时间留在街灯下", response: "城市从不记得旅人，但旅人会把一盏灯带走很久。" }
    ],
    object: "一页四月相册与五月三十一日的聊天",
    weather: "四月的街灯 / 五月的日常",
    coordinate: "四月首尔、釜山 → 五月的聊天",
    glyph: "≈",
    photo: "四月旅程的回望；五月三十一日的聊天摘录"
  },
  {
    month: "2026 · JUN",
    short: "播放",
    title: "旅程结束以后，下一顿饭还在等",
    prose: [
      "六月五日，聊天又绕回四月底那趟韩国旅行。秋露说“每次都要去”，接着把下一次的菜单排好：“下次还先吃个热狗”，然后是脊骨、章鱼和铁板鸡。那几天已经过去，想吃的东西却还在往后生长。",
      "回到各自的日常，照片仍可以翻看，RIIZE的新回归也在等待中靠近。我喜欢这样的后续：不用把旅程停在最亮的一刻，我们还可以认真讨论，下一次第一口要吃什么。"
    ],
    quote: "回忆有时很具体，具体到一句：下次还先吃个热狗。",
    choices: [
      { label: "把六月五日的菜单收好", response: "热狗、脊骨、章鱼、铁板鸡。下一次仍是开放的一页。" },
      { label: "按下循环播放", response: "同一首歌每次响起，接住的却是不同一天的你。" }
    ],
    object: "一张写着下次先吃热狗的菜单",
    weather: "梅雨 / 耳机里的晴天",
    coordinate: "各自日常",
    glyph: "▶",
    photo: "候补照片：四月旅程的回看与六月歌单"
  },
  {
    month: "2026 · JUL",
    short: "自己的光",
    title: "平静的日子也有自己的光",
    prose: [
      "七月没有抢着成为故事的高潮。消息在不同时区的日常之间来回，生活各自展开：要做的事、临时的情绪、微不足道却真实的分享。",
      "关系最舒适的部分，也许正是无需时刻证明。我们不把沉默误认作疏远，也不把关心变成追问。"
    ],
    quote: "好的友情不占满生活。它给生活留出房间，也知道门一直在那里。",
    choices: [
      { label: "允许彼此暂时安静", response: "沉默不是撤离，是信任不需要不断发出声响。" },
      { label: "收藏一件普通小事", response: "许多年后，最先想起的也许正是某句没有情节的话。" }
    ],
    object: "一条没有立即回复的消息",
    weather: "午后阵雨 / 风扇声",
    coordinate: "生活内部",
    glyph: "···",
    photo: "候补照片：七月的普通一天"
  },
  {
    month: "2026 · AUG",
    short: "向西",
    title: "风把地图向西翻了一页",
    prose: [
      "八月，秋露独自把足迹落在欧洲：法国、意大利、瑞士，以及地图上更多逐渐有了温度的名字。她自己做判断、换乘、看风景，也承担一个人远行的重量。",
      "我在另一端听她讲路上的见闻。为朋友感到骄傲，并不意味着把她的旅程写成“我们的”。正因为那是她独自拓开的世界，分享回来的一小束光才格外明亮。"
    ],
    quote: "祝福一个人，不是盼她始终朝你走来；是看见她走向自己的辽阔，仍真心觉得好。",
    choices: [
      { label: "替她保存一张辽阔", response: "远方属于抵达它的人；友情只负责为那份勇气亮一盏灯。" },
      { label: "在自己的地图继续前行", response: "两张地图不必重合，也可以在不同纬度同时晴朗。" }
    ],
    object: "一张被折出许多痕迹的欧洲地图",
    weather: "长日照 / 车窗风",
    coordinate: "法国 · 意大利 · 瑞士",
    glyph: "✧",
    photo: "候补照片：欧洲旅程"
  },
  {
    month: "2026 · SEP",
    short: "九月回声",
    title: "把热的消息，递到你手里",
    prose: [
      "选择忽然变得具体。我从考研转向留学，申请与准备把未来拆成一项项艰难的任务；秋露也开始认真辨认实习、工作与自己的节奏。方向改变时，连熟悉的生活都显得陌生。",
      "九月五日，话题又回到四月底的韩国之行。她想起鸡爪、街边的鱼饼年糕血肠，还有明朗热狗；说“咱俩上次说走之前再吃一次”，又补了一句“也没有吃”。那件没做成的小事，被我们一直记到了九月。",
      "我们交换焦虑，也聊下一次想吃什么，却不替彼此下结论。支持是听对方把自己的路讲清楚；平常的惦记，也可以和严肃的选择放在同一个月里。"
    ],
    quote: "九月教会我们的，不是如何选到绝对正确的路，而是如何承担一条由自己选择的路。",
    choices: [
      { label: "承认我也不知道答案", response: "不知道并不等于没有方向。它只是方向还在生成。" },
      { label: "先完成眼前的一小步", response: "宏大的未来常常只能借今天很小的动作抵达。" }
    ],
    object: "两份不断修改的人生计划",
    weather: "长夜 / 雾 / 台灯",
    coordinate: "分岔路口",
    glyph: "Y",
    photo: "候补照片：九月的书桌与计划"
  },
  {
    month: "2026 · OCT—NOV",
    short: "有了回音",
    title: "先有一扇门打开",
    prose: [
      "后来，事情并没有突然变得完美，却一件件开始有了位置。申请继续向前，面试与等待也终于换来实习的回音。曾经挤在一起的焦虑，被时间慢慢梳开。",
      "一年绕回十一月。我们仍有各自要去的地方，也仍会遇见无法预报的天气。但那本书留下的答案，似乎已不再需要用一次远行证明。"
    ],
    quote: "所谓开心的结果，也许不是命运许诺顺遂；是风浪之后，我们仍能带着完整的自己，走到可以相见的地方。",
    choices: [
      { label: "把答案交给未来", response: "未来不会按剧本到来，但我们已经学会在变化里继续生活。" },
      { label: "承认答案正在发生", response: "有些结果没有落款。它藏在生活重新流动起来的声音里。" }
    ],
    object: "一封抵达得刚刚好的回信",
    weather: "云层渐开 / 灯亮",
    coordinate: "正在成为的生活",
    glyph: "○",
    photo: "候补照片：近况与答案之书"
  }
];

const storageKey = "happy-result-progress-v2";
const volumeStarts = [0, 4, 8];
const volumeNotes = [
  "行程时停时走，话一直说着",
  "等着见面，一起走过，回家以后还常说起",
  "远行和新打算各有下文，旧话也接得上"
];
const defaultState = { unlocked: 0, completed: [], choices: {} };
let state = loadState();
let previewMode = false;
let currentChapter = null;
let activeVolumeStart = 0;
let toastTimer = null;
let pageNavigationVersion = 0;
let pageNavigationFrame = null;
let pageNavigationReleaseFrame = null;

const rail = document.querySelector("#chapter-rail");
const stage = document.querySelector("#chapter-stage");
const toast = document.querySelector("#toast");
const endingButton = document.querySelector('[data-action="open-ending"]');
const opening = document.querySelector("#opening-sequence");
const libraryProgress = document.querySelector("#library-progress");
const gameMusic = document.querySelector("#game-music");
const journeyMusic = gameMusic.getAttribute("src");
const endingMusic = "./assets/music/answer-book.mp3";
let gameMusicMuted = false;

function cancelPageNavigation() {
  pageNavigationVersion += 1;
  if (pageNavigationFrame !== null) cancelAnimationFrame(pageNavigationFrame);
  if (pageNavigationReleaseFrame !== null) cancelAnimationFrame(pageNavigationReleaseFrame);
  pageNavigationFrame = null;
  pageNavigationReleaseFrame = null;
  document.documentElement.classList.remove("chapter-positioning");
}

function beginPageNavigation() {
  cancelPageNavigation();
  document.documentElement.classList.add("chapter-positioning");
  // Cancel any earlier smooth scroll before a long chapter is replaced.
  window.scrollTo({ top: window.scrollY, left: window.scrollX, behavior: "instant" });
  return pageNavigationVersion;
}

function finishPageNavigation(section, focusSelector, version, chapterIndex) {
  // Monthly wrappers finish synchronously; locate the completed layout on the next frame.
  pageNavigationFrame = requestAnimationFrame(function () {
    if (version !== pageNavigationVersion) return;
    pageNavigationFrame = null;
    if (currentChapter !== chapterIndex || document.body.classList.contains("opening-active")) {
      document.documentElement.classList.remove("chapter-positioning");
      return;
    }
    section.scrollIntoView({ behavior: "instant", block: "start", inline: "nearest" });
    const heading = section.querySelector(focusSelector);
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
    pageNavigationReleaseFrame = requestAnimationFrame(function () {
      if (version !== pageNavigationVersion) return;
      pageNavigationReleaseFrame = null;
      document.documentElement.classList.remove("chapter-positioning");
    });
  });
}

function positionCurrentChapter() {
  if (currentChapter === null) return;
  finishPageNavigation(stage, ".portal-title h2, .chapter-title", beginPageNavigation(), currentChapter);
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (!saved || typeof saved.unlocked !== "number") return Object.assign({}, defaultState);
    return {
      unlocked: Math.min(chapters.length - 1, Math.max(0, saved.unlocked)),
      completed: Array.isArray(saved.completed) ? saved.completed.filter(Number.isInteger) : [],
      choices: saved.choices && typeof saved.choices === "object" ? saved.choices : {}
    };
  } catch (error) {
    return Object.assign({}, defaultState);
  }
}

function saveState() {
  if (previewMode) {
    updateOpeningLibrary();
    if (typeof updateGameHUD === "function") updateGameHUD();
    return;
  }
  try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch (_) { showToast("浏览器暂时无法保存；本次仍可继续游玩。"); }
  updateOpeningLibrary();
  if (typeof updateGameHUD === "function") updateGameHUD();
}

function isComplete(index) {
  return state.completed.includes(index);
}

function allComplete() {
  return chapters.every(function (_, index) { return isComplete(index); });
}

function volumeStartFor(index) {
  return volumeStarts[Math.floor(index / 4)];
}

function volumeComplete(start) {
  return [start, start + 1, start + 2, start + 3].every(isComplete);
}

function volumeUnlocked(start) {
  if (start === 0) return true;
  return volumeComplete(start - 4);
}

function volumeCompletedCount(start) {
  return [start, start + 1, start + 2, start + 3].filter(isComplete).length;
}

function firstIncompleteInVolume(start) {
  const next = [start, start + 1, start + 2, start + 3].find(function (index) {
    return !isComplete(index);
  });
  return next === undefined ? start : next;
}

function updateOpeningLibrary() {
  if (!opening) return;
  document.querySelectorAll("[data-opening-chapter]").forEach(function (button) {
    const chapterIndex = Number(button.dataset.openingChapter);
    const unlocked = volumeUnlocked(chapterIndex);
    const completeCount = volumeCompletedCount(chapterIndex);
    button.setAttribute("aria-disabled", String(!unlocked));
    const label = button.querySelector("span").textContent;
    const status = unlocked ? completeCount + " / 4 章已完成" : "完成上一卷后开启";
    button.setAttribute("aria-label", label + "，" + status);
    const note = volumeNotes[volumeStarts.indexOf(chapterIndex)];
    button.setAttribute("aria-description", note);
    button.title = status + "\n" + note;
  });
  if (libraryProgress) {
    libraryProgress.textContent = "已保存 " + state.completed.length + " / " + chapters.length + " 枚记忆坐标";
  }
  updateEnding();
}

function setOpeningActive(active) {
  opening.classList.toggle("is-closed", !active);
  opening.setAttribute("aria-hidden", String(!active));
  opening.inert = !active;
  document.body.classList.toggle("opening-active", active);
  document.querySelectorAll("body > .topbar, body > main, body > footer").forEach(function (element) {
    element.inert = active;
  });
}

function setOpeningPhase(phase) {
  loadOpeningArt(phase);
  opening.dataset.phase = phase;
  opening.querySelectorAll("[data-le-screen]").forEach(function (screen) {
    const active = screen.dataset.leScreen === phase;
    screen.inert = !active;
    screen.setAttribute("aria-hidden", String(!active));
  });
  opening.querySelector('[data-action="skip-opening"]').hidden = currentChapter === null;
  setOpeningActive(true);
  opening.querySelector("#le-" + phase + "-title").focus({ preventScroll: true });
}

function closeOpening() {
  if (!opening) return;
  setOpeningActive(false);
}

function skipOpening() {
  closeOpening();
  if (currentChapter !== null && document.body.classList.contains("in-game")) positionCurrentChapter();
  else document.querySelector("#home").scrollIntoView({ behavior: "instant", block: "start" });
}

function enterFromOpening(index, chapter = firstIncompleteInVolume(index)) {
  if (!volumeUnlocked(index)) {
    showToast("完成上一卷后开启。");
    return;
  }
  if (chapter > state.unlocked) {
    showToast("这一章还在等待前面的故事。");
    return;
  }
  playGameMusic();
  activeVolumeStart = index;
  closeOpening();
  renderChapter(chapter, true);
}

function buildRail() {
  rail.innerHTML = chapters.map(function (chapter, index) {
    const unlocked = index <= state.unlocked;
    const inActiveVolume = index >= activeVolumeStart && index <= activeVolumeStart + 3;
    const available = unlocked && inActiveVolume;
    const complete = isComplete(index);
    const active = currentChapter === index;
    const classes = [
      "rail-item",
      unlocked ? "is-unlocked" : "is-locked",
      complete ? "is-complete" : "",
      unlocked && !inActiveVolume ? "is-other-volume" : "",
      active ? "is-active" : ""
    ].join(" ");
    return '<button class="' + classes + '" role="listitem" data-chapter="' + index + '" ' +
      (available ? "" : "disabled") + ' aria-label="第' + (index + 1) + '章：' + chapter.title +
      (unlocked && !inActiveVolume ? "（请从书架进入本卷）" : "") + '">' +
      '<span class="rail-dot">' + (complete ? "·" : "") + '</span>' +
      '<span class="rail-month">' + chapter.month + '</span>' +
      '<span class="rail-title">' + chapter.short + '</span></button>';
  }).join("");
}

function renderChapter(index, shouldScroll) {
  if (!Number.isInteger(index) || index < 0 || index >= chapters.length) return;
  if (index > state.unlocked) {
    showToast("这一章还在等待前面的故事。");
    return;
  }
  if (volumeStartFor(index) !== activeVolumeStart) {
    showToast("请先回到书架，翻开这一章所属的那一卷。");
    return;
  }

  const navigationVersion = shouldScroll ? beginPageNavigation() : (cancelPageNavigation(), null);
  currentChapter = index;
  if (typeof renderGameChapter === "function") {
    renderGameChapter(index, false);
    buildRail();
    updateEnding();
    if (shouldScroll) finishPageNavigation(stage, ".portal-title h2, .chapter-title", navigationVersion, index);
    return;
  }
  const chapter = chapters[index];
  const chosen = state.choices[index];
  const done = isComplete(index);
  const paragraphs = chapter.prose.map(function (paragraph) {
    return "<p>" + paragraph + "</p>";
  }).join("");
  const choices = chapter.choices.map(function (choice, choiceIndex) {
    return '<button class="choice ' + (Number(chosen) === choiceIndex ? "is-chosen" : "") +
      '" data-choice="' + choiceIndex + '" data-chapter-choice="' + index + '">' +
      choice.label + "</button>";
  }).join("");
  const responseText = chosen !== undefined
    ? chapter.choices[chosen].response
    : "选择不会改变已经发生的事，只改变你如何凝视它。";

  stage.innerHTML =
    '<div class="chapter-layout">' +
      '<div class="chapter-main">' +
        '<div class="chapter-kicker">CHAPTER ' + String(index + 1).padStart(2, "0") + " · " + chapter.month + '</div>' +
        '<h3 class="chapter-title">' + chapter.title + '</h3>' +
        '<div class="chapter-prose">' + paragraphs + '</div>' +
        '<blockquote class="chapter-quote">' + chapter.quote + '</blockquote>' +
        '<p class="choice-label">怎样安放这一页记忆？</p>' +
        '<div class="choices">' + choices + '</div>' +
        '<p class="choice-response" id="choice-response">' + responseText + '</p>' +
        '<div class="next-row">' +
          '<small>' + (done ? "本章已收入档案" : "选择后，本章将被收入档案") + '</small>' +
          '<button class="primary-button next-button ' + (done ? "" : "is-locked") +
            '" data-action="next" data-next-chapter="' + index + '" ' + (done ? "" : "disabled") + '>' +
            '<span>' + (index === 3 ? "完成第一卷" : index === 7 ? "完成第二卷" : index === chapters.length - 1 ? "前往答案之书" : "翻到下一章") +
            '</span><span>→</span></button>' +
        '</div>' +
      '</div>' +
      '<aside class="chapter-aside">' +
        '<div class="memory-window"><div class="placeholder-inner">' +
          '<span class="placeholder-glyph">' + chapter.glyph + '</span>' +
          '<strong>' + chapter.photo + '</strong>' +
          '<small>PHOTO WINDOW · 稍后补入</small>' +
        '</div></div>' +
        '<div class="memory-data">' +
          '<div class="data-row"><span>记忆物件</span><strong>' + chapter.object + '</strong></div>' +
          '<div class="data-row"><span>感官天气</span><strong>' + chapter.weather + '</strong></div>' +
          '<div class="data-row"><span>故事坐标</span><strong>' + chapter.coordinate + '</strong></div>' +
        '</div>' +
      '</aside>' +
    '</div>';

  buildRail();
  updateEnding();
  if (shouldScroll) finishPageNavigation(stage, ".chapter-title", navigationVersion, index);
}

function chooseMemory(chapterIndex, choiceIndex) {
  if (chapterIndex !== currentChapter || !Number.isInteger(choiceIndex) || !chapters[chapterIndex]?.choices[choiceIndex]) return;
  if (!isComplete(chapterIndex) && !canFinishMonthlyExploration(chapterIndex)) {
    showExplorationReminder(chapterIndex);
    return;
  }
  const chapter = chapters[chapterIndex];
  state.choices[chapterIndex] = choiceIndex;
  if (!isComplete(chapterIndex)) state.completed.push(chapterIndex);
  state.unlocked = Math.max(state.unlocked, Math.min(chapters.length - 1, chapterIndex + 1));
  saveState();

  document.querySelectorAll("[data-chapter-choice]").forEach(function (button) {
    button.classList.toggle("is-chosen", Number(button.dataset.choice) === choiceIndex);
  });
  const response = document.querySelector("#choice-response");
  if (response) response.textContent = chapter.choices[choiceIndex].response;

  const next = stage.querySelector('[data-action="next"]');
  if (next) {
    next.disabled = false;
    next.classList.remove("is-locked");
  }
  const note = document.querySelector(".next-row small");
  if (note) note.textContent = "本章已收入档案";

  buildRail();
  updateEnding();
  if (typeof finishGameChapter === "function") finishGameChapter(chapterIndex);
  showToast("这个月的小事，都收集好啦。");
}

function goNext(sourceChapter) {
  if (sourceChapter !== undefined && sourceChapter !== currentChapter) return;
  if (currentChapter === null) return;
  if (!isComplete(currentChapter)) {
    showExplorationReminder(currentChapter);
    return;
  }
  if (currentChapter === 3 || currentChapter === 7) {
    returnToLibrary(currentChapter);
  } else if (currentChapter < chapters.length - 1) {
    renderChapter(currentChapter + 1, true);
  } else if (allComplete()) {
    returnToLibrary();
    endingButton.focus({ preventScroll: true });
  }
}

function returnToLibrary(closingChapter) {
  if (!opening) return;
  cancelPageNavigation();
  updateOpeningLibrary();
  setOpeningPhase("library");
  if (closingChapter === 3 || closingChapter === 7) {
    const volumeNumber = closingChapter === 3 ? "第一卷" : "第二卷";
    const nextVolume = closingChapter === 3 ? "第二卷" : "第三卷";
    showToast(volumeNumber + "已合上。" + nextVolume + "在书架上亮了起来。");
    const nextBook = opening.querySelector('[data-opening-chapter="' + (closingChapter + 1) + '"]');
    nextBook.focus();
  }
}

function updateEnding() {
  const unlocked = allComplete();
  endingButton.hidden = !unlocked;
  endingButton.disabled = !unlocked;
}

function buildYearMap() {
  if (typeof renderWorldMap === "function") { renderWorldMap(); return; }
  document.querySelector("#year-map").innerHTML = chapters.map(function (chapter, index) {
    return '<div class="year-cell ' + (index <= state.unlocked ? "" : "is-locked") + '">' +
      '<span>' + String(index + 1).padStart(2, "0") + " · " + chapter.month + '</span>' +
      '<strong>' + (index <= state.unlocked ? chapter.title : "尚未抵达") + '</strong></div>';
  }).join("");
}

function openDialog(id) {
  const dialog = document.querySelector(id);
  if (dialog && !dialog.open) dialog.showModal();
}

function closeDialog(button) {
  const dialog = button.closest("dialog");
  if (dialog) dialog.close();
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = setTimeout(function () {
    toast.classList.remove("is-visible");
  }, 2800);
}

function unlockPreview() {
  state.unlocked = chapters.length - 1;
  state.completed = chapters.map(function (_, index) { return index; });
  chapters.forEach(function (_, index) {
    if (state.choices[index] === undefined) state.choices[index] = 0;
  });
  saveState();
  buildRail();
  updateEnding();
  showToast("创作预览已开启：十二章与结尾均已解锁。");
}

function restart() {
  if (previewMode) { window.location.search = ""; return; }
  localStorage.removeItem(storageKey);
  state = { unlocked: 0, completed: [], choices: {} };
  currentChapter = 0;
  activeVolumeStart = 0;
  updateOpeningLibrary();
  document.querySelector("#answer-modal").close();
  playGameMusic(journeyMusic);
  renderChapter(0, true);
  showToast("故事回到十一月。");
}

function syncGameMusicControls() {
  const playing = !gameMusic.paused;
  const toggle = document.querySelector('[data-action="toggle-sound"]');
  toggle.setAttribute("aria-pressed", String(playing));
  toggle.querySelector(".sound-label").textContent = playing ? "伴奏开启" : "伴奏关闭";
  const settingsToggle = document.querySelector('[data-game="sound"]');
  if (settingsToggle) {
    settingsToggle.setAttribute("aria-pressed", String(playing));
    settingsToggle.textContent = playing ? "关闭伴奏" : "开启伴奏";
  }
}

function playGameMusic(track = gameMusic.getAttribute("src")) {
  if (track !== gameMusic.getAttribute("src")) {
    gameMusic.pause();
    gameMusic.setAttribute("src", track);
  }
  if (gameMusicMuted || !gameMusic.paused) return;
  gameMusic.play().catch(function (error) {
    if (error.name === "AbortError") return;
    syncGameMusicControls();
    showToast("伴奏暂时无法播放，可在设置中重新开启。");
  });
}

function toggleGameMusic() {
  gameMusicMuted = !gameMusic.paused;
  if (gameMusicMuted) gameMusic.pause();
  else playGameMusic();
}

gameMusic.addEventListener("play", syncGameMusicControls);
gameMusic.addEventListener("pause", syncGameMusicControls);

document.addEventListener("click", function (event) {
  const openingChapter = event.target.closest("[data-opening-chapter]");
  if (openingChapter) {
    enterFromOpening(Number(openingChapter.dataset.openingChapter));
    return;
  }

  const chapterButton = event.target.closest("[data-chapter]");
  if (chapterButton) {
    renderChapter(Number(chapterButton.dataset.chapter), true);
    return;
  }

  const choiceButton = event.target.closest("[data-chapter-choice]");
  if (choiceButton) {
    chooseMemory(Number(choiceButton.dataset.chapterChoice), Number(choiceButton.dataset.choice));
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (!actionButton || actionButton.disabled) return;

  const action = actionButton.dataset.action;
  if (action === "skip-opening") skipOpening();
  if (action === "begin") {
    playGameMusic();
    if (!previewMode && typeof roleChosenThisVisit !== "undefined" && !roleChosenThisVisit) {
      startLifeGame();
      return;
    }
    activeVolumeStart = 0;
    renderChapter(0, true);
  }
  if (action === "next") goNext(Number(actionButton.dataset.nextChapter));
  if (action === "show-map") {
    buildYearMap();
    openDialog("#map-modal");
  }
  if (action === "show-about") openDialog("#about-modal");
  if (action === "close-modal") closeDialog(actionButton);
  if (action === "open-ending" && allComplete()) {
    openBirthdayEnding();
  }
  if (action === "preview-all") unlockPreview();
  if (action === "restart") restart();
  if (action === "toggle-sound") toggleGameMusic();
});

document.querySelectorAll("dialog").forEach(function (dialog) {
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });
});

window.addEventListener("pointermove", function (event) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const card = document.querySelector(".hero-card");
  if (!card) return;
  const x = (event.clientX / window.innerWidth - 0.5) * 10;
  const y = (event.clientY / window.innerHeight - 0.5) * 10;
  card.style.transform = "rotate(2deg) translate(" + (x * -0.3) + "px, " + (y * -0.3) + "px)";
}, { passive: true });

buildRail();
updateEnding();
updateOpeningLibrary();
