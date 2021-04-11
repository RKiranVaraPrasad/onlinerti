import { Component, OnInit, AfterContentInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit, AfterContentInit {

  step = 0;
  status: boolean = false;
  services: any;
  postalChecked = false;
  rtiChecked = false;
  expretChecked = false;
  options: FormGroup;
  rtidetails: FormGroup;
  personalDetailsForm: FormGroup;
  selectControl = new FormControl('accent');
  fontSizeControl = new FormControl(16, Validators.min(10));
  selectedPlan: string;
  fullname: any;
  email: any;
  mobile: any;
  state: any;
  city: any;
  pincode: any;
  address: any;
  selectedValue: string = this.router.url.split('/').pop();
  @Output() selectionChange: EventEmitter<any> = new EventEmitter()
  rtiData: any;
  applySubscription: Subscription;
  rtiSubscription: Subscription;
  stepTwo: boolean = false;
  stepThree: boolean = false;
  tempData: string;
  formData: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.formData = new FormData();
    this.options = this.fb.group({
      color: this.selectControl,
      fontSize: this.fontSizeControl,
    });
    this.rtidetails = this.fb.group({
      serviceType: new FormControl('', [])
    })
    this.personalDetailsForm = this.fb.group({
      fullname: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{6}$')]),
      address: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.apiService.subscribeFormStatus.subscribe(
      currentStatus => {
        this.status = currentStatus;
        this.cd.markForCheck();
      }
    )
    const userData = JSON.parse(localStorage.getItem('user'));
    if (localStorage.getItem('access-token') != null) {
      this.fullname = userData.username;
      this.email = userData.email;
      this.mobile = userData.mobile;
    }
    this.services = [
      { id: 1, option: "Passport Delay", link: "passport-delay" },
      { id: 2, option: "Income Tax Refund", link: "it-returns" },
      { id: 3, option: "Marksheet Verification", link: "marksheet-verification" },
      { id: 4, option: "Answer Copy", link: "answer-copy" },
      { id: 5, option: "FIR Status", link: "fir-status" },
      { id: 6, option: "Property Details", link: "property-details" },
      { id: 7, option: "EPF Status", link: "epf-status" },
      { id: 8, option: "Pension Application", link: "pension-application" },
      { id: 9, option: "Occupancy Certificate", link: "occupancy-certificate" },
      { id: 10, option: "Other", link: "other" },
    ]

  }
  ngAfterContentInit() {
  }

  onChangeService(event) {
    this.router.navigate([event.value], { relativeTo: this.route })
  }

  onSubmitRti() {
    this.apiService.saveServiceTypeData(this.selectedValue)
    this.applySubscription = this.apiService.subscribeApplyData
      .subscribe(
        rtiDetails => {
          this.rtiData = rtiDetails;
          console.log(this.rtiData)
        })
    this.nextStep();
    this.stepTwo = true;
  }

  onSubmitPersonalDetails() {
    this.nextStep();
    this.stepThree = true;
  }
  onSubmitApplyForm() {
    const applyData: any = {}
    applyData.serviceType = this.selectedValue;
    applyData.status = "Pending";
    applyData.selectedPlan = this.selectedPlan;
    const personalData: any = {}
    personalData.fullname = this.fullname;
    personalData.mobile = this.mobile;
    personalData.email = this.email;
    personalData.address = this.address;
    personalData.pincode = this.pincode;
    personalData.city = this.personalDetailsForm.get('city').value;
    // submit personal data - step 01
    if (localStorage.getItem('user') != null) {
      let user: any = JSON.parse(localStorage.getItem('user'));
      let email = user.email;
      this.apiService.getPersonalDetailByEmailService(email)
        .subscribe(
          (resultId: any) => {
            console.log(resultId.length)
            if (resultId.length > 0) {
              let id = resultId[0].id;
              this.apiService.putPersonalDetailsService(id, personalData)
                .subscribe(
                  (data: any) => {
                    applyData.personalDetailsId = data.id;
                    console.log('updated details: ' + data)
                    //submit rti data - step 02
                    this.apiService.submitRtiDetails(this.selectedValue);
                    this.rtiSubscription = this.apiService.subscribeRtiId
                      .subscribe(
                        (resultId: any) => {
                          if (resultId) {
                            applyData.rtiDetailsId = resultId;
                            console.log(resultId)
                            // submit two ids - step -03
                            this.apiService.postApplyService(applyData)
                              .subscribe(
                                data => {
                                  console.log(data)
                                  this.router.navigate(['/my-rti'])
                                }
                              )
                          }
                        }
                      )
                  }
                )
            } else {
              this.apiService.postPersonalDetailsService(personalData)
                .subscribe(
                  (data: any) => {
                    console.log(data)
                    applyData.personalDetailsId = data.id;
                    console.log(data.id)
                    // submit rti data - step 02
                    this.apiService.submitRtiDetails(this.selectedValue);
                    this.rtiSubscription = this.apiService.subscribeRtiId
                      .subscribe(
                        (resultId: any) => {
                          if (resultId) {
                            applyData.rtiDetailsId = resultId;
                            console.log(resultId)
                            // submit two ids - step -03
                            this.apiService.postApplyService(applyData)
                              .subscribe(
                                data => {
                                  console.log(data)
                                  this.router.navigate(['/my-rti'])
                                }
                              )
                          }
                        }
                      )
                  }
                )
            }
          }
        )
    } else {
      alert('Please login or Register')
      // this.apiService.postPersonalDetailsService(personalData)
      //   .subscribe(
      //     (data: any) => {
      //       console.log(data)
      //       applyData.personalDetailsId = data.id;
      //       console.log(data.id)
      //       // submit rti data - step 02
      //       this.apiService.submitRtiDetails(this.selectedValue);
      //       this.rtiSubscription = this.apiService.subscribeRtiId
      //         .subscribe(
      //           (resultId: any) => {
      //             if (resultId) {
      //               applyData.rtiDetailsId = resultId;
      //               console.log(resultId)
      //               // submit two ids - step -03
      //               this.apiService.postApplyService(applyData)
      //                 .subscribe(
      //                   data => {
      //                     console.log(data)
      //                     this.router.navigate(['/my-rti'])
      //                   }
      //                 )
      //             }
      //           }
      //         )
      //     }
      //   )
    }

  }

  ngOnDestroy() {
    if (this.applySubscription) {
      this.applySubscription.unsubscribe
    }
    if (this.rtiSubscription) {
      this.rtiSubscription.unsubscribe
    }
  }

  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
  getFontSize() {
    return Math.max(10, this.fontSizeControl.value);
  }

}
