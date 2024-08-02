import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environnements/environment';
import { UserState } from '../../store/user.reducer';
import { Store } from '@ngrx/store';
import { UserService } from '../../store/user.service';
import { Api } from 'src/app/backend/api.service';
import { MessageService } from '../../message/message.service';
import { getUsername, isLoggedIn,getUser } from '../../store/user.selectors';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {
   
  public isLoading:    boolean = true;
  public isProd:    boolean = true;
  public backgroundImageUrl: string = "";
  private _ngUnsubscribe = new Subject();

  currentText: string = "";
  textOptions: string[] = [
    'Ce site offre une interface intuitive et conviviale, conçue pour vous permettre de classer et d\'accéder rapidement à vos favoris.',
    ' De plus, je crois en la transparence et en la collaboration, c\'est pourquoi tout le code source de ce site est disponible dans github.     <br/> <a href="https://github.com/rmetivier/front">https://github.com/rmetivier/front</a> pour le front Angular,    <br/> <a href="https://github.com/rmetivier/backend">https://github.com/rmetivier/backend</a> pour le backend SpringBoot',
    'Explorez la plateforme et découvrez comment elle peut transformer la gestion de vos favoris web. ',
    'Bienvenue et bonne navigation !'
  ];
  private intervalId: any;

  constructor(
    private cd: ChangeDetectorRef,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private api: Api,
    private messageService: MessageService,
    private userService: UserService) {
      this.isProd=environment.production;     
   }

  ngOnInit(): void {

    let index = 0;
    this.currentText = this.textOptions[index];

    this.intervalId = setInterval(() => {
      index = (index + 1) % this.textOptions.length;
      this.currentText = this.textOptions[index];
    }, 5000);

    this.isLoading = true;
    this.backgroundImageUrl = 'assets/images/home.jfif'; // Remplacez par le chemin de votre image
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
            this.isLoading = false;
          }
        );
      }else{
       
        setTimeout(() => {
          this.isLoading = false;
        }, 3000);
      }
    });
  } /** fin ngOnInit */



}
