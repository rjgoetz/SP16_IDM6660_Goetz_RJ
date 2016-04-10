$(document).ready(function() {
  barGraph = function() {
    var
      height,
      tall = 0,
      n,
      position,
      $barGraphSection = $("main section:first-of-type article:nth-of-type(2)"),
      $div = "<div></div>"
    ;

      // insert graph bars
      for (var i = 0; i < 9; i++) {
        width = $barGraphSection.width();

        if (width > 374) {
          height = Math.random() * 10 + 8.4;
        } else {
          height = Math.random() * 10 + 2.8;
        }

        position = (i * ((width) * (1 / 9)));

        $barGraphSection.append($div);
        $barGraphSection.find("div").eq(i).css({"height":height + "em", "left":position + "px"});

        if (height > tall) {
          tall = height;
          n = i;
        }
      }

      // color last bar green
      $barGraphSection.find("div").eq(n).css("background", "#2bcfa6");

  }

  topNav = function() {
    var
      $hamburger = $("header .fa"),
      $menu = $("header nav ul ul"),
      $width = $("nav").width()
    ;

    if ($width < 961) {
      $hamburger.on("tap", function() {
        $menu.slideToggle("slow");
      })
    }
  }


  barGraph();
  topNav();
})
