const scrollLeftButton = document.querySelector('.image-scroll.scroll-left');
const scrollRightButton = document.querySelector('.image-scroll.scroll-right');
const selection = document.querySelector('.images');
const filters = document.querySelectorAll('.filter');
const displayButton = document.querySelector('.hud-show');
const resetButton = document.querySelector('.hud-reset');
const choiceClose = document.querySelector('.choice-back');
const choices = document.querySelectorAll('.choice img');
const selectionContainer = document.querySelector('.selection .images');
const offersButton = document.querySelector('.offers');
const saveButton = document.querySelector('.save');
const imprintButton = document.querySelector('.imprint');


/**** FILTER CLICK HANDLER *****/

for(const filter of filters) {
  filter.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    const kind = this.getAttribute('data-kind');
    const codes = JSON.parse(this.getAttribute('data-codes'));

    const indicator = this.querySelector('.indicator');
    const active = indicator.classList.contains('active');

    const qs = new QS();
    for(const code of codes) {
      if(active) {
        qs.remove('filter[]', `${kind}=${code}`);
        indicator.classList.remove('active');
      } else {
        qs.add('filter[]', `${kind}=${code}`);
        indicator.classList.add('active');
      }
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

  window.setTimeout(function() {
    document.querySelector('.selection .images').scroll({
      left: 100000,
      behavior: 'smooth'
    });
  }, 200);

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

/**** MENU ****/

KioskBoard.Init({
  keysArrayOfObjects: [ { "0": "Q", "1": "W", "2": "E", "3": "R", "4": "T", "5": "Z", "6": "U", "7": "I", "8": "O", "9": "P", "10": "Ü" }, { "0": "A", "1": "S", "2": "D", "3": "F", "4": "G", "5": "H", "6": "J", "7": "K", "8": "L", "9": "Ö", "10": "Ä" }, { "0": "Y", "1": "X", "2": "C", "3": "V", "4": "B", "5": "N", "6": "M" } ],
  allowRealKeyboard: true,
  capsLockActive: false,
  theme: 'flat'
});

saveButton.addEventListener('click', function() {
  const prompt = new badgui.prompt('Speichern', 'Hier kannst du deine Bilderreihe oder deinen Kommentar unter deinem wirklichen oder einem Fantasienamen abspeichern. Gerne kannst du deine Reihe mit einem Titel versehen und/oder einen Kommentar abgeben.', {
    inputs: [
      { label: 'Titel', type: 'text', name: 'title', "data-kioskboard-type": "keyboard", "data-kioskboard-specialcharacters": false },
      { label: 'Benutzer*innen-Name', type: 'text', name: 'username', "data-kioskboard-type": "keyboard", "data-kioskboard-specialcharacters": false }
    ],
    buttons: [{
      label: 'Abbrechen', action: function() {
        this.close();
      }
    }, {
      label: 'Speichern', action: function() {
        const data = this.data();
        data.images = JSON.parse(localStorage.getItem('selection'));
        const that = this;
        post('/collections', data, function() {
          that.close();
          window.document.body.click();
          window.location.href = '/collections';
        });
      }
    }]
  });

  prompt.open();

  KioskBoard.Run('[data-kioskboard-type=keyboard]');
});

imprintButton.addEventListener('click', function() {
  const alert = new badgui.alert('Impressum', document.querySelector('.fragments > .imprint').outerHTML, {
    buttons: [{
      label: 'Schliessen', action: function() {
        this.close();
      }
    }]
  });
  alert.open();
})

const windowStack = [];

const offerText = document.querySelector('.fragments > .offers').outerHTML;

offersButton.addEventListener('click', function() {
  const popup = new badgui.alert('Angebote', offerText, {
    buttons: [{
      label: 'Schliessen', action: function() {
        this.close();
      }
    }]
  });
  popup.open();

  const startButtons = popup.element().querySelectorAll('.offer .offer-start');
  startButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const url = this.getAttribute('data-url');
      if(url) {
        popup.close();
        window.location.href = url;
      }
    });
  });

  const infoButtons = popup.element().querySelectorAll('.offer .offer-info');
  infoButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const name = this.parentNode.getAttribute('data-name');
      const infoText = document.querySelector('.fragments > .offers-' + name.toLowerCase().replace(' ', '')).innerHTML;
      const a2 = new badgui.alert(name, infoText, {
        buttons: [{
          label: 'Schliessen', action: function() {
            this.close();
            if(windowStack.length > 0) {
              const prev = windowStack.pop();
              prev.open();
            }
          }
        }]
      });
      a2.open();
      windowStack.push(popup);
      popup.close();
    });
  });

  popup.element().querySelector('.offer .offer-start').addEventListener('click', function() {
    const name = this.parentNode.getAttribute('data-name').toLowerCase().replace(' ', '');
    if(name == 'domino') {
      window.location.reload();
    }
  });
});

function post(url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(xhr.responseText);
    }
  };
  xhr.send(JSON.stringify(data));
}
