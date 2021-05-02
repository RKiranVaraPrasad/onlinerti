import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {
  formData: any;
  error: any;
  email: any;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) { 
  }

  ngOnInit(): void {
    this.email = localStorage.getItem('confirmEmail');
  }

  resendEmail() {
    const data: any = {}
    data.email = this.email;
    this.apiService.postEmailConfirmationService(data)
      .subscribe(
        data => {
          this.toastr.success('Email sent successfullly');
          // this.router.navigate(['/login']);
          console.log(data)
        },
        err => {
          this.toastr.error('An error occurred');
        }
      )
  }
}
