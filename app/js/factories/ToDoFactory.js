toDoApp.factory('ToDoFactory', function() {

  var ToDo = function(text, completed){
    this.text = text;
    this.completed = (typeof completed !== 'undefined') ? completed : false;
  };

  ToDo.prototype.complete = function() {
    this.completed = true;
  };

  ToDo.prototype.isComplete = function() {
    return this.completed ? "completed" : "not completed"
  }

  return ToDo;
});
