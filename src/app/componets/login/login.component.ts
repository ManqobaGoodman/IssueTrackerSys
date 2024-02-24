import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import validateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  public loginFormGroup!: FormGroup;
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hideShowPassword(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon ='fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.isText ? this.type='text' : this.type = 'password';
  }

  onLogin(){
    if(this.loginFormGroup.valid){
      console.log(this.loginFormGroup.value);
      this.auth.login(this.loginFormGroup.value)
      .subscribe({
        next: (res) =>{
          alert(res.message);
          this.router.navigate(['dashboard']);
        },
        error: (err) =>{
          alert(err?.error.message);
        }
      });
    }else{
      console.log('form is not valid');
      validateForm.validateAllFormFileds(this.loginFormGroup);
      alert("Your form is invalid")
    }
  }

}
