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
  contactFormInitialTextInput: $('[data-hook=type-here]'),
  contactFormTextInputContainer: $('.contact-input__inner'),
  enterToProceedBtn: $('[data-hook=press-enter-to-proceed]'),
  formInput: $('.input-type-text'),
  pagination: $('.pagingInfo'),
  showContactFormBtn: $('.contact-button__link'),
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
  contactForm.hideShowContactFormBtnOnScroll();
  ourApproach.toggleStageColor();
});
/* ------------------------------------------------------------------------------- */
