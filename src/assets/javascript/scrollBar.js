class ScrollBar {
  constructor({ menuBtn, navigation, navigationList, wrapper, wrapperInner }) {
    Object.assign(this, {
      menuBtn,
      navigation,
      navigationList,
      wrapper,
      wrapperInner
    });
  };

  convertMenuToScrollBar() {
    this.navigationList.addClass('scrolled');
    this.menuBtn.addClass('scrolled');
  };

  convertScrollBarToMenu() {
    this.navigationList.removeClass('scrolled');
    this.menuBtn.removeClass('scrolled');
  };
};

export default ScrollBar;
