import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/todo.model';
import { tap } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { CommonService } from 'src/app/common/common.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService extends CommonService {

  constructor(protected http: HttpClient) {
    super(http);
  }

  loadAll() {
    return this.http
      .get<Todo[]>(`${this.URL}/todo/list`, this.httpOptions)
      .pipe(tap(res => console.log('load all todo', res)));
  }

  loadCategoryAll(){
    return this.http
    .get<Category[]>(`${this.URL}/category/list`, this.httpOptions)
    .pipe(tap(res => console.log('load all category', res)));
  }

  load(id: string) {
    return this.http
      .get<Todo>(`${this.URL}/todo/${id}`, this.httpOptions)
      .pipe(tap(res => console.log('load todo', res)));
  }

  add(todo: Todo) {
    return this.http
      .post<Todo>(`${this.URL}/todo`, todo, this.httpOptions)
      .pipe(tap(res => console.log('update todo', res)));
  }

  update(todo: Todo, id: string) {
    return this.http
      .put<Todo>(`${this.URL}/todo/${id}`, todo, this.httpOptions)
      .pipe(tap(res => console.log('update todo', res)));
  }

  delete(id: string) {
    return this.http
      .delete<Todo>(`${this.URL}/todo/${id}`, this.httpOptions)
      .pipe(tap(res => console.log('delete todo', res)));
  }
}
