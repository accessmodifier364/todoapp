import { createReducer, on } from '@ngrx/store';
import { loadToken, loginFailure, loginSuccess, logout } from './auth.actions';

export type AuthState = {
  token: string | null;
  error: any;
};

export const initialState: AuthState = {
  token: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(loadToken, (state) => {
    const localStorageToken = localStorage.getItem('token');
    return { ...state, token: localStorageToken ? localStorageToken : null };
  }),
  on(loginSuccess, (state, { token }) => ({
    ...state,
    token,
    error: null,
  })),
  on(loginFailure, (state, { error }) => ({ ...state, error })),
  on(logout, () => initialState)
);
