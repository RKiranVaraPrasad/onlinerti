import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-passport-delay',
  templateUrl: './passport-delay.component.html',
  styleUrls: ['./passport-delay.component.scss']
})
export class PassportDelayComponent implements OnInit, OnDestroy {
  rtiDetailsForm: FormGroup;
  currentService: any;
  selectedRoute: string = this.router.url.split('/').pop();
  subscription: Subscription;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.rtiDetailsForm = this.fb.group({
      ApplicantName: new FormControl('', [Validators.required]),
      applicationNo: new FormControl('', [Validators.required]),
      passportOffice: new FormControl('', [Validators.required]),
      applicationDate: new FormControl('', [Validators.required]),
      itOffice: new FormControl('', [Validators.required]),
      moreInfo: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.subscription = this.apiService.currentServiceType.subscribe(
      currentservice => {
        this.currentService = currentservice
        if (this.selectedRoute === this.currentService) {
          console.log(this.currentService)
          
          const data: any = {}
          data.ApplicantName = this.rtiDetailsForm.get('ApplicantName').value;
          data.applicationNo = this.rtiDetailsForm.get('applicationNo').value;
          data.passportOffice = this.rtiDetailsForm.get('passportOffice').value;
          data.applicationDate = this.rtiDetailsForm.get('applicationDate').value;
          data.itOffice = this.rtiDetailsForm.get('itOffice').value;
          data.moreInfo = this.rtiDetailsForm.get('moreInfo').value;

          localStorage.setItem('tempData', JSON.stringify(data))
          // if(this.rtiDetailsForm.valid){
          //   console.log(this.rtiDetailsForm.value)
          // }
        }
      }
    )
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    console.log(this.rtiDetailsForm.value)
  }

}
