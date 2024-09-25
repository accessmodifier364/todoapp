import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { register } from 'src/app/auth/auth.actions';
import { selectAuthError } from 'src/app/auth/auth.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form = new FormGroup({
    username: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16),
      Validators.pattern(/^[a-zA-Z0-9]+$/),
    ]),
    password: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(32),
    ]),
  });

  width = '60%';
  widthByBreakpoint = {
    md: '60%',
    sm: '80%',
    xs: '100%',
  };

  error$ = this.store.select(selectAuthError);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store
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

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const formData = this.form.value;

    if (!formData.username || !formData.password) {
      return;
    }

    this.store.dispatch(
      register({ username: formData.username!, password: formData.password! })
    );
  }
}
