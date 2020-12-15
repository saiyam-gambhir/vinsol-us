import Airtable from 'airtable';
const EmailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class ContactForm {
  constructor({ budgetOption, characterWidth, contactForm, contactFormTextInputContainer, enterToProceedBtn, formInput, navToggleBtn, pagination, showContactFormBtn, slider, submitFormBtn, supportOption, user, wrapper }) {
    Object.assign(this, {
      budgetOption,
      characterWidth,
      contactForm,
      contactFormTextInputContainer,
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
      records.forEach(function (record) {
        console.log(record.getId());
      });
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
      "What are you looking to build?": query.text(),
      "What is your budget?": budget,
      "What kind of support are you looking for?": supportOptionsList,
    }
    this.sendUserForm('keyredyoDL3M8X3wI', formData);
  };

  validateEmail(email) {
    return EmailRegEx.test(String(email.val().toLowerCase()));
  };

  calculateInputWidthHandler() {
    let _this = this;
    this.formInput.on('input', function() {
      let $this = $(this);
      if($this.val() === '') {
        if($(window).width() > 767) {
          $this.css('width', '170px');
        } else {
          $this.css('width', '135px');
        }
        $this.removeClass('not-empty');
        _this.contactForm.addClass('disabled');
      } else {
        $this.css('width', (this.value.length + 1) * _this.characterWidth + 'px');
        $this.addClass('not-empty');
        _this.contactForm.removeClass('disabled');
      }

      if($this.data('hook') === 'user-email') {
        if(_this.validateEmail($this)) {
          _this.contactForm.removeClass('disabled');
        } else {
          _this.contactForm.addClass('disabled');
        }
      }
    });
  };

  userQueryInputHandler() {
    let _this = this;
    this.user.query.on('input', function() {
      $(this).text() === '' ? _this.contactForm.addClass('disabled') : _this.contactForm.removeClass('disabled');
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
        _this.wrapper.removeClass('vin fullscreen');
      }, 500);
    });
  };

  formStateHandler() {
    let _this = this;
    this.slider.on('init afterChange', function(_event, _slick, currentSlide, _nextSlide) {
      const { name, email, query, supportOptionsList } = _this.user;
      switch(currentSlide) {
        case 0:
          name.val() === '' ? _this.contactForm.addClass('disabled') : _this.contactForm.removeClass('disabled')
          name.focus();
          break;
        case 1:
          email.val() === '' ? _this.contactForm.addClass('disabled') : _this.contactForm.removeClass('disabled')
          email.focus();
          break;
        case 2:
          query.text() === '' ? _this.contactForm.addClass('disabled') : _this.contactForm.removeClass('disabled')
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
  }
};

export default ContactForm;
