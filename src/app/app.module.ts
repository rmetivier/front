import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user.reducer';
import { AuthGuard } from './security/auth.guard';
import { AppComponent } from './app.component';
import { ProfilComponent } from './ui/profil/profil.component';
import { LoginComponent } from './ui/login/login.component';
import { FavoriComponent } from './ui/favori/favori.component';
import { HttpClientModule } from '@angular/common/http'; // Importez HttpClientModule


const routes: Routes = [
   
  {path: 'profil', component: ProfilComponent , canActivate: [AuthGuard]},
  {path: 'favori', component: FavoriComponent , canActivate: [AuthGuard]},
]

@NgModule({
  declarations: [
    AppComponent,
    ProfilComponent,
    LoginComponent,
    FavoriComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ user: userReducer }),
    HttpClientModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
