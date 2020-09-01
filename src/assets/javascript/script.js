const scripts = () => {
  var $menuButton = $('#menu-toggle-btn');
  var $navigationList = $('.navigation__list');

  $(document).ready(function() {
    $('[data-hook=type-here]').on('keyup', function() {
      if($(this).val().length > 0) {
        $('.contact-button__link').addClass('aos-init');
        $('.contact-button__link').attr({ 'data-aos':'fade-up', 'data-aos-delay': '100', 'data-aos-duration': '500' });
        $('.contact-button__link').addClass('aos-animate');
      }
    });
  });

  $(window).on('load scroll', function() {
    if($(this).scrollTop() > 0) {
      $menuButton.addClass('scrolled');
      $navigationList.addClass('scrolled');
    } else {
      $menuButton.removeClass('scrolled');
      $navigationList.removeClass('scrolled');
    }
  });

  $(document).ready(function() {
    $navigationList.addClass('open');
    $menuButton.addClass('open');
  });
}

export { scripts }
