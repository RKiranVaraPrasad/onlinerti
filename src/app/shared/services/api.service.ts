import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = "http://172.105.60.86:1337";

  private userRegistration = `${this.baseUrl}/auth/local/register`;

  constructor(
    private http: HttpClient
  ) { }

  // user registration
  postUserRegistrationService(data: any): Observable<any>{
    return this.http.post<any>(this.userRegistration, data);
  }
}
