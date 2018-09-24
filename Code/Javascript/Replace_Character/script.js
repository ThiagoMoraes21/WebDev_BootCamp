/*
    Function that takes a string as a paremeter
    and converts all especific characters into anything that you can dream
*/

function replaceChar(str) {
  // Performe a global replacement (g is for global)
  return str.replace(/-/g, "_");
}

var frase = prompt("Write a frase using \"-\" as space ");
var result = replaceChar(frase);
var output = document.getElementById('output').innerHTML = result;
