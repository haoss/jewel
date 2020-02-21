'use strict';

// Document ready
$(document).on('ready', function(){

  // Magnific popup gallery
  $('.gallery').each(function() {
    $(this).magnificPopup({
      delegate: '.gallery-item',
      type: 'image',
      gallery:{
        enabled:true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });

  // Magnific popup one image
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
  });

  // Magnific popup video
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true,
    showCloseBtn: false
  });

  $('.j-carousel').slick({
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    pauseOnDotsHover: false
  });

  $('.modal__close').on('click', function(){
    $.magnificPopup.close();
  });

  $('.main-slider__carousel').slick({
    mobileFirst: true,
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    pauseOnDotsHover: false,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          arrows: false,
          centerMode: false,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 989,
        settings: {
          arrows: true,
          centerMode: true,
          slidesToShow: 3,
          centerPadding: '0px',
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4500,
          dots: false
        }
      }
    ]
  });

  $('.social-share__carousel').slick({
    mobileFirst: true,
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    fade: true,
    cssEase: 'linear',
    speed: 300,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    pauseOnDotsHover: false,
    nextArrow: '#social-share__next',
    prevArrow: '#social-share__prev',
    responsive: [
      {
        breakpoint: 989,
        settings: {
          centerMode: true,
          slidesToShow: 1,
          fade: false,
          centerPadding: '20px',
          variableWidth: true,
          autoplaySpeed: 4000,
          speed: 300,
        }
      },
    ]
  });

  $('.journey-carousel').slick({
    mobileFirst: true,
    arrows: true,
    dots: true,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1200,
        settings: {
          dots: false,
          slidesToShow: 3
        }
      }
    ]
  });

  // Form
  $('#donations__input').on('click', function(){
    var _this = $(this);
    $('#donations__row input:checked').prop('checked', false);
    _this.val('');
  })
  $('#donations__input').on('blur', function(){
    var _this = $(this);
    _this.val('2 000 000')
  });

  // Form 
  $('#active-form-button').on('click', function(){
    $(this).hide();
    $('#active-form-block').removeClass('d-none');
  });

  // Reservation
  $('.reserv-block__block img').on('click', function(e){
    if (!$(this).parent().hasClass('is-leading')) {
      $.magnificPopup.open({
        items: {
          src: '#reservation'
        },
        type: 'inline',
        showCloseBtn: false
      });
      
      $(this).parent().addClass('is-busy');
      $(this).parent().find('.reserv-block__block-title span').text('Наталья К.');
    }
  })

  mobileNav();
  navBtnScroll();
  inputFocus();
  inputMaskTest();
  rating();

  // Chrome Smooth Scroll
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch(err) {

  };

  // simpleForm version 2015-09-23 14:30 GMT +2
  simpleForm('form.form-callback');
});

$(window).on('load', function() {
  $(".loader").delay(400).fadeOut("slow");
});

$(window).on('scroll', function() { });
$(window).on('resize', function() {
  var width = $(window).width();
  var nav = $('.navigation');
  if (width >= 1200 && nav.hasClass('is-active')) {
    $('body').attr('style','');
  } else if (width <= 1199 && nav.hasClass('is-active')) {
    $('body').attr('style','overflow: hidden');
  }
});

/*
version 2015-09-23 14:30 GMT +2
*/
function simpleForm(form, callback) {
  $(document).on('submit', form, function(e){
    e.preventDefault();
    var formData = {};
    var hasFile = false;
    if ($(this).find('[type=file]').length < 1) {
      formData = $(this).serialize();
    }
    else {
      formData = new FormData();
      $(this).find('[name]').each(function(){

        switch($(this).prop('type')) {

          case 'file':
            if ($(this)[0]['files'].length > 0) {
              formData.append($(this).prop('name'), $(this)[0]['files'][0]);
              hasFile = true;
            }
            break;

          case 'radio':
          case 'checkbox':
            if (!$(this).prop('checked')) {
              break;
            }
            formData.append($(this).prop('name'), $(this).val().toString());
            break;

          default:
            formData.append($(this).prop('name'), $(this).val().toString());
            break;
        }
      });
    }

    $.ajax({
      url: $(this).prop('action'),
      data: formData,
      type: 'POST',
      contentType : hasFile ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
      cache       : false,
      processData : false,
      success: function(response) {
        $(form).removeClass('ajax-waiting');
        $(form).find("[type=submit]").prop("disabled", false);
        $(form).html($(response).find(form).html());

        if (typeof callback === 'function') {
          callback(response);
        }
      }
    });

    $(form).addClass('ajax-waiting');
    $(form).find("[type=submit]").prop("disabled", true);

    return false;
  });
}

function mobileNav() {
  var btn = $('.header__btn');
  var width = $(window).width();
  var nav = $('.navigation');
  var body = $('body');

  btn.on('click', function(e) {
    e.stopPropagation();
    var _this = $(this);
    if (nav.hasClass('is-active')) {
      nav.removeClass('is-active');
      _this.removeClass('is-active');
      body.removeAttr('style');
    } else {
      nav.addClass('is-active');
      _this.addClass('is-active');
      body.attr('style', 'overflow: hidden')
    }
  });

  nav.on('click', function(e){
    e.stopPropagation();
  });

  $(document).on('click', function(){
    if (nav.hasClass('is-active') && width <= 1199) {
      nav.removeClass('is-active');
      btn.removeClass('is-active');
      body.removeAttr('style');
    }
  })
}

function navBtnScroll() {
  var btn = $('#navigation__btn');
  var wrapper = $('.navigation__wrapper');

  wrapper.on('scroll', function(){
    btn.css('transform',"translateY(-"+ wrapper.scrollTop() +"px)")
    console.log();
  });

  if ($('.navigation__wrapper').scrollTop() > 0) {
    btn.addClass('is-scroll');
  } else {
    btn.removeClass('is-scroll');
  }
}

function inputFocus(){
  var jinput = $(".j-input");

  jinput.each(function(){
    var _this = $(this);
    var val = _this.val();

    if (val.length > 0 && _this.is('input') || val.length > 0 && _this.is('textarea')) {
      _this.parent().addClass("active-full");
    } else {
      _this.parent().removeClass("active-full");
    }

    // input on focus
    _this.focus(function () {
      _this.parent().addClass("active");
    }).blur(function () {
      _this.parent().removeClass("active");
    })

    _this.on('change', function () {
      var val = _this.val();

      if (val == '') {
        _this.parent().removeClass("active-full");
      } else {
        _this.parent().addClass("active-full");
      }
    });
  })
}

function inputMaskTest() {
  var intlMask = $('.j-mask-intl');
  intlMask.each(function () {
    $(this).mask("+9 999 999-99-99");
  });

  var localMask = $('.j-mask-local');
  localMask.each(function () {
    $(this).mask("+780 (99) 999-99-99");
  });

  var dateMask = $('.j-mask-date');
  dateMask.each(function () {
    $(this).mask("99.99.9999");
  });
}

function rating() {
  var rating = $('.j-rating');
  
  rating.each(function(){
    var _this = $(this);
    var info = _this.find('.rating__info');
    var input = _this.find('input[type="radio"]');

    input.on('change', function(){
      info.text($(this).val());
      console.log(input.val());
    });
  });
}