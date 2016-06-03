toDoApp.service('ToDoService', ['$http', 'ToDoFactory', function($http, ToDoFactory) {

var self = this;

self.getAll = function() {
  // Here we're now just returning the value of the `then` method
  // Due to how promises work this returns another promise, which in our test
  // or controller we can call `.then` on again, and it will pass this method
  // the array of `ToDoFactory` objects returned from the `then` method below
  //
  // It sounds complicated, but basically it's a way of being able to in our
  // controller do
  //
  // ToDoService.getAll().then(function(todos) {
  //   self.todos = todos;
  // });
  //
  // More on this here
  // http://blog.ninja-squad.com/2015/05/28/angularjs-promises/
  return $http.get('http://quiet-beach-24792.herokuapp.com/todos.json')
  .then(_handleResponseFromApi);
};

function _handleResponseFromApi (response) {
  return response.data.map(function(toDoData){
    return new ToDoFactory(toDoData.text, toDoData.completed);
  });
}

}]);
