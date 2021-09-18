$(document).ready(function () {

  $header = $('.iwc-header-wrapper');

 
  $num = $('.my-card').length;
  $even = $num / 2;
  $odd = ($num + 1) / 2;

  if ($num % 2 == 0) {
    $('.my-card:nth-child(' + $even + ')').addClass('active');
    $('.my-card:nth-child(' + $even + ')')
      .prev()
      .addClass('prev');
    $('.my-card:nth-child(' + $even + ')')
      .next()
      .addClass('next');
  } else {
    $('.my-card:nth-child(' + $odd + ')').addClass('active');
    $('.my-card:nth-child(' + $odd + ')')
      .prev()
      .addClass('prev');
    $('.my-card:nth-child(' + $odd + ')')
      .next()
      .addClass('next');
  }

  $('.my-card').click(function () {
    $slide = $('.active').width();
    console.log($('.active').position().left);

    if ($(this).hasClass('next')) {
      $('.card-carousel')
        .stop(false, true)
        .animate({ left: '-=' + $slide });
    } else if ($(this).hasClass('prev')) {
      $('.card-carousel')
        .stop(false, true)
        .animate({ left: '+=' + $slide });
    }

    $(this).removeClass('prev next');
    $(this).siblings().removeClass('prev active next');

    $(this).addClass('active');
    $(this).prev().addClass('prev');
    $(this).next().addClass('next');
  });

  // Keyboard nav
  $('html body').keydown(function (e) {
    if (e.keyCode == 37) {
      // left
      $('.active').prev().trigger('click');
    } else if (e.keyCode == 39) {
      // right
      $('.active').next().trigger('click');
    }
  });

  $('.prev-icon').click(function () {
    $('.active').prev().trigger('click');
  });
  $('.next-icon').click(function () {
    $('.active').next().trigger('click');
  });

  
  function runTimeLine() {
    var getListItem = $('.timeline-roller').find('ul').data('re-item'),
      itemGap = $('.timeline-roller').find('ul').data('re-gap'),
      yearData = $('.timeline-roller').find('ul').data('years'),
      liArray = [];
    for (let i = 0; i < getListItem; i++) {
      let yearStar = yearData[i].startYear;
      let yearEnd = yearData[i].endYear;
      liArray.push(
        `<li class="pointer-li" data-start-year='${yearStar}' data-end-year='${yearEnd}'>
        <span class='year-class-start'>${yearStar}  <soan class='end-time'> to ${yearEnd}</span>

        </li>`
      );

      if (i !== getListItem - 1) {
        for (let j = 0; j < itemGap; j++) {
          liArray.push('<li class="inner-li"></li>');
        }
      }
    }

    $('.rollerUL').append(liArray);

    let centeryr = $('.rollerUL').data('center-year');
    let viewportOffset = $(
      ".pointer-li[data-start-year='" + centeryr + "']"
    ).offset();
    let getCengerliIntex = $(
      ".pointer-li[data-start-year='" + centeryr + "']"
    ).index();
    $('.pointer-li').find('.end-time').fadeOut();
    $('.pointer-li').click(function () {
      // these are relative to the viewport, i.e. ˜jtnmbhe window
      let getSeletedyr = $(this).data('start-year');
      let getSelLi = $(this).index();
      let viewportOffsetSelected = $(this).offset();
      let leftshift = viewportOffset.left;
      let getHalfWid;
      $('.pointer-li').find('.end-time').fadeOut();
      $('.pointer-li').removeClass('active-time-line');
      $(this).addClass('active-time-line');
      $(this).find('.end-time').fadeIn();
      if ($(window).width() > 768) {
        if (getSelLi < getCengerliIntex) {
          getHalfWid = viewportOffsetSelected.left - leftshift;
          if (viewportOffsetSelected.left > leftshift) {
            $('.rollerUL').css('margin-left', -Math.abs(getHalfWid));
          } else {
            $('.rollerUL').css('margin-left', Math.abs(getHalfWid / 2));
          }
        } else {
          getHalfWid = viewportOffsetSelected.left - leftshift;
          $('.rollerUL').css('margin-left', -Math.abs(getHalfWid / 2));
        }
      }
      $('.imgSlider').find('.slide-item').removeClass('active-slide');
      $('.imgSlider').find('.slide-item').addClass('slide-hidden');
      $('.imgSlider')
        .find(".slide-item[data-start-year='" + getSeletedyr + "']")
        .addClass('active-slide');
      $('.imgSlider')
        .find(".slide-item[data-start-year='" + getSeletedyr + "']")
        .removeClass('slide-hidden');
    });
  }

  runTimeLine();
  $('.rollerUL').find('li').eq(0).trigger('click');
  $('.arrow-icon.re-time-arrow')
    .find('.next-icon')
    .click(function () {
      $('.rollerUL')
        .find('.active-time-line')
        .nextAll('.pointer-li')
        .eq(0)
        .trigger('click');
    });
  $('.arrow-icon.re-time-arrow')
    .find('.prev-icon')
    .click(function () {
      $('.rollerUL')
        .find('.active-time-line')
        .prevAll('.pointer-li')
        .eq(0)
        .trigger('click');
    });



  // handlescroll animation
});
