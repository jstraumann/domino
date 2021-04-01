const scrollLeftButton = document.querySelector('.image-scroll.scroll-left');
const scrollRightButton = document.querySelector('.image-scroll.scroll-right');
const selection = document.querySelector('.images');
const filters = document.querySelectorAll('.filter');
const displayButton = document.querySelector('.hud-show');
const resetButton = document.querySelector('.hud-reset');
const choiceClose = document.querySelector('.choice-back');
const choices = document.querySelectorAll('.choice img');
const selectionContainer = document.querySelector('.selection .images');


/**** FILTER CLICK HANDLER *****/

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

displayButton.addEventListener('click', function() {
  const choice = document.querySelector('.choice');
  choice.style.top = document.querySelector('.selection').clientHeight + 'px';
});

/**** RESET FILTER *****/

resetButton.addEventListener('click', function() {
  window.location.href = '/';
});

/**** CLOSE FILTERED IMAGES *****/

choiceClose.addEventListener('click', function() {
  const choice = document.querySelector('.choice');
  choice.style.top = '100vh';
});

/**** LOAD CHOICES *****/

Selection.init();

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

    const template = document.getElementById('image-template').innerHTML;
    const previewString = Mustache.render(template, { image: image, info: JSON.stringify(image) });
    const preview = htmlToElement(previewString);
    selectionContainer.appendChild(preview);

    preview.addEventListener('click', function() {
      const overlay = this.querySelector('.overlay');
      if(overlay.style.display == 'flex') {
        overlay.style.display = 'none';
      } else {
        overlay.style.display = 'flex';
      }
    });

    preview.querySelector('.remove-preview').addEventListener('click', function() {
      const current = Selection.load();
      const infoStr = this.parentNode.parentNode.getAttribute('data-info');
      const info = JSON.parse(infoStr);
      const match = current.find(function(img) { return img.path == info.path });
      const idx = current.indexOf(match);
      current.splice(idx, 1);
      Selection.store(current);
      refreshSelection();
    });
  }

  showHideButtons();
}

function htmlToElement(html) {
  const template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

/**** IMAGE SELECTION SCROLLER *****/

selection.addEventListener('scroll', showHideButtons);
window.addEventListener('resize', showHideButtons);

showHideButtons();

function showHideButtons() {
  if(selection.scrollLeft <= 0) {
    scrollLeftButton.style.display = 'none';
  } else {
    scrollLeftButton.style.display = 'block';
  }

  if(selection.scrollLeft + selection.clientWidth >= selection.scrollWidth) {
    scrollRightButton.style.display = 'none';
  } else {
    scrollRightButton.style.display = 'block';
  }
}

scrollRightButton.addEventListener('click', function() {
  selection.scroll({
    top: 0,
    left: selection.scrollLeft + 500,
    behavior: 'smooth'
  });
});

scrollLeftButton.addEventListener('click', function() {
  selection.scroll({
    top: 0,
    left: selection.scrollLeft - 500,
    behavior: 'smooth'
  });
});
