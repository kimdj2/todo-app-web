import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { AuthCheck } from '../user/store/user.action';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const result = new Subject<boolean>();
    this.store.dispatch(new AuthCheck()).subscribe(res => {
      result.next(true);
      result.complete();
    }, error => {
      this.router.navigate(['/user/login']);
    });
    return result.asObservable();
  }
}
