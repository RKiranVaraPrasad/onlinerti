import { Component, OnInit, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuidv4 } from 'uuid';
import { element } from 'protractor';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit, OnDestroy {

  step = 0;
  status: boolean = false;
  personalServices: any= [];
  socialServices: any;
  otherServices: any;
  postalChecked = false;
  rtiChecked = false;
  expretChecked = false;
  options: FormGroup;
  rtidetails: FormGroup;
  personalDetailsForm: FormGroup;
  selectControl = new FormControl('accent');
  fontSizeControl = new FormControl(16, Validators.min(10));
  selectedPlan: string;
  finalAmount: any;
  orderId: any;
  fullname: any;
  email: any;
  mobile: any;
  state: any;
  city: any;
  pincode: any;
  address: any;
  selectedValue: string;
  @Output() selectionChange: EventEmitter<any> = new EventEmitter()
  rtiData: any;
  applySubscription: Subscription;
  rtiSubscription: Subscription;
  stepTwo: boolean = false;
  stepThree: boolean = false;
  tempData: string;
  formData: any;
  applicationId: any;
  services: { id: number; category: number; option: string; link: string; };
  displayCategoryItems: any;
  finalPersonalArray: any = [];
  statusClass: boolean;
  childrenUrl: any;
  applyData: any;
  // serviceDisplay: boolean;
  file: File;
  documentsData: any;
  applyFormData: any = {}
  loggedIn: boolean = localStorage.getItem('user') != null;
  constructor(
    private apiService: ApiService,
    public router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
  ) {
    this.formData = new FormData();
    this.applyData = new FormData();
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
    this.route.url.subscribe(url => {
      this.selectedValue = this.router.url.split('/').pop();
      //console.log("IN ROUTE",this.router.url , this.selectedValue);
      if (this.router.url.includes('/apply/personal')) {
        // console.log(this.router.url)
        this.categoryChange(1, 'personal');
        return;
        // this.onChangeService()
        // console.log(this.selectedValue)
      }
      if (this.router.url.includes('/apply/social')) {
        this.categoryChange(2, 'social');
        return;
      }
      if (this.router.url.includes('/apply/other')) {
        this.categoryChange(3, 'other');
        return;
      }
    })
   

    this.apiService.getPersonalServicesService()
    .subscribe(
      data => {
        console.log(data)
        this.personalServices = data
      }
    )

    this.apiService.getSocialServicesService()
      .subscribe(
        data => this.socialServices = data
      )
    this.apiService.getOtherServicesService()
      .subscribe(
        data => {
          this.otherServices = data;
        }
      )
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

  }
  categoryChange(catId, url) {
    console.log(catId,url);
    this.childrenUrl = url;
    this.displayCategoryItems = catId;  
  }
  serviceDisplay(){
    return this.router.url != '/apply/personal' && this.router.url != '/apply/social' && this.router.url != '/apply/other';
  }
  onChangeService(event) {
    this.router.navigate([`${this.childrenUrl}/${event.value}`], { relativeTo: this.route })
    // console.log(this.serviceDisplay)
    document.getElementById("scollTo").scrollIntoView();
    this.selectedValue = this.router.url.split('/').pop();
    // console.log(this.selectedValue)
  }
  onFileSelect(event){
    const files: FileList = event.target.files;
    if (files.length) {
      Array.from(files).forEach(file => {
        this.applyData.append('files.documents', file, file.name);
      });
    }
  }
  onSubmitRti() {
    this.selectedValue = this.router.url.split('/').pop();
    // console.log(this.selectedValue)
    this.apiService.saveServiceTypeData(this.selectedValue)
    this.applySubscription = this.apiService.subscribeApplyData
      .subscribe(
        rtiDetails => {
          this.rtiData = rtiDetails;
          // console.log(this.rtiData)
        })
    this.nextStep();
    this.stepTwo = true;
  }

  onSubmitPersonalDetails() {
    // console.log(this.rtiData)
    this.nextStep();
    this.stepThree = true;
  }
  onSubmitApplyForm() {
    this.selectedValue = this.router.url.split('/').pop();

    // console.log(this.selectedValue);
    if (this.selectedPlan === "Basic ₹199") {
      this.finalAmount = 19900;
    } else if (this.selectedPlan === "Standard ₹299") {
      this.finalAmount = 29900;
    } else if (this.selectedPlan === "Premium ₹499") {
      this.finalAmount = 49900;
    }
    
    this.applyFormData.serviceType = this.selectedValue;
    this.applyFormData.status = "Pending";
    this.applyFormData.selectedPlan = this.selectedPlan;

    const personalData: any = {}
    personalData.fullname = this.fullname;
    personalData.mobile = this.mobile;
    personalData.email = this.email;
    personalData.address = this.address;
    personalData.pincode = this.pincode;
    personalData.city = this.personalDetailsForm.get('city').value;
    personalData.state = this.personalDetailsForm.get('state').value;

    // submit personal data - step 01
    this.apiService.getPersonalDetailByEmailService(this.email)
      .subscribe(
        (resultId: any) => {
          // console.log(resultId.length)
          if (resultId.length > 0) {
            let id = resultId[0].id;
            this.apiService.putPersonalDetailsService(id, personalData)
              .subscribe(
                (data: any) => {
                  this.applyFormData.personalDetailsId = data.id;
                  this.applyPostMethod();
                }
              )
          }
          else {
            this.apiService.postPersonalDetailsService(personalData)
              .subscribe(
                (data: any) => {
                  if (data.id) {
                    this.applyFormData.personalDetailsId = data.id;
                    this.applyPostMethod()
                  }
                }
              )
          }
        }
      )
  }

  applyPostMethod() {
    // submit rti data - step 02
    this.apiService.submitRtiDetails(this.selectedValue);
    this.rtiSubscription = this.apiService.subscribeRtiId
      .subscribe(
        (resultId: any) => {
          if (resultId) {
            this.applyFormData.rtiDetailsId = resultId;
            this.applicationId = this.selectedValue.slice(0, 3).toUpperCase() + Math.floor(Date.now() / 1000);
            this.applyFormData.applicationId = this.applicationId;
            localStorage.setItem('applicationId', this.applicationId);
            // submit two ids - step -03
            this.apiService.createOrderId({
              amount: this.finalAmount,
              currency: "INR",
              receipt: "receipt#1"
            }).subscribe(
              (order: any) => {
                // console.log(order);
                if (order.status === 'created') {
                  // console.log(order.id)
                  this.orderId = order.id;
                  localStorage.setItem('orderId', this.orderId);
                  this.applyFormData.orderId = order.id;
                  this.applyData.append('data', JSON.stringify(this.applyFormData));
                  this.apiService.postApplyService(this.applyData)
                    .subscribe(
                      (data: any) => {
                        if (data) {
                          // payment gateway
                          const razorpayOptions = {
                            "key": "rzp_test_wqn0qSBX1OF4rG",
                            "amount": this.finalAmount,
                            "currency": "INR",
                            "name": "Online RTI",
                            "description": "Test Transaction",
                            "image": "http://172.105.60.86/assets/images/onlineRTI.png",
                            "order_id": this.orderId,
                            "handler": function (response) {
                              // alert(response.razorpay_payment_id);
                              // alert(response.razorpay_order_id);
                              // alert(response.razorpay_signature)
                              this.orderId = response.razorpay_order_id;
                              if (typeof response.razorpay_payment_id == 'undefined' ||  response.razorpay_payment_id < 1) {
                                this.redirect_url = 'apply'
                              } else {
                                this.redirect_url = 'confirmation'
                              }
                              location.href = this.redirect_url
                            },
                            "prefill": {
                              "name": this.fullname,
                              "email": this.email,
                              "contact": this.mobile
                            },
                            "notes": {
                              "address": "Razorpay Corporate Office"
                            },
                            "theme": {
                              "color": "#3399cc"
                            },
                            "modal": {
                              "ondismiss": function(){
                                window.location.href = `payment-pending`
                                this.apiService.putApplyService()
                                .subscribe(
                                  data => console.log('payment failed')
                                )
                              }
                          }
                          };
                          const rzp1 = new this.apiService.nativeWindow.Razorpay(razorpayOptions);
                          rzp1.open();
                        }

                        // this.toastr.success('Applied successfully');

                        // send email with details
                        const body = "<p>Thank you for submiting application</p><p>We will review your application and get back to you soon.</p><p>" + data.applicationId + " is application ID to track the status.</p>"
                        const emailData = {
                          to: this.email,
                          html: body
                        };
                        this.apiService.postApplyEmailService(emailData).subscribe()
                      }
                    )
                }
              }
            )
          }
        }
      )
  }

  ngOnDestroy() {
    if (this.applySubscription) {
      this.applySubscription.unsubscribe()
    }
    if (this.rtiSubscription) {
      this.rtiSubscription.unsubscribe()
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
