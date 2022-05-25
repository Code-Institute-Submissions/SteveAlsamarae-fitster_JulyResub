// Main Javascript(Jquery) file for the application

(function ($) {
  "use strict";

  var windowOn = $(window);

  // PreLoader
  $(window).on("load", function (event) {
    $("#preloader").delay(500).fadeOut(500);
  });

  // Mobile Menu
  $("#mobile-menu").meanmenu({
    meanMenuContainer: ".mobile-menu",
    meanScreenWidth: "991",
    meanExpand: ['<i class="fal fa-plus"></i>'],
  });

  // Sidebar
  $(".sidebar-toggle-btn").on("click", function () {
    $(".sidebar__area").addClass("sidebar-opened");
    $(".body-overlay").addClass("opened");
  });
  $(".sidebar__close-btn").on("click", function () {
    $(".sidebar__area").removeClass("sidebar-opened");
    $(".body-overlay").removeClass("opened");
  });

  // Sticky Header
  windowOn.on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll < 100) {
      $("#header-sticky").removeClass("sticky");
    } else {
      $("#header-sticky").addClass("sticky");
    }
  });

  // Range Slider
  if (jQuery("#slider-range").length > 0) {
    $("#slider-range").slider({
      range: true,
      min: 20,
      max: 280,
      values: [75, 300],
      slide: function (event, ui) {
        $("#amount").val("$" + ui.values[0] + " To $" + ui.values[1]);
      },
    });
    $("#amount").val(
      "$" +
        $("#slider-range").slider("values", 0) +
        " To $" +
        $("#slider-range").slider("values", 1)
    );
  }
  // Nice Select Js
  $("select").niceSelect();

  // magnificPopup img view
  $(".image-popups").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  // Wow Js
  new WOW().init();

  // Cart Quantity Js
  $(".cart-minus").click(function () {
    var $input = $(this).parent().find("input");
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });
  $(".cart-plus").click(function () {
    var $input = $(this).parent().find("input");
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });

  // Cart Plus Minus Js
  $(".cart-plus-minus").append(
    '<div class="dec qtybutton">-</div><div class="inc qtybutton">+</div>'
  );
  $(".qtybutton").on("click", function () {
    var $button = $(this);
    var oldValue = $button.parent().find("input").val();
    if ($button.text() == "+") {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      // Don't allow decrementing below zero
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    $button.parent().find("input").val(newVal);
    $("#quantity_val").val(newVal);
  });

  $("#ship-box").on("click", function () {
    $("#ship-box-info").slideToggle(1000);
  });

  $(".counter").counterUp({
    delay: 10,
    time: 1000,
  });

  $(".hover__active").on("mouseenter", function () {
    $(this)
      .addClass("active")
      .parent()
      .siblings()
      .find(".hover__active")
      .removeClass("active");
  });

  $("[data-background").each(function () {
    $(this).css(
      "background-image",
      "url( " + $(this).attr("data-background") + "  )"
    );
  });

  $("[data-width]").each(function () {
		$(this).css("width", $(this).attr("data-width"));
	});

  // Testimonial
  if (jQuery(".testimonial_active").length > 0) {
    let testimonialTwo = new Swiper(".testimonial_active", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 6000,
      },

      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".ts-button-next",
        prevEl: ".ts-button-prev",
      },

      scrollbar: {
        el: ".swiper-scrollbar",
      },
      breakpoints: {
        550: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
        1200: {
          slidesPerView: 1,
        },
        1400: {
          slidesPerView: 1,
        },
      },
    });
  }
})(jQuery);
