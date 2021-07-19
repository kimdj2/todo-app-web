import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { TodoService } from '../services/todo.service'
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as TodoActions from './todo.actions';

@Injectable()
export class TodoEffects {

  constructor(private actions$: Actions, private todoService: TodoService) { }

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadAll),
      switchMap(() =>
        this.todoService.loadAll().pipe(
          map(result => TodoActions.loadAllSuccess({ todos: result })),
          catchError(error => of(TodoActions.loadAllFailure({ error })))
        )
      )
    )
  );

}
