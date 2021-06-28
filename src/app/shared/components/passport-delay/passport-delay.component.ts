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
  subscriptionTwo: Subscription;
  formData: any;
  states: any;
  selectedState: any;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formData = new FormData();
    this.rtiDetailsForm = this.fb.group({
      applicantName: new FormControl('', [Validators.required]),
      applicationNo: new FormControl('', [Validators.required]),
      passportOffice: new FormControl('', [Validators.required]),
      applicationDate: new FormControl('', [Validators.required]),
      itOffice: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      moreInfo: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.apiService.getStatesService()
    .subscribe(
      (data: any) => {
        this.states = data;
      }
    )
    this.rtiDetailsForm.statusChanges.subscribe(
      newStatus => {
        if (newStatus === 'VALID') {
          this.apiService.sendFormStatus(true)
        } else {
          this.apiService.sendFormStatus(false)
        }
      }
    )
    this.subscription = this.apiService.currentServiceType.subscribe(
      currentservice => {
        // console.log(currentservice)
        const data: any = {}
        data.applicantName = this.rtiDetailsForm.get('applicantName').value;
        data.applicationNo = this.rtiDetailsForm.get('applicationNo').value;
        data.passportOffice = this.rtiDetailsForm.get('passportOffice').value;
        data.applicationDate = this.rtiDetailsForm.get('applicationDate').value;
        data.itOffice = this.rtiDetailsForm.get('itOffice').value;
        data.state = this.rtiDetailsForm.get('state').value;
        data.moreInfo = this.rtiDetailsForm.get('moreInfo').value;

        // console.log(data)
        this.currentService = currentservice
        if (this.selectedRoute === this.currentService) {
          this.apiService.sendApplyRtiData(data);
          // console.log(data)
        }
      }
    )
    this.subscriptionTwo = this.apiService.subscribeRtiData.subscribe(
      rtiData => {
        const data: any = {}
        data.applicantName = this.rtiDetailsForm.get('applicantName').value;
        data.applicationNo = this.rtiDetailsForm.get('applicationNo').value;
        data.passportOffice = this.rtiDetailsForm.get('passportOffice').value;
        data.applicationDate = this.rtiDetailsForm.get('applicationDate').value;
        data.itOffice = this.rtiDetailsForm.get('itOffice').value;
        data.state = this.rtiDetailsForm.get('state').value;
        data.moreInfo = this.rtiDetailsForm.get('moreInfo').value;

        // this.currentService = rtiData
        if (this.selectedRoute === rtiData) {
          this.apiService.postPassportDelayService(data)
            .subscribe(
              (resultID: any) => {
                // console.log(resultID)
                // console.log(resultID.id)
                this.apiService.sendRtiId(resultID.id);
              }
            )
        }
        // console.log(rtiData)
      }
    )
  }
  onChangeSelect(event){
    this.selectedState = event;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionTwo.unsubscribe();
  }

}
