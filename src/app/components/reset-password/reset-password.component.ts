import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import Swal from 'sweetalert2'
import { ResetPasswordValidators } from '../../validations/reset-password';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private theForm: FormBuilder, private reset: ResetPasswordService, private rou: Router) { }

  showPassword: boolean = false;
  showPasswordTwo: boolean = false;
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordTwo() {
    this.showPasswordTwo = !this.showPasswordTwo;
  }
  ngOnInit(): void {
  }

  goodNot() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Great work!!!',
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

  passwordForm: FormGroup = this.theForm.group({
    new_password: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(20)]],
    cpassword: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(20)]],

  }, { validators: ResetPasswordValidators.passwordsMatching }
  );

  validateInput(input: string) {
    const control = this.passwordForm.controls[input];

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

  updatePassword() {
    if (this.passwordForm.valid) {
      const formData = new FormData();
      formData.append('new_password', this.passwordForm.get('new_password')?.value);
      this.reset.resetPassword(formData).subscribe(
        (response) => {
          console.log('Backend responds:', response);
          this.goodNot();
          localStorage.removeItem('token');
          this.rou.navigate(['/login']);
        },
        (error) => {
          console.error('Error backend:', error);
        }
      );
    }
  }


}
