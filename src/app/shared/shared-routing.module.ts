import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplyComponent } from './components/apply/apply.component';
import { ItReturnsComponent } from './components/it-returns/it-returns.component';
import { MarksheetVerificationComponent } from './components/marksheet-verification/marksheet-verification.component';
import { PassportDelayComponent } from './components/passport-delay/passport-delay.component';

const routes: Routes = [
  {
    path: 'apply', 
    component: ApplyComponent,
    children: [
      // {path: '', redirectTo: 'it-returns', pathMatch: 'full'},
      {path: 'it-returns', component: ItReturnsComponent},
      {path: 'passport-delay', component: PassportDelayComponent},
      {path: 'marksheet-verification', component: MarksheetVerificationComponent},
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
