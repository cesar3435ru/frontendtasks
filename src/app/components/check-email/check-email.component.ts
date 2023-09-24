import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-check-email',
  templateUrl: './check-email.component.html',
  styleUrls: ['./check-email.component.css']
})
export class CheckEmailComponent implements OnInit {

  constructor(private theForm: FormBuilder, private reset: ResetPasswordService, private rou: Router) { }


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

  emailForm: FormGroup = this.theForm.group({
    email: ["", [Validators.required, Validators.email]],
  })

  validateInput(input: string) {
    return this.emailForm.controls[input].errors && this.emailForm.controls[input].touched

  }

  sendData() {
    if (this.emailForm.valid) {
      console.log(this.emailForm.value);
      this.emailForm.reset();
    }
  }


}
