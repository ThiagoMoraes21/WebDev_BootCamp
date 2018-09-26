var toDos = ["Do something productive!"];

window.setTimeout(function(){
  while(input !== "quit"){
    var input = prompt("What do you like to do?");

    if (input === "new") {
      addToDos();
    } else if (input === "list") {
      listToDos();
    } else if(input === "delete") {
      deleteToDos();
    }
  }
  console.log("OK, YOU QUIT THE APP");


  function listToDos(){
    console.log("******************************");
    toDos.forEach(function(task, index){
    console.log(index + ": " + task);
    });
    console.log("******************************");
  }

  function addToDos(){
    var newToDo = prompt("Enter a new task!");
    toDos.push(newToDo);
    console.log("New To Do added");
  }

  function deleteToDos(){
    // ask for the index of the element to be delete
    var index = prompt("Enter the index of todo to be delete");
    // delete the choseen element
    toDos.splice(index, 1);
    console.log("Deleted To Do");
  }

}, 500);
