const scripts = () => {
  var $menuButton = $('#menu-toggle-btn');
  var $navigationList = $('.navigation__list');

  $(window).on('load scroll', function() {
    if($(this).scrollTop() > 0) {
      $menuButton.addClass('scrolled');
      $navigationList.addClass('scrolled');
    } else {
      $menuButton.removeClass('scrolled');
      $navigationList.removeClass('scrolled');
    }
  });
}

export { scripts }
