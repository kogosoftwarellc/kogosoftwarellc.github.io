$(document).ready(function() {
  $('.menu-button').click(function(event) {
    $('.navigation').toggleClass('opened');
    $('.overlay').toggleClass('active');
    event.stopPropagation();
  });

  $('html').click(function() {
    $('.navigation').removeClass('opened');
    $('.overlay').removeClass('active').addClass('inactive');
  });
});
