import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TodoFacade } from '../../store/todo.facate';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  loading$ = this.todoService.loading$;
  todos$ = this.todoService.todos$;

  constructor(private todoService: TodoFacade) { }

  ngOnInit() {
    this.todoService.loadAll();
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
