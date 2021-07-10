import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-narega-funds',
  templateUrl: './narega-funds.component.html',
  styleUrls: ['./narega-funds.component.scss']
})
export class NaregaFundsComponent implements OnInit, OnDestroy {
  rtiDetailsForm: FormGroup;
  currentService: any;
  selectedRoute: string = this.router.url.split('/').pop();
  subscription: Subscription;
  subscriptionTwo: Subscription;
  selectedState: any;
  states: any;
 
  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.rtiDetailsForm = this.fb.group({
      villageName: new FormControl('', [Validators.required]),
      tehsilBlock: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      yearFrom: new FormControl('', [Validators.required]),
      yearTo: new FormControl('', [Validators.required]),
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
        data.villageName = this.rtiDetailsForm.get('villageName').value;
        data.tehsilBlock = this.rtiDetailsForm.get('tehsilBlock').value;
        data.district = this.rtiDetailsForm.get('district').value;
        data.state = this.rtiDetailsForm.get('state').value;
        data.yearFrom = this.rtiDetailsForm.get('yearFrom').value;
        data.yearTo = this.rtiDetailsForm.get('yearTo').value;
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
        data.villageName = this.rtiDetailsForm.get('villageName').value;
        data.tehsilBlock = this.rtiDetailsForm.get('tehsilBlock').value;
        data.district = this.rtiDetailsForm.get('district').value;
        data.state = this.rtiDetailsForm.get('state').value;
        data.yearFrom = this.rtiDetailsForm.get('yearFrom').value;
        data.yearTo = this.rtiDetailsForm.get('yearTo').value;
        data.moreInfo = this.rtiDetailsForm.get('moreInfo').value;

        // this.currentService = rtiData
        if (this.selectedRoute === rtiData) {
          this.apiService.postNageraFundsService(data)
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
