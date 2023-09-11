import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2'



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: UserService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.auth.isAuth()) {
        console.log('Access allowed'); 
      }else{
        console.log('No access');
        this.router.navigateByUrl('/login');
        this.alertError();
      }
        return true;
    }
  

    alertError(){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Access denied!'
      })
    }
}
