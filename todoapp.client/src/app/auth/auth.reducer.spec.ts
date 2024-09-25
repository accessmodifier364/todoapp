import { loginFailure, loginSuccess, logout } from './auth.actions';
import * as authReducer from './auth.reducer';

describe('Auth Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const { initialState } = authReducer;
      const action = { type: 'Unknown' };
      const state = authReducer.authReducer(initialState, action);

      expect(state).toBe(initialState);
    });
  });

  describe('loginSuccess', () => {
    it('should set the token', () => {
      const { initialState } = authReducer;
      const action = loginSuccess({ token: 'testToken' });
      const state = authReducer.authReducer(initialState, action);

      expect(state.token).toEqual('testToken');
    });
  });

  describe('loginFailure', () => {
    it('should set the error', () => {
      const { initialState } = authReducer;
      const action = loginFailure({ error: 'testError' });
      const state = authReducer.authReducer(initialState, action);

      expect(state.error).toEqual('testError');
    });
  });

  describe('logout', () => {
    it('should clear the token', () => {
      const { initialState } = authReducer;
      const action = logout();
      const state = authReducer.authReducer(initialState, action);

      expect(state.token).toEqual(null);
    });
  });
});
