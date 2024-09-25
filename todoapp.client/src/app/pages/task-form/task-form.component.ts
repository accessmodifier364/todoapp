import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  taskId: string | null = null;
  form = new FormGroup({
    title: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl<string | null>(null),
    dueDate: new FormControl<Date | null>(null, [Validators.required]),
    isCompleted: new FormControl(false),
  });
  isLoading = false;

  width = '60%';
  widthByBreakpoint = {
    md: '60%',
    sm: '80%',
    xs: '100%',
  };

  constructor(
    private route: ActivatedRoute,
    private api: TaskService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.width = this.widthByBreakpoint.xs;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.width = this.widthByBreakpoint.sm;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.width = this.widthByBreakpoint.md;
          }
        }
      });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.taskId = params['id'];
      if (this.taskId) {
        this.api.getTaskById(parseInt(this.taskId)).subscribe((data) => {
          this.form.patchValue(data);
        });
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    const formData = this.form.value;

    if (this.taskId) {
      this.api
        .updateTask({ formData, taskId: parseInt(this.taskId) })
        .subscribe({
          complete: () => {
            this.router.navigate(['/']);
          },
        });
    } else {
      this.api.createTask(formData).subscribe({
        complete: () => {
          this.router.navigate(['/']);
        },
      });
    }
  }
}
