import Airtable from 'airtable';
const EmailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class ContactForm {
  constructor({ budgetOption, closeContactFormBtn, contactForm, contactFormTextInputContainer, contactSubmittedSection, displayName, enterToProceedBtn, formInput, navToggleBtn, pagination, showContactFormBtn, slider, submitFormBtn, supportOption, user, wrapper }) {
    Object.assign(this, {
      budgetOption,
      closeContactFormBtn,
      contactForm,
      contactFormTextInputContainer,
      contactSubmittedSection,
      displayName,
      enterToProceedBtn,
      formInput,
      navToggleBtn,
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
      accessibility: false,
      adaptiveHeight: true,
      arrows: true,
      fade: true,
      infinite: false,
      nextArrow: $('.next'),
      prevArrow: $('.prev'),
      swipe: false,
      swipeToSlide: false,
      touchMove: false
    });
    let $slick = this.slider.slick('getSlick');
    this.pagination.text(($slick.currentSlide + 1) + '/' + $slick.$slides.length);
  };

  getCurrentSlide() {
    let _this = this;
    this.slider.on('init reInit afterChange', function(_event, { currentSlide, slideCount }) {
      _this.pagination.text((currentSlide + 1) + '/' + slideCount);
      (currentSlide + 1) === slideCount ? _this.enterToProceedBtn.addClass('hide') : _this.enterToProceedBtn.removeClass('hide');
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
    $(document).on('keypress', function(event) {
      if(event.shiftKey || _this.contactForm.hasClass('disabled')) return;

      if(event.key === 'Enter') {
        event.preventDefault();
      }

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

      _this.user.supportOptionsList.length > 0 ? _this.contactForm.removeClass('disabled') : _this.contactForm.addClass('disabled');
    });
  };

  selectBudgetHandler() {
    let _this = this;
    this.budgetOption.change(function() {
      let $this = $(this);
      if($(this).prop('checked') == true) {
        _this.user.budget = $this.data('budget');
        _this.contactForm.removeClass('disabled')
      } else {
        _this.contactForm.addClass('disabled')
      }
    });
  };

  sendUserForm(apiKey, formData) {
    let _this = this;
    let base = new Airtable({apiKey}).base('appoQoBF3HUIOx0QE');

    base('Contact Form Submission').create([
      {
        "fields": formData
      }
    ], function(err, records) {
      if (err) {
        console.error(err);
        return;
      }

      if(records) {
        _this.contactForm.addClass('fade-out').removeClass('show-loading');
        setTimeout(() => {
          _this.contactSubmittedSection.addClass('fade-in');
        }, 300);
      }
    });
  };

  userFormHandler() {
    let { budget, email, name, query } = this.user;
    let supportOptionsList = [...this.user.supportOptionsList];
    supportOptionsList = supportOptionsList.map(option => {
      return option.split('-').join(' ');
    });
    let formData = {
      "Email": email.val(),
      "Name" : name.val(),
      "What are you looking to build?": query.val(),
      "What is your budget?": budget,
      "What kind of support are you looking for?": supportOptionsList,
    }
    this.sendUserForm(APIKEY, formData);
  };

  validateEmail(email) {
    return EmailRegEx.test(String(email.val().toLowerCase()));
  };

  calculateInputWidthHandler() {
    let _this = this;
    this.formInput.on('input', function() {
      let $this = $(this);
      if($this.val() === '') {
        $this.removeClass('not-empty');
        _this.contactForm.addClass('disabled');
      } else {
        $this.addClass('not-empty');
        _this.contactForm.removeClass('disabled');
      }

      if($this.data('hook') === 'user-name') {
        _this.displayName.text($this.val());
      }

      if($this.data('hook') === 'user-email') {
        if(_this.validateEmail($this)) {
          _this.contactForm.removeClass('disabled');
          $this.addClass('black-color');
        } else {
          _this.contactForm.addClass('disabled');
          $this.removeClass('black-color');
        }
      }
    });
  };

  userQueryInputHandler() {
    let _this = this;
    this.user.query.on('input', function() {
      $(this).val() === '' ? _this.contactForm.addClass('disabled') : _this.contactForm.removeClass('disabled');
    });
  };

  clearForm() {
    this.budgetOption.prop("checked", false);
    this.navToggleBtn.removeClass('initial');
    this.supportOption.prop("checked", false);
    this.user.budget = '';
    this.user.email.val('').removeClass('not-empty');
    this.user.name.val('').removeClass('not-empty');
    this.user.query.val('').removeClass('not-empty');
    this.user.supportOptionsList = [];
    this.contactForm.removeClass('fade-out');
    this.contactSubmittedSection.removeClass('fade-in');
  };

  submitFormHandler() {
    let _this = this;
    this.submitFormBtn.on('click', function() {
      _this.contactForm.addClass('show-loading');
      _this.userFormHandler();
    });
  };

  closeContactFormHandler() {
    let _this = this;
    this.closeContactFormBtn.on('click', function() {
      _this.wrapper.removeClass('fullscreen');
      _this.clearForm();
      setTimeout(function() {
        _this.slider.slick('slickGoTo', 0);
        _this.user.name.focusout();
        _this.wrapper.removeClass('vin fullscreen');
      }, 250);
    });
  };

  formStateHandler() {
    let _this = this;
    this.slider.on('init afterChange', function(_event, _slick, currentSlide, _nextSlide) {
      const { name, email, query, supportOptionsList } = _this.user;
      switch(currentSlide) {
        case 0:
          name.val() === '' ? _this.contactForm.addClass('disabled') : _this.contactForm.removeClass('disabled')
          if(_this.wrapper.hasClass('vin')) {
            name.focus();
          }
          break;
        case 1:
          email.val() === '' ? _this.contactForm.addClass('disabled') : _this.contactForm.removeClass('disabled')
          email.focus();
          break;
        case 2:
          query.val() === '' ? _this.contactForm.addClass('disabled') : _this.contactForm.removeClass('disabled')
          query.focus()
          break;
        case 3:
          supportOptionsList.length === 0 ? _this.contactForm.addClass('disabled') : _this.contactForm.removeClass('disabled');
          break;
        case 4:
          _this.contactForm.addClass('disabled');
          _this.budgetOption.each((_index, option) => {
            $(option).prop('checked') == true ? _this.contactForm.removeClass('disabled') : null;
          });
          break;
        default:
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
    this.formStateHandler();
    this.userQueryInputHandler();
    this.closeContactFormHandler();
  }
};

export default ContactForm;
