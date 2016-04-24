$(document).ready(function() {

  // toggle menu
  $(".fa-bars").click(function() {
    $("header nav").toggle();
  });

  $("nav > .fa-times").click(function() {
    $("header nav").toggle();
  });

  $(document).on("click", function(event) {
    if(!(event.target).closest("header")) {
      $("header nav").hide();
    }
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
  };

  // // // // // // // //
  // grid calculations
  var windowWidth = $(window).width();

  if (windowWidth > 414 && windowWidth < 769) {
    var n = 3;
  } else if (windowWidth > 768 && windowWidth < 961) {
    var n = 4;
  } else if (windowWidth > 960 && windowWidth < 1281) {
    var n = 5;
  } else if (windowWidth > 1280) {
    var n = 6;
  };

  if (n === 3) { // max 768 width
    var gutter = (24 / 768) * windowWidth;
  } else if (n === 4) { // min 769 -> max 960 width
    var gutter = (36 / 960) * windowWidth;
  } else if (n === 5) { // min 961 -> max 1280 width
    var gutter = (40 / 1280) * windowWidth;
  } else if (n === 6) { // min 1281 -> max 1600 width
    var gutter = (50 / 1600) * windowWidth;
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
    output += "<img src='" + insert.src + "'>";
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

  // check for last in row by looping through photos
  function checkLastInRow() {
    if (windowWidth > 414) {
        for (var i = 1; i < $("section div").length; i++) {
        pictures = $("section div");
        prevPicturePos = $(pictures[i-1]).position();

        // get floating point width of previous picture
        var rect1 = $(pictures)[i-1].getBoundingClientRect();
        prevPictureWidth = rect1.right - rect1.left;

        // get floating point width of current picture
        var rect2 = $(pictures)[i].getBoundingClientRect();
        curPictureWidth = rect2.right - rect2.left;
        curPicturePos = $(pictures[i]).position();

        // find margin-right value
        var margin = $(pictures[i-1]).css("margin-right");

        totalWidth = (prevPicturePos.left + prevPictureWidth + gutter + curPictureWidth);

        if (totalWidth > (.99 * windowWidth) && totalWidth <= windowWidth) {
          $(pictures[i]).css("margin-right", "0");
        } else if (margin === "0px") {
          $(pictures[i]).css("clear", "both");
        }
      }
    }
  }


  // listen for menu radio button click

  $("nav").on("click", "input[name=filter]", function() {

    getData();

  });



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
        } else {
          if (checkFilter(data[index])) {
            createData(data[index]);
          }
        }

      });

      $("section").html(output);

      checkLastInRow();


      if (windowWidth < 415) {
        sizeImgBlock();
      }

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
    boxOutput += "<figure>";
    boxOutput += "<figcaption>" + captionText + "</figcaption>";
    boxOutput += "</figure>";
    boxOutput += "<div class='lightbox-nav'>";
    boxOutput += "<i class='fa fa-chevron-circle-left'></i>";
    boxOutput += "<i class='fa fa-chevron-circle-right'></i>";
    boxOutput += "</div>";
    boxOutput += "</div>";

    $(boxOutput).prependTo("body");

  };

  function boxPosition() {

    imgHeight = $("body > div img").height();
    boxHeight = $(window).height();
    topPosition = ((boxHeight - imgHeight) / 2);

    $("body > div").css("padding-top", topPosition);

  };

  function arrowPosition() {
    arrowHeight = 96;
    boxHeight = $(window).height();
    topPosition = ((boxHeight - arrowHeight) / 2);

    $("body .lightbox-nav").css("padding-top", topPosition);
  }

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
    $("div").on("click", "img", function() {

      url = $(this).attr("src");
      figCaption = $(this).next();
      captionText = figCaption.text();
      photosArray = $("section div img");
      captionArray = $("section div figcaption");

      imgLocation();
      lightbox();
      boxPosition();
      if (windowWidth > 599) {
        arrowPosition();
      }

    })

  });

  // remove picture from DOM by clicking close icon

  $("body").on("click", ".lightbox .fa-times", function() {
    $(".lightbox").remove();
    boxOutput = "";
  });

  // navigate to next photo

  $("body").on("click", ".lightbox .fa-chevron-circle-right", function() {
    $(".lightbox").remove();
    boxOutput = "";
    if (imgIndex < (photosArray.length - 1)) {
      url = $(photosArray[imgIndex + 1]).attr("src");
      captionText = $(captionArray[imgIndex + 1]).text();
      imgLocation();
      lightbox();
      boxPosition();
      if (windowWidth > 599) {
        arrowPosition();
      }
    }

  });

  // navigate to previous photo

  $("body").on("click", ".lightbox .fa-chevron-circle-left", function() {
    $(".lightbox").remove();
    boxOutput = "";

    if (imgIndex > 0) {
      url = $(photosArray[imgIndex - 1]).attr("src");
      captionText = $(captionArray[imgIndex - 1]).text();
      imgLocation();
      lightbox();
      boxPosition();
      if (windowWidth > 599) {
        arrowPosition();
      }
    }

  });



  // initial function calls
  getData();

  $(window).resize(function() {
    if (windowWidth < 415) {
      sizeImgBlock();
    }
  })

});
