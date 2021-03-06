class QS {
  constructor() {
    this.qs = {};
    let s = location.search.replace(/^\?|#.*$/g, '');
    if(s) {
      var qsParts = s.split('&');
      for(const qsPart of qsParts) {
        const [key, value] = qsPart.split('=');
        this.add(key, decodeURIComponent(value));
      }
    }
  }

  add(key, value) {
    if(key.endsWith("[]")) {
      if(!this.qs[key]) {
        this.qs[key] = [];
      }
      this.qs[key].push(value);
    } else {
      this.qs[key] = value;
    }
  }

  remove(key, value) {
    if(key.endsWith("[]")) {
      const idx = this.qs[key].indexOf(value);
      const oldVal = this.qs[key];
      oldVal.splice(idx, 1);
      if(oldVal.length > 0) {
        this.qs[key] = oldVal;
      } else {
        delete this.qs[key];
      }
    } else {
      delete this.qs[key];
    }
  }

  getQueryString() {
    let q = [];
    for(const key in this.qs) {
      const value = this.qs[key];
      if(Array.isArray(value)) {
        for(const item of value) {
          q[q.length] = key + '=' + encodeURIComponent(item);
        }
      } else {
        q[q.length] = key + '=' + encodeURIComponent(value);
      }
    }
    return q.join('&');
  }

  toString() {
    return this.getQueryString();
  }
}
