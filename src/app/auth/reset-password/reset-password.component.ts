import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  returnUrl: string;
  resetPasswordForm: FormGroup;
  formData: any;
  error: any;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) { 
    this.resetPasswordForm = this.fb.group({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: this.checkPasswords })
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
  
    return password === confirmPassword ? null : { notSame: true }     
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const data: any = {}
    data.password = this.resetPasswordForm.get('password').value;
    this.apiService.postResetPasswordService(data)
      .subscribe(
        data => {
          this.toastr.success('Password reset successfully, Login with new password');
          this.router.navigate(['/login']);
          console.log(data)
        },
        err => {
          this.toastr.error('An error occurred');
        }
      )
  }

}
