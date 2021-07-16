import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { State } from './todo.reducer';
import * as TodoSelectors from './todo.selector';
import * as TodoActions from './todo.actions';
import { TodoStoreModule } from './todo-store.module';

@Injectable({
  providedIn: TodoStoreModule, // 'root' でもOK
})
export class TodoFacade {
  loading$ = this.store.pipe(select(TodoSelectors.getLoading));
  todos$ = this.store.pipe(select(TodoSelectors.getTodos));

  constructor(private store: Store<State>) {}

  loadAll() {
    this.store.dispatch(TodoActions.loadAll());
  }
}
