import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/todo.model';
import { tap } from 'rxjs/operators';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }
  private todosUrl = 'http://localhost:9000'; // Web APIのURL

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  loadAll() {
    return this.http
      .get<Todo[]>(`${this.todosUrl}/todo/list`, this.httpOptions)
      .pipe(tap(res => console.log('load all todo', res)));
  }

  loadCategoryAll(){
    return this.http
    .get<Category[]>(`${this.todosUrl}/category/list`, this.httpOptions)
    .pipe(tap(res => console.log('load all category', res)));
  }

  load(id: string) {
    return this.http
      .get<Todo>(`${this.todosUrl}/todo/${id}`, this.httpOptions)
      .pipe(tap(res => console.log('load todo', res)));
  }

  add(todo: Todo) {
    return this.http
      .post<Todo>(`${this.todosUrl}/todo`, todo, this.httpOptions)
      .pipe(tap(res => console.log('update todo', res)));
  }

  update(todo: Todo, id: string) {
    return this.http
      .put<Todo>(`${this.todosUrl}/todo/${id}`, todo, this.httpOptions)
      .pipe(tap(res => console.log('update todo', res)));
  }

  delete(id: string) {
    return this.http
      .delete<Todo>(`${this.todosUrl}/todo/${id}`, this.httpOptions)
      .pipe(tap(res => console.log('delete todo', res)));
  }
}
