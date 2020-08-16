/* Styles */
import './assets/styles/main.scss'

/* jQuery */
import jquery from "jquery";
export default (window.$ = window.jQuery = jquery);

/* AOS */
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

import { scripts } from './assets/javascript/script'
import { scrollBar } from './assets/javascript/scrollBar'
import timeZones from './assets/javascript/timeZones'

scripts()

$(window).on('load scroll', function() {
  scrollBar()
});

$(document).ready(function() {
  setInterval(timeZones.showTime, 1000);

  var flash = $('.time-flash');
  setInterval(function() {
    flash.css('opacity', (flash.css('opacity') == 1 ? 0 : 1));
  }, 1000);

  var typeHere = $('[data-hook=type-here]');
  var initialRows = 1;

  typeHere.on('input', function() {
    var $width = $('.contact-input__inner').outerWidth();
    this.style.height = '';
    if(this.scrollHeight > 45) {
      this.style.height = this.scrollHeight + "px";
      var totalRows = this.scrollHeight/parseInt($('textarea').css('lineHeight'),10);
      console.log(totalRows);
      if(totalRows > initialRows) {
        $('.contact-input__inner').css({ width: $width + totalRows*10 + 'px' });
        $('.shape-scale').css({ width: $width + totalRows*10 + 'px' });
        initialRows = initialRows + 1;
      }
    }
  })
});
