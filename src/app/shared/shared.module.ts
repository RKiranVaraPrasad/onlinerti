import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentifierComponent } from './components/identifier/identifier.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ItReturnsComponent } from './components/it-returns/it-returns.component';
import { ApplyComponent } from './components/apply/apply.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { SharedRoutingModule } from './shared-routing.module';
import { PassportDelayComponent } from './components/passport-delay/passport-delay.component';
import { MarksheetVerificationComponent } from './components/marksheet-verification/marksheet-verification.component';
import { AnswerCopyComponent } from './components/answer-copy/answer-copy.component';
import { FirStatusComponent } from './components/fir-status/fir-status.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { EpfStatusComponent } from './components/epf-status/epf-status.component';
import { PensionApplicationComponent } from './components/pension-application/pension-application.component';
import { OccupancyCertificateComponent } from './components/occupancy-certificate/occupancy-certificate.component';
import { OtherComponent } from './components/other/other.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { PipesModule } from '../core/pipes/pipes.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { GovernmentSchoolsComponent } from './components/government-schools/government-schools.component';
import { GovernmentHospitalsComponent } from './components/government-hospitals/government-hospitals.component';
import { GovernmentHostelsComponent } from './components/government-hostels/government-hostels.component';
import { RoadWorkComponent } from './components/road-work/road-work.component';
import { TenderDetailsComponent } from './components/tender-details/tender-details.component';
import { FundsUtilizationComponent } from './components/funds-utilization/funds-utilization.component';
import { GramPanchayatComponent } from './components/gram-panchayat/gram-panchayat.component';
import { MlaFundUtilizationComponent } from './components/mla-fund-utilization/mla-fund-utilization.component';
import { MpFundsUtilizationComponent } from './components/mp-funds-utilization/mp-funds-utilization.component';
import { ActivateComponent } from './components/activate/activate.component';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import { CollectorOfficeComponent } from './components/collector-office/collector-office.component';
import { PrincipalSecretaryComponent } from './components/principal-secretary/principal-secretary.component';
import { RevenueOfficesComponent } from './components/revenue-offices/revenue-offices.component';
import {MatStepperModule} from '@angular/material/stepper';
import { PersonalComponent } from './components/personal/personal.component';
import { SocialComponent } from './components/social/social.component';
import { CategoryComponent } from './components/category/category.component';
import { NaregaFundsComponent } from './components/narega-funds/narega-funds.component';
import { GovtSchemesComponent } from './components/govt-schemes/govt-schemes.component';




@NgModule({
  declarations: [
    IdentifierComponent,
    ItReturnsComponent,
    ApplyComponent,
    PassportDelayComponent,
    MarksheetVerificationComponent,
    AnswerCopyComponent,
    FirStatusComponent,
    PropertyDetailsComponent,
    EpfStatusComponent,
    PensionApplicationComponent,
    OccupancyCertificateComponent,
    OtherComponent,
    GovernmentSchoolsComponent,
    GovernmentHospitalsComponent,
    GovernmentHostelsComponent,
    RoadWorkComponent,
    TenderDetailsComponent,
    FundsUtilizationComponent,
    GramPanchayatComponent,
    MlaFundUtilizationComponent,
    MpFundsUtilizationComponent,
    ActivateComponent,
    EmailConfirmationComponent,
    CollectorOfficeComponent,
    PrincipalSecretaryComponent,
    RevenueOfficesComponent,
    PersonalComponent,
    SocialComponent,
    CategoryComponent,
    NaregaFundsComponent,
    GovtSchemesComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    SharedRoutingModule,
    NgxJsonViewerModule,
    PipesModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule
  ],
  exports: [
    IdentifierComponent,
    ItReturnsComponent,
    ApplyComponent,
    PassportDelayComponent,
    MarksheetVerificationComponent
  ]
})
export class SharedModule { }
