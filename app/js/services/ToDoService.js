toDoApp.service('ToDoService', ['$http', 'ToDoFactory', function($http, ToDoFactory) {

  var self = this;
  var todos;

  self.fetchAll = function() {
    return $http.get('https://quiet-beach-24792.herokuapp.com/todos.json')
    .then(_handleResponseFromApi);
  };

  self.getCompleted = function(){
    return todos.filter(function(todo) {
      return todo.completed === true;
    })
  };

  self.getNotCompleted = function(){
    return todos.filter(function(todo) {
      return todo.completed === false;
    })
  };

  self.getAll = function() {
    return todos;
  };

  self.deleteCompleted = function() {
    todos = self.getNotCompleted();
  };

  function _handleResponseFromApi (response) {
    todos = response.data.map(function(toDoData){
      return new ToDoFactory(toDoData.text, toDoData.completed);
    });
    return todos;
  }


}]);
