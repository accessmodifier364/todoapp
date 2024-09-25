import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AuthGuard } from './auth.guard';
import { selectIsLoggedIn } from './auth.selectors';
import { Observable } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';

describe('authGuard', () => {
  let guard: AuthGuard;
  let store: MockStore;
  const initialState = { loggedIn: false };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        // This has to be imported so the guard doesn't throw an error
        RouterModule.forRoot([
          {
            path: 'login',
            component: LoginComponent,
          },
        ]),
      ],
      providers: [
        AppRoutingModule,
        AuthGuard,
        provideMockStore({ initialState }),
      ],
    });

    store = TestBed.inject(MockStore);
    guard = TestBed.inject(AuthGuard);
  });

  it('should return true if the user is logged in', () => {
    store.overrideSelector(selectIsLoggedIn, true);

    guard.canActivate().subscribe((isLoggedIn) => {
      expect(isLoggedIn).toBeTrue();
    });
  });

  it('should return false if the user is not logged in', () => {
    store.overrideSelector(selectIsLoggedIn, false);

    guard.canActivate().subscribe((isLoggedIn) => {
      expect(isLoggedIn).toBeFalse();
    });
  });
});
