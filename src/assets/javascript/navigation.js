class Navigation {
  constructor({ menuBtn, navigationList, navigationListItem, navigationListItemParent, wrapper }) {
    Object.assign(this, { menuBtn, navigationList, navigationListItem, navigationListItemParent, wrapper });
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
      event.preventDefault();
      _this.wrapper.animate({ scrollTop: document.querySelector(this.hash).offsetTop }, 750);
      _this.navigationListItemParent.removeClass('active');
      $(this).closest('li').addClass('active');
    });
  };

  init() {
    this.scrollToTarget();
    this.openNavigation();
  }
}

export default Navigation;
