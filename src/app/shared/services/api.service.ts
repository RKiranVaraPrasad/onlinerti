import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

function _window() : any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  basicToken: string = "cnpwX3Rlc3Rfd3FuMHFTQlgxT0Y0ckc6aElsbzNKdHVHdmIzNnFYWVR3ZXVMUjkx";

  get nativeWindow() : any {
    return _window();
 }

  logged = localStorage.getItem('user') != null;
  userDetails = JSON.parse(localStorage.getItem('user'));
  baseUrl = "http://172.105.60.86:1337";

  private userRegistration = `${this.baseUrl}/auth/local/register`;
  private forgotPassword = `${this.baseUrl}/auth/forgot-password`;
  private resetPassword = `${this.baseUrl}/auth/reset-password`;
  private emailConfirmation = `${this.baseUrl}/auth/send-email-confirmation`;
  private userLogin = `${this.baseUrl}/auth/local`;
  private personalDetails = `${this.baseUrl}/personal-details`;
  private apply = `${this.baseUrl}/applies`;
  private applyEmailConfirmation = `${this.baseUrl}/apply/email-confirmation`;
  private services = `${this.baseUrl}/services`;

  private passportDelay = `${this.baseUrl}/passport-delays`;
  private itReturns = `${this.baseUrl}/income-tax-refunds`;
  private marksheetVerification = `${this.baseUrl}/marksheet-verifications`;
  private answerCopy = `${this.baseUrl}/answer-copies`;
  private firStatus = `${this.baseUrl}/fir-statuses`;
  private propertyDetails = `${this.baseUrl}/property-details`;
  private epfStatus = `${this.baseUrl}/epf-statuses`;
  private pensionApplication = `${this.baseUrl}/pension-applications`;
  private occupancyCertificate = `${this.baseUrl}/occupancy-certificates`;
  private collectorOffice = `${this.baseUrl}/collector-offices`;
  private revenueOffices = `${this.baseUrl}/revenue-offices`;
  private principalSecretary = `${this.baseUrl}/principal-secretary-to-govts`;
  private mpFundsUtilization = `${this.baseUrl}/mp-funds-utilizations`;
  private mlaFundUtilization = `${this.baseUrl}/mla-fund-utilizations`;
  private gramPanchayat = `${this.baseUrl}/gram-panchayats`;
  private fundsUtilization = `${this.baseUrl}/funds-utilizations`;
  private tenderDetails = `${this.baseUrl}/tender-details`;
  private roadWork = `${this.baseUrl}/road-works`;
  private governmentHostels = `${this.baseUrl}/government-hostels`;
  private governmentHospitals = `${this.baseUrl}/government-hospitals`;
  private governmentSchools = `${this.baseUrl}/government-schools`;

  private otherRti = `${this.baseUrl}/other-rtis`;

  private generateOrderId = `${this.baseUrl}/order-ids`;

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

  private mailConfirmation = new BehaviorSubject<any>('');
  subscribeMailConfirmation = this.mailConfirmation.asObservable();

  sendEmailConfirmation(email: any) {
    this.mailConfirmation.next(email);
  }

  getPersonalDetailByEmailService(email: any) {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    const params = new HttpParams().set('email', `${email}`);
    return this.http.get(this.personalDetails, {
      params
    })
  }

  getServicesService() {
    return this.http.get(this.services)
  }
  getPersonalServicesService() {
    return this.http.get(`${this.services}?category=1`)
  }
  getSocialServicesService() {
    return this.http.get(`${this.services}?category=2`)
  }
  getOtherServicesService() {
    return this.http.get(`${this.services}?category=3`)
  }
  postPersonalDetailsService(data: any) {
    return this.http.post(this.personalDetails, data)
  }

  putPersonalDetailsService(id: any, data: any) {
    let reqID: any = id;
    return this.http.put(`${this.personalDetails}/${reqID}`, data)
  }

  createOrderId(data: any){
    return this.http.post(this.generateOrderId, data);
  }

  postApplyService(data: any) {
    return this.http.post(this.apply, data)
  }

  postApplyEmailService(data: any){
    return this.http.post(this.applyEmailConfirmation, data)
  }

  postPassportDelayService(data: any): Observable<any> {
    return this.http.post(this.passportDelay, data);
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

  postCollectorOfficeService(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    return this.http.post(this.collectorOffice, data, {
      headers
    });
  }

  postRevenueOfficesService(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    return this.http.post(this.revenueOffices, data, {
      headers
    });
  }

  postPrincipalSecretaryService(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    return this.http.post(this.principalSecretary, data, {
      headers
    });
  }

  postMpFundsUtilizationService(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    return this.http.post(this.mpFundsUtilization, data, {
      headers
    });
  }

  postMlaFundUtilizationService(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    return this.http.post(this.mlaFundUtilization, data, {
      headers
    });
  }

  postGramPanchayatService(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    return this.http.post(this.gramPanchayat, data, {
      headers
    });
  }

  postFundsUtilizationService(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    return this.http.post(this.fundsUtilization, data, {
      headers
    });
  }

  postTenderDetailsService(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    return this.http.post(this.tenderDetails, data, {
      headers
    });
  }

  postRoadWorkService(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    return this.http.post(this.roadWork, data, {
      headers
    });
  }

  postGovernmentHostelsService(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    return this.http.post(this.governmentHostels, data, {
      headers
    });
  }

  postGovernmentHospitalsService(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    return this.http.post(this.governmentHospitals, data, {
      headers
    });
  }

  postGovernmentSchoolsService(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    return this.http.post(this.governmentSchools, data, {
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
    } else if (service === 'collector-office') {
      return this.http.get(`${this.collectorOffice}/${id}`)
    } else if (service === 'revenue-offices') {
      return this.http.get(`${this.revenueOffices}/${id}`)
    } else if (service === 'principal-secretary') {
      return this.http.get(`${this.principalSecretary}/${id}`)
    } else if (service === 'mp-funds-utilization') {
      return this.http.get(`${this.mpFundsUtilization}/${id}`)
    } else if (service === 'mla-fund-utilization') {
      return this.http.get(`${this.mlaFundUtilization}/${id}`)
    } else if (service === 'gram-panchayat') {
      return this.http.get(`${this.gramPanchayat}/${id}`)
    } else if (service === 'funds-utilization') {
      return this.http.get(`${this.fundsUtilization}/${id}`)
    } else if (service === 'tender-details') {
      return this.http.get(`${this.tenderDetails}/${id}`)
    } else if (service === 'road-work') {
      return this.http.get(`${this.roadWork}/${id}`)
    } else if (service === 'government-hostels') {
      return this.http.get(`${this.governmentHostels}/${id}`)
    } else if (service === 'government-hospitals') {
      return this.http.get(`${this.governmentHospitals}/${id}`)
    } else if (service === 'government-schools') {
      return this.http.get(`${this.governmentSchools}/${id}`)
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

    // email confirmation
    postEmailConfirmationService(email: any): Observable<any> {
      return this.http.post<any>(this.emailConfirmation, email);
    }

  // user logout
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('access-token');
    this.router.navigate(['login']);
  }

}
