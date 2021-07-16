import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'todo',
    loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
