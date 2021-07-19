import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/todo.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {}
  private todosUrl = 'http://localhost:9000/todo/list'; // Web APIのURL

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  loadAll() {
    return this.http
      .get<Todo[]>(this.todosUrl, this.httpOptions)
      .pipe(tap(res => console.log('load all todo', res)));
  }
}
