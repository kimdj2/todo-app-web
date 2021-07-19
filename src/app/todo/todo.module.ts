import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './containers/todo/todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoCreateComponent } from './components/todo-create/todo-create.component';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TodoStoreModule } from './store/todo-store.module';


@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
    TodoCreateComponent,
    TodoEditComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    TodoStoreModule
  ],
  exports: [
    TodoComponent
  ]
})
export class TodoModule { }
