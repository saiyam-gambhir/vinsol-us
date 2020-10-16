/* IMPORTS */
import './assets/styles/main.scss';
import jquery from "jquery";
export default (window.$ = window.jQuery = jquery);
import Navigation from './assets/javascript/navigation';
import ScrollBar from './assets/javascript/scrollBar';
import TimeZones from './assets/javascript/timeZones';
/* ------------------------------------------------------------------------------- */

/* AOS */
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();
/* ------------------------------------------------------------------------------- */

/* NAVIGATION */
var navigationOptions = {
  body: $('body'),
  menuBtn: $('#menu-toggle-btn'),
  navigationList: $('.navigation__list'),
  navigationListItem: $('.navigation__list-link'),
  navigationListItemParent: $('.navigation__list-item'),
  userNameField: $('[data-hook=user-name]'),
  wrapper: $('.wrapper')
};

var navigation = new Navigation(navigationOptions);
navigation.init();
/* ------------------------------------------------------------------------------- */

/* SCROLLBAR */
var scrollBarOptions = {
  menuBtn: $('#menu-toggle-btn'),
  navigation: $('.navigation'),
  navigationList: $('.navigation__list'),
  wrapper: $('.wrapper'),
  wrapperInner: $('.wrapper__inner')
};

var scrollBar = new ScrollBar(scrollBarOptions);
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

/* Wrapper on scroll events */
$('.wrapper').on('scroll', function(event) {
  AOS.refresh();
  navigation.hideNavigationOnScroll();

  if($(this).scrollTop() > 0) {
    scrollBar.convertMenuToScrollBar();
  } else {
    scrollBar.convertScrollBarToMenu();
  }

  scrollBar.navigationScrollHandler();
});
/* ------------------------------------------------------------------------------- */

/* Window on load events */
$(window).on('load', function() {
  $('#menu-toggle-btn, #navigation-menu').addClass('open');
});
/* ------------------------------------------------------------------------------- */
