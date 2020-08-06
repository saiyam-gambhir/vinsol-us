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

scripts()

$(window).on('load scroll', function() {
  scrollBar()
})
