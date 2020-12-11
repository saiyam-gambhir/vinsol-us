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

/* Show Member Details */
$('.member-name').on('click', function (event) {
  event.stopPropagation();
  // $('.member-list-item').removeClass('show-info');
  // $(this).closest('.member-list-item').toggleClass('show-info');
});
/* ------------------------------------------------------------------------------- */

/* Hide Member Details */
$('body').on('click', function() {
  // $('.member-list-item').removeClass('show-info');
});
/* ------------------------------------------------------------------------------- */
