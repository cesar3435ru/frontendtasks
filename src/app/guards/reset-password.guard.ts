import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { ResetPasswordService } from '../services/reset-password.service';


@Injectable({
  providedIn: 'root'
})
export class ResetPasswordGuard implements CanActivate {
  constructor(private auth: ResetPasswordService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.isAuth()) {
      console.log('Access allowed');
    } else {
      console.log('No access');
      this.router.navigateByUrl('/login');
      this.alertError();
    }
    return true;
  }


  alertError() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Access denied!',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
