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
    double = Math.round(.65625 * windowWidth);
    single = Math.round(.3125 * windowWidth);
    gutter = Math.round(.03125 * windowWidth);
  } else if (n === 4) { // max 960 width
    double = (462 / 960) * windowWidth;
    single = (213 / 960) * windowWidth;
    gutter = (36 / 960) * windowWidth;
  } else if (n === 5) { // max 1280 width
    double = Math.round(.38125 * windowWidth);
    single = Math.round(.175 * windowWidth);
    gutter = Math.round(.03125 * windowWidth);
  } else if (n === 6) { // max 1600 width
    double = Math.round(.3125 * windowWidth);
    single = Math.round(.140625 * windowWidth);
    gutter = Math.round(.03125 * windowWidth);
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
  if (prevRowCol.length === 0) {
    // this column is missing
  } else {
    prevRowColHeight = prevRowCol.height();
    prevRowColPos = prevRowCol.position();
    prevRowColTop = prevRowColPos.top;
    prevRowColWidth = prevRowCol.width();
  }
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
      function photoTop() {
        photoTop = prevRowColTop + prevRowColHeight + gutter;
      }

      // positioning logic for 3+ column layout
      if (n >= 3) { // n === 3
        if (column === 2) {

          if (prevPhoto.width() === single && $(pictures[i]).width() === single) {

          prevRowColVar(1);
          if (prevRowColWidth === double) {
            prevRowColVar(1);
            photoTop();
          } else {
            prevRowColVar(2);
            photoTop();
          }
        } else if (prevPhoto.width() === double) {
          prevRowColVar(2);
          width2 = prevRowColWidth;
          height2 = prevRowColHeight;
          prevRowColVar(3);
          width3 = prevRowColWidth;
          height3 = prevRowColHeight;
          if (width2 === 0) {
            prevRowColVar(1);
            photoTop();
          } else if (width3 === 0) {
            prevRowColVar(2);
            photoTop();
          } else if (width3) {
            if (height2 > height3) {
              prevRowColVar(2);
              photoTop();
            } else {
              prevRowColVar(3);
              photoTop();
            }
          } else {
            prevRowColVar(2);
            photoTop();
          }
        } else {
          prevRowColVar(1);
          height1 = prevRowColHeight;
          prevRowColVar(2);
          height2 = prevRowColHeight;
          width2 = prevRowColWidth;
          prevRowColVar(3);
          width5 = prevRowColWidth;
          console.log(i + " " + width5);
          if (typeof width5  === null) {
            if (width2 > width3) {
              prevRowColVar(2);
              photoTop();
            } else {
              prevRowColVar(3);
              photoTop();
            }
          } else if (width2 === double) {
            prevRowColVar(2);
            photoTop();
          } else {
            if (height1 > height2) {
              prevRowColVar(1);
              photoTop();
            } else {
              prevRowColVar(2);
              photoTop();
            }
          }
        }

        } else if (column === 3) {

          prevRowColVar(2);
          width2 = prevRowColWidth;

          prevRowColVar(3);
          width3 = prevRowColWidth;

          if (width3 === double) {
            prevRowColVar(3);
            photoTop();
          } else if (width2 === double) {
            prevRowColVar(2);
            photoTop();
          } else if (width3.length > 0) {
            prevRowColVar(3);
            photoTop();
          } else {
            prevRowColVar(2);
            photoTop();
          }
        }
      }

      positionImg(i, photoTop, photoLeft);
    }
  } // end loop

}; // end runPhotoGrid()
