class Selection {
  static init() {
    const sel = this.load();
    if(!sel) {
      this.store([]);
    }
  }

  static store(val) {
    localStorage.setItem('selection', JSON.stringify(val));
  }

  static load() {
    return JSON.parse(localStorage.getItem('selection'));
  }
}
