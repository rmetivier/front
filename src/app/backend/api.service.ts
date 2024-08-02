import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/store/user.reducer';
import { getUser } from 'src/app/store/user.selectors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environnements/environment';

@Injectable({
    providedIn: 'root'
})
export class Api {
    private backendUrl = ''; 
    private _ngUnsubscribe = new Subject();
    public  name:      string  = "";
    public  userid:    string  = "";

    constructor(private store: Store<UserState>,private http: HttpClient) {
        this.backendUrl=environment.apiUrlServeurBack;
        this.store
            .select(getUser)
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe((userSession: UserState) => {
                  if (userSession) {this.name     = userSession.username?userSession.username:"";}
                  if (userSession) {this.userid   = userSession.userid?userSession.userid:"";}
                });
     }
 

     buildHeader(){
         return new HttpHeaders({
            'userId':  this.userid ,
            'Content-Type': 'application/json'
          });
     }

     
     getFavoris(): Observable<any> {
        const headers = this.buildHeader();
        return this.http.get<any>(`${this.backendUrl}/favoris`,{ headers });
    }

    fetchDataToDo(): Observable<any> {
        return this.http.get<any>(`${this.backendUrl}/todo.json`);
    }

    postData(data: any): Observable<any> {
        return this.http.post<any>(`${this.backendUrl}/data`, data);
    }

    postLogin(data: any): Observable<any> {
        return this.http.post<any>(`${this.backendUrl}/login`, data);
    }

    postOauth2(data: any): Observable<any> {
        return this.http.post<any>(`${this.backendUrl}/oauth2`, data);
    }

    postFavori(data: any): Observable<any> {
        const headers = this.buildHeader();
        return this.http.post<any>(`${this.backendUrl}/favoris`, data ,{ headers });
    }

    deleteFavori(data: any): Observable<any> {
        const options = {
            headers: this.buildHeader(),
            body: data
          };
        return this.http.delete<any>(`${this.backendUrl}/favoris`, options );
    }

    /*deleteData(id: number, body: any): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete(url, { body: body });
      }
*/





}
