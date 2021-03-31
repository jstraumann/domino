const filters = document.querySelectorAll('.filter');

for(const filter of filters) {
  filter.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    const kind = this.getAttribute('data-kind');
    const code = this.getAttribute('data-code');

    const qs = new QS();
    qs.add('filter[]', `${kind}=${code}`);
    window.location.search = qs.toString();
  });
}

const displayButton = document.querySelector('.hud-show');

displayButton.addEventListener('click', function() {
  const choice = document.querySelector('.choice');
  choice.style.top = '50vh';
});

const resetButton = document.querySelector('.hud-reset');
resetButton.addEventListener('click', function() {
  const response = confirm('Die aktuelle Auswahl wird gelöscht. Fortfahren?');
  if(response) {
    window.location.href = '/';
  }
})

const choiceClose = document.querySelector('.choice-back');

choiceClose.addEventListener('click', function() {
  const choice = document.querySelector('.choice');
  choice.style.top = '100vh';
});
