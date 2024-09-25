import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadToken, logout } from './auth/auth.actions';
import { selectIsLoggedIn } from './auth/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loggedIn$ = this.store.select(selectIsLoggedIn);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadToken());
  }

  logOut(): void {
    this.store.dispatch(logout());
  }
}
