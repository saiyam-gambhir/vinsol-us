/* IMPORTS */
import './assets/styles/main.scss';
import jquery from "jquery";
export default (window.$ = window.jQuery = jquery);
import 'slick-carousel';
import ContactForm from './assets/javascript/contactForm';
import Navigation from './assets/javascript/navigation';
import OurApproach from './assets/javascript/ourApproach';
import ScrollBar from './assets/javascript/scrollBar';
import TimeZones from './assets/javascript/timeZones';
/* ------------------------------------------------------------------------------- */

/* AOS */
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();
/* ------------------------------------------------------------------------------- */

/* OUR APPROACH */
var ourApproachOptions = {
  stage: $('.stage'),
  window: $(window)
};

var ourApproach = new OurApproach(ourApproachOptions);
/* ------------------------------------------------------------------------------- */

/* NAVIGATION */
var navigationOptions = {
  body: $('body'),
  menuBtn: $('#menu-toggle-btn'),
  navigationList: $('.navigation__list'),
  navigationListItem: $('.navigation__list-link'),
  navigationListItemParent: $('.navigation__list-item'),
  wrapper: $('.wrapper')
};

var navigation = new Navigation(navigationOptions);
navigation.init();
/* ------------------------------------------------------------------------------- */

/* CONTACT FORM */
var contactFormOptions = {
  contactFormInitialTextInput: $('[data-hook=type-here]'),
  contactFormTextInputContainer: $('.contact-input__inner'),
  enterToProceedBtn: $('[data-hook=press-enter-to-proceed]'),
  pagination: $('.pagingInfo'),
  showContactFormBtn: $('.contact-button__link'),
  slider: $('.slideshow'),
  submitFormBtn: $('[data-hook=submit-form]'),
  wrapper: $('.wrapper')
};

var contactForm = new ContactForm(contactFormOptions);
contactForm.init();
/* ------------------------------------------------------------------------------- */

/* TIMEZONES */
var timeZonesOptions = {
  flash: $('.time-flash')
};

var timeZones = new TimeZones(timeZonesOptions);

setInterval(() => {
  timeZones.init();
}, 1000);
/* ------------------------------------------------------------------------------- */

/* SCROLLBAR */
var scrollBarOptions = {
  menuBtn: $('#menu-toggle-btn'),
  navigationList: $('.navigation__list')
};

var scrollBar = new ScrollBar(scrollBarOptions);
/* ------------------------------------------------------------------------------- */

/* Wrapper on scroll events */
$('.wrapper').on('scroll', function() {
  AOS.refresh();
  contactForm.hideShowContactFormBtnOnScroll();
  navigation.hideNavigationOnScroll();
  ourApproach.toggleStageColor();

  if($(this).scrollTop() > 0) {
    scrollBar.convertMenuToScrollBar();
  } else {
    scrollBar.convertScrollBarToMenu();
  }
});
/* ------------------------------------------------------------------------------- */

/* Window on load events */
$(window).on('load', function() {
  $('#menu-toggle-btn, #navigation-menu').addClass('open');
});
/* ------------------------------------------------------------------------------- */
