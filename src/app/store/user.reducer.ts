import { createReducer, on } from '@ngrx/store';
import { login, logout } from './user.actions';

export interface UserState {
  isLoggedIn: boolean;
  username:   string ;
  userid:     string ;
  hashcode:   string ;
  categories: [],
}

const initialState: UserState = {
  isLoggedIn: false,
  username:   "",
  userid:     "",
  hashcode:   "",
  categories: [],
};

export const userReducer = createReducer(
  initialState,
  on(login, (state, { username, userid,categories }) => ({ ...state, isLoggedIn: true, username,userid,categories })),
  on(logout, state => ({ ...state, isLoggedIn: false, username: '',hashcode:'' }))
);
