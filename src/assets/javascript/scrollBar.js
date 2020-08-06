const scrollBar = () => {
  let $menuButton = $('#menu-toggle-btn');
  let $navigation = $('.navigation');
  let $navigationList = $('.navigation__list');

  if($navigationList.hasClass('open')) {
    $navigationList.removeClass('open');
    $menuButton.removeClass('open');
  }

  let $scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  let $documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let $toScroll = ($scrollTop/$documentHeight) * 100;
  let $removeScrollHeight = (136/document.documentElement.clientHeight) * 100;
  if(($scrollTop/$documentHeight)*100 <= $removeScrollHeight) {
    $navigation.css('top', 0 + '%');
  } else {
    $navigation.css('top', ($toScroll - $removeScrollHeight) + '%');
  }

  $navigationList.on('click', function(event) {
    event.stopPropagation();
  });

  $('body').on('click', function(event) {
    $menuButton.removeClass('open');
    $navigationList.removeClass('open');
    event.stopPropagation();
  });
}

export { scrollBar }
