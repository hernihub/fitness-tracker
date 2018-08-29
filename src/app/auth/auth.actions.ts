import { Action } from '@ngrx/store';

export const AUTHENTICATE =  '[Auth] authenticate user';
export const UNAUTHENTICATE =  '[Auth] unauthenticate user';

export class Authenticate implements Action {
  readonly type = AUTHENTICATE;
}

export class UnAuthenticate implements Action {
  readonly type = UNAUTHENTICATE;
}

export type AuthActions = Authenticate | UnAuthenticate;
