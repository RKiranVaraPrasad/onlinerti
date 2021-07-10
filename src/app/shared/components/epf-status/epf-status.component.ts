import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-epf-status',
  templateUrl: './epf-status.component.html',
  styleUrls: ['./epf-status.component.scss']
})
export class EpfStatusComponent implements OnInit, OnDestroy {
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
      epfAccountNo: new FormControl('', [Validators.required]),
      previousEmployer: new FormControl('', [Validators.required]),
      currentEmployer: new FormControl('', [Validators.required]),
      epfOfficeOldAccount: new FormControl('', [Validators.required]),
      epfOfficeNewAccount: new FormControl('', [Validators.required]),
      transferApplicationDate: new FormControl('', [Validators.required]),
      moreInfo: new FormControl('')
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
        data.epfAccountNo = this.rtiDetailsForm.get('epfAccountNo').value;
        data.previousEmployer = this.rtiDetailsForm.get('previousEmployer').value;
        data.currentEmployer = this.rtiDetailsForm.get('currentEmployer').value;
        data.epfOfficeOldAccount = this.rtiDetailsForm.get('epfOfficeOldAccount').value;
        data.epfOfficeNewAccount = this.rtiDetailsForm.get('epfOfficeNewAccount').value;
        data.transferApplicationDate = this.rtiDetailsForm.get('transferApplicationDate').value;
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
        data.epfAccountNo = this.rtiDetailsForm.get('epfAccountNo').value;
        data.previousEmployer = this.rtiDetailsForm.get('previousEmployer').value;
        data.currentEmployer = this.rtiDetailsForm.get('currentEmployer').value;
        data.epfOfficeOldAccount = this.rtiDetailsForm.get('epfOfficeOldAccount').value;
        data.epfOfficeNewAccount = this.rtiDetailsForm.get('epfOfficeNewAccount').value;
        data.transferApplicationDate = this.rtiDetailsForm.get('transferApplicationDate').value;
        data.moreInfo = this.rtiDetailsForm.get('moreInfo').value;

        // this.currentService = rtiData
        if (this.selectedRoute === rtiData) {
          this.apiService.postEpfStatusService(data)
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
