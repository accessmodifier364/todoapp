import { AuthState } from './auth.reducer';
import { selectAuthError, selectAuthState, selectAuthToken, selectIsLoggedIn } from './auth.selectors';

describe('Selectors', () => {
  const initialState: AuthState = {
    token: 'token',
    error: null,
  };

  it('should select the token', () => {
    const result = selectAuthToken.projector(initialState);
    expect(result).toEqual('token');
  });

  it('should select the error', () => {
    const result = selectAuthError.projector(initialState);
    expect(result).toEqual(null);
  });

  it('should select if logged in', () => {
    const result = selectIsLoggedIn.projector(initialState);
    expect(result).toEqual(true);
  })

  it('should select if not logged in', () => {
    const result = selectIsLoggedIn.projector({ ...initialState, token: null });
    expect(result).toEqual(false);
  })
});
