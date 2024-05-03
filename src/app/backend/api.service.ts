import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Api {
    private backendUrl = 'http://localhost:4200/api'; // Remplacez cela par l'URL de votre backend

    constructor(private http: HttpClient) { }

    fetchFavoris(): Observable<any> {
        return this.http.get<any>(`${this.backendUrl}/favoris`);
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

    postFavori(data: any): Observable<any> {
        return this.http.post<any>(`${this.backendUrl}/favoris`, data);
    }

    deleteFavori(data: any): Observable<any> {
        return this.http.delete<any>(`${this.backendUrl}/favoris`, { body: data });
    }

    /*deleteData(id: number, body: any): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete(url, { body: body });
      }
*/





}
