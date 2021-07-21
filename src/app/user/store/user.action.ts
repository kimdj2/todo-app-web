import { User } from '../models/user.model';


export class LoginUser {
  static readonly type = '[User] login';
  constructor(public payload: User) { }
}

export class AddUser {
  static readonly type = '[User] Add';
  constructor(public payload: User) {
  }
}

export class AuthCheck {
  static readonly type = '[User] AuthCheck';
}

export class LogoutUser {
  static readonly type = '[User] logout';
}
