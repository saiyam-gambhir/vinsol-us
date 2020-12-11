import Airtable from 'airtable';

class ContactForm {
  constructor({ budgetOption, characterWidth, contactFormTextInputContainer, enterToProceedBtn, formInput, pagination, showContactFormBtn, slider, submitFormBtn, supportOption, navToggleBtn, user, wrapper }) {
    Object.assign(this, {
      budgetOption,
      characterWidth,
      contactFormTextInputContainer,
      enterToProceedBtn,
      formInput,
      pagination,
      showContactFormBtn,
      slider,
      submitFormBtn,
      supportOption,
      navToggleBtn,
      user,
      wrapper
    });
  };

  initFormSlider() {
    this.slider.slick({
      accessibility: false,
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
    let _this = this;
    this.slider.on('init reInit afterChange', function(_event, { currentSlide, slideCount }) {
      _this.pagination.text((currentSlide + 1) + '/' + slideCount);
      currentSlide === 0 ? _this.enterToProceedBtn.removeClass('hide') : _this.enterToProceedBtn.addClass('hide');
    });
  };

  showContactForm() {
    let _this = this;
    this.showContactFormBtn.click(function() {
      _this.wrapper.addClass("fullscreen vin");
      _this.user.name.focus();
      _this.navToggleBtn.addClass('initial');
    });
  };

  enterKeyHandler() {
    let _this = this;
    $(document).on('keydown', function(event) {
      if(event.key === 'Enter' && _this.wrapper.hasClass('fullscreen')) {
        _this.slider.slick('slickNext');
      }
    });
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

  userFormHandler(apiKey, formData) {
    let base = new Airtable({apiKey}).base('appoQoBF3HUIOx0QE');
    base('Contact Form Submission').create([{"fields": formData}], function(err, _records) {
      if (err) {
        //console.error(err);
        return;
      }
    });
  };

  collectFormData() {
    let { budget, email, name, query } = this.user;
    let supportOptionsList = [...this.user.supportOptionsList];
    supportOptionsList = supportOptionsList.map(option => {
      return option.split('-').join(' ');
    });
    let formData = {
      "Email": email.val(),
      "Name" : name.val(),
      "What are you looking to build?": query.text(),
      "What is your budget?": budget,
      "What kind of support are you looking for?": supportOptionsList,
    }
    this.sendUserForm('keyQpdjhQ9cRWzh4g', formData);
  };

  calculateInputWidthHandler() {
    let _this = this;
    this.formInput.on('input', function() {
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
    this.navToggleBtn.removeClass('initial');
    this.supportOption.prop("checked", false);
    this.user.budget = '';
    this.user.email.val('').removeClass('not-empty').removeAttr('style');
    this.user.name.val('').removeClass('not-empty').removeAttr('style');
    this.user.query.text('').removeClass('not-empty').removeAttr('style');
    this.user.supportOptionsList = [];
  };

  submitFormHandler() {
    let _this = this;
    this.submitFormBtn.on('click', function() {
      _this.wrapper.removeClass("fullscreen");
      _this.userFormHandler();
      _this.clearForm();
      setTimeout(() =>{
        _this.slider.slick('slickGoTo', 0);
        _this.wrapper.removeClass("vin");
      }, 500);
    });
  };

  focusOnFormInputsHandler() {
    let _this = this;
    this.slider.on('afterChange', function(_event, _slick, currentSlide, _nextSlide) {
      const { name, email, query } = _this.user;
      switch(currentSlide) {
        case 0:
          name.focus();
          break;
        case 1:
          email.focus();
          break;
        case 2:
          query.focus()
          break;
      }

      if(currentSlide < 1) {
        $('.prev.slick-arrow').fadeOut();
      } else {
        $('.prev.slick-arrow').fadeIn();
      }
    });
  };

  init() {
    this.calculateInputWidthHandler();
    this.enterKeyHandler();
    this.getCurrentSlide();
    this.initFormSlider();
    this.selectBudgetHandler();
    this.selectSupportOptionsHandler();
    this.showContactForm();
    this.submitFormHandler();
    this.focusOnFormInputsHandler();
  }
};

export default ContactForm;
