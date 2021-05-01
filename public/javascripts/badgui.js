const templates = {
  prompt:
`<div class="window prompt">
  <div class="head">
    <h3>{{title}}</h3>
  </div>
  <div class="content">
    <p>{{{text}}}</p>

    {{#options}}
      {{#inputs}}
        {{#label}}
          <label for="{{name}}">{{label}}</label>
        {{/label}}
        <input id="{{name}}" {{#attrs}} {{ key }}="{{ value }}"{{/attrs}}>
      {{/inputs}}
    {{/options}}
  </div>
  <div class="foot">
  {{#options}}
    {{#buttons}}
      <button action="{{label}}">{{label}}</button>
    {{/buttons}}
  {{/options}}
  </div>
</div>`,
  alert:
  `<div class="window alert">
  <div class="head">
    <h3>{{title}}</h3>
  </div>
  <div class="content">
    {{{text}}}
  </div>
  <div class="foot">
  {{#options}}
    {{#buttons}}
      <button action="{{label}}">{{label}}</button>
    {{/buttons}}
  {{/options}}
  </div>
</div>`
};

class Popup {
  constructor(title, text, options) {
    const template = Mustache.render(templates[this.constructor.name.toLowerCase()], { title, text, options });
    const $window = Popup._htmlToElement(template);

    const $foot = $window.querySelector('.foot');

    if(options.buttons) {
      for(const button of options.buttons) {
        const $button = $foot.querySelector(`button[action=${button.label}]`)
        $button.addEventListener('click', button.action.bind(this));
      }
    }

    this.window = $window;
  }

  element() {
    return this.window;
  }

  open() {
    document.body.appendChild(this.window);
  }

  close() {
    document.body.removeChild(this.window);
  }

  static _htmlToElement(html) {
    const template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  }
}

class Prompt extends Popup {
  constructor(title, text, options) {
    options.inputs = options.inputs.map(x => Prompt._toAttrs(x));
    super(title, text, options);
  }

  data() {
    const $inputs = this.window.querySelectorAll('input');
    const dat = {};
    for(const $input of $inputs) {
      dat[$input.name] = $input.value;
    }
    return dat;
  }

  static _toAttrs(data) {
    const ret = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        ret.push({ "key": key, "value": data[key] });
      }
    }
    const x = data;
    x.attrs = ret;
    return x;
  }
}

class Alert extends Popup {
  constructor(title, text, options) {
    super(title, text, options || {});
  }
}

const badgui = {
  prompt: Prompt,
  alert: Alert
};
