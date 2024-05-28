import { Component, OnInit,ChangeDetectorRef , OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUsername, isLoggedIn,getUser } from './store/user.selectors';
import { UserService } from './store/user.service';
import { UserState } from './store/user.reducer';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from 'src/environnements/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  implements OnInit {
  public isProd:    boolean = true;
  public username$: Observable<string>;
  public name:      string  = "";
  public hashcode:  string  = ""; 
  public isLogin:   boolean = false;
  private _ngUnsubscribe = new Subject();

  constructor(private cd: ChangeDetectorRef,
              private store: Store,
              private userService: UserService,
              private router: Router) {
    this.isProd=environment.production;            
    this.username$ = this.store.pipe(select(getUsername));
  }
     
  ngOnInit() {
    this.store
      .select(getUser)
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe((userSession: UserState) => {
        this.hashcode = "null";
        if (userSession) {this.name     = userSession.username?userSession.username:"";}
        if (userSession) {this.isLogin  = userSession.isLoggedIn?userSession.isLoggedIn:false;}
        if (userSession) {this.hashcode = userSession.hashcode?userSession.hashcode:"";}
        this.cd.markForCheck();
      });
  }

  handleClick() {
    console.log('Le lien a été cliqué');
    alert('valeur de ' +  JSON.stringify(this.hashcode)) ;
    //this.userService.login("username", "password");
  }

  logout() {
    this.isLogin = false;
    this.userService.logout();
    this.router.navigate(['/']);
  }

  public ngOnDestroy(): void {
    this._ngUnsubscribe.complete();
  }

}
