import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './containers/todo/todo.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoCreateComponent } from './components/todo-create/todo-create.component';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';

const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
    children: [
      { path: '', component: TodoListComponent},
      { path: 'todo/create', component: TodoCreateComponent },
      { path: 'todo/edit/:id', component: TodoEditComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
