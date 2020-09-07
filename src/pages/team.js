import '../index.js';

$('.member-name').click(function () {
	$('.member-list-item').removeClass('show-info');
  $(this).closest('.member-list-item').toggleClass('show-info');
});
