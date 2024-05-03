// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { getUsername, isLoggedIn,getUser } from '../store/user.selectors';

import { UserState } from '../store/user.reducer';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private isLogin: boolean = false;

  constructor(private store: Store, private router: Router) {
    this.store.select(getUser).subscribe((userSession: UserState) => {
        this.isLogin = userSession.isLoggedIn;
      });
  }

  canActivate(): boolean {
    if (this.isLogin) {
      return true;
    } else {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
      this.router.navigate(['/login']);
      return false;
    }
  }
}
