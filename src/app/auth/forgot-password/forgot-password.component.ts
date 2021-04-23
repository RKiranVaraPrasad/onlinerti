import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  returnUrl: string;
  forgotPasswordForm: FormGroup;
  formData: any;
  error: any;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const data: any = {}
    data.email = this.forgotPasswordForm.get('email').value;
    this.apiService.postForgotPasswordService(data)
      .subscribe(
        data => {
          this.toastr.success('Your user received an email');
          this.router.navigate(['/login']);
          console.log(data)
        },
        err => {
          this.toastr.error('An error occurred');
        }
      )
  }

}
