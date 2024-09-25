import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  register,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) =>
        this.authService.login(action).pipe(
          map((response) => {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/']);
            return loginSuccess({
              token: response.token,
            });
          }),
          catchError((error) => of(loginFailure({ error })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap((action) =>
        this.authService.register(action).pipe(
          map((response) => {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/']);
            return loginSuccess({
              token: response.token,
            });
          }),
          catchError((error) => of(loginFailure({ error })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      map(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      })
    ),
    {
      dispatch: false,
    }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
