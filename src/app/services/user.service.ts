import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from 'appsettings-json-reader';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isAuthenticated = new BehaviorSubject<boolean>(false); // Propiedad de autenticación


  private api = AppSettings.readAppSettings().taskSettings.apiURL;

  token: any = '';
  user: any = {};

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  loginIn(user: any) {
    return this.http.post(this.api + '/api/login', user);
  }

  

  //Guardar token en localStorage
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  //Guardar datos del usuario en localStorage
  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));

  }




  //Comprobar si esta autenticado el  usuario
  isAuth(): boolean {
    this.token = localStorage.getItem('token') || null;
    this.user = JSON.parse(localStorage.getItem('user') || 'null') || null;

    if (this.token === null || this.user === null) {
      return false
    } else {
      return true
    }

  }


  logOut(): Observable<any> {
    const token = localStorage.getItem('token');
    // console.log(token);

    if (this.isAuth() && token) {

      // console.log('Entro al if');
      //Set up the headers with the token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.post(this.api + '/api/logout',null, { headers });
    } else {
      return new Observable(); //Return something
    }
  }

}
