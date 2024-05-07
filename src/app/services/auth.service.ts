import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL:string = "https://localhost:7089/api/User/";
  private userPayload: any;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
   }

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

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token)
  }

  public getFullNameFromToken(){
    if(this.userPayload)
      return this.userPayload.name;
  }

  public getRoleFromToken(){
    if(this.userPayload)
      return this.userPayload.role;
  }
}
