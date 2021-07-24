import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  username: any;
  applyData: any;
  modalRef: BsModalRef;
  editData: any;
  applyFormData: any = {}
  editApplyStatus: FormGroup
  applicationData: FormData;
  statusUpdated: any;
  config = {
    ignoreBackdropClick: true
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) {
    this.applicationData = new FormData();
    this.editApplyStatus = this.fb.group({
      status: new FormControl('', [Validators.required])
    })
  }
  editStatus(id, template: TemplateRef<any>) {
    this.apiService.getAppliesService(id)
      .subscribe(
        data => {
          this.editData = data;
          // console.log(this.editData)
        }
      )
    this.modalRef = this.modalService.show(template, this.config);
  }
  className(value) {
    switch (value) {
      case "In Review":
        return "in-review";
        break;
      case "In Progress":
        return "in-progress";
        break;
      case "Closed":
        return "closed";
        break;
      default:
        return "pending";
    }
  }
  onChangeSelect(event) {
    // console.log(event.value)
    this.statusUpdated = event.value;
  }
  onChangeStatus() {
    this.applyFormData.orderId = this.editData.orderId;
    this.applyFormData.rtiDetailsId = this.editData.rtiDetailsId;
    this.applyFormData.applicationId = this.editData.applicationId;
    this.applyFormData.personalDetailsId = this.editData.personalDetailsId;
    this.applyFormData.serviceType = this.editData.serviceType;
    this.applyFormData.status = this.statusUpdated;
    this.applyFormData.selectedPlan = this.editData.selectedPlan;
    this.applicationData.set('data', JSON.stringify(this.applyFormData));
    this.apiService.putApplyService(this.editData.id, this.applicationData)
      .subscribe(
        data => {
          // console.log('modified data ' + data)
          this.modalService.hide();
          this.apiService.getApplyService()
            .subscribe(
              data => {
                this.applyData = data;
                this.editApplyStatus.reset();
              }
            );
        }
      )
  }
  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('user'))
    this.username = userData.username;
    let email = userData.email;
    this.apiService.getApplyService()
      .subscribe(
        data => {
          // console.log(data)
          this.applyData = data;
        }
      );
    // this.apiService.getPersonalDetailByEmailService(email)
    //   .subscribe(
    //     (resultID: any) => {
    //       console.log(resultID)
    //       this.apiService.getMyRtiService(resultID[0].id)
    //         .subscribe(
    //           data => {
    //             console.log(data)
    //             this.applyData = data;
    //           }
    //         )
    //     }
    //   )

  }

  seeDetails() {
    this.router.navigate(['/details'], { relativeTo: this.route })
  }

}
