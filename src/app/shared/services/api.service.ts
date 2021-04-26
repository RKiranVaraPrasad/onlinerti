import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  private forgotPassword = `${this.baseUrl}/auth/forgot-password`;
  private resetPassword = `${this.baseUrl}/auth/reset-password`;
  private userLogin = `${this.baseUrl}/auth/local`;
  private personalDetails = `${this.baseUrl}/personal-details`;
  private apply = `${this.baseUrl}/applies`;

  private passportDelay = `${this.baseUrl}/passport-delays`;
  private itReturns = `${this.baseUrl}/income-tax-refunds`;
  private marksheetVerification = `${this.baseUrl}/marksheet-verifications`;
  private answerCopy = `${this.baseUrl}/answer-copies`;
  private firStatus = `${this.baseUrl}/fir-statuses`;
  private propertyDetails = `${this.baseUrl}/property-details`;
  private epfStatus = `${this.baseUrl}/epf-statuses`;
  private pensionApplication = `${this.baseUrl}/pension-applications`;
  private occupancyCertificate = `${this.baseUrl}/occupancy-certificates`;
  private otherRti = `${this.baseUrl}/other-rtis`;

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

  sendApplyRtiData(data: any) {
    this.applyData.next(data);
  }

  private rtiData = new BehaviorSubject<any>('default message');
  subscribeRtiData = this.rtiData.asObservable();

  submitRtiDetails(message: any) {
    this.rtiData.next(message)
  }

  private formStatus = new BehaviorSubject<boolean>(false);
  subscribeFormStatus = this.formStatus.asObservable();

  sendFormStatus(status: boolean) {
    this.formStatus.next(status);
  }

  private rtiId = new BehaviorSubject<boolean>(false);
  subscribeRtiId = this.rtiId.asObservable();

  sendRtiId(data: any) {
    this.rtiId.next(data);
  }

  getPersonalDetailByEmailService(email: any) {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    const params = new HttpParams().set('email', `${email}`);
    return this.http.get(this.personalDetails, {
      params
    })
  }

  postPersonalDetailsService(data: any) {
    return this.http.post(this.personalDetails, data)
  }

  putPersonalDetailsService(id: any, data: any) {
    let reqID: any = id;
    return this.http.put(`${this.personalDetails}/${reqID}`, data)
  }

  postApplyService(data: any) {
    return this.http.post(this.apply, data)
  }

  postPassportDelayService(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    return this.http.post(this.passportDelay, data, {
      headers
    });
  }

  postItReturnService(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    return this.http.post(this.itReturns, data, {
      headers
    });
  }

  postMarksheetVerificationService(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    return this.http.post(this.marksheetVerification, data, {
      headers
    });
  }

  postAnswerCopyService(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    return this.http.post(this.answerCopy, data, {
      headers
    });
  }

  postFirStatusService(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    return this.http.post(this.firStatus, data, {
      headers
    });
  }


  postPropertyDetailsService(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    return this.http.post(this.propertyDetails, data, {
      headers
    });
  }

  postEpfStatusService(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    return this.http.post(this.epfStatus, data, {
      headers
    });
  }

  postPensionApplicationService(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    return this.http.post(this.pensionApplication, data, {
      headers
    });
  }

  postOccupancyCertificateService(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    return this.http.post(this.occupancyCertificate, data, {
      headers
    });
  }

  postOtherRtiService(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    return this.http.post(this.otherRti, data, {
      headers
    });
  }

  // my rti
  getMyRtiService(id: any) {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    const params = new HttpParams().set('personalDetailsId', `${id}`);
    return this.http.get(this.apply, {
      params
    });
  }

  // details
  getAppliesService(id: any) {
    return this.http.get(`${this.apply}/${id}`);
  }
  getRtiDetailsService(service: any, id: any) {
    if (service === 'it-returns') {
      return this.http.get(`${this.itReturns}/${id}`)
    } else if (service === 'other') {
      return this.http.get(`${this.otherRti}/${id}`)
    } else if (service === 'epf-status') {
      return this.http.get(`${this.epfStatus}/${id}`)
    } else if (service === 'fir-status') {
      return this.http.get(`${this.firStatus}/${id}`)
    } else if (service === 'passport-delay') {
      return this.http.get(`${this.passportDelay}/${id}`)
    } else if (service === 'marksheet-verification') {
      return this.http.get(`${this.marksheetVerification}/${id}`)
    } else if (service === 'answer-copy') {
      return this.http.get(`${this.answerCopy}/${id}`)
    } else if (service === 'property-details') {
      return this.http.get(`${this.propertyDetails}/${id}`)
    } else if (service === 'pension-application') {
      return this.http.get(`${this.pensionApplication}/${id}`)
    } else if (service === 'occupancy-certificate') {
      return this.http.get(`${this.occupancyCertificate}/${id}`)
    }

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

  // forgot password
  postForgotPasswordService(email: any): Observable<any> {
    return this.http.post<any>(this.forgotPassword, email);
  }

    // reset password
    postResetPasswordService(password: any): Observable<any> {
      return this.http.post<any>(this.resetPassword, password);
    }

  // user logout
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('access-token');
    this.router.navigate(['login']);
  }

}
