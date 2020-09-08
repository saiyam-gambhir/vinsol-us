import '../index.js';

import Scrollbar from 'smooth-scrollbar';

Scrollbar.init(document.querySelector('.map-bg'));

$('.member-name').click(function () {
	$('.member-list-item').removeClass('show-info');
  $(this).closest('.member-list-item').toggleClass('show-info');
});
