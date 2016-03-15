;(function () {
  if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
          FastClick.attach(document.body);
      }, false);
  }
  document.querySelector('.drawer-toggle').addEventListener('click', function (e) {
    document.querySelector('#navbar').classList.toggle('draw');
  }, false);
})()
