import { createAction, props } from '@ngrx/store';

export const loadToken = createAction('[Auth] Load Token');
export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);
export const register = createAction(
  '[Auth] Register',
  props<{ username: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string }>()
);
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);
export const logout = createAction('[Auth] Logout');
