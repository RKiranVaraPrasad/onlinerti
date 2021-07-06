import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-marksheet-verification',
  templateUrl: './marksheet-verification.component.html',
  styleUrls: ['./marksheet-verification.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class MarksheetVerificationComponent implements OnInit, OnDestroy {


  date = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

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
      regularSupplementary: new FormControl('', [Validators.required]),
      collegeUniversityBoardAddress: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
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
          data.course = this.rtiDetailsForm.get('course').value;
          data.college = this.rtiDetailsForm.get('college').value;
          data.rollNo = this.rtiDetailsForm.get('rollNo').value;
          data.year = this.rtiDetailsForm.get('year').value;
          data.regularSupplementary = this.rtiDetailsForm.get('regularSupplementary').value;
          data.collegeUniversityBoardAddress = this.rtiDetailsForm.get('collegeUniversityBoardAddress').value;
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
          data.regularSupplementary = this.rtiDetailsForm.get('regularSupplementary').value;
          data.collegeUniversityBoardAddress = this.rtiDetailsForm.get('collegeUniversityBoardAddress').value;
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
