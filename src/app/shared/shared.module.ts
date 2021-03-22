import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentifierComponent } from './components/identifier/identifier.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ToastrModule } from 'ngx-toastr';
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



@NgModule({
  declarations: [
    IdentifierComponent,
    ItReturnsComponent,
    ApplyComponent,
    PassportDelayComponent,
    MarksheetVerificationComponent
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
    ToastrModule.forRoot(),
    SharedRoutingModule
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
