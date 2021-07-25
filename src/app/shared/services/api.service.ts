import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

function _window(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  basicToken: string = "cnpwX3Rlc3Rfd3FuMHFTQlgxT0Y0ckc6aElsbzNKdHVHdmIzNnFYWVR3ZXVMUjkx";
  private loginStatus: BehaviorSubject<boolean>
  public logged: Observable<any>;;
  public userDataAfterLoggedIn: BehaviorSubject<any>;
  public userData: Observable<any>;

  get nativeWindow(): any {
    return _window();
  }

  // baseUrl = "http://onlinerti.co:1337";

  private userRegistration = `${environment.baseUrl}/auth/local/register`;
  private forgotPassword = `${environment.baseUrl}/auth/forgot-password`;
  private resetPassword = `${environment.baseUrl}/auth/reset-password`;
  private emailConfirmation = `${environment.baseUrl}/auth/send-email-confirmation`;
  private userLogin = `${environment.baseUrl}/auth/local`;
  private personalDetails = `${environment.baseUrl}/personal-details`;
  private apply = `${environment.baseUrl}/applies`;
  private applyCount = `${environment.baseUrl}/applies/count`;
  private documents = `${environment.baseUrl}/documents`;
  private states = `${environment.baseUrl}/states`;

  private applyEmailConfirmation = `${environment.baseUrl}/apply/email-confirmation`;
  private services = `${environment.baseUrl}/services`;

  private passportDelay = `${environment.baseUrl}/passport-delays`;
  private itReturns = `${environment.baseUrl}/income-tax-refunds`;
  private marksheetVerification = `${environment.baseUrl}/marksheet-verifications`;
  private answerCopy = `${environment.baseUrl}/answer-copies`;
  private firStatus = `${environment.baseUrl}/fir-statuses`;
  private propertyDetails = `${environment.baseUrl}/property-details`;
  private epfStatus = `${environment.baseUrl}/epf-statuses`;
  private pensionApplication = `${environment.baseUrl}/pension-applications`;
  private occupancyCertificate = `${environment.baseUrl}/occupancy-certificates`;
  private collectorOffice = `${environment.baseUrl}/collector-offices`;
  private revenueOffices = `${environment.baseUrl}/revenue-offices`;
  private principalSecretary = `${environment.baseUrl}/principal-secretary-to-govts`;
  private mpFundsUtilization = `${environment.baseUrl}/mp-funds-utilizations`;
  private mlaFundUtilization = `${environment.baseUrl}/mla-fund-utilizations`;
  private gramPanchayat = `${environment.baseUrl}/gram-panchayats`;
  private fundsUtilization = `${environment.baseUrl}/funds-utilizations`;
  private tenderDetails = `${environment.baseUrl}/tender-details`;
  private roadWork = `${environment.baseUrl}/road-works`;
  private governmentHostels = `${environment.baseUrl}/government-hostels`;
  private governmentHospitals = `${environment.baseUrl}/government-hospitals`;
  private governmentSchools = `${environment.baseUrl}/government-schools`;
  private govtSchemes = `${environment.baseUrl}/govt-schemes`;
  private nageraFunds = `${environment.baseUrl}/nare-ga-funds`;
  private banks = `${environment.baseUrl}/banks`;
  private municipalOffices = `${environment.baseUrl}/municipal-offices`;
  private gramPanchayatOffices = `${environment.baseUrl}/gram-panchayat-offices`;
  private stateGovernmentOffices = `${environment.baseUrl}/state-government-offices`;
  private centralGovernmentOffices = `${environment.baseUrl}/central-government-offices`;
  private rtaOffices = `${environment.baseUrl}/rta-offices`;
  private policeStations = `${environment.baseUrl}/police-stations`;
  private serviceMatters = `${environment.baseUrl}/service-matters`;
  private electricityOffices = `${environment.baseUrl}/electricity-offices`;

  private otherRti = `${environment.baseUrl}/other-rtis`;

  private generateOrderId = `${environment.baseUrl}/order-ids`;
  private getOrderId = `https://api.razorpay.com/v1/orders`;

  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    
    // user details after login
    this.userDataAfterLoggedIn = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
    this.userData = this.userDataAfterLoggedIn.asObservable();

    // login status
    this.loginStatus = new BehaviorSubject<boolean>(false);
    this.logged = this.loginStatus.asObservable();
  }

  public get userName() {
    return this.userDataAfterLoggedIn.value;
  }
  public get loginState() {
    return this.loginStatus.value;
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

  getStatesService() {
    return this.http.get(this.states)
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

  createOrderId(data: any) {
    return this.http.post(this.generateOrderId, data);
  }

  postApplyService(data: any) {
    return this.http.post(this.apply, data)
  }

  getApplyService() {
    return this.http.get(`${this.apply}?_sort=published_at:DESC`)
  }

  getApplyCountService() {
    return this.http.get(`${this.applyCount}`)
  }

  putApplyService(id: any, data: any) {
    const accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    let reqID: any = id;
    return this.http.put(`${this.apply}/${reqID}`, data, {
      headers
    })
  }

  postDocumentsService(data: any) {
    return this.http.post(this.documents, data)
  }

  postApplyEmailService(data: any) {
    return this.http.post(this.applyEmailConfirmation, data)
  }

  postPassportDelayService(data: any): Observable<any> {
    return this.http.post(this.passportDelay, data);
  }

  postItReturnService(data: any): Observable<any> {
    return this.http.post(this.itReturns, data);
  }

  postMarksheetVerificationService(data: any): Observable<any> {
    return this.http.post(this.marksheetVerification, data);
  }

  postAnswerCopyService(data: any): Observable<any> {
    return this.http.post(this.answerCopy, data);
  }

  postFirStatusService(data: any): Observable<any> {
    return this.http.post(this.firStatus, data);
  }


  postPropertyDetailsService(data: any): Observable<any> {
    return this.http.post(this.propertyDetails, data);
  }

  postEpfStatusService(data: any): Observable<any> {
    return this.http.post(this.epfStatus, data);
  }

  postPensionApplicationService(data: any): Observable<any> {
    return this.http.post(this.pensionApplication, data);
  }

  postOccupancyCertificateService(data: any): Observable<any> {
    return this.http.post(this.occupancyCertificate, data);
  }

  postCollectorOfficeService(data: any): Observable<any> {
    return this.http.post(this.collectorOffice, data);
  }

  postRevenueOfficesService(data: any): Observable<any> {
    return this.http.post(this.revenueOffices, data);
  }

  postPrincipalSecretaryService(data: any): Observable<any> {
    return this.http.post(this.principalSecretary, data);
  }

  postMpFundsUtilizationService(data: any): Observable<any> {
    return this.http.post(this.mpFundsUtilization, data);
  }

  postMlaFundUtilizationService(data: any): Observable<any> {
    return this.http.post(this.mlaFundUtilization, data);
  }

  postGramPanchayatService(data: any): Observable<any> {
    return this.http.post(this.gramPanchayat, data);
  }

  postFundsUtilizationService(data: any): Observable<any> {
    return this.http.post(this.fundsUtilization, data);
  }

  postTenderDetailsService(data: any): Observable<any> {
    return this.http.post(this.tenderDetails, data);
  }

  postRoadWorkService(data: any): Observable<any> {
    return this.http.post(this.roadWork, data);
  }

  postGovernmentHostelsService(data: any): Observable<any> {
    return this.http.post(this.governmentHostels, data);
  }

  postGovernmentHospitalsService(data: any): Observable<any> {
    return this.http.post(this.governmentHospitals, data);
  }

  postGovernmentSchoolsService(data: any): Observable<any> {
    return this.http.post(this.governmentSchools, data);
  }

  postGovtSchemesService(data: any): Observable<any> {
    return this.http.post(this.govtSchemes, data);
  }

  postNageraFundsService(data: any): Observable<any> {
    return this.http.post(this.nageraFunds, data);
  }

  postOtherRtiService(data: any): Observable<any> {
    return this.http.post(this.otherRti, data);
  }

  postPersonalRtiMoreInfoService(service: any, data: any): Observable<any> {
    if (service === 'banks') {
      return this.http.post(this.banks, data);
    }
    else if (service === 'municipal-offices') {
      return this.http.post(this.municipalOffices, data);
    }
    else if (service === 'gram-panchayat-offices') {
      return this.http.post(this.gramPanchayatOffices, data);
    }
    else if (service === 'state-government-offices') {
      return this.http.post(this.stateGovernmentOffices, data);
    }
    else if (service === 'central-government-offices') {
      return this.http.post(this.centralGovernmentOffices, data);
    }
    else if (service === 'rta-offices') {
      return this.http.post(this.rtaOffices, data);
    }
    else if (service === 'police-stations') {
      return this.http.post(this.policeStations, data);
    }
    else if (service === 'service-matters') {
      return this.http.post(this.serviceMatters, data);
    }
    else if (service === 'electricity-offices') {
      return this.http.post(this.electricityOffices, data);
    }
  }

  // single rti details
  getMyRtiService(id: any) {
    const accessToken = localStorage.getItem('access-token');
    // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
    const params = new HttpParams().set('personalDetailsId', `${id}`);
    return this.http.get(`${this.apply}?_sort=published_at:DESC`, {
      params
    });
  }

  //payment pending
  getOrderByIdService(id: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + 'cnpwX3Rlc3Rfd3FuMHFTQlgxT0Y0ckc6aElsbzNKdHVHdmIzNnFYWVR3ZXVMUjkx',
      'Content-Type': 'application/json'
    });
    return this.http.get(`${this.getOrderId}/${id}`, {
      headers
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
    } else if (service === 'govt-schemes') {
      return this.http.get(`${this.govtSchemes}/${id}`)
    }
    else if (service === 'narega-funds') {
      return this.http.get(`${this.nageraFunds}/${id}`)
    }
    else if (service === 'banks') {
      return this.http.get(`${this.banks}/${id}`)
    }
    else if (service === 'municipal-offices') {
      return this.http.get(`${this.municipalOffices}/${id}`)
    }
    else if (service === 'gram-panchayat-offices') {
      return this.http.get(`${this.gramPanchayatOffices}/${id}`)
    }
    else if (service === 'state-government-offices') {
      return this.http.get(`${this.stateGovernmentOffices}/${id}`)
    }
    else if (service === 'central-government-offices') {
      return this.http.get(`${this.centralGovernmentOffices}/${id}`)
    }
    else if (service === 'rta-offices') {
      return this.http.get(`${this.rtaOffices}/${id}`)
    }
    else if (service === 'police-stations') {
      return this.http.get(`${this.policeStations}/${id}`)
    }
    else if (service === 'service-matters') {
      return this.http.get(`${this.serviceMatters}/${id}`)
    }
    else if (service === 'electricity-offices') {
      return this.http.get(`${this.electricityOffices}/${id}`)
    }

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
          this.userDataAfterLoggedIn.next(user.user);
          this.loginStatus.next(true);
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
    this.userDataAfterLoggedIn.next(null);
    localStorage.removeItem('access-token');
    // this.router.navigate(['login']);
  }

}
