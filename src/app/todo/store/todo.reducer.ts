import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from '../models/todo.model';
import * as TodoActions from './todo.actions';

export const todoFeatureKey = 'todo';

export interface State {
  loading: boolean;
  todos: Todo[];
  error?: any;
}

export const initialState: State = {
  loading: false,
  todos: []
};

const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadAll, state => ({ ...state, loading: true })),
  on(TodoActions.loadAllSuccess, (state, { todos }) => ({
    ...state,
    loading: false,
    todos: [...state.todos, ...todos],
  })),
  on(TodoActions.loadAllFailure, (state, { error }) => ({ ...state, loading: false, error })),
)
export function reducer(state: State | undefined, action: Action) {
  return todoReducer(state, action);
}
