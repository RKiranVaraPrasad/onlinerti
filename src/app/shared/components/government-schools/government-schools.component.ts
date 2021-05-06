import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-government-schools',
  templateUrl: './government-schools.component.html',
  styleUrls: ['./government-schools.component.scss']
})
export class GovernmentSchoolsComponent implements OnInit, OnDestroy {
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
      schoolName: new FormControl('', [Validators.required]),
      departmentName: new FormControl('', [Validators.required]),
      schoolAddress: new FormControl('', [Validators.required]),
      villageMandalDistrict: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
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
        data.schoolName = this.rtiDetailsForm.get('schoolName').value;
        data.departmentName = this.rtiDetailsForm.get('departmentName').value;
        data.schoolAddress = this.rtiDetailsForm.get('schoolAddress').value;
        data.villageMandalDistrict = this.rtiDetailsForm.get('villageMandalDistrict').value;
        data.state = this.rtiDetailsForm.get('state').value;
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
        data.schoolName = this.rtiDetailsForm.get('schoolName').value;
        data.departmentName = this.rtiDetailsForm.get('departmentName').value;
        data.schoolAddress = this.rtiDetailsForm.get('schoolAddress').value;
        data.villageMandalDistrict = this.rtiDetailsForm.get('villageMandalDistrict').value;
        data.state = this.rtiDetailsForm.get('state').value;
        data.moreInfo = this.rtiDetailsForm.get('moreInfo').value;

        // this.currentService = rtiData
        if (this.selectedRoute === rtiData) {
          this.apiService.postGovernmentSchoolsService(data)
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
