import '../index.js';
import Scrollbar from 'smooth-scrollbar';

Scrollbar.init(document.querySelector('.map-bg'), {
  alwaysShowTracks: true,
  damping: 0.025
});

$('.member-name').click(function (event) {
  event.stopPropagation();
	$('.member-list-item').removeClass('show-info');
  $(this).closest('.member-list-item').toggleClass('show-info');
});

$('body').on('click', function() {
  $('.member-list-item').removeClass('show-info');
});
