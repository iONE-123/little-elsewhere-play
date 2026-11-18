// The chosen character determines the single diary voice throughout the year.
function syncNarrativeRole() {
  const voice = life.role === 'wangzi' ? 1 : 0;
  novemberVoice = decemberVoice = januaryVoice = februaryVoice = marchVoice = aprilVoice =
    mayVoice = juneVoice = julyVoice = augustVoice = septemberVoice = octoberVoice = voice;
}

const roleBaseRenderGameChapter = renderGameChapter;
renderGameChapter = function (index, scroll) {
  syncNarrativeRole();
  roleBaseRenderGameChapter(index, scroll);

  // Monthly scripts still render their old controls internally. Remove them from
  // the finished page so only the selected character's text can be read.
  stage.querySelectorAll('[class$="-voice-switch"]').forEach(control => control.remove());
  const reading = stage.querySelector('.reflection-section [class$="-reading"]');
  if (reading) {
    const label = document.createElement('p');
    label.className = 'role-reading-label';
    label.textContent = life.role === 'wangzi' ? '王孜视角 · 她的手记' : '月度叙述 · 记录仪视角';
    reading.insertBefore(label, reading.firstChild);
  }
  const heading = stage.querySelector('.reflection-heading span:last-child');
  if (heading) heading.textContent = life.role === 'wangzi' ? '王孜视角' : '记录仪视角';
  const monthTitle = stage.querySelector('#september-reading-title, #october-reading-title');
  if (monthTitle) monthTitle.textContent = index === 10 ? '九月手记' : '十月手记';
};

// A monthly preview can render itself while its script is loading, before this
// final wrapper is installed. Refresh that one in-memory view once.
if (currentChapter !== null && document.body.classList.contains('in-game')) {
  renderGameChapter(currentChapter, false);
}
