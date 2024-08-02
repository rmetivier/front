import { Store } from '@ngrx/store';
import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../store/user.service';
import { getUsername, isLoggedIn,getUser } from '../../store/user.selectors';
import { UserState } from '../../store/user.reducer';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Api } from 'src/app/backend/api.service';
import { MessageService } from '../../message/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _ngUnsubscribe = new Subject();
  constructor(private cd: ChangeDetectorRef,
              private store: Store,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private api: Api,
              private messageService: MessageService) {}
  ngOnInit() {
    this.store
      .select(getUser)
      .pipe(takeUntil(this._ngUnsubscribe))
      .subscribe((userSession: UserState) => {
        if (userSession && userSession.isLoggedIn) { this.router.navigate(['/favori']);}
        this.cd.markForCheck();
      });
    /** Si l'init du component contient dans son URL un param Oauth2 Google, on appelle le backend pour se connecter avec le compte Google */  
    this.route.queryParamMap.subscribe(params => {
      var paramState = params.get('state'); 
      var paramCode  = params.get('code'); 
      if (paramState && paramState.includes('state_parameter_passthrough_value')) {
        this.messageService.showMessage({ type: 'success', text: 'Chargement de nos favoris depuis votre compte Google ...', duration: 3000 });
        this.api.postOauth2(paramCode)
        .subscribe(
          (data) => {
              this.userService.login(data.login, data.userId,data.categories);
          },
          (error) => {
            if (error.status === 404) {alert('user invalide');}
            console.error(error);
          }
        );
      }
    });
  } /** fin ngOnInit */

  onSubmit(username: string, password: string) {
    this.api.postLogin({user:username,password:password})
    .subscribe(
      (data) => {
            this.userService.login(username, data.userId,data.categories);
      },
      (error) => {
        if (error.status === 404) {alert('user invalide');}
        console.error(error);
      }
    );
  }


}
