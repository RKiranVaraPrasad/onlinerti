import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-road-work',
  templateUrl: './road-work.component.html',
  styleUrls: ['./road-work.component.scss']
})
export class RoadWorkComponent implements OnInit, OnDestroy {
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
      nameOfTheRoad: new FormControl('', [Validators.required]),
      roadStartingFrom: new FormControl('', [Validators.required]),
      roadStartingTo: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      maintainedBy: new FormControl('', [Validators.required]),
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
        data.nameOfTheRoad = this.rtiDetailsForm.get('nameOfTheRoad').value;
        data.roadStartingFrom = this.rtiDetailsForm.get('roadStartingFrom').value;
        data.roadStartingTo = this.rtiDetailsForm.get('roadStartingTo').value;
        data.city = this.rtiDetailsForm.get('city').value;
        data.district = this.rtiDetailsForm.get('district').value;
        data.state = this.rtiDetailsForm.get('state').value;
        data.maintainedBy = this.rtiDetailsForm.get('maintainedBy').value;
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
        data.nameOfTheRoad = this.rtiDetailsForm.get('nameOfTheRoad').value;
        data.roadStartingFrom = this.rtiDetailsForm.get('roadStartingFrom').value;
        data.roadStartingTo = this.rtiDetailsForm.get('roadStartingTo').value;
        data.city = this.rtiDetailsForm.get('city').value;
        data.district = this.rtiDetailsForm.get('district').value;
        data.state = this.rtiDetailsForm.get('state').value;
        data.maintainedBy = this.rtiDetailsForm.get('maintainedBy').value;
        data.moreInfo = this.rtiDetailsForm.get('moreInfo').value;

        // this.currentService = rtiData
        if (this.selectedRoute === rtiData) {
          this.apiService.postRoadWorkService(data)
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
