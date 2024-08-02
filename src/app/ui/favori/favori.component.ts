import { Component , OnInit, Renderer2, ElementRef } from '@angular/core';
import { Api } from '../../backend/api.service';
import { Beanfavori } from './favori.model';
import { Observable } from 'rxjs';
import { Store,select } from '@ngrx/store';
import { getCategories } from '../../store/user.selectors';
import { MessageService } from '../../message/message.service';
import { UserService } from '../../store/user.service';
import { getUsername, isLoggedIn,getUser } from '../../store/user.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favori',
  templateUrl: './favori.component.html',
  styleUrls: ['./favori.component.css']
})

export class FavoriComponent implements OnInit {
  data:            Beanfavori[] = [];
  filteredData:    any;
  isLoading:       boolean          = false;
  isOk:            boolean          = false;
  favoriX:         Beanfavori       = {};
  categorie$:      Observable<any>;
  message:         String           = "";
  filterCategorie: String = "";
  filterTexte:     String = "";
   username$:      Observable<string>;
  constructor(private store: Store,private api: Api,
              private renderer: Renderer2, 
              private elementRef: ElementRef,
              private router: Router,
              private userService: UserService,
              private messageService: MessageService) {
                          this.username$ = this.store.pipe(select(getUsername));
                          this.categorie$ = this.store.pipe(select(getCategories));

  }

  ngOnInit(): void {
    // On appelle le serveur
    this.api.getFavoris()
    .subscribe(
      (data) => {
        this.data = data;
        this.filtre();
        this.isLoading = false; 
      },
      (error) => {
        this.isLoading = false; 
        console.error(error);
      }
    );
    // juste pour les logs
    this.categorie$.subscribe({
      next: data => console.log('Données émises :', data),
      error: error => console.error('Erreur :', error),
      complete: () => console.log('Observable complet')
    });
  }

  openDetail(item:Beanfavori) {
    this.message         = "";
    this.favoriX         =  item;
    const elementFavoris = document.getElementById('favoris');
    const elementDetail  = document.getElementById('detail');
    if (elementFavoris) {this.renderer.setStyle(elementFavoris, 'height', 'calc(50vh - 47px)');}
    if (elementFavoris) {this.renderer.setStyle(elementDetail, 'height', 'calc(50vh - 47px)');}
    if (elementDetail)  {this.renderer.setStyle(elementDetail, 'visibility', 'visible');}
  }
  closeDetail() {
    const elementFavoris = document.getElementById('favoris');
    const elementDetail  = document.getElementById('detail');
    if (elementFavoris) {this.renderer.setStyle(elementFavoris, 'height', ' calc(100vh - 98px)');}
    if (elementDetail) { this.renderer.setStyle(elementDetail, 'visibility', 'hidden'); }
  }
  saveDetail() {
    console.log("save " + this.favoriX);
    this.checkForm();
    if(this.message === ''){
      this.api.postFavori(this.favoriX)
      .subscribe(
        (data) => {
          this.messageService.showMessage({ type: 'success', text: 'save done !', duration: 3000 });
          this.data = data;
          this.filtre();
          this.isLoading = false; 
        },
        (error) => {
          this.isLoading = false; 
          console.error(error);
        }
      );
      const elementFavoris = document.getElementById('favoris');
      const elementDetail  = document.getElementById('detail');
      if (elementFavoris) {this.renderer.setStyle(elementFavoris, 'height', ' calc(100vh - 98px)');}
      if (elementDetail) { this.renderer.setStyle(elementDetail, 'visibility', 'hidden'); }
    }
  }
  deleteDetail() {
    console.log("delete " + this.favoriX);
    this.checkForm();
    if(this.message === ''){
      this.api.deleteFavori(this.favoriX)
      .subscribe(
        (data) => {
          this.messageService.showMessage({ type: 'success', text: 'delete done !', duration: 3000 });
          this.data = data;
          this.isLoading = false; 
          this.filtre();
        },
        (error) => {
          this.isLoading = false; 
          console.error(error);
        }
      );
      const elementFavoris = document.getElementById('favoris');
      const elementDetail  = document.getElementById('detail');
      if (elementFavoris) {this.renderer.setStyle(elementFavoris, 'height', ' calc(100vh - 98px)');}      
      if (elementDetail) { this.renderer.setStyle(elementDetail, 'visibility', 'hidden'); }
    }
  }

  checkForm() {
    this.message = "";
    if (this.favoriX.idCategorie === ''){
      this.message = "Catégorie Obligatoire."
      return; 
    }
  }

  filtre(){
    debugger;
    if (this.filterCategorie === "" && this.filterTexte === "" ) {
      this.filteredData = this.data;
    } else {
      //this.filteredData = this.data.filter(item => item.idCategorie == this.filterCategorie);
      this.filteredData = [];
      this.data.forEach((item, index) => {
        this.isOk = true;
        if (this.filterCategorie !== "" &&  item.idCategorie != this.filterCategorie){
          this.isOk = false;
        }  
        if (this.filterTexte !== "" && this.filtreContient(item) == false)  {
          this.isOk = false;
        }  
        if (this.isOk === true){  
          this.filteredData.push(item)
        }
      })
    }
    
  }
  filtreContient(item:any){
    debugger;
    console.log(item); //value
    console.log(item.title); //value
    console.log(item.title.indexOf(this.filterTexte)); //value
    var  x = (""+ item.title + item.description).toUpperCase();
    var  y = ("" +this.filterTexte).toUpperCase();
    console.log(x); //value
    if (x.indexOf(y) == -1 ){
      return false;  
    }
    return true;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  clearInput(){
    this.filterTexte = "";
    this. filtre();

  }

  

}
