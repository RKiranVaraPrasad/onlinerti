import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  fieldType: boolean = false;
  registerForm: FormGroup;
  formData: any;
  email: any;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) { 
    this.registerForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }
  togglePassword(){
    this.fieldType = !this.fieldType;
  }
  onRegister(){
    const data: any = {}
    data.username = this.registerForm.get('username').value;
    data.mobile = this.registerForm.get('mobile').value;
    data.email = this.registerForm.get('email').value;
    data.password = this.registerForm.get('password').value;

    //this.formData.append('data', JSON.stringify(data));
    this.apiService.postUserRegistrationService(data)
    .subscribe(
      data => {
        this.toastr.success('Your details has been submitted!');
        this.router.navigate(['/email-confirmation']);
        console.log(data)
        localStorage.setItem('confirmEmail', this.email);
      },
      err => {
        this.toastr.error('Submission of details failed');
      }
    )

  }

  

}
