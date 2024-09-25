import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { TaskService } from './task.service';

describe('AuthService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let authService: TaskService;
  const expectedTasks = [
    {
      taskId: 1,
      title: 'Task 1',
      description: 'Task 1 description',
      dueDate: new Date(),
      isCompleted: false,
    },
    {
      taskId: 2,
      title: 'Task 2',
      description: 'Task 2 description',
      dueDate: new Date(),
      isCompleted: true,
    },
    {
      taskId: 3,
      title: 'Task 3',
      description: 'Task 3 description',
      dueDate: new Date(),
      isCompleted: false,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterModule],
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'put',
      'post',
      'delete',
    ]);
    authService = new TaskService(httpClientSpy);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should return expected tasks (HttpClient called once)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(expectedTasks));

    authService.getTasks().subscribe({
      next: (tasks) => {
        expect(tasks).withContext('expected tasks').toEqual(expectedTasks);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('should return expected task (HttpClient called once)', (done: DoneFn) => {
    const expectedTask = expectedTasks[1];
    httpClientSpy.get.and.returnValue(of(expectedTask));

    authService.getTaskById(2).subscribe({
      next: (task) => {
        expect(task).withContext('expected task').toEqual(expectedTask);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('should create task (HttpClient called once)', (done: DoneFn) => {
    const newTask = {
      taskId: 4,
      title: 'Task 4',
      description: 'Task 4 description',
      dueDate: new Date(),
      isCompleted: false,
    };
    httpClientSpy.post.and.returnValue(of(newTask));

    authService.createTask(newTask).subscribe({
      next: (task) => {
        expect(task).withContext('expected task').toEqual(newTask);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.post.calls.count()).withContext('one call').toBe(1);
  });

  it('should update task (HttpClient called once)', (done: DoneFn) => {
    const updatedTask = {
      taskId: 2,
      title: 'Updated Task 2',
      description: 'Updated Task 2 description',
      dueDate: new Date(),
      isCompleted: true,
    };
    httpClientSpy.put.and.returnValue(of(updatedTask));

    authService.updateTask(updatedTask).subscribe({
      next: (task) => {
        expect(task).withContext('expected task').toEqual(updatedTask);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.put.calls.count()).withContext('one call').toBe(1);
  });

  it('should delete task (HttpClient called once)', (done: DoneFn) => {
    httpClientSpy.delete.and.returnValue(of(null));

    authService.deleteTask(3).subscribe({
      next: () => {
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.delete.calls.count()).withContext('one call').toBe(1);
  });
});
