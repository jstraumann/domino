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
