class OurApproach {
  constructor(options) {
    this.stage = options.stage;
    this.window = options.window;
  }

  toggleStageColor() {
    let _this = this;
    $(this.stage).each(function () {
      if ($(_this.window).scrollTop() + $(_this.window).outerHeight() / 2 - $(this).outerHeight() / 2 > $(this).offset().top) {
        $(this).addClass('fill-color');
      } else {
        $(this).removeClass('fill-color');
      }
    });
  }
}

export default OurApproach;
