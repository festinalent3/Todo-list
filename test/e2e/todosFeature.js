describe('Todos tracker', function() {

  var mock = require('protractor-http-mock');

  beforeEach(function(){
    mock([{
      request: {
        path: 'https://quiet-beach-24792.herokuapp.com/todos.json',
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
    var searchText = element(by.model('searchToDos'));
    searchText.clear();
    searchText.sendKeys('ToDo1');
    var todos = $$('#todos tr').last().getText();
    expect(todos).toMatch("ToDo1: completed");
  });


  it('displays 3 options for filtering', function(){
    browser.get('/');
    var allOptions = element.all(by.options('option for option in controller.filterOptions'));
    expect(allOptions.count()).toEqual(3);

    var firstOption = allOptions.get(0);
    expect(firstOption.getText()).toEqual('all');

    var secondOption = allOptions.get(1);
    expect(secondOption.getText()).toEqual('completed');

    var thirdOption = allOptions.get(2);
    expect(thirdOption.getText()).toEqual('not-completed');
  });


  it('can display only completed todos', function(){
    browser.get('/');
    var allOptions = element.all(by.options('option for option in controller.filterOptions'));
    var secondOption = allOptions.get(1);
    expect(secondOption.getText()).toEqual('completed');
    secondOption.click();
    var todos = $$('#todos tr').last().getText();
    expect(todos).toMatch("ToDo1: completed");
  });

  //Alternative way of doing it as the text in option is unique
  it('can display only not completed todos', function(){
    browser.get('/');
    element(by.cssContainingText('option', 'not-completed')).click();
    var todos = $$('#todos tr').last().getText();
    expect(todos).toMatch("ToDo2: not completed");
  });

  it('Displays total nr of tasks and total nr of active tasks', function() {
    browser.get('/');
    var totals = $$('#totals p');
    expect(totals.getText()).toMatch('Total tasks: 2');
  });

  afterEach(function(){
    mock.teardown();
  });
});
