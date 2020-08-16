import moment from 'moment'

let officeLocations = [
  { 'timeZone': 'America/Los_Angeles', 'selector': 'usa-time' },
  { 'timeZone': 'Asia/Kolkata', 'selector': 'delhi-time' },
  { 'timeZone': 'America/Toronto', 'selector': 'toronto-time' }
];

const timeZones = {
  updateTime: (timeZone, datetime) => {
    let date = moment(new Date().toLocaleString("en-US", { timeZone: timeZone }));
    $('[data-hook=' + datetime + ']').html(date.format('hh mm A'));
  },

  showTime: () => officeLocations.forEach(location => {
    timeZones.updateTime(location.timeZone, location.selector);
  }),
}

export default timeZones;
