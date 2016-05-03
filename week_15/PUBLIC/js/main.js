$(document).ready(function() {

  // toggle header filter menu
  $(".fa-plus").click(function() {
    $("header nav").toggle();
    $("header p").toggle();

    if ($("header div > i").attr("class") === "fa fa-plus") {
      $("header div > i").attr("class", "fa fa-times");
    } else {
      $("header div > i").attr("class", "fa fa-plus");
    }
  });  

  // set filter in selection bar (footer) and format text
  function setHeaderFilter() {
    var filterFormat = filter.charAt(0).toUpperCase() + filter.slice(1);
    $("header p").html("<i class='fa fa-check-circle-o'></i><span></span>");
    $("header span").html(filterFormat);
  }

  // // // // // // // // // // // // // // // // // //
  // resize image square height for mobile version //
  function sizeImgBlock() {
    var
      height = $("body").width() / 3,
      imgBlock = $(".portrait, .landscape");
    ;

    $(imgBlock).css("height", height);
  };

  // // // // // // // //
  // grid calculations
  var
    windowWidth,
    n,
    gutter,
    mobile,
    maxWidth = 1600
  ;

  function calcGrid() {
    windowWidth = window.innerWidth;

    if (windowWidth < 415) {
      mobile = true;
    } else {
      mobile = false;
    }

    if (windowWidth > 414 && windowWidth < 769) {
      n = 3;
    } else if (windowWidth > 768 && windowWidth < 961) {
      n = 4;
    } else if (windowWidth > 960 && windowWidth < 1281) {
      n = 5;
    } else if (windowWidth > 1280) {
      n = 6;
    };

    if (n === 3) { // max 768 width
      gutter = (24 / 768) * windowWidth;
    } else if (n === 4) { // min 769 -> max 960 width
      gutter = (36 / 960) * windowWidth;
    } else if (n === 5) { // min 961 -> max 1280 width
      gutter = (40 / 1280) * windowWidth;
    } else if (n === 6) { // min 1281 -> max 1600 width
      if (windowWidth <= 1600) {
        gutter = (50 / 1600) * windowWidth;
      } else {
        gutter = (50 / 1600) * 1600;
      }
    };

  };


  // // // // // // // // // // // // // // //
  // Get Data From JSON and Insert Into DOM

  // getJSON global stores
  var
    output = "",
    filter = ""
  ;

  // Create Output
  function createData(insert) {

    output += "<div class='" + insert.layout + "'>";
    output += "<img class='lazy' data-original='" + insert.src + "'>";
    output += "<figure>";
    output += "<figcaption>" + insert.name + "</figcaption>";
    output += "</figure>";
    output += "</div>";

  };

  // Set filter value
  function getFilter() {
    filter = $("input[name='filter']:checked").val();
  };

  // Check tags in JSON
  function checkFilter(dataToCheck) {

    for (var i = 0; i < dataToCheck.tags.length; i++) {
      if (dataToCheck.tags[i] === filter) {
        return true;

        break;
      }
    };

  };

  // size image
  function sizeImgLayout() {
    $()
  }

  // check for last in row by looping through photos
  function checkLastInRow() {
    if (mobile === false) {
        var pictures = $("section div");

        for (var i = 1; i < pictures.length; i++) {
          var
            prevItemRect = pictures[i-1].getBoundingClientRect(),
            prevItemMargin = pictures[i-1].style.marginRight,
            currItemRect = pictures[i].getBoundingClientRect(),
            currItemWidth = currItemRect.right - currItemRect.left,
            totalWidth = prevItemRect.right + currItemWidth + gutter
          ;

          console.log(windowWidth);

          // recalibrate previous item right position for viewport widths greater than page width
          if (windowWidth > 1600) {
            totalWidth -= ((windowWidth - 1600) / 2);
            if (totalWidth > .96 * maxWidth && totalWidth <= maxWidth) {
              pictures[i].setAttribute("style", "margin-right:0");
            }
          } else if (totalWidth > .96 * windowWidth && totalWidth <= windowWidth) {
            pictures[i].setAttribute("style", "margin-right:0");
          };

          // total width of items in row
          console.log(i + " " + totalWidth);

          // clear float if previous item has margin-right 0px property
          if(prevItemMargin === "0px") {
            pictures[i].setAttribute("style", "clear: both");
          };


        }

    };
  };

  // listen for menu radio button click

  $("nav").on("click", "input[name=filter]", function() {

    getData();

  });

  // get data from JSON file and output to DOM
  function getData() {

    // get initial filter setting
    getFilter();

    setHeaderFilter();

    // reset output
    output = "";

    $.getJSON("data.json", function(data) {
      imgLoadArray = [];

      $.each(data, function(index, value) {

        if (filter === "all") {
          createData(data[index]);
        } else {
          if (checkFilter(data[index])) {
            createData(data[index]);
          }
        }

      });

      $("section").html(output);

      if (mobile === true) {
        sizeImgBlock();
      } else {
        checkLastInRow();
      }

      // lazy load images
      $("img.lazy").lazyload({
        effect: "fadeIn"
      });

    });

  };


  // // // // // // // // // // //
  // Lightbox

  var
    boxOutput = "",
    url = "",
    captionArray = [],
    capTextArray =[],
    captionText,
    figCaption,
    boxHeight,
    imgHeight,
    imgIndex,
    photosArray,
    topPosition
  ;

  function lightbox() {

    boxOutput += "<div class='lightbox'>";
    boxOutput += "<i class='fa fa-times'></i>"
    boxOutput += "<img src='" + url + "'>";

    boxOutput += "<div class='lightbox-nav'>";
    boxOutput += "<i class='fa fa-chevron-left'></i>";
    boxOutput += "<i class='fa fa-chevron-right'></i>";
    boxOutput += "</div>";

    boxOutput += "<figure>";
    boxOutput += "<figcaption>" + captionText + "</figcaption>";
    boxOutput += "</figure>";

    boxOutput += "</div>";

    $(boxOutput).prependTo("body");

  };

  function boxPosition() {

    imgHeight = $("body > div img").height();
    boxHeight = $(window).height();
    topPosition = ((boxHeight - imgHeight) / 2);

    $("body > div").css("padding-top", topPosition);

  };

  function imgLocation() {

    var urlArray = [];

    for (var i = 0; i < photosArray.length; i++) {
      var tempURL = $(photosArray[i]).attr("src");
      urlArray.push(tempURL);
    }

    imgIndex = $.inArray(url, urlArray);

  };


  // initiate lightbox after ajax loads
  $(document).ajaxComplete(function() {
    $("section div").on("click", "img", function() {

      url = $(this).attr("src");
      figCaption = $(this).next();
      captionText = figCaption.text();
      photosArray = $("section div img");
      captionArray = $("section div figcaption");

      imgLocation();
      lightbox();
      boxPosition();

    })

  });

  // remove picture from DOM by clicking close icon

  $("body").on("click", ".lightbox .fa-times", function() {
    $(".lightbox").remove();
    boxOutput = "";
  });

  // navigate to next photo

  $("body").on("click", ".lightbox .fa-chevron-right", function() {
    $(".lightbox").remove();
    boxOutput = "";
    if (imgIndex < (photosArray.length - 1)) {
      url = $(photosArray[imgIndex + 1]).attr("src");
      captionText = $(captionArray[imgIndex + 1]).text();
      imgLocation();
      lightbox();
      boxPosition();
    }

  });

  // navigate to previous photo

  $("body").on("click", ".lightbox .fa-chevron-left", function() {
    $(".lightbox").remove();
    boxOutput = "";

    if (imgIndex > 0) {
      url = $(photosArray[imgIndex - 1]).attr("src");
      captionText = $(captionArray[imgIndex - 1]).text();
      imgLocation();
      lightbox();
      boxPosition();
    }

  });


  // // // // // // // // // // //
  // initial function calls
  getData();

  calcGrid();

  $(window).resize(function() {
    var oldN = n;
    var oldMobile = mobile;
    calcGrid();
    if (oldN !== n) {
      getData();
    } else if (oldMobile !== mobile) {
      getData();
    } else if (mobile === true) {
      sizeImgBlock();
    }
  });

});
