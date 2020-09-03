class ScrollBar {
  constructor({ navigationList, menuBtn }) {
    Object.assign(this, {
      navigationList,
      menuBtn
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
