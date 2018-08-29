import { Action } from '@ngrx/store';
import { AuthActions, AUTHENTICATE, UNAUTHENTICATE } from './auth.actions';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        isAuthenticated: true
      };
    case UNAUTHENTICATE:
      return {
        isAuthenticated: false
      };
    default: {
      return state;
    }
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
