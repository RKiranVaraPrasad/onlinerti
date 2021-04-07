import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnswerCopyComponent } from './components/answer-copy/answer-copy.component';
import { ApplyComponent } from './components/apply/apply.component';
import { EpfStatusComponent } from './components/epf-status/epf-status.component';
import { FirStatusComponent } from './components/fir-status/fir-status.component';
import { ItReturnsComponent } from './components/it-returns/it-returns.component';
import { MarksheetVerificationComponent } from './components/marksheet-verification/marksheet-verification.component';
import { OccupancyCertificateComponent } from './components/occupancy-certificate/occupancy-certificate.component';
import { OtherComponent } from './components/other/other.component';
import { PassportDelayComponent } from './components/passport-delay/passport-delay.component';
import { PensionApplicationComponent } from './components/pension-application/pension-application.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';

const routes: Routes = [
  {
    path: 'apply', 
    component: ApplyComponent,
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
      {path: 'other', component: OtherComponent},
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
