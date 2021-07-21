import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from '../user/models/user.model';
import { LogoutUser } from '../user/store/user.action';
import { UserState } from '../user/store/user.state';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Select(UserState.getIsLoggedIn)
  isLoggedIn$!: Observable<boolean>;
  @Select(UserState.getUser)
  user$!: Observable<User>;

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {}
  logout() {
    this.store.dispatch(new LogoutUser).subscribe(() => {
      this.router.navigate(['todo']);
    });
  }
}
