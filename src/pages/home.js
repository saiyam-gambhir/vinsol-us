/* IMPORTS */
import '../index.js';
import 'slick-carousel';
import ContactForm from '../assets/javascript/contactForm';
import OurApproach from '../assets/javascript/ourApproach';
/* ------------------------------------------------------------------------------- */

/* OUR APPROACH */
var ourApproachOptions = {
  stage: $('.stage'),
  window: $(window)
};

var ourApproach = new OurApproach(ourApproachOptions);
/* ------------------------------------------------------------------------------- */

/* CONTACT FORM */
var characterWidth = 0;
if($(window).width() > 767) {
  characterWidth = 18.5;
} else {
  characterWidth = 15;
}

var contactFormOptions = {
  budgetOption: $('[data-hook=budget]'),
  characterWidth: characterWidth,
  contactForm: $('[data-hook=contact-form]'),
  contactFormTextInputContainer: $('.contact-input__inner'),
  customerRequirementTextarea: $('[data-hook=customer-requirement'),
  enterToProceedBtn: $('[data-hook=press-enter-to-proceed]'),
  formInput: $('.input-type-text'),
  navToggleBtn: $('#menu-toggle-btn'),
  pagination: $('.pagingInfo'),
  showContactFormBtn: $('[data-hook=show-contact-form-btn]'),
  slider: $('.slideshow'),
  submitFormBtn: $('[data-hook=submit-form]'),
  supportOption: $('[data-hook=support-option]'),
  user: {
    budget: '',
    email: $('[data-hook=user-email]'),
    name: $('[data-hook=user-name]'),
    query: $('[data-hook=user-query]'),
    supportOptionsList: [],
  },
  wrapper: $('.wrapper')
};

var contactForm = new ContactForm(contactFormOptions);
contactForm.init();
/* ------------------------------------------------------------------------------- */

/* Wrapper on scroll events */
$('.wrapper').on('scroll', function() {
  ourApproach.toggleStageColor();
});
/* ------------------------------------------------------------------------------- */

/* Window on load events */
$(window).on('load', function() {
  setTimeout(function() {
    if(window.location.href.includes('contact')) {
      contactForm.showContactFormBtn.click();
    }
  }, 750);
});
/* ------------------------------------------------------------------------------- */
