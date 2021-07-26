import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('Auth')) {
      const newRequest = request.clone({
        headers: request.headers.set(
          'Authorization', localStorage.getItem('Auth')!
        )
      });
      return next.handle(newRequest);
    }

    return next.handle(request);
  }
}
