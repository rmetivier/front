import { createReducer, on } from '@ngrx/store';
import { login, logout } from './user.actions';

export interface UserState {
  isLoggedIn: boolean;
  username: string ;
  hashcode: string ;
  categories: [],
}

const initialState: UserState = {
  isLoggedIn: false,
  username:   "",
  hashcode:   "",
  categories: [],
};

export const userReducer = createReducer(
  initialState,
  on(login, (state, { username, hashcode,categories }) => ({ ...state, isLoggedIn: true, username,hashcode,categories })),
  on(logout, state => ({ ...state, isLoggedIn: false, username: '',hashcode:'' }))
);
