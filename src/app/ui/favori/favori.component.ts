import { Component , OnInit, Renderer2, ElementRef } from '@angular/core';
import { Api } from '../../backend/api.service';
import { Beanfavori } from './favori.model';
import { Observable } from 'rxjs';
import { Store,select } from '@ngrx/store';
import { getCategories } from '../../store/user.selectors';


@Component({
  selector: 'app-favori',
  templateUrl: './favori.component.html',
  styleUrls: ['./favori.component.css']
})

export class FavoriComponent implements OnInit {
  data:         Beanfavori[] = [];
  filteredData: any;
  //filteredItems: Item[] = [...this.items];
  isLoading:  boolean          = false;
  favoriX:    Beanfavori       = {};
  categorie$: Observable<any>;
  message:    String           = "";

  filterCategorie: String = "";
  constructor(private store: Store,private api: Api,private renderer: Renderer2, private elementRef: ElementRef) {
    this.categorie$ = this.store.pipe(select(getCategories));
  }
  ngOnInit(): void {
    // On appelle le serveur
    this.api.fetchFavoris()
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
    if (elementFavoris) {this.renderer.setStyle(elementFavoris, 'height', 'calc(50vh - 30px)');}
    if (elementDetail)  {this.renderer.setStyle(elementDetail, 'visibility', 'visible');}
  }
  closeDetail() {
    const elementFavoris = document.getElementById('favoris');
    const elementDetail  = document.getElementById('detail');
    if (elementFavoris) {this.renderer.setStyle(elementFavoris, 'height', '100%');}
    if (elementDetail) { this.renderer.setStyle(elementDetail, 'visibility', 'hidden'); }
  }
  saveDetail() {
    console.log("save " + this.favoriX);
    this.checkForm();
    if(this.message === ''){
      this.api.postFavori(this.favoriX)
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
      const elementFavoris = document.getElementById('favoris');
      const elementDetail  = document.getElementById('detail');
      if (elementFavoris) {this.renderer.setStyle(elementFavoris, 'height', '100%');}
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
          this.data = data;
          this.isLoading = false; 
        },
        (error) => {
          this.isLoading = false; 
          console.error(error);
        }
      );
      const elementFavoris = document.getElementById('favoris');
      const elementDetail  = document.getElementById('detail');
      if (elementFavoris) {this.renderer.setStyle(elementFavoris, 'height', '100%');}
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
  

  //applyFilter(column: string, value: string): void {
    //this.filteredItems = this.items.filter(item => {
    //  const itemValue = item[column].toString().toLowerCase();
    //  return itemValue.includes(value.toLowerCase());
    //});
  //}
  onOptionSelected($event: any): void {
    console.log("Option sélectionnée :" + $event + ">>>" + this.filterCategorie);
    this.filtre();
    // Exécuter votre script ou vos actions ici
  }

  filtre(){
    if (this.filterCategorie === "") {
      this.filteredData = this.data;
    } else {
    //  const age = parseInt(selectedAge, 10);
      this.filteredData = this.data.filter(item => item.idCategorie == this.filterCategorie);
      //this.filteredData = this.data.filter(item => "2" === this.filterCategorie);
      //this.filteredData = this.data.filter(item => item.idCategorie  = "1");
    /*
      this.data.forEach((item, index) => {
        console.log(item) //value
        console.log(index) //index
        if(item.idCategorie == this.filterCategorie){
          this.filteredData.push(item)
        }
      })
*/

    }
    
  }

}
