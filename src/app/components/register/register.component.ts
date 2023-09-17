import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, MinLengthValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { CustomValidators } from '../../validations/custom-validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private theForm: FormBuilder, private user: UserService, private rou: Router) { }

  progress: number = 0;
  showProgressBar = false;

  ngOnInit(): void {
    this.myForm.valueChanges.subscribe(() => {
      this.showProgressBar = true;
    });
  }

  updateProgress() {
    const totalFields = 7;
    const completedFields = Object.values(this.myForm.controls).filter(control => control.valid).length;
    this.progress = (completedFields / totalFields) * 100;
  }
  showPassword: boolean = false;
  showPasswordTwo: boolean = false;
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordTwo() {
    this.showPasswordTwo = !this.showPasswordTwo;
  }

  goodNot() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'User has been registered successfully!!!',
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


  myForm: FormGroup = this.theForm.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(20)]],
    cpassword: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(20)]],
    name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    lastname: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
    age: ["", [Validators.required, Validators.min(18), Validators.max(40)]],
    termsAndConditions: [false, Validators.requiredTrue]

  },
    { validators: CustomValidators.passwordsMatching });


  validateInput(input: string) {
    const control = this.myForm.controls[input];

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

  saveData() {
    if (this.myForm && this.myForm.valid) {
      const formData = {
        email: this.myForm.get('email')!.value,
        name: this.myForm.get('name')!.value,
        lastname: this.myForm.get('lastname')!.value,
        age: this.myForm.get('age')!.value,
        password: this.myForm.get('password')!.value,
      };      
      this.user.addUser(formData).subscribe(response => {
        console.log('Well donde');
      });
      this.myForm.reset();
      this.updateProgress();
      this.rou.navigate(['/login']);
      this.goodNot();
    }
  }


}
