import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  queryDetailsForm: FormGroup;
  states: any;
  success: string;
  openModal= false;
  modalRef: BsModalRef;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private http: HttpClient,
    private modalService: BsModalService,
    private router: Router
  ) { 
    this.queryDetailsForm = this.fb.group({
      fullName: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      email: new FormControl('', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [Validators.pattern('^((\\+91-?)|0)?[0-9]{6}$')]),
      address: new FormControl('')
    })}
    
  ngOnInit(): void {
  }
  close(){
    this.modalRef.hide()
    this.router.navigate(['/'])
  }
  onSubmitEnquirryForm(template: TemplateRef<any>){
    const data: any = {}
    data.fullName = this.queryDetailsForm.get('fullName').value;
    data.mobile = this.queryDetailsForm.get('mobile').value;
    data.email = this.queryDetailsForm.get('email').value;
    data.state = this.queryDetailsForm.get('state').value;
    data.city = this.queryDetailsForm.get('city').value;
    data.pincode = this.queryDetailsForm.get('pincode').value;
    data.address = this.queryDetailsForm.get('address').value;
    this.http.post('http://onlinerti.co:1337/contact-uses', data)
    .subscribe(
      data => {
        this.success = "We have received your details. We will get back to you soon";
        this.modalRef = this.modalService.show(template)
      }
    )
  }
}
