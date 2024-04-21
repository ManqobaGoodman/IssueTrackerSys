import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router:Router, private toaster: NgToastService){}
  canActivate():boolean {
    if(this.auth.isLogin()){
      return true;
    }else{
      this.toaster.error({detail: 'Error', summary: 'Peaase login before you can access this page'});
      this.router.navigate(['login']);
      return false;
    }
  }
  
}
