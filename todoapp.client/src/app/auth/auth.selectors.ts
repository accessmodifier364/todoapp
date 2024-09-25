import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (authState: AuthState) => !!authState.token
);

export const selectAuthToken = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.token
);

export const selectAuthError = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.error
);
