import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  rtiDetails: any;
  loggedIn: boolean = localStorage.getItem('access-token') != null;
  documents: any;
  applyData: any;
  applyId: any;
  applyFormData: any = {}
  singleRecord: any;
  files: any;
  constructor(
    private location: Location,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.applyData = new FormData();
  }
  onFileSelect(event){
    const files: FileList = event.target.files;
    if (files.length) {
      Array.from(files).forEach(file => {
        this.applyData.append('files.documents', file, file.name);
      });
    }
  }
  uploadDocuments(){
    this.applyFormData.orderId = this.singleRecord.orderId;
    this.applyFormData.rtiDetailsId = this.singleRecord.rtiDetailsId;
    this.applyFormData.applicationId = this.singleRecord.applicationId;
    this.applyFormData.personalDetailsId = this.singleRecord.personalDetailsId;
    this.applyFormData.serviceType = this.singleRecord.serviceType;
    this.applyFormData.status = this.singleRecord.status;
    this.applyFormData.selectedPlan = this.singleRecord.selectedPlan;
    this.applyData.append('data', JSON.stringify(this.applyFormData));
    this.apiService.putApplyService(this.applyId, this.applyData)
    .subscribe(
      data => {
        let id = this.route.snapshot.paramMap.get('id')
        this.apiService.getAppliesService(id)
        .subscribe(
          (data: any) => {
            this.documents = data.documents;
          })
      }
    )
  }
  ngOnInit(): void {
    let service = this.route.snapshot.paramMap.get('service')
    let id = this.route.snapshot.paramMap.get('id')
    this.apiService.getAppliesService(id)
      .subscribe(
        (data: any) => {
          console.log(data.documents)
          this.singleRecord = data;
          this.applyId = data.id
          this.documents = data.documents;
          let rtiId = data.rtiDetailsId;
          console.log(rtiId)
          this.apiService.getRtiDetailsService(service, rtiId)
            .subscribe(
              data => {
                this.rtiDetails = data;
                console.log(data)
              }
            )
        }
      )

  }

  back() {
    this.location.back()
  }

}
