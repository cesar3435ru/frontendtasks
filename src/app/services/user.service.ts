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

  private tasksSubject: Subject<void> = new Subject<void>();
  private taskDeletedSubject: Subject<void> = new Subject<void>();
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

  

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));

  }



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

    if (this.isAuth() && token) {

      //Set up the headers with the token
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.post(this.api + '/api/logout',null, { headers });
    } else {
      return new Observable(); //Return something
    }
  }

  addUser(user: any) {
    return this.http.post(this.api + '/api/register', user);
  }

  addTask(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    if (this.isAuth() && token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });  
      return this.http.post(this.api + '/api/addtask', formData, { headers }).pipe(
        map((response: any) => {
          this.tasksSubject.next();
          return response;
        })
      );
    } else {
      return new Observable();
    }
  }

  getTasksObservable(): Observable<void> {
    return this.tasksSubject.asObservable();
  }


  getAllTasksByUser(): Observable<any> {
    const token = localStorage.getItem('token');
    if (this.isAuth() && token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      console.log('token', headers);
      return this.http.get(this.api + `/api/tasks`, { headers });
    } else {
      return new Observable();
    }
  }

  deleteTaskByUser(id: number): Observable<any> {
    const token = localStorage.getItem('token');

    if (this.isAuth() && token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      const url = `${this.api}/api/tasks/${id}`;

      return this.http.delete(url, { headers }).pipe(
        map((response: any) => {
          this.taskDeletedSubject.next();
          return response;
        })
      );
    } else {
      return new Observable();
    }
  }

  getTasksDeletedObservable(): Observable<void> {
    return this.taskDeletedSubject.asObservable();
  }

}
