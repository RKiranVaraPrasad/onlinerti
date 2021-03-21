import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { MyRtiComponent } from './my-rti/my-rti.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  { path: 'my-rti', component: MyRtiComponent, canActivate: [AuthGuard]},
  { path: 'details', component: DetailsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
