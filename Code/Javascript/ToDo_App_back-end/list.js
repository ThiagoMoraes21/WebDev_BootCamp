var toDos = ["something useless"];

window.setTimeout(function(){
  while(input !== "quit"){
    var input = prompt("What do you like to do?");

    if (input === "new") {
      var newToDo = prompt("Enter a new task!");
      toDos.push(newToDo);

    } else if (input === "list") {
      return listTasks(toDos);

    } else {
      alert("This option is not available!");
    }
  }

  function listTasks(tasks){
    console.log(toDos);
    document.getElementById('todo').innerHTML = tasks;
  }
}, 500);
