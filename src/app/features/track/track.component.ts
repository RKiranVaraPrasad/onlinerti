import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  trackApplicationForm: FormGroup;
  applicationDetails: Object;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService,
    public translate: TranslateService
  ) {

    this.trackApplicationForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      applicationId: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }
  onSubmit() {
    const email = this.trackApplicationForm.get('email').value;
    const application = this.trackApplicationForm.get('applicationId').value;
    this.apiService.getPersonalDetailByEmailService(email)
      .subscribe(
        (resultID: any) => {
          // console.log(resultID)
          this.apiService.getMyRtiService(resultID[0].id)
            .subscribe(
              (data: any) => {
                // console.log(data)
                data.forEach(element => {
                  if (element.applicationId === application) {
                    this.applicationDetails = element;
                    this.router.navigate(['../details', element.serviceType, element.id])
                    // console.log(element)
                  }
                });

              }
            )
        }
      )
  }

}
