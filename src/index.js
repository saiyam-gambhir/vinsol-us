/* STYLES */
import './assets/styles/main.scss';
/* ----------------------------------------------------------------------------------------- */

/* JQUERY */
import jquery from "jquery";
import 'slick-carousel';
export default (window.$ = window.jQuery = jquery);
/* ----------------------------------------------------------------------------------------- */

/* AOS */
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();
document.querySelector('.wrapper').addEventListener("scroll", AOS.refresh);
/* ----------------------------------------------------------------------------------------- */

/* IMPORTS */
import { scripts } from './assets/javascript/script';
import { scrollBar } from './assets/javascript/scrollBar';
import ContactForm from './assets/javascript/contactForm';
import Navigation from './assets/javascript/navigation';
import OurApproach from './assets/javascript/ourApproach';
import TimeZones from './assets/javascript/timeZones';
/* ----------------------------------------------------------------------------------------- */

/* OUR APPROACH */
var ourApproachOptions = {
  stage: $('.stage'),
  window: $(window)
}

var ourApproach = new OurApproach(ourApproachOptions);
/* ----------------------------------------------------------------------------------------- */

/* NAVIGATION */
var navigationOptions = {
  menuBtn: $('#menu-toggle-btn'),
  navigationList: $('.navigation__list'),
  navigationListItem: $('.navigation__list-link'),
  navigationListItemParent: $('.navigation__list-item'),
  wrapper: $('.wrapper')
}

var navigation = new Navigation(navigationOptions);
navigation.init();
/* ----------------------------------------------------------------------------------------- */

/* CONTACT FORM */
var contactFormOptions = {
  contactFormInitialTextInput: $('[data-hook=type-here]'),
  enterToProceedBtn: $('[data-hook=press-enter-to-proceed]'),
  pagination: $('.pagingInfo'),
  showContactFormBtn: $('.contact-button__link'),
  slider: $('.slideshow')
}

var contactForm = new ContactForm(contactFormOptions);
contactForm.init();
/* ----------------------------------------------------------------------------------------- */

/* TIMEZONES */
var timeZones = new TimeZones();

setInterval(() => {
  timeZones.showTime();
}, 1000);
/* ----------------------------------------------------------------------------------------- */


scripts()

$(window).on('load scroll', function() {
  if(!$('.contact-input__inner').hasClass('aos-animate')) {
    $('.contact-button__link').removeClass('aos-animate')
  } else if ($('.contact-input__inner').hasClass('aos-animate') && $('.contact-input__inner').val().trim().length !== "") {
    setTimeout(function() {
      $('.contact-button__link').addClass('aos-animate')
    }, 450)
  }
});

$('.wrapper').on('scroll', function() {
  scrollBar()
  ourApproach.toggleStageColor();
});

$(window).on('load', function() {
  $('#menu-toggle-btn, #navigation-menu').addClass('open');
});

$(document).ready(function() {
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
