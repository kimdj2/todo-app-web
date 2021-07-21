import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { tap, map } from 'rxjs/operators';
import { CommonService } from 'src/app/common/common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CommonService {

  constructor(protected http: HttpClient) {
    super(http);
  }

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    observe: 'response' as 'response',
  };

  login(todo: User) {
    return this.http
      .post<any>(`${this.URL}/login`, todo, this.httpOptions)
      .pipe(
        map(res => {
          localStorage.setItem('Auth', res.headers.get('Authorization')!)
          return res.body;
        }),
        tap(res => console.log('login user', res))
      );
  }

  add(todo: User) {
    return this.http
      .post<any>(`${this.URL}/user`, todo, this.httpOptions)
      .pipe(
        map(res => {
          localStorage.setItem('Auth', res.headers.get('Authorization')!)
          return res.body;
        }),
        tap(res => console.log('add user', res)))
  }

  authCheck() {
    return this.http
      .get<any>(`${this.URL}/authcheck`, this.httpOptions)
      .pipe(tap(res => {
        console.log('auth check user', res);
        return res.body;
      }))
  }

  logout() {
    return this.http
      .get<any>(`${this.URL}/logout`, this.httpOptions)
      .pipe(tap(res => console.log('logout user', res)))
  }
}
