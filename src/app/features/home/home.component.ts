import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatAccordion} from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  loginForm: FormGroup;
  constructor(
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
  }
  onLogin(){
    console.log(this.loginForm.value)
  }

  // apply now
  apply(){
    this.router.navigate(['/apply'], {relativeTo: this.route})
  }
  // home page slider 
  bannerSlidesArray = [
    {image: 'assets/images/home-banner.jpg', text: ''}
  ];

  // testimonial
  testimonialsArray = [
    {image: 'assets/images/testimonial-profile-pic.png', text: 'At Online RTI, our lawyers are experts at processing RTIs, so you don’t have to worry about it. Simply click on your problem below, submit your application, and consider your case at the top of the government’s queue.'}
  ];

  // services
  servicesArray = [
    {image: 'assets/icons/service-01.png', title: 'Passport Delay'},
    {image: 'assets/icons/service-02.png', title: 'Income Tax Refund'},
    {image: 'assets/icons/service-03.png', title: 'Answer Sheet Copies'},
    {image: 'assets/icons/service-04.png', title: 'MP/ MLA Funds'},
    {image: 'assets/icons/service-05.png', title: 'Property Documents'},
    {image: 'assets/icons/service-06.png', title: 'Market sheet verification'},
  ]

}
