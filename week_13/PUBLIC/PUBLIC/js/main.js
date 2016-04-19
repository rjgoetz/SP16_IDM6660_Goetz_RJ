$(document).ready(function() {

  // toggle menu
  $(".fa-bars").click(function() {
    $("header nav").toggle();
  });

  $(".fa-times").click(function() {
    $("header nav").toggle();
  });

  // checkbox toggle style
  $("label i").click(function() {
    $(this).toggleClass("fa-square-o");
    $(this).toggleClass("fa-check-square-o");
  });

  // resize image square height
  sizeImgBlock = function() {
    var
      height = $("body").width() / 3,
      imgBlock = $("section div")
    ;

    $(imgBlock).css("height", height);
  }

  // call functions
  sizeImgBlock();

  $(window).resize(function() {
    sizeImgBlock();
  });

});
