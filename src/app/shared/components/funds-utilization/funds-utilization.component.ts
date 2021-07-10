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
  states: any;
  selectedState: any;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.rtiDetailsForm = this.fb.group({
      nameOfSchemeProject: new FormControl('', [Validators.required]),
      nameOfVillageTownCity: new FormControl('', [Validators.required]),
      nameOfDistrict: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      from: new FormControl('', [Validators.required]),
      to: new FormControl('', [Validators.required]),
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

        const data: any = {}
        data.nameOfSchemeProject = this.rtiDetailsForm.get('nameOfSchemeProject').value;
        data.nameOfVillageTownCity = this.rtiDetailsForm.get('nameOfVillageTownCity').value;
        data.nameOfDistrict = this.rtiDetailsForm.get('nameOfDistrict').value;
        data.state = this.rtiDetailsForm.get('state').value;
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
        data.nameOfSchemeProject = this.rtiDetailsForm.get('nameOfSchemeProject').value;
        data.nameOfVillageTownCity = this.rtiDetailsForm.get('nameOfVillageTownCity').value;
        data.nameOfDistrict = this.rtiDetailsForm.get('nameOfDistrict').value;
        data.state = this.rtiDetailsForm.get('state').value;
        data.from = this.rtiDetailsForm.get('from').value;
        data.to = this.rtiDetailsForm.get('to').value;
        data.moreInfo = this.rtiDetailsForm.get('moreInfo').value;

        // this.currentService = rtiData
        if (this.selectedRoute === rtiData) {
          this.apiService.postFundsUtilizationService(data)
            .subscribe(
              (resultID: any) => {
                this.apiService.sendRtiId(resultID.id);
              }
            )
        }
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
