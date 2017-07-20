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

  $.ajax({
    url: 'https://api.github.com/orgs/kogosoftwarellc/repos',
    complete: function(response) {
      var results = response.responseJSON.filter(function(result) {
        return !result.fork;
      }).sort(function(a, b) {
        return b.stargazers_count - a.stargazers_count;
      });

      $('.github-counter').text(results.length);

      var carouselBase = $('.github-carousel');

      results.forEach(function(result) {
        carouselBase.append($('<div>').html(
          '<div class="carousel-item-container">' +
          '  <div class="carousel-item">' +
          '    <div>' +
          '      <p class="carousel-item__title">' + result.name + '</p>' +
          '      <span class="carousel-item__star">' +
          // no space between elements to avoid line breaks
          '<svg aria-label="stars" height="16" role="img" version="1.1" viewBox="0 0 14 16" width="14"><path d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>' +
          '<span>' + result.stargazers_count + '</span>' +
          '</span>' +
          '    </div>' +
          '    <p class="carousel-item__description">' + result.description + '</p>' +
          '    <a class="carousel-item__link" href="' + result.html_url  + '">View on Github</a>' +
          '  </div>' +
          '</div>'
        ));
      });

      $('.github-carousel').slick({
        accessibility: false,
        prevArrow:'<div class="a-left control-c prev slick-prev"></div>',
        nextArrow:'<div class="a-right control-c next slick-next"></div>',
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    }
  });

  $('a[href^="#"]').click(function(e) {
    // Prevent the jump and the #hash from appearing on the address bar
    e.preventDefault();
    // Scroll the window, stop any previous animation, stop on user manual scroll
    // Check https://github.com/flesler/jquery.scrollTo for more customizability
    $(window).stop(true).scrollTo(this.hash, {duration:400});
  });
});
