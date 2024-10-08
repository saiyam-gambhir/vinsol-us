class Navigation {
  constructor({ body, clientsFooterLink, menuBtn, navigationList, navigationListItem, navigationListItemParent, userNameField, wrapper }) {
    Object.assign(this, {
      body,
      clientsFooterLink,
      menuBtn,
      navigationList,
      navigationListItem,
      navigationListItemParent,
      userNameField,
      wrapper
    });
  }

  openNavigation() {
    var _this = this;
    this.menuBtn.on('click', function(event) {
      $(this).addClass('open');
      _this.navigationList.addClass('open');
      event.stopPropagation();
    });
  };

  scrollToTarget() {
    let _this = this;
    this.navigationListItem.on('click', function(event) {
      if($(this).hasClass('nav-contact-btn') && window.location.pathname.length === 1) {
        _this.menuBtn.addClass('initial');
        _this.wrapper.addClass('fullscreen vin')
        setTimeout(() => {
          _this.userNameField.focus();
        }, 100);
      } else {
        _this.wrapper.removeClass('fullscreen vin');
        _this.menuBtn.removeClass('initial');
      }
      if(this.hash === '#clients' && window.location.pathname === '/') {
        event.preventDefault();
      }
      _this.wrapper.animate({ scrollTop: document.querySelector(this.hash).offsetTop }, 750);
    });
  };

  scrollToTargetFromFooter() {
    let _this = this;
    this.clientsFooterLink.on('click', function(event) {
      if(this.hash === '#clients' && window.location.pathname === '/') {
        event.preventDefault();
      }
      _this.wrapper.animate({ scrollTop: document.querySelector(this.hash).offsetTop }, 750);
    })
  };

  hideNavigationOnBodyClick() {
    let _this = this;
    this.body.on('click', function(event) {
      _this.menuBtn.removeClass('open');
      _this.navigationList.removeClass('open');
      event.stopPropagation();
    });
  };

  hideNavigationOnScroll() {
    this.menuBtn.removeClass('open');
    this.navigationList.removeClass('open');
  };

  init() {
    this.hideNavigationOnBodyClick();
    this.openNavigation();
    this.scrollToTarget();
    this.scrollToTargetFromFooter();
  };
};

export default Navigation;
