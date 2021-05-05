import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-revenue-offices',
  templateUrl: './revenue-offices.component.html',
  styleUrls: ['./revenue-offices.component.scss']
})
export class RevenueOfficesComponent implements OnInit, OnDestroy {
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
      nameOfTheOffice: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      mandalTehsilDistrict: new FormControl('', [Validators.required]),
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
        data.nameOfTheOffice = this.rtiDetailsForm.get('nameOfTheOffice').value;
        data.state = this.rtiDetailsForm.get('state').value;
        data.mandalTehsilDistrict = this.rtiDetailsForm.get('mandalTehsilDistrict').value;
        data.officeAddress = this.rtiDetailsForm.get('officeAddress').value;
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
        data.nameOfTheOffice = this.rtiDetailsForm.get('nameOfTheOffice').value;
        data.state = this.rtiDetailsForm.get('state').value;
        data.mandalTehsilDistrict = this.rtiDetailsForm.get('mandalTehsilDistrict').value;
        data.officeAddress = this.rtiDetailsForm.get('officeAddress').value;
        data.moreInfo = this.rtiDetailsForm.get('moreInfo').value;

        // this.currentService = rtiData
        if (this.selectedRoute === rtiData) {
          this.apiService.postRevenueOfficesService(data)
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
