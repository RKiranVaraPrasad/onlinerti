import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-marksheet-verification',
  templateUrl: './marksheet-verification.component.html',
  styleUrls: ['./marksheet-verification.component.scss']
})
export class MarksheetVerificationComponent implements OnInit, OnDestroy {
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
      course: new FormControl('', [Validators.required]),
      college: new FormControl('', [Validators.required]),
      rollNo: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
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
          data.course = this.rtiDetailsForm.get('course').value;
          data.college = this.rtiDetailsForm.get('college').value;
          data.rollNo = this.rtiDetailsForm.get('rollNo').value;
          data.year = this.rtiDetailsForm.get('year').value;
          data.moreInfo = this.rtiDetailsForm.get('moreInfo').value;

        console.log(data)
        this.currentService = currentservice
        if (this.selectedRoute === this.currentService) {
          console.log(this.currentService)
          this.apiService.sendApplyRtiData(data);
        }
      }
    )
    this.subscriptionTwo = this.apiService.subscribeRtiData.subscribe(
      rtiData => {
        const data: any = {}
          data.course = this.rtiDetailsForm.get('course').value;
          data.college = this.rtiDetailsForm.get('college').value;
          data.rollNo = this.rtiDetailsForm.get('rollNo').value;
          data.year = this.rtiDetailsForm.get('year').value;
          data.moreInfo = this.rtiDetailsForm.get('moreInfo').value;

        // this.currentService = rtiData
        if (this.selectedRoute === rtiData) {
          this.apiService.postMarksheetVerificationService(data)
            .subscribe(
              (resultID: any) => {
                console.log(resultID)
                this.apiService.sendRtiId(resultID.id);
                console.log(resultID.id)
              }
            )
        }
        console.log(rtiData)
      }
    )
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionTwo.unsubscribe();
  }

}
