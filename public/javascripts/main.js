/**** FILTER CLICK HANDLER *****/

const filters = document.querySelectorAll('.filter');

for(const filter of filters) {
  filter.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    const kind = this.getAttribute('data-kind');
    const code = this.getAttribute('data-code');

    const active = this.querySelector('.indicator').classList.contains('active');

    const qs = new QS();
    if(active) {
      qs.remove('filter[]', `${kind}=${code}`);
    } else {
      qs.add('filter[]', `${kind}=${code}`);
    }
    window.location.search = qs.toString();
  });
}

/**** SHOW FILTERED IMAGES *****/

const displayButton = document.querySelector('.hud-show');

displayButton.addEventListener('click', function() {
  const choice = document.querySelector('.choice');
  choice.style.top = '50vh';
});

/**** RESET FILTER *****/

const resetButton = document.querySelector('.hud-reset');
resetButton.addEventListener('click', function() {
  window.location.href = '/';
});

/**** CLOSE FILTERED IMAGES *****/

const choiceClose = document.querySelector('.choice-back');

choiceClose.addEventListener('click', function() {
  const choice = document.querySelector('.choice');
  choice.style.top = '100vh';
});

/**** LOAD CHOICES *****/

Selection.init();

const choices = document.querySelectorAll('.choice img');
const selectionContainer = document.querySelector('.selection .images');

refreshSelection();

for(const choice of choices) {
  choice.addEventListener('click', function() {
    const info = JSON.parse(this.getAttribute('data-info'));
    const current = Selection.load();
    current.push(info);
    Selection.store(current);
    refreshSelection();
  });
}

/**** LOAD CHOSEN IMAGES *****/

function refreshSelection() {
  selectionContainer.innerHTML = '';
  const images = Selection.load();
  for(const image of images) {
    const container = document.createElement('div');
    container.classList.add('img-container');
    container.classList.add(image.Grösse);
    container.classList.add(image.Ausrichtung);

    const img = document.createElement('img');
    img.src = `https://archiv.juergstraumann.ch/${image.path}`;
    container.appendChild(img);

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.innerHTML = `<b>${image.Titel}</b><br>${image.Jahr}`;
    container.appendChild(overlay);

    selectionContainer.appendChild(container);

    container.addEventListener('click', function() {
      const overlay = this.querySelector('.overlay');
      if(overlay.style.opacity == 0.8) {
        overlay.style.opacity = 0;
      } else {
        overlay.style.opacity = 0.8;
      }
    });
  }
}

/**** IMAGE SELECTION SCROLLER *****/

const scrollRightButton = document.querySelector('.image-scroll-right');

scrollRightButton.addEventListener('click', function() {
  const selection = document.querySelector('.images');
  selection.scroll({
    top: 0,
    left: selection.scrollLeft + 500,
    behavior: 'smooth'
  });
});
