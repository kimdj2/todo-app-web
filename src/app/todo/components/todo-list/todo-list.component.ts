import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TodoState } from '../../store/todo.state';
import { Select, Store } from '@ngxs/store';
import { Todo } from '../../models/todo.model';
import { Observable } from 'rxjs';
import { GetTodoList, DeleteTodo } from '../../store/todo.action';
import { UserState } from 'src/app/user/store/user.state';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  @Select(TodoState.getTodoList)
  todos$!: Observable<Todo[]>;
  @Select(UserState.getIsLoggedIn)
  isLoggedIn$!: Observable<boolean>;

  constructor(private store: Store) {
    console.log(this.isLoggedIn$)
  }

  ngOnInit() {
    this.store.dispatch(new GetTodoList());
  }

  deleteTodo(id: string) {
    this.store.dispatch(new DeleteTodo(id)).subscribe(() => {
      this.ngOnInit();
    });
  }

  getColorName(color: number) {
    switch (color) {
      case 1: return "red";
      case 2: return "yellow";
      case 3: return "blue";
      default: return "";
    }
  }

  getStateName(state: number) {
    switch (state) {
      case 0: return "着手前";
      case 1: return "進行中";
      case 2: return "終了";
      default: return "";
    }
  }

}
