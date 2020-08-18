const scripts = () => {
  var $menuButton = $('#menu-toggle-btn');
  var $navigationList = $('.navigation__list');
  var $navigationListItem = $('.navigation__list').find('.navigation__list-link');

  $(document).ready(function() {
    $menuButton.on('click', function(event) {
      $(this).addClass('open');
      $navigationList.addClass('open');
      event.stopPropagation();
    });

    $navigationListItem.on('click', function(event) {
      event.preventDefault();
      $('html,body').animate({ scrollTop: $(this.hash).offset().top }, 500);
      $('.navigation__list-item').removeClass('active');
      $(this).closest('li').addClass('active');
    });

    $('[data-hook=type-here]').on('keyup', function() {
      if($(this).val().length > 0) {
        $('.contact-button__link').addClass('aos-init');
        $('.contact-button__link').attr({ 'data-aos':'fade-up', 'data-aos-delay': '100', 'data-aos-duration': '350' });
        $('.contact-button__link').addClass('aos-animate');
      }
    });
  });

  $(window).on('load', function() {
    $navigationList.addClass('open');
    $menuButton.addClass('open');
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
}

export { scripts }
