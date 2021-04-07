import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-answer-copy',
  templateUrl: './answer-copy.component.html',
  styleUrls: ['./answer-copy.component.scss']
})
export class AnswerCopyComponent implements OnInit {
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
      applicantName: new FormControl('', [Validators.required]),
      rollNo: new FormControl('', [Validators.required]),
      examName: new FormControl('', [Validators.required]),
      examDate: new FormControl('', [Validators.required]),
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
          data.applicantName = this.rtiDetailsForm.get('applicantName').value;
          data.rollNo = this.rtiDetailsForm.get('rollNo').value;
          data.examName = this.rtiDetailsForm.get('examName').value;
          data.examDate = this.rtiDetailsForm.get('examDate').value;
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
          data.applicantName = this.rtiDetailsForm.get('applicantName').value;
          data.rollNo = this.rtiDetailsForm.get('rollNo').value;
          data.examName = this.rtiDetailsForm.get('examName').value;
          data.examDate = this.rtiDetailsForm.get('examDate').value;
          data.moreInfo = this.rtiDetailsForm.get('moreInfo').value;

        // this.currentService = rtiData
        if (this.selectedRoute === rtiData) {
          this.apiService.postAnswerCopyService(data)
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
