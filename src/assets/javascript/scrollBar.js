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

  navigationScrollHandler() {
    let wrapperScrollTop = this.wrapper.scrollTop(),
        wrapperHeight = this.wrapperInner.height(),
        windowHeight = $(window).height(),
        scrollPercentage = (wrapperScrollTop / (wrapperHeight - windowHeight )),
        navigationListHeight = this.navigationList.outerHeight(),
        positionTop = (scrollPercentage * (windowHeight - navigationListHeight));
    this.navigation.css({'top': positionTop});
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
