/* IMPORTS */
import '../index.js';
import Scrollbar from 'smooth-scrollbar';
/* ------------------------------------------------------------------------------- */

/* Map ScrollBar */
if($(window).width() < 1025) {
  let scrollbar = Scrollbar.init(document.querySelector('.map-bg'), {
    alwaysShowTracks: true,
    damping: 0.025
  });

  /* Center the scrollbar on map */
  let contentSize = scrollbar.size.content.width;
  let containerSize = scrollbar.size.container.width;
  scrollbar.scrollLeft = (contentSize - containerSize) / 2;
}
/* ------------------------------------------------------------------------------- */
