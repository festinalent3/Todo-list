describe('ToDoService', function() {
  beforeEach(module('toDoApp'));

  var ToDoService, httpBackend, todo1, todo2;

  var toDoData = [{text: "ToDo1", completed: true}, {text: "ToDo2", completed: false}];

  beforeEach(inject(function(_ToDoService_, _ToDoFactory_, $httpBackend) {
    ToDoService = _ToDoService_;
    ToDoFactory = _ToDoFactory_;
    httpBackend = $httpBackend;

    todo1 = new ToDoFactory("ToDo1", true);
    todo2 = new ToDoFactory("ToDo2", false);

    httpBackend.expectGET("https://quiet-beach-24792.herokuapp.com/todos.json").respond(toDoData);

  }));

  it('fetches a list of todos and stores them internally', function(){

    ToDoService.fetchAll().then(function(todos) {
      expect(todos).toEqual([todo1, todo2]);
    });

    httpBackend.flush();
  });

  it('returns only completed ToDos', function() {
    ToDoService.fetchAll().then(function(response){
      expect(ToDoService.getCompleted()).toEqual([todo1]);
    });
    httpBackend.flush();

  });

  it('returns only not completed ToDos', function() {
    ToDoService.fetchAll().then(function(response){
      expect(ToDoService.getNotCompleted()).toEqual([todo2]);
    });
    httpBackend.flush();

  });

  it('returns all ToDos', function() {
    ToDoService.fetchAll().then(function(response){
      expect(ToDoService.getAll()).toEqual([todo1, todo2]);
    });
    httpBackend.flush();

  });

});
