import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import validateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signupFormgroup!: FormGroup;
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private toast: NgToastService) { }

  ngOnInit(): void {
    this.signupFormgroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hideShowPassword(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon ='fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.isText ? this.type='text' : this.type = 'password';
  }

  onSignUp(){
    if(this.signupFormgroup.valid){
      console.log(this.signupFormgroup.value);
      this.auth.signup(this.signupFormgroup.value)
      .subscribe({
        next:(res) =>{
          this.toast.success({detail: 'Success', summary: res.message, duration: 5000});
          this.router.navigate(['login']);
        },
        error: (err) =>{
          this.toast.error({detail: 'Error', summary: err?.error.message, duration: 5000});
        },
      });
    }else{
      console.log('form is not valid');
      validateForm.validateAllFormFileds(this.signupFormgroup);
      alert("Your form is invalid")
    }
  }

}
