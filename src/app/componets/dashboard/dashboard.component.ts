import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public users: any = [];
  public fullName: string = '';
  public role: string = '';
  constructor(private authService: AuthService, private api: ApiService, private router: Router, private userService: UserStoreService) { }

  ngOnInit(): void {
    this.api.getUsers().
      subscribe( res => {
        this.users = res;
      });

    this.userService.getFullNameFromStore().subscribe(val => {
      let fulllNameFromToken = this.authService.getFullNameFromToken();
      this.fullName = val || fulllNameFromToken;
    });

    this.userService.getRoleFromStore().subscribe(val => {
      let roleFromToken = this.authService.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }

  logout(){
    this.authService.signOut();
  }

}
