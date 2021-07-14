import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorComponent } from './administrator/administrator.component';
import { ApplicationsComponent } from './applications/applications.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'administrator',
    component: AdministratorComponent,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'applications', component: ApplicationsComponent},
      {path: 'details/:service/:id', component: DetailsComponent},
      {path: 'edit', component: EditComponent},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
