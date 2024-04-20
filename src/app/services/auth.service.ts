import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL:string = "https://localhost:7089/api/User/";

  constructor(private httpClient: HttpClient, private router: Router) { }

  signup(signupObj: any){
    return this.httpClient.post<any>(`${this.baseURL}register`,signupObj);
  }

  login(loginObj: any){
    return this.httpClient.post<any>(`${this.baseURL}login`,loginObj);
  }

  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue);
    //sessionStorage.setItem('token',tokenValue);
  }

  getToken(){
    return localStorage.getItem('token');
    //sessionStorage.getItem(tokenName);
  }

  isLogin(): boolean{
    return !! localStorage.getItem('token');
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
