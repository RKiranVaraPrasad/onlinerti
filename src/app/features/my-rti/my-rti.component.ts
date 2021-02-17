import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-my-rti',
  templateUrl: './my-rti.component.html',
  styleUrls: ['./my-rti.component.scss']
})
export class MyRtiComponent implements OnInit {

  trackApplicationForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { 
    this.trackApplicationForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      applicationId: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){

  }

}
