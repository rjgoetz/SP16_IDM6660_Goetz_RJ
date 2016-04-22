$(document).ready(function() {

  // toggle menu

  $(".fa-bars").click(function() {
    $("header nav").toggle();
  })

  $(".fa-times").click(function() {
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
  }

  // // // // //
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
  }

  if (n === 3) { // max 768 width
    var gutter = (24 / 768) * windowWidth;
  } else if (n === 4) { // min 769 -> max 960 width
    var gutter = (36 / 960) * windowWidth;
  } else if (n === 5) { // min 961 -> max 1280 width
    var gutter = (40 / 1280) * windowWidth;
  } else if (n === 6) { // min 1281 -> max 1600 width
    var gutter = (50 / 1600) * windowWidth;
  }


  // // // // // // // // // // // // // // //
  // Get Data From JSON and Insert Into DOM

  // getJSON global stores
  var
    output = "",
    filter = ""
  ;

  console.log(n);
  console.log(gutter);

  // Create Output
  function createData(insert) {

    output += "<div class='" + insert.layout + "'>";
    output += "<img src='" + insert.src + "'>";
    output += "<figure>";
    output += "<figcaption>" + insert.name + " " + insert.photoDate + "</figcaption>";
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
        console.log("MATCH!");
        return true;

        break;
      }
    }

  };


  // listen for menu radio button click

  $("body").on("click", "input[name=filter]", function() {

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

      // check for last in row by looping through photos
      for (var i = 1; i < $("section div").length; i++) {
        pictures = $("section div");
        prevPicturePos = $(pictures[i-1]).position();

        // get floating point width of previous picture
        rect1 = $(pictures)[i-1].getBoundingClientRect();
        prevPictureWidth = rect1.right - rect1.left;

        // get floating point width of current picture
        rect2 = $(pictures)[i].getBoundingClientRect();
        curPictureWidth = rect2.right - rect2.left;
        curPicturePos = $(pictures[i]).position();

        totalWidth = (prevPicturePos.left + prevPictureWidth + gutter + curPictureWidth);
        console.log(totalWidth);

        console.log(i + " " + prevPicturePos.left + " " + prevPictureWidth + " " + curPictureWidth + " " + windowWidth);

        if (totalWidth === windowWidth) {
          $(pictures[i]).css("margin-right", "0");
        } else if (curPicturePos.left === 0) {
          $(pictures[i]).css("clear", "both");
        }

      }


      if (windowWidth < 415) {
        sizeImgBlock();
      }

    });

  };


  // initial function calls
  getData();

  $(window).resize(function() {
    if (windowWidth < 415) {
      sizeImgBlock();
    }
  })

});
