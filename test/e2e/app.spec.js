
describe('Todos tracker', function() {
  it('has a todo', function() {
    browser.get('/');
    var todo = $('#todo');
    expect(todo.getText()).toEqual('ToDo1');
  });
});
