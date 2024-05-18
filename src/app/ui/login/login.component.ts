import { Store } from '@ngrx/store';
import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../store/user.service';
import { getUsername, isLoggedIn,getUser } from '../../store/user.selectors';
import { UserState } from '../../store/user.reducer';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Api } from 'src/app/backend/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _ngUnsubscribe = new Subject();
  categories:      any;
  constructor(private cd: ChangeDetectorRef, private store: Store, private userService: UserService,private router: Router,private api: Api) {}
  ngOnInit() {
    this.store
      .select(getUser)
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe((userSession: UserState) => {
        if (userSession && userSession.isLoggedIn) { this.router.navigate(['/favori']);}
        this.cd.markForCheck();
      });
  }
  onSubmit(username: string, password: string) {
    this.api.postLogin({user:username,password:password})
    .subscribe(
      (data) => {
        // Traitement des données réussi
         this.categories = data;
         this.userService.login(username, password,this.categories);
      },
      (error) => {
        if (error.status === 404) {
          alert('user invalide');
        }
        debugger;
        // Gestion de l'erreur
        console.error(error);
      }
    );
  }


}
