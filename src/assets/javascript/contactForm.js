class ContactForm {
  constructor({ budgetOption, characterWidth, contactFormInitialTextInput, contactFormTextInputContainer, enterToProceedBtn, formInput, pagination, showContactFormBtn, slider, submitFormBtn, supportOption, user, wrapper }) {
    Object.assign(this, {
      budgetOption,
      characterWidth,
      contactFormInitialTextInput,
      contactFormTextInputContainer,
      enterToProceedBtn,
      formInput,
      pagination,
      showContactFormBtn,
      slider,
      submitFormBtn,
      supportOption,
      user,
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

  checkUserRequirementBeforeOpeningForm() {
    return this.contactFormInitialTextInput.val().trim() !== '';
  };

  showContactForm() {
    let _this = this;
    let flag = false;
    this.showContactFormBtn.click(function() {
      _this.wrapper.addClass("fullscreen vin");
      if(_this.checkUserRequirementBeforeOpeningForm() && !flag) {
        _this.slider.slick('slickRemove', 2);
      }
      flag = true;
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

  selectSupportOptionsHandler() {
    let _this = this;
    this.supportOption.on('click', function() {
      let $this = $(this);
      if($this.prop('checked') == true) {
        _this.user.supportOptionsList.push($this.attr('id'))
      } else {
        _this.user.supportOptionsList.splice(_this.user.supportOptionsList.indexOf($this.attr('id')), 1);
      }
    });
  };

  selectBudgetHandler() {
    let _this = this;
    this.budgetOption.change(function() {
      let $this = $(this);
      if($(this).prop('checked') == true) {
        _this.user.budget = $this.data('budget');
      }
    });
  };

  collectFormData() {
    let { budget, email, name, supportOptionsList, query } = this.user;
    let formData = {
      budget: budget,
      email: email.val(),
      name : name.val(),
      query: query.val() || this.contactFormInitialTextInput.val(),
      support_options: supportOptionsList
    }
    console.log(formData);
    // Todo: use axios to send the form data
  };

  calculateInputWidthHandler() {
    let _this = this;
    this.formInput.on('keyup', function() {
      let $this = $(this);
      if($this.val().length === 0) {
        $this.css('width', '170px');
        $this.removeClass('not-empty');
      } else {
        $this.css('width', (this.value.length + 1) * _this.characterWidth + 'px');
        $this.addClass('not-empty');
      }
    });
  };

  clearForm() {
    this.budgetOption.prop("checked", false);
    this.contactFormInitialTextInput.val('');
    this.supportOption.prop("checked", false);
    this.user.budget = '';
    this.user.email.val('').removeClass('not-empty').removeAttr('style');
    this.user.name.val('').removeClass('not-empty').removeAttr('style');
    this.user.query.val('').removeClass('not-empty').removeAttr('style');
    this.user.supportOptionsList = [];
  };

  submitFormHandler() {
    let _this = this;
    this.submitFormBtn.on('click', function() {
      _this.wrapper.removeClass("fullscreen");
      _this.collectFormData();
      _this.clearForm();
      setTimeout(() =>{
        _this.slider.slick('slickGoTo', 0);
        _this.wrapper.removeClass("vin");
      }, 500);
    });
  };

  init() {
    this.animateFormButton();
    this.calculateInputWidthHandler();
    this.enterKeyHandler();
    this.getCurrentSlide();
    this.initFormSlider();
    this.selectBudgetHandler();
    this.selectSupportOptionsHandler();
    this.showContactForm();
    this.submitFormHandler();
  }
};

export default ContactForm;
