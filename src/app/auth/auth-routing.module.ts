import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { MyRtiComponent } from './my-rti/my-rti.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'login-register', component: RegisterComponent},
  { path: 'my-rti', component: MyRtiComponent},
  { path: 'details', component: DetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
