const birthdayEndingDialog = document.querySelector('#answer-modal');
const birthdayEndingScene = document.querySelector('#birthday-ending-scene');
let birthdayEndingTimer;

function endingAction(action, label, english = '') {
  return '<button type="button" class="ending-action" data-ending="' + action + '">' +
    (english ? '<small lang="en">' + english + '</small>' : '') + '<span>' + label + '</span></button>';
}

function endingTitle(english, chinese) {
  return '<h2 class="ending-heading" tabindex="-1"><span lang="en">' + english + '</span><small>' + chinese + '</small></h2>';
}

function renderBirthdayEnding(scene) {
  birthdayEndingDialog.dataset.scene = scene;
  birthdayEndingScene.scrollTop = 0;
  if (scene === 'cover') {
    birthdayEndingScene.innerHTML = '<div class="ending-cover"><img src="./assets/book-of-answers-cover.png" alt="暮光中，紫罗兰旁的《答案之书》封面">' +
      '<button class="ending-book-hit" type="button" data-ending="open" aria-label="翻开答案之书"></button></div>' +
      '<div class="ending-controls">' + endingAction('open', life.birthdayEndingCompleted ? '重温这一刻' : '翻开书本',
        life.birthdayEndingCompleted ? 'Relive the Moment' : '') +
      (life.birthdayEndingCompleted ? endingAction('letter', '再读一次来信', 'Read the Letter') : '') + '</div>';
  } else if (scene === 'open') {
    birthdayEndingScene.innerHTML = '<div class="ending-spread' + (birthdayBookInterior ? ' ending-has-interior' : '') + '">' +
      (birthdayBookInterior ? '<img src="' + escapeGame(birthdayBookInterior) + '" alt="打开的《答案之书》">' : '') +
      '<div class="ending-spread-content">' + endingTitle('What comes next?', '接下来呢？') +
      endingAction('cake', '继续翻页') + '</div></div>';
  } else if (scene === 'cake') {
    birthdayEndingScene.innerHTML = '<div class="ending-spread ending-wish">' +
      endingTitle('Make a wish.', '许个愿吧。') +
      '<p><span lang="en">Take your time.</span> 慢慢来。</p>' +
      '<div class="ending-cake" role="group" aria-label="生日蛋糕">' +
      '<div class="ending-plate" aria-hidden="true"></div><div class="ending-cake-base" aria-hidden="true"></div>' +
      '<span class="ending-candle" aria-hidden="true"></span>' +
      '<button type="button" class="ending-flame-hit" data-ending="blow" aria-label="吹灭蜡烛"><i aria-hidden="true"></i></button>' +
      '<i class="ending-smoke" aria-hidden="true"></i></div>' +
      endingAction('blow', '吹灭蜡烛') + '</div>';
  } else if (scene === 'letter') {
    const [title, dedication, ...paragraphs] = birthdayLetter.split('\n\n');
    birthdayEndingScene.innerHTML = '<article class="ending-letter">' +
      endingTitle(escapeGame(title), escapeGame(dedication)) +
      '<div class="ending-letter-text">' + paragraphs.map(paragraph => '<p>' + escapeGame(paragraph) + '</p>').join('') + '</div>' +
      endingAction('future', '下一页', 'Next Page') + '</article>';
  } else if (scene === 'future') {
    birthdayEndingScene.innerHTML = '<div class="ending-future">' +
      endingTitle('To be continued.', '未完待续。') +
      '<div class="ending-controls">' + endingAction('return', '回到小小世界', 'Return to Elsewhere') +
      '<button type="button" class="ending-action" data-game="birthday">年度相册</button></div></div>';
  }
  birthdayEndingScene.scrollTop = 0;
  if (birthdayEndingDialog.open) focusBirthdayEnding();
}

function focusBirthdayEnding() {
  (birthdayEndingScene.querySelector('.ending-heading') ||
    birthdayEndingScene.querySelector('.ending-book-hit'))?.focus({ preventScroll: true });
}

function openBirthdayEnding() {
  if (!allComplete() || birthdayEndingDialog.open) return;
  renderBirthdayEnding('cover');
  birthdayEndingDialog.showModal();
  focusBirthdayEnding();
}

function advanceBirthdayEnding(current, next, delay) {
  const reduced = life.reduced || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  birthdayEndingTimer = setTimeout(function () {
    if (birthdayEndingDialog.open && birthdayEndingDialog.dataset.scene === current) renderBirthdayEnding(next);
  }, reduced ? 0 : delay);
}

birthdayEndingScene.addEventListener('click', function (event) {
  const button = event.target.closest('[data-ending]');
  if (!button || button.disabled || !birthdayEndingDialog.open) return;
  const scene = birthdayEndingDialog.dataset.scene;
  const action = button.dataset.ending;
  if (scene === 'cover' && action === 'open') {
    playGameMusic(endingMusic);
    renderBirthdayEnding('open');
  } else if (scene === 'cover' && action === 'letter' && life.birthdayEndingCompleted) {
    playGameMusic(endingMusic);
    renderBirthdayEnding('letter');
  } else if (scene === 'open' && action === 'cake') {
    renderBirthdayEnding('cake');
  } else if (scene === 'cake' && action === 'blow') {
    birthdayEndingDialog.dataset.scene = 'blown';
    birthdayEndingScene.querySelectorAll('[data-ending="blow"]').forEach(control => { control.disabled = true; });
    advanceBirthdayEnding('blown', 'letter', 800);
  } else if (scene === 'letter' && action === 'future') {
    life.birthdayEndingCompleted = true;
    saveLife();
    birthdayEndingDialog.dataset.scene = 'closing';
    button.disabled = true;
    advanceBirthdayEnding('closing', 'future', 400);
  } else if (scene === 'future' && action === 'return') {
    birthdayEndingDialog.close();
    showShelf();
    endingButton.focus({ preventScroll: true });
  }
});

birthdayEndingDialog.addEventListener('close', function () {
  clearTimeout(birthdayEndingTimer);
});

if (new URLSearchParams(location.search).get('preview') === 'birthday') {
  previewMode = true;
  state = { ...state, unlocked: chapters.length - 1, completed: chapters.map((_, index) => index) };
  returnToLibrary();
}
