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
  subscription: Subscription;
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
      fullname: new FormControl('',[Validators.required]),
      mobile: new FormControl('',[Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      email: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      state: new FormControl('',[Validators.required]),
      city: new FormControl('',[Validators.required]),
      pincode: new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required])      
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
      { id: 3, option: "Marksheet Verification", link: "marksheet-verification" }
    ]

  }
  ngAfterContentInit() {
  }

  onChangeService(event) {
    this.router.navigate([event.value], { relativeTo: this.route })
  }

  onSubmitRti(){
    this.apiService.saveServiceTypeData(this.selectedValue)
    this.subscription = this.apiService.subscribeApplyData
    .subscribe(
      rtiDetails => {
        this.rtiData = rtiDetails;
        console.log(this.rtiData)
      })
    this.nextStep();
    this.stepTwo = true;
  }

  onSubmitPersonalDetails(){
    this.nextStep();
    this.stepThree = true;
  }
  onSubmitApplyForm(){
    this.apiService.submitRtiDetails(this.selectedValue);
    // const applyData: any = {}
    // this.apiService.subscribeRtiData
    // .subscribe(
    //   (rtiId: any) => {
    //     const rtiDetailID = rtiId;
    //     applyData.rtiDetailsId = rtiDetailID;
    //   }
    // )

    // const personalData: any = {}
    // personalData.fullname = this.fullname;
    // personalData.mobile = this.mobile;
    // personalData.email = this.email;
    // personalData.address = this.address;
    // personalData.pincode = this.pincode;
    // personalData.city = this.personalDetailsForm.get('city').value;
    // console.log(personalData)
    // this.apiService.postPersonalDetailsService(personalData)
    // .subscribe(
    //   (result: any) => {
    //     const perDetailID = result.id;
    //     applyData.personalDetailsId = perDetailID;
        // this.apiService.postApplyService(applyData)
        // .subscribe(
        //   data => {
        //     console.log(data)
        //   }
        // )
    //   }
    // )
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
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
