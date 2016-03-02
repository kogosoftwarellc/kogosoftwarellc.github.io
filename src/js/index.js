$(document).ready(function() {
  $('.menu-button').click(function(event) {
    $('.navigation').toggleClass('opened');
    event.stopPropagation();
  });

  $('html').click(function() {
    $('.navigation').removeClass('opened');
  });

  // $(window).resize(function() {
  //   $('#header').css('height', $(window).height());
  // });
});
