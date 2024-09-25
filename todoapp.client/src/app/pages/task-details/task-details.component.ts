import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  task: {
    title: string;
    description: string;
    dueDate: Date;
    isCompleted: boolean;
  } | null = null;

  date: Date | null = null;

  width = "60%";
  widthByBreakpoint = {
    md: "60%",
    sm: "80%",
    xs: "100%",
  };

  constructor(
    private api: TaskService,
    private route: ActivatedRoute,
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
    this.route.paramMap.subscribe((params) => {
      const taskId = params.get('id');
      if (taskId) {
        this.api.getTaskById(parseInt(taskId)).subscribe((data) => {
          this.task = data;
          if (!this.task) {
            return;
          }
          this.date = new Date(this.task.dueDate);
        });
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
