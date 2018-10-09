// defult color
$('body').addClass("forest");

// classes to be removed
var rmClasses = "forest vulcano ocean";

// Button event listener
$('button').click(function(){
  if($(this).text() === "Forest"){
    $('body').removeClass(rmClasses);
    $('body').addClass("forest");
  } else if ($(this).text() === "Vulcano"){
    $('body').removeClass(rmClasses);
    $('body').addClass("vulcano");
  } else {
    $('body').addClass("ocean");
  }
});
