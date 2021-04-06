import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private personalDetails = `${this.baseUrl}/personal-details`;
  private passportDelay = `${this.baseUrl}/passport-delays`;
  private apply = `${this.baseUrl}/applies`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    setTimeout(() => {
      this.userDataAfterLoggedIn.next(this.userDetails);
    }, 500);
  }

  //apply now
  private serviceType = new BehaviorSubject('default message');
  currentServiceType = this.serviceType.asObservable();

  saveServiceTypeData(message: any) {
    this.serviceType.next(message)
  }

  private applyData = new BehaviorSubject<any>('');
  subscribeApplyData = this.applyData.asObservable();

  sendApplyRtiData(data: any){
    this.applyData.next(data);
  }

  private rtiData = new BehaviorSubject<any>('default message');
  subscribeRtiData = this.rtiData.asObservable();

  submitRtiDetails(message: any){
    this.rtiData.next(message)
  }

  private formStatus = new BehaviorSubject<boolean>(false);
  subscribeFormStatus = this.formStatus.asObservable();

  sendFormStatus(status: boolean){
    this.formStatus.next(status);
  }

  private rtiId = new BehaviorSubject<boolean>(false);
  subscribeRtiId = this.rtiId.asObservable();

  sendRtiId(data: any){
    this.rtiId.next(data);
  }

  postPersonalDetailsService(data: any){
    return this.http.post(this.personalDetails, data)
  }

  postApplyService(data: any){
    return this.http.post(this.apply, data)
  }

  postPassportDelayService(data: any): Observable<any>{
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    return this.http.post(this.passportDelay, data, {
      headers
    });
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
        console.log(user.user)
        if (user && user.jwt) {
          localStorage.setItem('access-token', user.jwt);
          localStorage.setItem('user', JSON.stringify(user.user));
        }
        return user;
      }));
  }

  // user logout
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('access-token');
    this.router.navigate(['login']);
  }

}
