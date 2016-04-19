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

  // resize image square height for mobile version
  sizeImgBlock = function() {
    var
      height = $("body").width() / 3,
      imgBlock = $("section div")
    ;

    $(imgBlock).css("height", height);
  }

  resetImgBlock = function() {
    var imgBlock = $("section div");

    $(imgBlock).css("height", "auto");
  }

  if ($(window).width() < 415) {
    sizeImgBlock();

    $(window).resize(function() {
      if ($(window).width() < 415) {
        sizeImgBlock();
      } else {
        resetImgBlock();
      }
    });
  };

  // position image for tablet version
  calcGrid = function(window, column) {

  }

  positionImg = function() {
    var
      pictures = $("section div"),
      windowWidth = $(window).width(),
      row = 1,
      column = 1
    ;

    // size and position first image
    if ($(pictures[0]).width() > $(pictures[0]).height()) {
      $(pictures[0]).css({
        "width" : .6875 * windowWidth,
        "top" : 0,
        "left" : 0
      })
      $(pictures[0]).attr({
        "data-row" : row,
        "data-column" : column
      })
    } else {
      $(pictures[0]).css({
        "width" : .3125 * windowWidth,
        "top" : 0,
        "left" : 0
      })
      $(pictures[0]).attr({
        "data-row" : row,
        "data-column" : column
      })
    }

    // loop through photos and position according to previous
    for (var i = 1; i < pictures.length; i++) {

      var
        position = $(pictures[i - 1]).position(),
        prevRowCol1 = $("section div[data-row='" + (row - 1) + "'][data-column='1']"),
        prevRowCol2 = $("section div[data-row='" + (row - 1) + "'][data-column='2']")
      ;

      // size photo
      if ($(pictures[i]).width() > $(pictures[i]).height()) {
        $(pictures[i]).css("width", .65625 * windowWidth);
      } else {
        $(pictures[i]).css("width", .3125 * windowWidth);
      }

      // position photo
      if ((position.left + $(pictures[i]).width()) >= windowWidth) {
        row++;
        column = 1;
        $(pictures[i]).attr({
          "data-row" : row,
          "data-column" : column
        })

        $(pictures[i]).css({
          "left" : 0,
          "top" : position.top + prevRowCol1.height() + (windowWidth * .03125)
        });

      } else {
        column++;
        $(pictures[i]).attr({
          "data-row" : row,
          "data-column" : column
        })

        $(pictures[i]).css("left", position.left + ($(pictures[i-1]).width() + windowWidth * .03125);

        if (column === 2 && prevRowCol1.width() === .65625 * windowWidth) {
          var prevRowCol1Pos = prevRowCol1.position();
          $(pictures[i]).css("top", prevRowCol1Pos.top + prevRowCol1.height());
        } else if (column === 2 && prevRowCol2.width() === .3125 * windowWidth) {
          var prevRowCol2Pos = prevRowCol2.position();
          $(pictures[i]).css("top", prevRowCol2Pos.top + prevRowCol2.height());          
        }

      }

    }
  }

  if ($(window).width() > 414) {
    positionImg();
  };


});
