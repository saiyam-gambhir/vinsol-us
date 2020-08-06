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

    $navigationListItem.on('click', function(_event) {
      $('html,body').animate({ scrollTop: $(this.hash).offset().top }, 500, 'swing');
      $('.navigation__list-item').removeClass('active');
      $(this).closest('li').addClass('active');
    });

    $('[data-hook=type-here]').on('keyup', function() {
      if($(this).val().length > 0) {
        $('.contact-button__link').addClass('aos-init');
        $('.contact-button__link').attr({ 'data-aos':'fade-up', 'data-aos-delay': '450', 'data-aos-duration': '1000' });
        $('.contact-button__link').addClass('aos-animate');
      } else {
        $('.contact-button__link').removeClass('aos-animate');
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
