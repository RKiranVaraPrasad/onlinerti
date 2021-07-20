import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  fieldType: boolean = false;
  loginForm: FormGroup;
  formData: any;
  error: any;
  message: string;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      identifier: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.isLoggedUser();
    // get return url from route parameters or default to '/my-rti'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/administrator/applications';
  }
  togglePassword() {
    this.fieldType = !this.fieldType;
  }
  onLogin() {
    const data: any = {}
    data.identifier = this.loginForm.get('identifier').value;
    data.password = this.loginForm.get('password').value;

    this.apiService.postUserLoginService(data)
      .subscribe(
        data => {
          const userRole = JSON.parse(localStorage.getItem('user'))
          if(userRole.role.type != 'admin'){
            this.message = "User does not exist";
          }
          else{
            this.router.navigateByUrl(this.returnUrl);
          }
          //this.toastr.success('Login Successful');
        },
        err => {
          // this.error = err.error.message[0].messages[0].message;
          this.error = "Email or password invalid.";
        }
      )

  }

  isLoggedUser(){
    this.apiService.userDataAfterLoggedIn.subscribe((user)=>{
        if(user){
          this.router.navigate(['/']);
        }
    })
  }

}
