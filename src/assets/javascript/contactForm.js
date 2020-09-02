class ContactForm {
  constructor({ enterToProceedBtn, pagination, slider, contactFormInitialTextInput, showContactFormBtn }) {
    Object.assign(this, { enterToProceedBtn, pagination, slider, contactFormInitialTextInput, showContactFormBtn });
  }

  initFormSlider() {
    this.slider.slick({
      adaptiveHeight: true,
      arrows: true,
      fade: true,
      infinite: false,
      nextArrow: $('.next'),
      prevArrow: $('.prev')
    });
    let $slick = this.slider.slick('getSlick');
    this.pagination.text(($slick.currentSlide + 1) + '/' + $slick.$slides.length);
  }

  getCurrentSlide() {
    var _this = this;
    this.slider.on('init reInit afterChange', function(_event, { currentSlide, slideCount }) {
      _this.pagination.text((currentSlide + 1) + '/' + slideCount);
      currentSlide === 0 ? _this.enterToProceedBtn.removeClass('d-none') : _this.enterToProceedBtn.addClass('d-none');
    });
  }

  activateFormButton() {
    // $('[data-hook=type-here]').on('keyup', function() {
    //   if($(this).val().length > 0) {
    //     $('.contact-button__link').addClass('aos-init');
    //     $('.contact-button__link').attr({ 'data-aos':'fade-up', 'data-aos-delay': '100', 'data-aos-duration': '500' });
    //     $('.contact-button__link').addClass('aos-animate');
    //   }
    // });
    let _this = this;
    this.contactFormInitialTextInput.on('keyup', function() {
      if($(this).val().length > 0) {
        _this.showContactFormBtn.addClass('aos-init');
        _this.showContactFormBtn.attr({ 'data-aos':'fade-up', 'data-aos-delay': '100', 'data-aos-duration': '500' });
        _this.showContactFormBtn.addClass('aos-animate');
      }
    });
  }

  init() {
    this.initFormSlider();
    this.getCurrentSlide();
    this.activateFormButton();
  }
};

export default ContactForm;
