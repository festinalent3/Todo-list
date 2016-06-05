toDoApp.controller('ToDoController', ['ToDoService', 'ToDoFactory', function(ToDoService, ToDoFactory) {
  var self = this;

  self.filterOptions = ['all', 'completed', 'not-completed']
  self.selectedFilter = self.filterOptions[0];

  // Use the ToDoService to fetch our todos
  ToDoService.fetchAll().then(function(todos){
    self.todos = todos;
  });

  self.addToDo = function(todoText) {
    self.todos.push(new ToDoFactory(todoText));
  };

  self.removeToDo = function (todoText) {
    self.todos.pop();
  }

  self.clearToDos = function () {
    ToDoService.deleteCompleted();
    self.todos = ToDoService.getAll();
  }

  self.setFilter = function(selectedFilter) {
    switch (selectedFilter) {
      case 'completed':
        self.todos = ToDoService.getCompleted();
        break;
      case 'not-completed':
        self.todos = ToDoService.getNotCompleted();
        break;
      default:
        self.todos = ToDoService.getAll();
    }
  }

}]);
