import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = "http://172.105.60.86:1337";

  private userRegistration = `${this.baseUrl}/auth/local/register`;
  private userLogin = `${this.baseUrl}/auth/local`;

  constructor(
    private http: HttpClient
  ) { }

  // home banner login card
  public loginCardAfterLogin: EventEmitter<any> = new EventEmitter();

  //menu items
  public menuAfterLogin: EventEmitter<any> = new EventEmitter();
  public menuFlag(value) {
    this.menuAfterLogin.emit(value);
    this.loginCardAfterLogin.emit(value);
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
        }
        return user;
      }));
    // return this.http.post<any>(this.userLogin, data);
  }

  // user logout
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
  }

}
