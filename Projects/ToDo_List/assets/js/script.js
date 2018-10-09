// Check Off especificy Todos by clicking
$('li').on("click", function(){
  $(this).toggleClass("checked")
});

// click on X to delete // Todo
$('span').on("click", function(event){
  $(this).parent().fadeOut(500, function(){
    $(this).remove();
  });
  // stop event to bubbling up to it's parents
  event.stopPropagation();
});

//$("input[type='text']").keypress(function(event){
