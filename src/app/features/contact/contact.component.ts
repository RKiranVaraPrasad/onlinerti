import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  personalDetailsForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { 
    this.personalDetailsForm = this.fb.group({
      fullname: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{6}$')]),
      address: new FormControl('', [Validators.required])
    })}

  ngOnInit(): void {
  }
  onSubmitEnquirryForm(){

  }
}
