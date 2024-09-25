import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';

describe('AuthService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterModule],
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    authService = new AuthService(httpClientSpy, TestBed.inject(Router));
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should register (HttpClient called once)', (done: DoneFn) => {
    const credentials = { username: 'test', password: 'test' };
    const expectedToken = { token: 'token' };
    httpClientSpy.post.and.returnValue(of(expectedToken));

    authService.register(credentials).subscribe({
      next: (token) => {
        expect(token).withContext('expected token').toBe(expectedToken);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.post.calls.count()).withContext('one call').toBe(1);
  });

  it('should login (HttpClient called once)', (done: DoneFn) => {
    const credentials = { username: 'test', password: 'test' };
    const expectedToken = { token: 'token' };
    httpClientSpy.post.and.returnValue(of(expectedToken));

    authService.login(credentials).subscribe({
      next: (token) => {
        expect(token).withContext('expected token').toBe(expectedToken);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.post.calls.count()).withContext('one call').toBe(1);
  });
});
