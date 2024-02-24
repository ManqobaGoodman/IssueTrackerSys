import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL:string = "https://localhost:7089/api/User/";

  constructor(private httpClient: HttpClient) { }

  signup(signupObj: any){
    return this.httpClient.post<any>(`${this.baseURL}register`,signupObj);
  }

  login(loginObj: any){
    return this.httpClient.post<any>(`${this.baseURL}login`,loginObj);
  }
}
