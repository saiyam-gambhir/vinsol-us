class Navigation {
  constructor({ body, menuBtn, navigationList, navigationListItem, navigationListItemParent, userNameField, wrapper }) {
    Object.assign(this, {
      body,
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
      if($(this).hasClass('nav-contact-btn')) {
        _this.wrapper.addClass('fullscreen vin')
        setTimeout(() => {
          _this.userNameField.focus();
        }, 100);
      } else {
        _this.wrapper.removeClass('fullscreen vin');
      }
      _this.wrapper.animate({ scrollTop: document.querySelector(this.hash).offsetTop }, 750);
      _this.navigationListItemParent.removeClass('active');
      $(this).closest('li').addClass('active');
    });
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
  };
};

export default Navigation;
