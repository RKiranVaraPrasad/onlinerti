import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateComponent } from './components/activate/activate.component';
import { AnswerCopyComponent } from './components/answer-copy/answer-copy.component';
import { ApplyComponent } from './components/apply/apply.component';
import { CategoryComponent } from './components/category/category.component';
import { CollectorOfficeComponent } from './components/collector-office/collector-office.component';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import { EpfStatusComponent } from './components/epf-status/epf-status.component';
import { FirStatusComponent } from './components/fir-status/fir-status.component';
import { FundsUtilizationComponent } from './components/funds-utilization/funds-utilization.component';
import { GovernmentHospitalsComponent } from './components/government-hospitals/government-hospitals.component';
import { GovernmentHostelsComponent } from './components/government-hostels/government-hostels.component';
import { GovernmentSchoolsComponent } from './components/government-schools/government-schools.component';
import { GramPanchayatComponent } from './components/gram-panchayat/gram-panchayat.component';
import { ItReturnsComponent } from './components/it-returns/it-returns.component';
import { MarksheetVerificationComponent } from './components/marksheet-verification/marksheet-verification.component';
import { MlaFundUtilizationComponent } from './components/mla-fund-utilization/mla-fund-utilization.component';
import { MpFundsUtilizationComponent } from './components/mp-funds-utilization/mp-funds-utilization.component';
import { OccupancyCertificateComponent } from './components/occupancy-certificate/occupancy-certificate.component';
import { OtherComponent } from './components/other/other.component';
import { PassportDelayComponent } from './components/passport-delay/passport-delay.component';
import { PensionApplicationComponent } from './components/pension-application/pension-application.component';
import { PersonalComponent } from './components/personal/personal.component';
import { PrincipalSecretaryComponent } from './components/principal-secretary/principal-secretary.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { RevenueOfficesComponent } from './components/revenue-offices/revenue-offices.component';
import { RoadWorkComponent } from './components/road-work/road-work.component';
import { SocialComponent } from './components/social/social.component';
import { TenderDetailsComponent } from './components/tender-details/tender-details.component';

const routes: Routes = [
  {
    path: 'apply', 
    component: ApplyComponent,
    children: [
      {path: '', redirectTo: 'personal', pathMatch: 'full'},
      {
        path: ':url',
        component: CategoryComponent,
        children: [
          // {path: '', redirectTo: 'it-returns', pathMatch: 'full'},
          {path: 'it-returns', component: ItReturnsComponent},
          {path: 'passport-delay', component: PassportDelayComponent},
          {path: 'marksheet-verification', component: MarksheetVerificationComponent},
          {path: 'marksheet-verification', component: MarksheetVerificationComponent},
          {path: 'answer-copy', component: AnswerCopyComponent},
          {path: 'fir-status', component: FirStatusComponent},
          {path: 'property-details', component: PropertyDetailsComponent},
          {path: 'epf-status', component: EpfStatusComponent},
          {path: 'pension-application', component: PensionApplicationComponent},
          {path: 'occupancy-certificate', component: OccupancyCertificateComponent},
          {path: 'mp-funds-utilization', component: MpFundsUtilizationComponent},
          {path: 'mla-fund-utilization', component: MlaFundUtilizationComponent},
          {path: 'gram-panchayat', component: GramPanchayatComponent},
          {path: 'funds-utilization', component: FundsUtilizationComponent},
          {path: 'tender-details', component: TenderDetailsComponent},
          {path: 'road-work', component: RoadWorkComponent},
          {path: 'government-hostels', component: GovernmentHostelsComponent},
          {path: 'government-hospitals', component: GovernmentHospitalsComponent},
          {path: 'government-schools', component: GovernmentSchoolsComponent},
          {path: 'principal-secretary', component: PrincipalSecretaryComponent},
          {path: 'revenue-offices', component: RevenueOfficesComponent},
          {path: 'collector-office', component: CollectorOfficeComponent},
          {path: 'other', component: OtherComponent},
        ]
      },
      {path: 'other', component: OtherComponent},
      
    ]
  },
  {path: 'activate', component: ActivateComponent},
  {path: 'email-confirmation', component: EmailConfirmationComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
