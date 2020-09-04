import moment from 'moment';

const officeLocations = [
  { 'timeZone': 'America/Los_Angeles', 'selector': 'usa-time' },
  { 'timeZone': 'America/Toronto', 'selector': 'toronto-time' },
  { 'timeZone': 'Asia/Kolkata', 'selector': 'delhi-time' }
];

class TimeZones {
  constructor({ flash }) {
    Object.assign(this, {
      flash
    });
  };

  updateTime(timeZone, datetime) {
    let date = moment(new Date().toLocaleString("en-US", { timeZone: timeZone }));
    $('[data-hook=' + datetime + ']').html(date.format('hh mm A'));
  };

  showTime() {
    officeLocations.forEach(location => {
      this.updateTime(location.timeZone, location.selector);
    });
  };

  flashIndicator() {
    this.flash.css('opacity', (this.flash.css('opacity') == 1 ? 0 : 1));
  };

  init() {
    this.showTime();
    this.flashIndicator();
  };
};

export default TimeZones;
