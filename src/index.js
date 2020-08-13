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
});
