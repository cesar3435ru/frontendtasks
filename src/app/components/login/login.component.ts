import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private theForm: FormBuilder, private user: UserService, private rou: Router) { }


  ngOnInit(): void {
  }
  showPassword: boolean = false;
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  goodNot() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Login successfully!!!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  badNot() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something is wrong!'
    })
  }


  loginForm: FormGroup = this.theForm.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(10)]]
  })
  // validInput(input: string) {
  //   return this.loginForm.controls[input].errors && this.loginForm.controls[input].touched

  // }

  validInput(input: string) {
    const control = this.loginForm.controls[input];
    
    if (!control) {
      return false; // The control does not exist and no errors
    }
  
    if (input === 'password' && control.errors) {
      if (control.errors && control.touched) {
        return true; // Password is required and has been touched
      }
  
      if (control.errors && control.touched) {
        return true; // Password is too short and has been touched
      }
    }
  
    return control.errors && control.touched;
  }
  


  startLogin() {

    this.user.loginIn(this.loginForm.value).subscribe(
      (datauser: any) => {
        if (datauser) {
          this.user.saveToken(datauser.access_token);
          this.user.saveUser(datauser.user);
          this.loginForm.reset();
          this.rou.navigate(['/home']);
          this.goodNot();

        }
      }, error => {
        this.loginForm.reset();
        this.badNot();

      }
    )

  }

  

}
