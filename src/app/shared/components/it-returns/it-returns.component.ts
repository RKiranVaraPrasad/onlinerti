import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-it-returns',
  templateUrl: './it-returns.component.html',
  styleUrls: ['./it-returns.component.scss']
})
export class ItReturnsComponent implements OnInit, OnDestroy {
  rtiDetailsForm: FormGroup;
  currentService: any;
  selectedRoute: string = this.router.url.split('/').pop();
  subscription: Subscription;
  subscriptionTwo: Subscription;
  formData: any;
  states: any;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.formData = new FormData();
    this.rtiDetailsForm = this.fb.group({
      pancardNumber: new FormControl('', [Validators.required]),
      financialYear: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      wardNumber: new FormControl('', [Validators.required]),
      refundAmount: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      itOffice: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      ApplicantDate: new FormControl('', [Validators.required]),
      moreInfo: new FormControl('', [Validators.required])
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

        const data: any = {}
          data.pancardNumber = this.rtiDetailsForm.get('pancardNumber').value;
          data.financialYear = this.rtiDetailsForm.get('financialYear').value;
          data.wardNumber = this.rtiDetailsForm.get('wardNumber').value;
          data.refundAmount = this.rtiDetailsForm.get('refundAmount').value;
          data.itOffice = this.rtiDetailsForm.get('itOffice').value;
          data.state = this.rtiDetailsForm.get('state').value;
          data.ApplicantDate = this.rtiDetailsForm.get('ApplicantDate').value;
          data.moreInfo = this.rtiDetailsForm.get('moreInfo').value;

        // console.log(data)
        this.currentService = currentservice
        if (this.selectedRoute === this.currentService) {
          // console.log(this.currentService)
          this.apiService.sendApplyRtiData(data);
        }
      }
    )
    this.subscriptionTwo = this.apiService.subscribeRtiData.subscribe(
      rtiData => {
        const data: any = {}
          data.pancardNumber = this.rtiDetailsForm.get('pancardNumber').value;
          data.financialYear = this.rtiDetailsForm.get('financialYear').value;
          data.wardNumber = this.rtiDetailsForm.get('wardNumber').value;
          data.refundAmount = this.rtiDetailsForm.get('refundAmount').value;
          data.itOffice = this.rtiDetailsForm.get('itOffice').value;
          data.state = this.rtiDetailsForm.get('state').value;
          data.ApplicantDate = this.rtiDetailsForm.get('ApplicantDate').value;
          data.moreInfo = this.rtiDetailsForm.get('moreInfo').value;

        // this.currentService = rtiData
        if (this.selectedRoute === rtiData) {
          this.apiService.postItReturnService(data)
            .subscribe(
              (resultID: any) => {
                // console.log(resultID)
                this.apiService.sendRtiId(resultID.id);
                // console.log(resultID.id)
              }
            )
        }
        // console.log(rtiData)
      }
    )
    
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionTwo.unsubscribe();
  }
}
