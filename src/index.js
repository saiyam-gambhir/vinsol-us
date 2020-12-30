/* IMPORTS */
import './assets/styles/main.scss';
import 'aos/dist/aos.css';
import 'pepjs';
import AOS from 'aos';
import Navigation from './assets/javascript/navigation';
import ScrollBar from './assets/javascript/scrollBar';
import TimeZones from './assets/javascript/timeZones';
import jquery from "jquery";
export default (window.$ = window.jQuery = jquery);
window.APIKEY = 'key4GFYRxkE4XHE17';
/* ------------------------------------------------------------------------------- */

/* NAVIGATION */
var navigationOptions = {
  body: $('body'),
  clientsFooterLink: $('[data-hook=clients-footer-link]'),
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
});
/* ------------------------------------------------------------------------------- */

/* Window on load events */
$(window).on('load', function() {
  if($(this).width() > 1024) {
    $('#menu-toggle-btn, #navigation-menu').addClass('open');
  }
  $('#loading').slideUp('slow');
  AOS.init();
});
/* ------------------------------------------------------------------------------- */

/* Move to Navigation File and optimize */
(function () {
    var scrollContainer = document.querySelector('body'),
        scrollContentWrapper = document.querySelector('.wrapper'),
        contentPosition = 0,
        scrollerBeingDragged = false,
        scroller,
        normalizedPosition,
        scrollerHeight;

    function calculateScrollerHeight() {
      var visibleRatio = scrollContainer.offsetHeight / scrollContentWrapper.scrollHeight;
      return visibleRatio * scrollContainer.offsetHeight;
    }

    // 136 height of scrollbar
    function moveScroller(evt) {
      let wrapperScrollTop = $('.wrapper').scrollTop(),
          wrapperHeight = $('.wrapper__inner').height(),
          windowHeight = $(window).height(),
          scrollPercentage = (wrapperScrollTop / (wrapperHeight - windowHeight)),
          positionTop = (scrollPercentage * (windowHeight - 136));

      scroller.style.transform = positionTop + 'px';
      $('.navigation').css('transform', 'translateY(' + positionTop + 'px)');

      if((positionTop + 136).toFixed(2) > windowHeight - 40) {
        $('.navigation__list').addClass('at-bottom');
      } else {
        $('.navigation__list').removeClass('at-bottom');
      }
    }

    function startDrag(evt) {
      normalizedPosition = evt.pageY;
      contentPosition = scrollContentWrapper.scrollTop;
      scrollerBeingDragged = true;
    }

    function stopDrag(evt) {
      scrollerBeingDragged = false;
    }

    function scrollBarScroll(evt) {
      if (scrollerBeingDragged === true) {
        var mouseDifferential = evt.pageY - normalizedPosition;
        var scrollEquivalent = mouseDifferential * (scrollContentWrapper.scrollHeight / scrollContainer.offsetHeight);
        scrollContentWrapper.scrollTop = contentPosition + scrollEquivalent;
      }
      if(scrollerBeingDragged) {
        $('body').addClass('page-dragging');
        window.getSelection ? window.getSelection().removeAllRanges() : null;
      } else {
        $('body').removeClass('page-dragging');
      }
    }

    function createScroller() {
      scroller = document.querySelector('#menu-toggle-btn');
      scrollerHeight = calculateScrollerHeight();

      if (scrollerHeight / scrollContainer.offsetHeight < 1) {
        if(window.width < 1025) {
          scroller.addEventListener('touchstart', startDrag);
          window.addEventListener('touchend', stopDrag);
          window.addEventListener('touchmove', scrollBarScroll);
        } else {
          scroller.addEventListener('pointerdown', startDrag);
          window.addEventListener('pointerup', stopDrag);
          window.addEventListener('mousemove', scrollBarScroll);
        }
      }
    }

    createScroller();
    scrollContentWrapper.addEventListener('scroll', moveScroller);
}());
/* ------------------------------------------------------------------------------- */
