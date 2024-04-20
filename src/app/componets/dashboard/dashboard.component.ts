import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public users: any = [];
  constructor(private authService: AuthService, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.api.getUsers().
      subscribe( res => {
        this.users = res;
      }
      
      )
  }

  logout(){
    this.authService.signOut();
  }

}
