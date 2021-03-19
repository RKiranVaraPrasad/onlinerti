import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

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

  //menu items
  public menuAfterLogin: EventEmitter<any> = new EventEmitter();
  public menuFlag(value) {
    this.menuAfterLogin.emit(value);
  }

  // user registration
  postUserRegistrationService(data: any): Observable<any>{
    return this.http.post<any>(this.userRegistration, data);
  }

  // user Login
  postUserLoginService(data: any): Observable<any>{
    return this.http.post<any>(this.userLogin, data);
  }

}
