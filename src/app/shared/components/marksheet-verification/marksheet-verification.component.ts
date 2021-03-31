import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-marksheet-verification',
  templateUrl: './marksheet-verification.component.html',
  styleUrls: ['./marksheet-verification.component.scss']
})
export class MarksheetVerificationComponent implements OnInit {
  rtiDetailsForm: FormGroup;
  currentService: any;
  selectedRoute: string = this.router.url.split('/').pop();
  subscription: Subscription;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.rtiDetailsForm = this.fb.group({
      course: new FormControl('', [Validators.required]),
      college: new FormControl('', [Validators.required]),
      rollNo: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      moreInfo: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.subscription = this.apiService.currentServiceType.subscribe(
      currentservice => {
        this.currentService = currentservice
        if (this.selectedRoute === this.currentService) {
          console.log(this.currentService)
          
          const data: any = {}
          data.course = this.rtiDetailsForm.get('course').value;
          data.college = this.rtiDetailsForm.get('college').value;
          data.rollNo = this.rtiDetailsForm.get('rollNo').value;
          data.year = this.rtiDetailsForm.get('year').value;
          data.moreInfo = this.rtiDetailsForm.get('moreInfo').value;

          localStorage.setItem('tempData', JSON.stringify(data))
        }
      }
    )
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
