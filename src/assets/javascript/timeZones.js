import moment from 'moment';

const officeLocations = [
  { 'timeZone': 'America/Los_Angeles', 'selector': 'usa-time' },
  { 'timeZone': 'America/Toronto', 'selector': 'toronto-time' },
  { 'timeZone': 'Asia/Kolkata', 'selector': 'delhi-time' }
];

class TimeZones {
  updateTime(timeZone, datetime) {
    let date = moment(new Date().toLocaleString("en-US", { timeZone: timeZone }));
    $('[data-hook=' + datetime + ']').html(date.format('hh mm A'));
  }

  showTime() {
    officeLocations.forEach(location => {
      this.updateTime(location.timeZone, location.selector);
    });
  }
};

export default TimeZones;
