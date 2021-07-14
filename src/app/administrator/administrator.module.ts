import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { LoginComponent } from './login/login.component';
import { ApplicationsComponent } from './applications/applications.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [LoginComponent, ApplicationsComponent, DetailsComponent, EditComponent, AdministratorComponent],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdministratorModule { }
