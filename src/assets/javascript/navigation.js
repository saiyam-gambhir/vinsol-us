class Navigation {
  constructor(options) {
    this.menuBtn = options.menuBtn;
    this.navigationList = options.navigationList;
    this.navigationListItem = options.navigationListItem;
    this.navigationListItemParent = options.navigationListItemParent;
    this.wrapper = options.wrapper;
  }

  openNavigation() {
    var _this = this;
    $(this.menuBtn).on('click', function(event) {
      $(this).addClass('open');
      $(_this.navigationList).addClass('open');
      event.stopPropagation();
    });
  };

  scrollToTarget() {
    let _this = this;
    $(this.navigationListItem).on('click', function(event) {
      event.preventDefault();
      $(_this.wrapper).animate({ scrollTop: document.querySelector(this.hash).offsetTop }, 600);
      $(_this.navigationListItemParent).removeClass('active');
      $(this).closest('li').addClass('active');
    });
  };

  init() {
    this.scrollToTarget();
    this.openNavigation();
  }
}

export default Navigation;
