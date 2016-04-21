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
  function sizeImgBlock() {
    var
      height = $("body").width() / 3,
      imgBlock = $("section div")
    ;

    $(imgBlock).css("height", height);
  }


  // // // // // // // // // // // // // // //
  // Get Data From JSON and Insert Into DOM

  // getJSON global stores
  var
    output = "",
    filter = ""
  ;

  // Create Output
  function createData(insert) {

    output += "<div>";
    output += "<img src='" + insert.src + "'>";
    // output += "<figure>";
    // output += "<figcaption>" + insert.name + " " + insert.photoDate + "</figcaption>";
    // output += "</figure>";
    output += "</div>";

  };

  // Set filter value
  function getFilter() {
    filter = $("input[name='filter']:checked").val();
  };

  // get data from JSON file and output to DOM
  function getData() {

    // get initial filter setting
    getFilter();

    // reset output
    output = "";

    $.getJSON("data.json", function(data) {

      $.each(data, function(index, value) {

        if (filter === "all") {
          createData(data[index]);
        }

      });

      $("section").html(output);

      if (windowWidth < 415) {
        sizeImgBlock();
      }

      if (windowWidth > 414) {
        $(window).load(function() {
          runPhotoGrid();
        })
      }

    });

  };

  // // // // // // // // // // // // // // // // // //
  // position image for tablet and desktop versions //

  // global variables
  var
    column = 1,
    double,
    gutter,
    height1,
    height2,
    landscape,
    n,
    photoCount,
    pictures,
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
    if (n === 3) { // max 768 width
      double = .65625 * windowWidth;
      single = .3125 * windowWidth;
      gutter = .03125 * windowWidth;
    } else if (n === 4) { // max 960 width
      double = .4875 * windowWidth;
      single = .23125 * windowWidth;
      gutter = .025 * windowWidth;
    } else if (n === 5) { // max 1280 width
      double = .38125 * windowWidth;
      single = .175 * windowWidth;
      gutter = .03125 * windowWidth;
    } else if (n === 6) { // max 1600 width
      double = .3125 * windowWidth;
      single = .140625 * windowWidth;
      gutter = .03125 * windowWidth;
    }
  }

  // find number of columns based on viewport width
  function setNumColumns() {
    if (windowWidth > 414 && windowWidth < 769) {
      n = 3;
    } else if (windowWidth > 768 && windowWidth < 961) {
      n = 4;
    } else if (windowWidth > 960 && windowWidth < 1281) {
      n = 5;
    } else if (windowWidth > 1280) {
      n = 6;
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
      "position" : "absolute",
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
    // index photos in DOM
    pictures = $("section div");

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
      if (currentPos.left + prevPhoto.width() + $(pictures[i]).width() > windowWidth) {
        row++;
        column = 1;
        dataAttrRowCol(i);

        prevRowColVar(1);
        height1 = prevRowColHeight;

        prevRowPhotoCount();
        if (photoCount === 1 || photoCount < column) {
          prevRowColVar(1);
          photoTop = prevRowColTop + prevRowColHeight + gutter;
          positionImg(i, photoTop, 0);
        } else {
          prevRowColVar(2);
          height2 = prevRowColHeight;
          if (height1 > height2) {
            prevRowColVar(1);
            photoTop = prevRowColTop + prevRowColHeight + gutter;
            positionImg(i, photoTop, 0);
          } else if (height1 === height2) {
            prevRowColVar(1);
            photoTop = prevRowColTop + prevRowColHeight + gutter;
            positionImg(i, photoTop, 0);
          } else {
            prevRowColVar(2);
            photoTop = prevRowColTop + prevRowColHeight + gutter;
            positionImg(i, photoTop, 0);
          }
        }

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
        if (photoCount === 1) {
          prevRowColVar(1);
          photoTop = prevRowColTop + prevRowColHeight + gutter;
        } else {
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
                console.log("yep");
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
        }

        positionImg(i, photoTop, photoLeft);
      }
    } // end loop

  }; // end runPhotoGrid()


  // initial function calls
  getData();

  $(window).resize(function() {
    if (windowWidth < 415) {
      sizeImgBlock();
    }
  })



});
