import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo.model';

export const loadAll = createAction('[Todo Page] Load All');
export const loadAllSuccess = createAction('[Todo API] Load All Success', props<{ todos: Todo[] }>());
export const loadAllFailure = createAction('[Todo API] Load All Failure', props<{ error: any }>());
