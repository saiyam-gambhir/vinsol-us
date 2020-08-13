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

$('.contact-button__link').click(function(){
  $(".contact-form-section").addClass("fsm");
  $("html").addClass("fullscreen");
  $(".rem-btn").removeClass("fsm");
});

$('.rem-btn').click(function(){
  $(".contact-form-section").removeClass("fsm");
  $(".contact-form-section").addClass("shrink");
});



