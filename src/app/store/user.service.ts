// user.service.ts

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { login, logout } from './user.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private store: Store) {}

  login(username: string, password: string, categories: any) {
    // Simuler une authentification réussie
    //if (username === 'user' && password === 'password') {
      this.store.dispatch(login({ username:username,hashcode: password ,categories:categories}));
    //}
  }

  logout() {
    this.store.dispatch(logout());
  }
}
