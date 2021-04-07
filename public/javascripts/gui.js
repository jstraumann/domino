const templates = {
  prompt:
`<div class="window prompt">
  <div class="head">
    <h3>{{title}}</h3>
  </div>
  <div class="content">
    <p>{{text}}</p>

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
</div>`
};

class Prompt {
  constructor(title, text, options) {
    options.inputs = options.inputs.map(x => toAttrs(x));
    const template = Mustache.render(templates.prompt, { title, text, options });
    const $window = htmlToElement(template);

    const $foot = $window.querySelector('.foot');

    if(options.buttons) {
      for(const button of options.buttons) {
        const $button = $foot.querySelector(`button[action=${button.label}]`)
        $button.addEventListener('click', button.action.bind(this));
      }
    }

    this.window = $window;
  }

  data() {
    const $inputs = this.window.querySelectorAll('input');
    const dat = {};
    for(const $input of $inputs) {
      dat[$input.name] = $input.value;
    }
    return dat;
  }

  open() {
    document.body.appendChild(this.window);
  }

  close() {
    document.body.removeChild(this.window);
  }
}

function htmlToElement(html) {
  const template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

function toAttrs(data) {
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

const gui = {
  prompt: Prompt
};
