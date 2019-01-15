$(window).scroll(function(){
  var wScroll = $(this).scrollTop();

  $('.headerTitle').css({
    'transform' : 'translate(0px,'+ wScroll /2 +'%)'
  });
});
