import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTaskDialogComponent } from '../../components/delete-task-dialog/delete-task-dialog.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  dialog = inject(MatDialog);

  tasks: any[] = [];
  filteredTasks: any[] = [];
  searchFilter = '';

  cols = 4;
  gridByBreakpoint = {
    xl: 5,
    lg: 4,
    md: 3,
    sm: 2,
    xs: 1,
  };

  constructor(
    private apiService: TaskService,
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
            this.cols = this.gridByBreakpoint.xs;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.cols = this.gridByBreakpoint.sm;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.cols = this.gridByBreakpoint.md;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.cols = this.gridByBreakpoint.lg;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.cols = this.gridByBreakpoint.xl;
          }
        }
      });
  }

  ngOnInit(): void {
    this.apiService.getTasks().subscribe((data) => {
      this.tasks = data;
      this.filteredTasks = this.tasks;
    });
  }

  updateTask(task: any) {
    this.apiService.updateTask(task).subscribe((data) => {
      this.tasks = this.tasks.map((t) => (t.id === data.id ? data : t));
    });
  }

  filterTasks() {
    this.filteredTasks = this.tasks.filter((task) =>
      task.title.toLowerCase().includes(this.searchFilter.toLowerCase())
    );
  }

  openDeleteDialog(task: any) {
    this.dialog.open(DeleteTaskDialogComponent, {
      data: {tasks: this.tasks, filteredTasks: this.filteredTasks, taskId: task.taskId},
    });
  }
}
