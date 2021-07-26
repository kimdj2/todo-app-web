import { State, Action, StateContext, Selector } from '@ngxs/store';
import { User } from '../models/user.model';
import { AddUser, AuthCheck, LoginUser, LogoutUser } from './user.action';
import { UserService } from '../services/user.service';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export class UserStateModel {
  user!: User | null | undefined;
  isLoggedIn!: boolean;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: null,
    isLoggedIn: false,
  }
})

@Injectable()
export class UserState {

  constructor(private userService: UserService) {
  }

  @Selector()
  static getIsLoggedIn(state: UserStateModel) {
    return state.isLoggedIn;
  }

  @Selector()
  static getUser(state: UserStateModel) {
    return state.user;
  }

  @Action(LoginUser)
  loginUser({ getState, setState }: StateContext<UserStateModel>, { payload }: LoginUser) {
    return this.userService.login(payload).pipe(
      tap(user => {
        const state = getState();
        setState({
          ...state,
          isLoggedIn: true,
          user,
        });
      }, error => {
        localStorage.removeItem('Auth');
        const state = getState();
        setState({
          ...state,
          isLoggedIn: false,
          user: null,
        });
      })
    );
  }

  @Action(AddUser)
  addUser({ getState, setState }: StateContext<UserStateModel>, { payload }: AddUser) {
    return this.userService.add(payload).pipe(
      tap(user => {
        const state = getState();
        setState({
          ...state,
          isLoggedIn: true,
          user,
        });
      }, error => {
        localStorage.removeItem('Auth');
        const state = getState();
        setState({
          ...state,
          isLoggedIn: false,
          user: null,
        });
      })
    );
  }


  @Action(AuthCheck)
  authCheck({ getState, setState }: StateContext<UserStateModel>) {
    return this.userService.authCheck().pipe(
      tap(user => {
        const state = getState();
        setState({
          ...state,
          isLoggedIn: true,
          user: user.body,
        });
      }, error => {
        console.log("Auth Failed.")
        localStorage.removeItem('Auth');
        const state = getState();
        setState({
          ...state,
          isLoggedIn: false,
          user: null,
        })
      })
    );
  }

  @Action(LogoutUser)
  logout({ getState, setState }: StateContext<UserStateModel>) {
    return this.userService.logout().pipe(
      tap((result) => {
        localStorage.removeItem('Auth');
        const state = getState();
        setState({
          ...state,
          isLoggedIn: false,
          user: null,
        });
      }, error => {
        localStorage.removeItem('Auth');
        const state = getState();
        setState({
          ...state,
          isLoggedIn: false,
          user: null,
        })
      })
    );
  }


}
