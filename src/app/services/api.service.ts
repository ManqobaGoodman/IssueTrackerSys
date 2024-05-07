import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL:string = "https://localhost:7089/api/User/";
  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<any>(this.baseURL);
  }
}
