const chapterMonths = ['2025-11', '2025-12', '2026-01', '2026-02', '2026-03', '2026-04',
  '2026-05', '2026-06', '2026-07', '2026-08', '2026-09', '2026-10'];
const journalAttributes = ['nov', 'dec', 'jan', 'feb', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october'];
const albumMonths = {
  9: { name: 'august', stages: augustStages },
  10: { name: 'september', stages: septemberStages },
  11: { name: 'october', stages: octoberStages }
};

function explorationId(chapter, key) {
  return chapterMonths[chapter] + '/' + key;
}

function requiredChapterMemories(chapter) {
  const objects = lifeScenes[chapter].objects.flatMap(function (object, index) {
    return object.optional ? [] : [{ chapter, index, kind: 'object', id: explorationId(chapter, 'memory-' + (index + 1)), label: object.name }];
  });
  const albums = (albumMonths[chapter]?.stages || []).map(function (entry, index) {
    return { chapter, index, kind: 'album', id: explorationId(chapter, 'album-' + (index + 1)), label: entry.name + '的相册' };
  });
  return objects.concat(albums);
}

function journalExploration(chapter) {
  return { chapter, kind: 'journal', id: explorationId(chapter, 'journal'), label: '这一月的手记' };
}

function explorationCompleted(item) {
  return life.explored[item.id] === true || (item.kind === 'object' && discovered(item.chapter, item.index));
}

function canFinishMonthlyExploration(chapter) {
  return chapterExplored(chapter) && explorationCompleted(journalExploration(chapter));
}

function monthlyExploration(chapter) {
  const choice = { chapter, kind: 'choice', id: explorationId(chapter, 'reflection-choice'), label: '在手记末尾留下一个选择' };
  const items = requiredChapterMemories(chapter).concat(journalExploration(chapter), choice);
  const missing = items.filter(item => item.kind === 'choice' ? !isComplete(chapter) : !explorationCompleted(item));
  return { missing, found: items.length - missing.length, total: items.length };
}

document.querySelector('.topbar').insertAdjacentHTML('beforeend',
  '<div class="chapter-exploration" id="chapter-exploration-progress" hidden>' +
  '<span class="exploration-count" aria-live="polite"></span>' +
  '<button type="button" data-exploration="hint">一点小提示</button>' +
  '<button type="button" data-action="next" class="exploration-next"></button></div>');
const explorationPanel = document.querySelector('#chapter-exploration-progress');
let explorationHint = '';
let explorationHighlightTimer;

function updateExplorationPanel() {
  if (currentChapter === null) return;
  const progress = monthlyExploration(currentChapter);
  const done = isComplete(currentChapter);
  const count = explorationPanel.querySelector('.exploration-count');
  count.textContent = done && progress.missing.length ? '本月已完成' : '本月探索 ' + progress.found + ' / ' + progress.total;
  if (done && progress.missing.length) count.title = '沿用已完成的存档，新增阅读明细可自由补看。';
  else count.removeAttribute('title');
  explorationPanel.querySelector('[data-exploration="hint"]').hidden = !progress.missing.length;
  const next = explorationPanel.querySelector('.exploration-next');
  next.dataset.nextChapter = String(currentChapter);
  next.textContent = currentChapter === chapters.length - 1 ? '返回章节选择' : '前往下一月';
  explorationPanel.hidden = false;
  const journalNext = stage.querySelector('.next-button');
  if (journalNext) {
    journalNext.disabled = false;
    if (currentChapter === chapters.length - 1) journalNext.querySelector('span').textContent = '返回章节选择';
  }
  const lockedDiary = stage.querySelector('.locked-diary');
  if (lockedDiary) lockedDiary.textContent = '探索完本月必需的回忆后，可以留下一种看法。';
}

const renderBeforeExplorationPanel = renderChapter;
renderChapter = function (index, scroll) {
  const previous = currentChapter;
  renderBeforeExplorationPanel(index, scroll);
  if (previous !== currentChapter) explorationHint = '';
  updateExplorationPanel();
};

function recordExploration(item) {
  if (explorationCompleted(item)) return false;
  life.explored[item.id] = true;
  if (explorationHint === item.id) explorationHint = '';
  saveLife();
  return true;
}

function showExplorationReminder(chapter) {
  const { found, total, missing } = monthlyExploration(chapter);
  showLifeModal('<p class="eyebrow">THERE IS STILL SOMETHING TO DISCOVER</p>' +
    '<h2 id="life-modal-title">这个月，还有一些小事没被发现。</h2>' +
    '<p class="modal-lead">已发现 ' + found + ' / ' + total + '，还有 ' + missing.length + ' 处等待探索。</p>' +
    '<div class="exploration-reminder-actions"><button type="button" class="primary-button" data-game="close">继续探索</button>' +
    '<button type="button" class="secondary-button" data-exploration="hint">一点小提示</button></div>', 'exploration');
}

function phasePath(chapter, index) {
  const phase = function (entries, field) { return entries.findIndex(entry => entry[field].includes(index)); };
  if (chapter === 0) return ['[data-nov-scene="' + phase(novemberPhases, 'objects') + '"]'];
  if (chapter === 1) return ['[data-dec-scene="' + phase(decemberSceneCopy, 'objects') + '"]'];
  if (chapter === 2) return ['[data-jan-gate="' + phase(januaryPhases, 'items') + '"]'];
  if (chapter === 3) {
    const gate = phase(februaryPhases, 'items');
    return ['[data-feb-gate="' + gate + '"]', '[data-feb-memory-go="' + februaryPhases[gate].items.indexOf(index) + '"]'];
  }
  if (chapter === 4) {
    const gate = phase(marchPhases, 'items');
    return ['[data-march-gate="' + gate + '"]', ...Array(marchPhases[gate].items.indexOf(index)).fill('[data-march-memory="1"]')];
  }
  if (chapter === 5) {
    const step = phase(aprilPhases, 'items');
    const landmark = aprilLandmarks.findIndex(entry => entry.phases.includes(step));
    return ['[data-april-landmark="' + landmark + '"]', '[data-april-phase="' + step + '"]',
      ...Array(aprilPhases[step].items.indexOf(index)).fill('[data-april-object="1"]')];
  }
  const selector = { 6: 'may-phase', 7: 'june-scene', 8: 'july-scene' }[chapter];
  if (selector) return ['[data-' + selector + '="' + index + '"]'];
  const name = albumMonths[chapter].name;
  return ['[data-' + name + '-stage="' + index + '"]'];
}

function visibleExplorationTarget(selector) {
  return Array.from(stage.querySelectorAll(selector)).find(element => element.getClientRects().length && !element.disabled);
}

function guideExploration() {
  if (currentChapter === null) return;
  const item = monthlyExploration(currentChapter).missing[0];
  if (!item) return;
  if (lifeModal.dataset.kind === 'exploration') lifeModal.close();
  const locate = explorationHint === item.id;
  explorationHint = item.id;
  const journal = '[data-' + journalAttributes[item.chapter] + '-journal]';
  let target;
  if (item.kind === 'journal' || item.kind === 'choice') {
    target = visibleExplorationTarget(item.kind === 'choice' ? '.reflection-section [data-chapter-choice]' : journal);
    if (!target && item.kind === 'choice' && locate) {
      visibleExplorationTarget(journal)?.click();
      target = visibleExplorationTarget('.reflection-section [data-chapter-choice]');
    }
    target ||= visibleExplorationTarget(journal);
  } else {
    const album = albumMonths[item.chapter]?.name;
    const object = '[data-game="object"][data-index="' + item.chapter + '"][data-item="' + item.index + '"]';
    const path = phasePath(item.chapter, item.index);
    const mainTarget = item.kind === 'object' ? object : '[data-' + album + '-album]';
    target = visibleExplorationTarget(mainTarget);
    if (item.kind === 'album' && !stage.querySelector(path[0] + '[aria-pressed="true"]')) target = null;
    if (!target && locate) {
      visibleExplorationTarget('[data-' + journalAttributes[item.chapter] + '-journal-close]')?.click();
      if (album) visibleExplorationTarget('[data-' + album + '-album-close]')?.click();
      for (const selector of path) {
        const control = stage.querySelector(selector);
        if (control) {
          const details = control.closest('details');
          if (details) details.open = true;
          control.click();
        }
      }
      if (item.kind === 'object' && album) {
        // Opening an album by the player counts. The hint only points to its entrance.
        target = visibleExplorationTarget('[data-' + album + '-album]');
      } else {
        target = visibleExplorationTarget(mainTarget);
      }
    }
    target ||= visibleExplorationTarget(path[0]);
  }
  showToast('还可以看看：' + item.label);
  if (!target) return;
  clearTimeout(explorationHighlightTimer);
  document.querySelector('.exploration-highlight')?.classList.remove('exploration-highlight');
  target.classList.add('exploration-highlight');
  if (locate) {
    target.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    target.focus({ preventScroll: true });
  }
  explorationHighlightTimer = setTimeout(() => target.classList.remove('exploration-highlight'), 2500);
}

// Run after the individual scene handlers have opened their actual content.
window.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', function (event) {
    if (event.target.closest('[data-exploration="hint"]')) {
      guideExploration();
      return;
    }
    if (currentChapter === null) return;
    const chapter = currentChapter;
    const prefix = journalAttributes[chapter];
    const object = event.target.closest('[data-game="object"][data-index="' + chapter + '"]');
    let changed = false;
    if (object && lifeModal.open && eventFocus?.c === chapter && eventFocus.i === Number(object.dataset.item)) {
      const item = requiredChapterMemories(chapter).find(entry => entry.kind === 'object' && entry.index === eventFocus.i);
      if (item && !lifeScenes[chapter].objects[eventFocus.i].kind) changed = recordExploration(item);
    }
    if (event.target.closest('[data-' + prefix + '-journal]') &&
        stage.querySelector('.reflection-section:not([hidden]) .diary-prose')) {
      changed = recordExploration(journalExploration(chapter)) || changed;
    }
    const album = albumMonths[chapter];
    if (album && event.target.closest('[data-' + prefix + '-album]')) {
      const image = stage.querySelector('.' + prefix + '-album-photo img');
      const index = [augustStage, septemberStage, octoberStage][chapter - 9];
      if (image?.getAttribute('src')) {
        const item = requiredChapterMemories(chapter).find(entry => entry.kind === 'album' && entry.index === index);
        changed = recordExploration(item) || changed;
      }
    }
    if (changed && chapterExplored(chapter)) {
      // An open journal keeps its reading position. The next render restores the normal choice controls.
      if (!stage.querySelector('.reflection-section:not([hidden])')) renderGameChapter(chapter, false);
    }
    updateExplorationPanel();
  });
  updateExplorationPanel();
});
