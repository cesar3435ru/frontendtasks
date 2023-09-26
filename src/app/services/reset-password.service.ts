import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from 'appsettings-json-reader';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private myapi = AppSettings.readAppSettings().taskSettings.apiURL;

  token: any = '';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  isAuth(): boolean {
    this.token = localStorage.getItem('token') || null;
    if (this.token === null) {
      return false
    } else {
      return true
    }

  }

  checkEmail(email: string) {
    return this.http.post(this.myapi + '/api/verifyemail', email);
  }
  
  resetPassword(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    if (this.isAuth() && token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });  
      return this.http.post(this.myapi + '/api/resetpassword', formData, { headers }).pipe(
        map((response: any) => {
          return response;
        })
      );
    } else {
      return new Observable();
    }
  }
}
