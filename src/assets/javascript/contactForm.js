class ContactForm {
  constructor({ enterToProceedBtn, pagination, slider, contactFormInitialTextInput, contactFormTextInputContainer, showContactFormBtn, wrapper, submitFormBtn }) {
    Object.assign(this, {
      contactFormInitialTextInput,
      contactFormTextInputContainer,
      enterToProceedBtn,
      pagination,
      showContactFormBtn,
      slider,
      submitFormBtn,
      wrapper
    });
  };

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
  };

  getCurrentSlide() {
    var _this = this;
    this.slider.on('init reInit afterChange', function(_event, { currentSlide, slideCount }) {
      _this.pagination.text((currentSlide + 1) + '/' + slideCount);
      currentSlide === 0 ? _this.enterToProceedBtn.removeClass('hide') : _this.enterToProceedBtn.addClass('hide');
    });
  };

  animateFormButton() {
    let _this = this;
    this.contactFormInitialTextInput.on('keyup', function() {
      if($(this).val().length > 0) {
        _this.showContactFormBtn.addClass('aos-init');
        _this.showContactFormBtn.attr({ 'data-aos':'fade-up', 'data-aos-delay': '100', 'data-aos-duration': '500' });
        _this.showContactFormBtn.addClass('aos-animate');
      }
    });
  };

  showContactForm() {
    let _this = this;
    this.showContactFormBtn.click(function() {
      _this.wrapper.addClass("fullscreen vin");
    });
  };

  hideContactForm() {
    let _this = this;
    this.submitFormBtn.click(function() {
      _this.wrapper.removeClass("fullscreen");
      setTimeout(() =>{
        _this.wrapper.removeClass("vin");
      }, 500);
    });
  };

  enterKeyHandler() {
    let _this = this;
    $(document).on('keydown', function(event) {
      if(event.keyCode == 13 && _this.wrapper.hasClass('fullscreen')) {
        _this.slider.slick('slickNext');
      }
    });
  };

  hideShowContactFormBtnOnScroll() {
    let _this = this;
    if(!this.contactFormTextInputContainer.hasClass('aos-animate')) {
      this.showContactFormBtn.removeClass('aos-animate')
    } else if (this.contactFormTextInputContainer.hasClass('aos-animate') && this.showContactFormBtn.val().trim().length !== "") {
      setTimeout(function() {
        _this.showContactFormBtn.addClass('aos-animate')
      }, 500);
    }
  };

  init() {
    this.animateFormButton();
    this.enterKeyHandler();
    this.getCurrentSlide();
    this.hideContactForm();
    this.initFormSlider();
    this.showContactForm();
  }
};

export default ContactForm;
