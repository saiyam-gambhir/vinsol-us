/* Styles */
import './assets/styles/main.scss'

/* jQuery */
import jquery from "jquery";
import 'slick-carousel'
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

var $status = $('.pagingInfo');
var $slickElement = $('.slideshow');

$slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
    //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
    var i = (currentSlide ? currentSlide : 0) + 1;
    $status.text(i + '/' + slick.slideCount);
});

$slickElement.slick({
  infinite: false,
  arrows: true,
  prevArrow: $('.prev'),
  nextArrow: $('.next'),
});

$('.contact-button__link').click(function(){
  $(".contact-form-section").addClass("fsm");
  $(".contact-form-section").removeClass("shrink");
  $("html").addClass("fullscreen");
  $(".submit-btn").removeClass("fsm");
  $(".slider-form-wrap").addClass("show");
  $(".slider-form-wrap").removeClass("hide");

   $('html,body').animate({
    scrollTop: $(".contact").offset().top},
    '100');
});

$('.submit-btn').click(function(){
  $(".contact-form-section").removeClass("fsm");
  $(".contact-form-section").addClass("shrink");
  $(".slider-form-wrap").removeClass("show");
  $(".slider-form-wrap").addClass("hide");
  $("html").removeClass("fullscreen");
});
