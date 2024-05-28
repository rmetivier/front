// user.service.ts

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { login, logout } from './user.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private store: Store) {}

  login(username: string, userid: string, categories: any) {
    // Simuler une authentification réussie
    //if (username === 'user' && password === 'password') {
      this.store.dispatch(login({ username:username,userid: userid ,categories:categories}));
    //}
  }

  logout() {
    this.store.dispatch(logout());
  }
}
