/* IMPORTS */
import '../index.js';
import Scrollbar from 'smooth-scrollbar';
import Airtable from 'airtable';
/* ------------------------------------------------------------------------------- */

/* Map ScrollBar */
if($(window).width() < 1025) {
  let scrollbar = Scrollbar.init(document.querySelector('.map-bg'), {
    alwaysShowTracks: true,
    damping: 0.025
  });

  /* Center the scrollbar on map */
  let contentSize = scrollbar.size.content.width;
  let containerSize = scrollbar.size.container.width;
  scrollbar.scrollLeft = (contentSize - containerSize) / 2;
}
/* ------------------------------------------------------------------------------- */

/* Fetch Job Openings */
var base = new Airtable({apiKey: APIKEY}).base('appoQoBF3HUIOx0QE');
var closedJobs = 0;
base('Jobs').select({
  view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
// This function (`page`) will get called for each page of records.

  records.forEach(function(record) {
    if(record.get('Status') === 'Closed' || record.get('Status') === 'Filled') {
      closedJobs += 1;
      return
    };
    $('[data-hook=jobs-listing]').append('<li><a class="job-link" target="_blank" href="' + record.get('URL') + '"><span>' + record.get('Title') +'</span><br/>' + record.get('Location') + '</a></li>');
  });

  if(records.length === closedJobs) {
    $('[data-hook=job-listing-container]').addClass('hidden');
    $('.map-area').removeClass('mb-100');
  }

  // To fetch the next page of records, call `fetchNextPage`.
  // If there are more records, `page` will get called again.
  // If there are no more records, `done` will get called.
  fetchNextPage();

}, function done(err) {
  if (err) { console.error(err); return; }
});
/* ------------------------------------------------------------------------------- */
