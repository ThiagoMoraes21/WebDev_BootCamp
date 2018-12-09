//  Interactions and Animations
var navbar = document.querySelector('.navbar');
var homeTitle = document.querySelector('#parallax');
var banner = document.querySelector('#banner').offsetTop;

window.onscroll = function(){
  //  Change the background of the menu
  if(document.documentElement.scrollTop >= 150) {
    navbar.classList.add('colorfullNavbar');  // put colorful background
  }else {
    navbar.classList.remove('colorfullNavbar'); // remove background color
  }

  //  Parallax effect on the home page title
  if(document.documentElement.scrollTop < banner){
    homeTitle.style.top = (window.pageYOffset / 8) + '%';
  }
}
