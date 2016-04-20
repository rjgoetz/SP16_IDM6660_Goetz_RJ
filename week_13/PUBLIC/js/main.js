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

  // // // // // // // // // // // // // // // // // //
  // resize image square height for mobile version //
  sizeImgBlock = function() {
    var
      height = $("body").width() / 3,
      imgBlock = $("section div")
    ;

    $(imgBlock).css("height", height);
  }


  // // // // // // // // // // // // // // // // // //
  // position image for tablet and desktop versions //

  // global variables
  var
    column = 1,
    double,
    gutter,
    landscape,
    n,
    photoCount,
    pictures = $("section div"),
    prevRowCol,
    prevRowColHeight,
    prevRowColPos,
    prevRowColTop,
    row = 1,
    single,
    windowWidth = $(window).width()
  ;



  // set column width variables
  function colWidthVar(n) {
    if (n === 3) {
      double = .65625 * windowWidth;
      single = .3125 * windowWidth;
      gutter = .03125 * windowWidth;
    } else if (n === 4) {
      double = .4875 * windowWidth;
      single = .23125 * windowWidth;
      gutter = .025 * windowWidth;
    }
  }

  // find number of columns based on viewport width
  function setNumColumns() {
    if (windowWidth > 414 && windowWidth < 769) {
      n = 3;
    } else if (windowWidth > 768 && windowWidth < 961) {
      n = 4;
    }
  }

  // set data attribute row and column numbers
  function dataAttrRowCol(index) {
    $(pictures[index]).attr({
      "data-row" : row,
      "data-column" : column
    })
  }

  // is image landscape?
  function isLandscape(index) {
    if ($(pictures[index]).width() > $(pictures[index]).height()) {
      landscape = 1;
    } else {
      landscape = 0;
    }
  }

  // size image
  function sizeImage(index) {
    if (landscape === 1) {
      $(pictures[index]).css("width", double);
    } else {
      $(pictures[index]).css("width", single);
    }
  }

  // position image
  function positionImg(index, photoTop, photoLeft) {
    $(pictures[index]).css({
      "top" : photoTop,
      "left" : photoLeft
    })
  }

  // find previous row column height and position
  function prevRowColVar(col) {
    prevRowCol = $("section div[data-row='" + (row - 1) + "'][data-column='" + col + "']");
    prevRowColHeight = prevRowCol.height();
    prevRowColPos = prevRowCol.position();
    prevRowColTop = prevRowColPos.top;
    prevRowColWidth = prevRowCol.width();
  }

  // find number of photos in previous row
  function prevRowPhotoCount() {
    photoCount = $("section div[data-row='" + (row - 1) + "']").length;
  }

  function runPhotoGrid() {

    // set up column numbers
    setNumColumns();

    // set up column size variables
    colWidthVar(n);

    // set up first image (index = 0)
    isLandscape(0);
    sizeImage(0);
    positionImg(0, 0, 0);
    dataAttrRowCol(0);

    // loop remaining photos
    for (var i = 1; i < pictures.length; i++) {
      // size image width
      isLandscape(i);
      sizeImage(i);

      // store previous photo and position
      var
        prevPhoto = $(pictures[i-1]),
        currentPos = $(prevPhoto).position()
      ;

      // options: go to next row; at first row; and all other photos
      // go to next row?
      if (currentPos.left + prevPhoto.width() >= windowWidth) {
        row++;
        column = 1;
        dataAttrRowCol(i);

        // position first column photo
        prevRowColVar(1);
        photoTop = prevRowColTop + prevRowColHeight + gutter;
        positionImg(i, photoTop, 0);
      }
        // at first row?
        else if (row === 1) {
        column++;
        dataAttrRowCol(i);

        // position first-row photos
        photoLeft = currentPos.left + prevPhoto.width() + gutter;
        positionImg(i, 0, photoLeft)
      }
        // position remaining photos
        else {
        column++;
        dataAttrRowCol(i);

        // position left remaining photos
        photoLeft = currentPos.left + prevPhoto.width() + gutter;

        // figure out previous row photo to base top value from
        prevRowPhotoCount();
        prevRowColVar(column - 1);

        if (photoCount === column) {
          if (prevRowColWidth === single) {
            prevRowColVar(column);
            photoTop = prevRowColTop + prevRowColHeight + gutter;
          } else if (prevRowColWidth === double) {
            if (prevPhoto.width() === double) {
              prevRowColVar(column);
              photoTop = prevRowColTop + prevRowColHeight + gutter;
            } else {
              photoTop = prevRowColTop + prevRowColHeight + gutter;
            }
          }
        } else {
            if (column === n && prevRowColWidth === single) {
              photoTop = prevRowColTop + prevRowColHeight + gutter;
            } else if (prevRowColWidth === single) {
              if (prevPhoto.width() === double) {
                prevRowColVar(column + 1);
                photoTop = prevRowColTop + prevRowColHeight + gutter;
              } else {
                prevRowColVar(column);
                photoTop = prevRowColTop + prevRowColHeight + gutter;
              }
            } else if (prevRowColWidth === double) {
              if (prevPhoto.width() === double) {
                prevRowColVar(column);
                photoTop = prevRowColTop + prevRowColHeight + gutter;
              } else {
                photoTop = prevRowColTop + prevRowColHeight + gutter;
              }
            }
        }


        positionImg(i, photoTop, photoLeft);
      }
    } // end loop

  } // end runPhotoGrid()

  // positionImg = function() {
  //   var
  //     pictures = $("section div"),
  //     windowWidth = $(window).width(),
  //     row = 1,
  //     column = 1,
  //   ;
  //
  //   // size and position first image
  //   if ($(pictures[0]).width() > $(pictures[0]).height()) {
  //     $(pictures[0]).css({
  //       "width" : .65625 * windowWidth,
  //       "top" : 0,
  //       "left" : 0
  //     })
  //     $(pictures[0]).attr({
  //       "data-row" : row,
  //       "data-column" : column
  //     })
  //   } else {
  //     $(pictures[0]).css({
  //       "width" : .3125 * windowWidth,
  //       "top" : 0,
  //       "left" : 0
  //     })
  //     $(pictures[0]).attr({
  //       "data-row" : row,
  //       "data-column" : column
  //     })
  //   }
  //
  //   // loop through photos and position according to previous
  //   for (var i = 1; i < pictures.length; i++) {
  //
  //     var position = $(pictures[i - 1]).position();
  //
  //     // size photo landscape or portrait
  //     if ($(pictures[i]).width() > $(pictures[i]).height()) {
  //       $(pictures[i]).css("width", .65625 * windowWidth);
  //     } else {
  //       $(pictures[i]).css("width", .3125 * windowWidth);
  //     }
  //
  //     // position photo
  //     if ((position.left + $(pictures[i - 1]).width()) >= windowWidth) {
  //       row++;
  //       column = 1;
  //       $(pictures[i]).attr({
  //         "data-row" : row,
  //         "data-column" : column
  //       })
  //
  //       var
  //         prevRowCol1 = $("section div[data-row='" + (row - 1) + "'][data-column='1']"),
  //         prevRowCol1Pos = prevRowCol1.position(),
  //         prevRowCol2 = $("section div[data-row='" + (row - 1) + "'][data-column='2']"),
  //         prevRowCol3 = $("section div[data-row='" + (row - 1) + "'][data-column='3']")
  //       ;
  //
  //       $(pictures[i]).css({
  //         "left" : 0,
  //         "top" : prevRowCol1Pos.top + prevRowCol1.height() + (windowWidth * .03125)
  //       });
  //
  //     } else if (row === 1) {
  //       column++;
  //       $(pictures[i]).attr({
  //         "data-row" : row,
  //         "data-column" : column
  //       })
  //
  //       $(pictures[i]).css({
  //         "left" : position.left + ($(pictures[i-1]).width() + windowWidth * .03125),
  //         "top" : 0
  //       });
  //
  //     } else {
  //       column++;
  //       $(pictures[i]).attr({
  //         "data-row" : row,
  //         "data-column" : column
  //       })
  //
  //       $(pictures[i]).css("left", position.left + ($(pictures[i-1]).width() + windowWidth * .03125));
  //
  //       if ($("section div[data-row='" + (row - 1) + "']").length === 3) {
  //         if (column === 2) {
  //           if ($(pictures[i-1]).width() === .65625 * windowWidth) {
  //             var prevRowCol3Pos = prevRowCol3.position();
  //             $(pictures[i]).css("top", prevRowCol3Pos.top + prevRowCol3.height() + (windowWidth * .03125));
  //           } else {
  //             var prevRowCol2Pos = prevRowCol2.position();
  //             $(pictures[i]).css("top", prevRowCol2Pos.top + prevRowCol2.height() + (windowWidth * .03125));
  //           }
  //         } else if (column === 3) {
  //           var prevRowCol3Pos = prevRowCol3.position();
  //           $(pictures[i]).css("top", prevRowCol3Pos.top + prevRowCol3.height() + (windowWidth * .03125));
  //         }
  //       } else {
  //         if (column === 2) {
  //           if ($(pictures[i-1]).width() === .65625 * windowWidth) {
  //             var prevRowCol2Pos = prevRowCol2.position();
  //             $(pictures[i]).css("top", prevRowCol2Pos.top + prevRowCol2.height() + (windowWidth * .03125));
  //           } else {
  //             if (prevRowCol1.width() === .65625 * windowWidth) {
  //               var prevRowCol1Pos = prevRowCol1.position();
  //               $(pictures[i]).css("top", prevRowCol1Pos.top + prevRowCol1.height() + (windowWidth * .03125));
  //             } else {
  //               var prevRowCol2Pos = prevRowCol2.position();
  //               $(pictures[i]).css("top", prevRowCol2Pos.top + prevRowCol2.height() + (windowWidth * .03125));
  //             }
  //           }
  //         } else if (column === 3) {
  //           var prevRowCol2Pos = prevRowCol2.position();
  //           $(pictures[i]).css("top", prevRowCol2Pos.top + prevRowCol2.height() + (windowWidth * .03125));
  //         }
  //       }
  //     }
  //   }
  // }

  // // // // // // //
  // Call functions //
  // if ($(window).width() < 415) {
  //   sizeImgBlock();
  // } else if ($(window).width() > 415) {
  //   positionImg();
  // }
  //
  // $(window).resize(function() {
  //   if ($(window).width() < 415) {
  //     sizeImgBlock();
  //   }
  // })

  runPhotoGrid();



});
