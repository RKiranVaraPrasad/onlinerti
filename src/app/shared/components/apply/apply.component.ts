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
  selectControl = new FormControl('accent');
  fontSizeControl = new FormControl(16, Validators.min(10));
  username: any;
  email: any;
  mobile: any;
  selectedValue: string = this.router.url.split('/').pop();
  @Output() selectionChange: EventEmitter<any> = new EventEmitter()

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    fb: FormBuilder
  ) {
    this.options = fb.group({
      color: this.selectControl,
      fontSize: this.fontSizeControl,
    });
  }

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (localStorage.getItem('access-token') != null) {
      this.username = userData.username;
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
