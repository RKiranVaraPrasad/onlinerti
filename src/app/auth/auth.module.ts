import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MyRtiComponent } from './my-rti/my-rti.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    RegisterComponent,
    MyRtiComponent,
    DetailsComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    AuthRoutingModule
  ],
  exports: [
    RegisterComponent,
    MyRtiComponent,
    DetailsComponent
  ]
})
export class AuthModule { }
