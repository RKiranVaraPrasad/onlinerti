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
  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.rtiDetailsForm = this.fb.group({
      pancardNumber: new FormControl('', [Validators.required]),
      financialYear: new FormControl('', [Validators.required]),
      wardNumber: new FormControl('', [Validators.required]),
      refundAmount: new FormControl('', [Validators.required]),
      itOffice: new FormControl('', [Validators.required]),
      ApplicantDate: new FormControl('', [Validators.required]),
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
          data.pancardNumber = this.rtiDetailsForm.get('pancardNumber').value;
          data.financialYear = this.rtiDetailsForm.get('financialYear').value;
          data.wardNumber = this.rtiDetailsForm.get('wardNumber').value;
          data.refundAmount = this.rtiDetailsForm.get('refundAmount').value;
          data.itOffice = this.rtiDetailsForm.get('itOffice').value;
          data.ApplicantDate = this.rtiDetailsForm.get('ApplicantDate').value;
          data.moreInfo = this.rtiDetailsForm.get('moreInfo').value;

          localStorage.setItem('tempData', JSON.stringify(data))
        }
      }
    )
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
