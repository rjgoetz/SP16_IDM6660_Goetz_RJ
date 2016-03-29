$("document").ready(function() {

  $("nav").click(function() {
    $(".toggle-menu").find("li").slideToggle("600");
  })

  var offset = 300;

  $(window).scroll(function() {
    if($(this).scrollTop() > offset) {
      $(".page>div:last-of-type").fadeIn("fast");
    } else {
      $(".page>div:last-of-type").fadeOut("fast");
    }
  })

  $(".image-popup").magnificPopup({
    type: "image",
    closeOnContentClick: true
  })

});
