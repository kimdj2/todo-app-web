import { Todo } from '../models/todo.model';


export class GetTodo {
  static readonly type = '[Todo] Get';
  constructor(public id: string) { }
}

export class GetTodoList {
  static readonly type = '[Todo] Get List';
}

export class AddTodo {
  static readonly type = '[Todo] Add';
  constructor(public payload: Todo) {
  }
}

export class UpdateTodo {
  static readonly type = '[Todo] Update';
  constructor(public payload: Todo, public id: string) {
  }
}

export class GetCategoryList {
  static readonly type = '[Category] Get List';
}

export class DeleteTodo {
  static readonly type = '[Course] Delete';
  constructor(public id: string) {
  }
}
