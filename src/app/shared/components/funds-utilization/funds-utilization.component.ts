import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-funds-utilization',
  templateUrl: './funds-utilization.component.html',
  styleUrls: ['./funds-utilization.component.scss']
})
export class FundsUtilizationComponent implements OnInit, OnDestroy {
  rtiDetailsForm: FormGroup;
  currentService: any;
  selectedRoute: string = this.router.url.split('/').pop();
  subscription: Subscription;
  subscriptionTwo: Subscription;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.rtiDetailsForm = this.fb.group({
      nameOfProject: new FormControl('', [Validators.required]),
      nameOfTown: new FormControl('', [Validators.required]),
      nameOfDistrict: new FormControl('', [Validators.required]),
      from: new FormControl('', [Validators.required]),
      to: new FormControl('', [Validators.required]),
      moreInfo: new FormControl('', [Validators.required])
    })
   }

   ngOnInit(): void {
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
        data.nameOfProject = this.rtiDetailsForm.get('nameOfProject').value;
        data.nameOfTown = this.rtiDetailsForm.get('nameOfTown').value;
        data.nameOfDistrict = this.rtiDetailsForm.get('nameOfDistrict').value;
        data.from = this.rtiDetailsForm.get('from').value;
        data.to = this.rtiDetailsForm.get('to').value;
        data.moreInfo = this.rtiDetailsForm.get('moreInfo').value;
        this.currentService = currentservice
        if (this.selectedRoute === this.currentService) {
          this.apiService.sendApplyRtiData(data);
        }
      }
    )
    this.subscriptionTwo = this.apiService.subscribeRtiData.subscribe(
      rtiData => {
        const data: any = {}
        data.nameOfProject = this.rtiDetailsForm.get('nameOfProject').value;
        data.nameOfTown = this.rtiDetailsForm.get('nameOfTown').value;
        data.nameOfDistrict = this.rtiDetailsForm.get('nameOfDistrict').value;
        data.from = this.rtiDetailsForm.get('from').value;
        data.to = this.rtiDetailsForm.get('to').value;
        data.moreInfo = this.rtiDetailsForm.get('moreInfo').value;

        // this.currentService = rtiData
        if (this.selectedRoute === rtiData) {
          this.apiService.postPensionApplicationService(data)
            .subscribe(
              (resultID: any) => {
                this.apiService.sendRtiId(resultID.id);
              }
            )
        }
      }
    )
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionTwo.unsubscribe();
  }

}
