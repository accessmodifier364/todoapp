import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-delete-task-dialog',
  templateUrl: './delete-task-dialog.component.html',
  styleUrls: ['./delete-task-dialog.component.css'],
})
export class DeleteTaskDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteTaskDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  constructor(private api: TaskService) {}

  onDelete() {
    this.api.deleteTask(this.data.taskId).subscribe({
      complete: () => {
        this.dialogRef.close();
        window.location.reload();
      },
    });
  }
}
