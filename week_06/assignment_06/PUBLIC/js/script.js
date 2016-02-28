$("document").ready(function() {
  var $toggleNav = $("header nav ul");
  var $toggleBtn = $(".toggle-btn");

  $toggleBtn.on("tap", function() {
    $toggleNav.slideToggle(400, function() {
      console.log("slide");
    });
  });

  $toggleBtn.click(function() {
    $toggleNav.slideToggle(400, function() {
      console.log("slide");
    });
  });
});
