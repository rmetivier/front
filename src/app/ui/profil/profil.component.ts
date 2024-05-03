import { Component, OnInit } from '@angular/core';
import { Api } from '../../backend/api.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  data: any;
  isLoading: boolean = false;

  constructor(private api: Api) { }

  ngOnInit(): void {
    this.api.fetchDataToDo()
    .subscribe(
      (data) => {
        // Traitement des données réussi
        this.data = data;
        this.isLoading = false; 

      },
      (error) => {
        // Gestion de l'erreur
        this.isLoading = false; 
        console.error(error);
      }
    );
    
    
   
}


}
