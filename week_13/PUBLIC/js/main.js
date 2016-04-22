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
    var gutter = Math.round(.03125 * windowWidth);
  } else if (n === 4) { // max 960 width
    var gutter = (36 / 960) * windowWidth;
  } else if (n === 5) { // max 1280 width
    var gutter = Math.round(.03125 * windowWidth);
  } else if (n === 6) { // max 1600 width
    var gutter = Math.round(.03125 * windowWidth);
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

      // check last in row by looping through photos
      for (var i = 0; i < $("section div").length; i++) {
        pictures = $("section div");
        picturesPos = $(pictures[i]).position();
        picturesWidth = $(pictures[i]).width();
        totalWidth = picturesWidth + picturesPos.left + gutter;

        if (picturesPos.left === 0) {
          $(pictures[i]).css("margin-right", "3.125%");
        } else if (totalWidth < windowWidth) {
          $(pictures[i]).css("margin-right", "3.125%");
        } else {
          $(pictures[i]).addClass("last");
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
