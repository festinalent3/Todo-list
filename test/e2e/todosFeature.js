
describe('Todos tracker', function() {
  it('has a todo', function() {
    browser.get('/');
    var todos = $$('#todos p');
    expect(todos.first().getText()).toEqual('ToDo1: completed');
    expect(todos.last().getText()).toEqual('ToDo2: not completed');
  });

  it('can add a ToDo', function() {
    browser.get('/');
    // sendKeys tells protractor to enter the string "NewToDo" into the input
    $('#new-todo-name').sendKeys("NewToDo");
    $('#add-todo').click();

    var todo = $$('#todos p').last().getText();
    expect(todo).toEqual('NewToDo: not completed');
  });

  it('can remove a ToDo', function() {
    browser.get('/');
    var todos = $$('#todos p');

    $('#remove-todo').click();

    // This has a magic number, how could this magic number be avoided?
    // The solution is actually surprisingly complex so we've kept in the magic
    // number for simplicity's sake
    expect(todos.count()).toEqual(1);
  });
});
