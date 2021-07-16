import * as fromTodo from './todo.actions';

describe('loadTodos', () => {
  it('should return an action', () => {
    expect(fromTodo.loadAll().type).toBe('[Todo] Load Todos');
  });
});
