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

import timeZones from './assets/javascript/timeZones'
import OurApproach from './assets/javascript/homePage/ourApproach'
import Navigation from './assets/javascript/navigation'

let ourApproachOptions = {
  stage: '.stage',
  window: window
}

let ourApproach = new OurApproach(ourApproachOptions);

let navigationOptions = {
  menuBtn: '#menu-toggle-btn',
  navigationList: '.navigation__list',
  navigationListItem: '.navigation__list-link'
}

let navigation = new Navigation(navigationOptions);
navigation.init();

scripts()

$(window).on('load scroll', function() {
  scrollBar()

  if(!$('.contact-input__inner').hasClass('aos-animate')) {
    $('.contact-button__link').removeClass('aos-animate')
  } else if ($('.contact-input__inner').hasClass('aos-animate') && $('.contact-input__inner').val().trim().length !== "") {
    setTimeout(function() {
      $('.contact-button__link').addClass('aos-animate')
    }, 450)
  }

  ourApproach.toggleStageColor();
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
      // var totalRows = this.scrollHeight/parseInt($('textarea').css('lineHeight'),10);
      // if(totalRows > initialRows) {
      //   $('.contact-input__inner').css({ width: $width + totalRows*10 + 'px' });
      //   $('.shape-scale').css({ width: $width + totalRows*10 + 'px' });
      //   initialRows = initialRows + 1;
      // }
    }
  })
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
  fade:true,
  adaptiveHeight: true
});

$(document).on('keydown', function(e) {
  if(e.keyCode == 13) {
    $slickElement.slick('slickNext');
  }
});

$('.contact-button__link').click(function(){
  $("html").addClass("fullscreen vin");
  $('html,body').animate({
    scrollTop: $(".contact").offset().top}, '100');
});

$('.submit-btn').click(function(){
  $("html").removeClass("fullscreen");
  setTimeout(function(){
    $("html").removeClass("vin");
  }, 500);
});
