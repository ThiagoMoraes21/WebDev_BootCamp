// Check Off especificy Todos by clicking
$('ul').on("click", "li", function(){
  $(this).toggleClass("checked")
});

// click on X to delete // Todo
$('ul').on("click", "span", function(event){
  $(this).parent().fadeOut(500, function(){
    $(this).remove();
  });
  // stop event to bubbling up to it's parents
  event.stopPropagation();
});

$("input[type='text']").on("keypress",function(event){
  if(event.which === 13) {
    // grab the new todo text from input
    var todoText = $(this).val();
    $(this).val("");
    // create a new li and add to ul
    $('ul').append("<li><span><i class='far fa-trash-alt'></i></span> " + todoText + "</li>");
  }
});
