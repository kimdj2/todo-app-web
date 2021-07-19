import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoState } from '../../store/todo.state';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.model'
import { AddTodo, GetTodo, UpdateTodo, GetCategoryList } from '../../store/todo.action';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodoFormComponent implements OnInit {
  @Select(TodoState.getSelectedTodo) selectedTodo!: Observable<Todo>;
  @Select(TodoState.getCategoryList) categories!: Observable<Category[]>;

  todoForm!: FormGroup;
  @Input() editTodo: boolean = false;
  @Input() id!: string | null;
  @Input() formTitle!: string | null;

  stateList = [
    { code: 0, name: "着手前" },
    { code: 1, name: "進行中" },
    { code: 2, name: "終了" },
  ]

  constructor(private fb: FormBuilder, private store: Store, private route: ActivatedRoute, private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
    console.log(this.formTitle)
    this.store.dispatch(new GetCategoryList()).subscribe(() => {
      if (this.editTodo) {
        if (this.id === null) return;
        this.store.dispatch(new GetTodo(this.id)).subscribe(() => {
          this.selectedTodo.subscribe(todo => {
            this.todoForm.patchValue({
              id: todo.id,
              title: todo.title,
              body: todo.body,
              state: todo.state,
              categoryId: todo.category.id
            });
          })
        })
      }
    })
  }

  onSubmit() {
    if (this.editTodo) {
      this.store.dispatch(new UpdateTodo(this.todoForm.value, this.todoForm.value.id)).subscribe(() => {
        this.back();
      })
    } else {
      this.store.dispatch(new AddTodo(this.todoForm.value)).subscribe(() => {
        this.back();
      })
    }
  }

  createForm() {
    this.todoForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      body: ['', Validators.required],
      state: [0, Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  back() {
    this.router.navigate(['todo']);
  }

  getStatus() {
    return [
      { code: 0, name: "着手前" },
      { code: 1, name: "進行中" },
      { code: 2, name: "終了" },
    ]
  }

  getButtonName() {
    if (this.editTodo) {
      return "更新";
    } else {
      return "作成"
    }
  }

}
