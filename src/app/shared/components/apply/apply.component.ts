import { Component, OnInit, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit, AfterContentInit {

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
  selectedValue: string = this.router.url.split('/').pop();
  @Output() selectionChange: EventEmitter<any> = new EventEmitter()

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
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

  onChangeService(event) {
    this.router.navigate([event.value], { relativeTo: this.route })
  }
  onSubmitPersonalDetails(){

  }

  ngAfterContentInit() {
    // if (this.apiService.logged) {
    //   const userData = this.apiService.userDetails;
    //   this.username = userData.username;
    //   this.mobile = userData.mobile;
    //   this.email = userData.email;
    // }
    // if (Array.isArray(userData)) {
    //   this.username = userData[0].username;
    //   this.email = userData[0].email;
    //   this.mobile = userData[0].mobile;
    // } else if (typeof userData === 'object') {
    //   this.username = userData.username;
    //   this.email = userData.email;
    //   this.mobile = userData.mobile;
    // }
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  message:string;
  onSubmitRti(){
    this.apiService.saveServiceTypeData(this.selectedValue)
    console.log('Router Url: '+ this.selectedValue)
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
