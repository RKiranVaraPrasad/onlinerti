import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  logged: boolean = localStorage.getItem('access-token') != null;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  loginForm: FormGroup;
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    // this.apiService.menuAfterLogin.subscribe(
    //   value => {this.logged = value}
    // )
    this.apiService.getServicesService()
      .subscribe(
        data => console.log(data)
      )
  }
  onLogin() {
    console.log(this.loginForm.value)
  }

  // apply now
  apply() {
    this.router.navigate(['/apply'], { relativeTo: this.route })
  }
  // home page slider 
  bannerSlidesArray = [
    { image: 'assets/images/home-banner.jpg', text: 'Disappointed with reckless public servants?' },
    { image: 'assets/images/home-banner.jpg', text: 'Are the Govt. Officers keeping your files pending for no reason?' },
    { image: 'assets/images/home-banner.jpg', text: 'Are the officials giving a reckless answer in Govt. Offices?' },
    { image: 'assets/images/home-banner.jpg', text: 'You want to make officers accountable and transparent?' },
  ];

  // testimonial
  testimonialsArray = [
    { image: 'assets/images/testimonial-profile-pic.png', text: 'At Online RTI, our lawyers are experts at processing RTIs, so you don’t have to worry about it. Simply click on your problem below, submit your application, and consider your case at the top of the government’s queue.' }
  ];

  // services
  servicesArray = [
    { image: 'assets/icons/service-01.png', title: 'Passport Delay', link: 'personal/passport-delay' },
    { image: 'assets/icons/service-02.png', title: 'Income Tax Refund', link: 'personal/it-returns' },
    { image: 'assets/icons/service-03.png', title: 'Answer Sheet Copies', link: 'personal/answer-copy' },
    { image: 'assets/icons/service-04.png', title: 'MP Funds', link: 'social/mp-funds-utilization' },
    { image: 'assets/icons/service-05.png', title: 'Property Documents', link: 'personal/property-details' },
    { image: 'assets/icons/service-06.png', title: 'Market sheet verification', link: 'personal/marksheet-verification' },
  ]

}
