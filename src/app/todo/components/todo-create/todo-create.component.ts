import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoCreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
