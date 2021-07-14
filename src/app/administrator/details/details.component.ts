import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

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
  passportDelay: Object;
  govtSchemes: Object;
  serviceMatters: Object;
  epfStatus: Object;
  itReturns: Object;
  marksheetVerification: Object;
  answerCopy: Object;
  firStatus: Object;
  propertyDetails: Object;
  pensionApplication: Object;
  occupancyCertificate: Object;
  collectorOffice: Object;
  principalSecretary: Object;
  revenueOffices: Object;
  moreInfo: Object;
  mpFundsUtilization: Object;
  gramPanchayat: Object;
  fundsUtilization: Object;
  tenderDetails: Object;
  roadWork: Object;
  governmentHostels: Object;
  governmentHospitals: Object;
  governmentSchools: Object;
  naregaFunds: Object;
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
                if(service === "passport-delay"){
                  this.passportDelay = data
                }
                else if(service === "it-returns"){
                  this.itReturns = data
                }
                else if(service === "marksheet-verification"){
                  this.marksheetVerification = data
                }
                else if(service === "answer-copy"){
                  this.answerCopy = data
                }
                else if(service === "fir-status"){
                  this.firStatus = data
                }
                else if(service === "property-details"){
                  this.propertyDetails = data
                }
                else if(service === "epf-status"){
                  this.epfStatus = data
                }
                else if(service === "pension-application"){
                  this.pensionApplication = data
                }
                else if(service === "occupancy-certificate"){
                  this.occupancyCertificate = data
                }
                else if(service === "collector-office"){
                  this.collectorOffice = data
                }
                else if(service === "principal-secretary"){
                  this.principalSecretary = data
                }
                else if(service === "revenue-offices"){
                  this.revenueOffices = data
                }
                else if((service === "banks") || (service === "municipal-offices") || (service === "gram-panchayat-offices") || (service === "state-government-offices") || (service === "central-government-offices") || (service === "rta-offices") || (service === "police-stations") || (service === "service-matters") || (service === "electricity-offices") || (service === "other")){
                  this.moreInfo = data
                }
                else if((service === "mp-funds-utilization") || (service === "mla-fund-utilization")){
                  this.mpFundsUtilization = data
                }
                else if(service === "gram-panchayat"){
                  this.gramPanchayat = data
                }
                else if(service === "funds-utilization"){
                  this.fundsUtilization = data
                }
                else if(service === "tender-details"){
                  this.tenderDetails = data
                }
                else if(service === "road-work"){
                  this.roadWork = data
                }
                else if(service === "government-hostels"){
                  this.governmentHostels = data
                }
                else if(service === "government-hospitals"){
                  this.governmentHospitals = data
                }
                else if(service === "government-schools"){
                  this.governmentSchools = data
                }
                else if(service === "govt-schemes"){
                  this.govtSchemes = data
                }
                else if(service === "narega-funds"){
                  this.naregaFunds = data
                }
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
