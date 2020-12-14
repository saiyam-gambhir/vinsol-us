/* IMPORTS */
import '../index.js';
import Scrollbar from 'smooth-scrollbar';
/* ------------------------------------------------------------------------------- */

/* Map ScrollBar */
Scrollbar.init(document.querySelector('.map-bg'), {
  alwaysShowTracks: true,
  damping: 0.025
});
/* ------------------------------------------------------------------------------- */
