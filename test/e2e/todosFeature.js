describe('Todos tracker', function() {

  var mock = require('protractor-http-mock');

  beforeEach(function(){
    mock([{
      request: {
        path: 'http://quiet-beach-24792.herokuapp.com/todos.json',
        method: 'GET'
      },
      response: {
        data: [{text: "ToDo1", completed: true}, {text: "ToDo2", completed: false}]
      }
    }]);
  });

  it('has several ToDos', function() {
    browser.get('/');
    var todos = $$('#todos tr');
    expect(todos.first().getText()).toMatch('ToDo1: completed');
    expect(todos.last().getText()).toMatch('ToDo2: not completed');
  });

  it('can add a ToDo', function() {
    browser.get('/');
    $('#new-todo-name').sendKeys("NewTodo");
    $('#add-todo').click();

    var todo = $$('#todos tr').last().getText();
    expect(todo).toMatch('NewTodo: not completed');
  });

  it('can remove a ToDo', function() {
    browser.get('/');
    var todos = $$('#todos tr');
    var initialCount = todos.count();

    $('#remove-todo').click();

    expect(todos.count()).toEqual(1);
  });

  it('can mark a ToDo as complete', function(){
    browser.get('/');
    var todo = $$('#todos tr').last();
    todo.element(by.css('.complete')).click();

    expect(todo.getText()).toMatch("ToDo2: completed");
  });

  it('can search todos by name', function(){
    browser.get('/');
    var searchText = element(by.model('searchText'));
    searchText.clear();
    searchText.sendKeys('ToDo1');
    var todos = $$('#todos tr').last().getText();
    expect(todos).toMatch("ToDo1: completed");
  });

  afterEach(function(){
    mock.teardown();
  });
});
