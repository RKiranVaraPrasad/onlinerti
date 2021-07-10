import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-collector-office',
  templateUrl: './collector-office.component.html',
  styleUrls: ['./collector-office.component.scss']
})
export class CollectorOfficeComponent implements OnInit, OnDestroy {
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
      districtName: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      collectorateAddress: new FormControl('', [Validators.required]),
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
        data.districtName = this.rtiDetailsForm.get('districtName').value;
        data.state = this.rtiDetailsForm.get('state').value;
        data.collectorateAddress = this.rtiDetailsForm.get('collectorateAddress').value;
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
        data.districtName = this.rtiDetailsForm.get('districtName').value;
        data.state = this.rtiDetailsForm.get('state').value;
        data.collectorateAddress = this.rtiDetailsForm.get('collectorateAddress').value;
        data.moreInfo = this.rtiDetailsForm.get('moreInfo').value;

        // this.currentService = rtiData
        if (this.selectedRoute === rtiData) {
          this.apiService.postCollectorOfficeService(data)
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
