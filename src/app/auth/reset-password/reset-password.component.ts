import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  code: any;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { 
    this.resetPasswordForm = this.fb.group({
      password: new FormControl('', [Validators.required]),
      passwordConfirmation: new FormControl('', [Validators.required])
    }, { validators: this.checkPasswords })
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const passwordConfirmation = group.get('passwordConfirmation').value;
  
    return password === passwordConfirmation ? null : { notSame: true }     
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
    });
    // console.log(this.code)
  }

  onSubmit() {
    const data: any = {}
    data.code = this.code;
    data.password = this.resetPasswordForm.get('password').value;
    data.passwordConfirmation = this.resetPasswordForm.get('passwordConfirmation').value;
    this.apiService.postResetPasswordService(data)
      .subscribe(
        data => {
          this.toastr.success('Password reset successfully, Login with new password');
          this.router.navigate(['/login']);
          // console.log(data)
        },
        err => {
          this.toastr.error('An error occurred');
          // console.log(err)
        }
      )
  }

}
