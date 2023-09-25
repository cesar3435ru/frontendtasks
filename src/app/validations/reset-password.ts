import { AbstractControl, ValidationErrors } from "@angular/forms";

export class ResetPasswordValidators {
  static passwordsMatching(control: AbstractControl): ValidationErrors | null {
    const new_password = control.get('new_password')?.value;
    const cpassword = control.get('cpassword')?.value;

    // Check if passwords are matching. If not then add the error 'passwordsNotMatching: true' to the form
    if ((new_password === cpassword) && (new_password !== null && cpassword !== null)) {
      return null;
    } else {
      return { passwordsNotMatching: true };
    }
  }

}   