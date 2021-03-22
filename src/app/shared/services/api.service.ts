import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  logged = localStorage.getItem('user') != null;
  userDetails = JSON.parse(localStorage.getItem('user'));
  baseUrl = "http://172.105.60.86:1337";

  private userRegistration = `${this.baseUrl}/auth/local/register`;
  private userLogin = `${this.baseUrl}/auth/local`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    setTimeout(() => {
      this.userDataAfterLoggedIn.next(this.userDetails);
    }, 500);
  }

  // user details after login
  userDataAfterLoggedIn = new BehaviorSubject<any>(this.userDetails);
  userData = this.userDataAfterLoggedIn.asObservable();


  //menu items
  public menuAfterLogin: EventEmitter<any> = new EventEmitter();
  public menuFlag(value: any) {
    this.menuAfterLogin.emit(value);
  }

  // user registration
  postUserRegistrationService(data: any): Observable<any> {
    return this.http.post<any>(this.userRegistration, data);
  }

  // user Login
  postUserLoginService(data: any) {
    return this.http.post<any>(this.userLogin, data)
      .pipe(map(user => {
        if (user && user.jwt) {
          localStorage.setItem('access-token', user.jwt);
          localStorage.setItem('user', JSON.stringify(user.user));
          
          // this.userDataAfterLoggedIn.next(JSON.parse(localStorage.getItem('user')))
        }
        return user;
      }));
    // return this.http.post<any>(this.userLogin, data);
  }

  // user logout
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('access-token');
    this.router.navigate(['login']);
  }

}
