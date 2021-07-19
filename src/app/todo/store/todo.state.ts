import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Todo } from '../models/todo.model';
import { Category } from '../models/category.model';
import { GetTodoList, GetTodo, AddTodo, GetCategoryList, UpdateTodo, DeleteTodo } from '../store/todo.action';
import { TodoService } from '../services/todo.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export class TodoStateModel {
  todos: Todo[] = [];
  selectedTodo: Todo | null | undefined;
  categories: Category[] = [];
}

@State<TodoStateModel>({
  name: 'todos',
  defaults: {
    todos: [],
    selectedTodo: null,
    categories: [],
  }
})

@Injectable()
export class TodoState {

  constructor(private todoService: TodoService) {
  }

  @Selector()
  static getTodoList(state: TodoStateModel) {
    return state.todos;
  }

  @Selector()
  static getCategoryList(state: TodoStateModel) {
    return state.categories;
  }

  @Selector()
  static getSelectedTodo(state: TodoStateModel) {
    return state.selectedTodo;
  }

  @Action(GetTodoList)
  getTodos({ getState, setState }: StateContext<TodoStateModel>) {
    return this.todoService.loadAll().pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
        todos: result,
      });
    }));
  }

  @Action(GetTodo)
  getTodo({ getState, setState }: StateContext<TodoStateModel>, { id }: GetTodo) {
    return this.todoService.load(id).pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
        selectedTodo: result,
      });
    }));
  }

  @Action(AddTodo)
  addTodo({ getState, setState }: StateContext<TodoStateModel>, { payload }: AddTodo) {
    return this.todoService.add(payload).pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
      });
    }));
  }

  @Action(GetCategoryList)
  getCategoryList({ getState, setState }: StateContext<TodoStateModel>) {
    return this.todoService.loadCategoryAll().pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
        categories: result,
      });
    }));
  }

  @Action(UpdateTodo)
  updateTodo({ getState, setState }: StateContext<TodoStateModel>, { payload, id }: UpdateTodo) {
    return this.todoService.update(payload, id).pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
      });
    }));
  }

  @Action(DeleteTodo)
  deleteTodo({ getState, setState }: StateContext<TodoStateModel>, { id }: DeleteTodo) {
    return this.todoService.delete(id).pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
      });
    }));
  }
}
