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
var contactFormOptions = {
  contactFormInitialTextInput: $('[data-hook=type-here]'),
  contactFormTextInputContainer: $('.contact-input__inner'),
  enterToProceedBtn: $('[data-hook=press-enter-to-proceed]'),
  pagination: $('.pagingInfo'),
  showContactFormBtn: $('.contact-button__link'),
  slider: $('.slideshow'),
  submitFormBtn: $('[data-hook=submit-form]'),
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
